import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Invoice from '@/models/Invoice';
import JobCard from '@/models/JobCard';

// Helper to calculate invoice totals from parts, labour and outside work
const calculateInvoiceTotals = (parts, labour, outsideWork, manualDiscount, couponDiscount) => {
    const process = (items) => items?.map(item => {
        const qty = Number(item.qty) || 0;
        const rate = Number(item.rate) || 0;
        const gstPercent = Number(item.gst) || 0;
        const taxableAmount = qty * rate;
        const gstAmount = taxableAmount * (gstPercent / 100);
        return {
            ...item,
            qty,
            rate,
            gst: gstPercent,
            taxableAmount,
            lineTotal: taxableAmount + gstAmount
        };
    }) || [];

    const processedParts = process(parts);
    const processedLabour = process(labour);
    const processedOutsideWork = process(outsideWork);

    const allItems = [...processedParts, ...processedLabour, ...processedOutsideWork];

    // Subtotal is sum of all taxable amounts BEFORE GST
    const subtotal = allItems.reduce((sum, item) => sum + (item.taxableAmount || 0), 0);

    // Total GST is sum of GST from all items
    const totalGst = allItems.reduce((sum, item) => sum + ((item.taxableAmount || 0) * ((item.gst || 0) / 100)), 0);

    const cgst = totalGst / 2;
    const sgst = totalGst / 2;

    const discountAmount = (Number(manualDiscount) || 0) + (Number(couponDiscount) || 0);

    const beforeRound = subtotal + totalGst - discountAmount;
    const grandTotal = Math.round(beforeRound);
    const roundOff = grandTotal - beforeRound;

    return {
        parts: processedParts,
        labour: processedLabour,
        outsideWork: processedOutsideWork,
        subtotal,
        cgst,
        sgst,
        discount: discountAmount,
        manualDiscount: Number(manualDiscount) || 0,
        couponDiscount: Number(couponDiscount) || 0,
        roundOff,
        grandTotal
    };
};

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const paymentStatus = searchParams.get('paymentStatus');
        const branch = searchParams.get('branch');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const search = searchParams.get('search');

        let query = {};
        if (status) query.status = status;
        if (paymentStatus) query.paymentStatus = paymentStatus;
        if (branch) query.branch = branch;

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        const invoices = await Invoice.find(query)
            .populate('customerId')
            .populate('vehicleId')
            .populate('jobCardId')
            .sort({ createdAt: -1 });

        let filteredInvoices = invoices;
        if (search) {
            const searchLower = search.toLowerCase();
            filteredInvoices = invoices.filter(inv =>
                inv.invoiceNo?.toLowerCase().includes(searchLower) ||
                inv.customerId?.name?.toLowerCase().includes(searchLower) ||
                inv.customerId?.phone?.includes(search) ||
                inv.vehicleId?.registrationNo?.toLowerCase().includes(searchLower)
            );
        }

        return NextResponse.json(filteredInvoices);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        if (data.customerGstin) {
            const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
            if (!gstinRegex.test(data.customerGstin)) {
                return NextResponse.json({ error: 'Invalid GSTIN format' }, { status: 400 });
            }
        }

        if (!data.invoiceNo) {
            const date = new Date();
            const month = date.getMonth();
            const year = date.getFullYear();
            const fyStart = month >= 3 ? year : year - 1;
            const fyEnd = (fyStart + 1) % 100;
            const fyCode = `${fyStart % 100}${String(fyEnd).padStart(2, '0')}`;

            const count = await Invoice.countDocuments({
                createdAt: {
                    $gte: new Date(fyStart, 3, 1),
                    $lt: new Date(fyStart + 1, 3, 1)
                }
            });
            data.invoiceNo = `INV-${fyCode}-${String(count + 1).padStart(4, '0')}`;
        }

        // Strictly recalculate all totals from input items
        const totals = calculateInvoiceTotals(
            data.parts,
            data.labour,
            data.outsideWork,
            data.manualDiscount,
            data.couponDiscount
        );

        // Merge calculated totals back into data
        Object.assign(data, totals);

        // Set initial payment state
        const amountPaid = Number(data.amountPaid) || 0;
        if (data.paymentStatus === 'paid') {
            data.amountPaid = data.grandTotal;
            data.paidAt = new Date();
        } else if (data.paymentStatus === 'partial') {
            data.amountPaid = amountPaid;
        } else {
            data.amountPaid = 0;
            data.paymentStatus = 'pending';
        }

        data.balanceAmount = data.grandTotal - data.amountPaid;

        data.auditLog = [{
            action: 'created',
            field: 'invoice',
            newValue: data.invoiceNo,
            userName: data.createdByName || 'System',
            timestamp: new Date()
        }];

        const invoice = await Invoice.create(data);

        if (data.jobCardId) {
            await JobCard.findByIdAndUpdate(data.jobCardId, {
                isLocked: true,
                status: 'delivered',
                invoiceId: invoice._id
            });
        }

        return NextResponse.json(invoice);
    } catch (error) {
        console.error('Invoice creation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        console.log('--- Invoice PATCH Route Start ---');
        await dbConnect();
        const data = await request.json();
        console.log('PATCH Input Data:', JSON.stringify(data, null, 2));

        const { _id, recordPayment, paymentAmount, paymentMethod, updatedByName, ...otherUpdateData } = data;

        if (!_id) {
            console.log('Error: Missing Invoice ID');
            return NextResponse.json({ error: 'Invoice ID required' }, { status: 400 });
        }

        const invoice = await Invoice.findById(_id);
        if (!invoice) {
            console.log('Error: Invoice not found for ID:', _id);
            return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
        }

        console.log('Current Invoice State:', {
            invoiceNo: invoice.invoiceNo,
            amountPaid: invoice.amountPaid,
            grandTotal: invoice.grandTotal,
            isLocked: invoice.isLocked
        });

        if (invoice.isLocked && !recordPayment) {
            console.log('Error: Attempted to edit locked invoice');
            return NextResponse.json({ error: 'Invoice is locked and cannot be edited' }, { status: 403 });
        }

        if (!invoice.auditLog) invoice.auditLog = [];

        // Handle payment recording
        if (recordPayment) {
            console.log('Recording Payment:', { paymentAmount, paymentMethod });
            const payAmt = Number(paymentAmount) || 0;
            if (payAmt <= 0) return NextResponse.json({ error: 'Payment amount must be greater than 0' }, { status: 400 });

            const oldPaid = Number(invoice.amountPaid) || 0;
            invoice.amountPaid = oldPaid + payAmt;
            invoice.paymentMethod = paymentMethod || invoice.paymentMethod;

            invoice.auditLog.push({
                action: 'payment_recorded',
                field: 'amountPaid',
                oldValue: oldPaid,
                newValue: invoice.amountPaid,
                userName: updatedByName || 'System',
                timestamp: new Date()
            });
            console.log('Payment recorded in audit log. New total paid:', invoice.amountPaid);
        }

        // Handle field updates and potential total recalculation
        const trackFields = ['parts', 'labour', 'outsideWork', 'manualDiscount', 'couponDiscount'];
        let needsRecalc = false;

        trackFields.forEach(field => {
            if (otherUpdateData[field] !== undefined && JSON.stringify(invoice[field]) !== JSON.stringify(otherUpdateData[field])) {
                console.log(`Field ${field} changed. Updating...`);
                const oldValue = JSON.parse(JSON.stringify(invoice[field]));
                invoice[field] = otherUpdateData[field];
                needsRecalc = true;
                invoice.auditLog.push({
                    action: 'updated',
                    field,
                    oldValue,
                    newValue: otherUpdateData[field],
                    userName: updatedByName || 'System',
                    timestamp: new Date()
                });
            }
        });

        if (needsRecalc) {
            console.log('Recalculating totals...');
            const totals = calculateInvoiceTotals(
                invoice.parts,
                invoice.labour,
                invoice.outsideWork,
                invoice.manualDiscount,
                invoice.couponDiscount
            );
            Object.assign(invoice, totals);
            console.log('Totals recalculated:', totals);
        }

        // Explicitly force balance calculation before save
        const finalTotal = Number(invoice.grandTotal) || 0;
        const finalPaid = Number(invoice.amountPaid) || 0;
        invoice.balanceAmount = finalTotal - finalPaid;
        console.log('Pre-save balance check:', { finalTotal, finalPaid, balance: invoice.balanceAmount });

        // Auto-update status
        if (invoice.balanceAmount <= 0 && finalTotal > 0) {
            invoice.paymentStatus = 'paid';
            if (!invoice.paidAt) invoice.paidAt = new Date();
            if (!invoice.isLocked) {
                invoice.isLocked = true;
                invoice.lockedAt = new Date();
                invoice.lockedReason = 'Payment completed';
            }
        } else if (finalPaid > 0) {
            invoice.paymentStatus = 'partial';
        } else {
            invoice.paymentStatus = 'pending';
        }
        console.log('Final payment status:', invoice.paymentStatus);

        console.log('Attempting invoice.save()...');
        await invoice.save();
        console.log('invoice.save() successful.');

        const updatedInvoice = await Invoice.findById(invoice._id)
            .populate('customerId')
            .populate('vehicleId');

        console.log('--- Invoice PATCH Route End (Success) ---');
        return NextResponse.json(updatedInvoice);
    } catch (error) {
        console.error('Invoice update error:', error);
        return NextResponse.json({ error: error.message || 'Unknown server error' }, { status: 500 });
    }
}
