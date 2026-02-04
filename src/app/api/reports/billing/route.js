import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Invoice from '@/models/Invoice';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);

        // Default to current month if no dates provided
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')) : firstDay;
        const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')) : lastDay;
        const branch = searchParams.get('branch');

        const match = {
            date: { $gte: startDate, $lte: endDate },
            status: 'active'
        };
        if (branch) match.branch = branch;

        // 1. Overall Summary
        const summary = await Invoice.aggregate([
            { $match: match },
            {
                $group: {
                    _id: null,
                    totalBilling: { $sum: '$grandTotal' },
                    totalCollected: { $sum: '$amountPaid' },
                    totalPending: { $sum: '$balanceAmount' },
                    totalCgst: { $sum: '$cgst' },
                    totalSgst: { $sum: '$sgst' },
                    count: { $sum: 1 }
                }
            }
        ]);

        // 2. Daily Summary
        const dailySummary = await Invoice.aggregate([
            { $match: match },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalAmount: { $sum: "$grandTotal" },
                    totalDiscount: { $sum: { $add: ["$manualDiscount", "$couponDiscount"] } },
                    totalGst: { $sum: { $add: ["$cgst", "$sgst"] } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        // 3. GST Rate Breakdown (Requires unwinding arrays)
        const gstBreakdownParts = await Invoice.aggregate([
            { $match: match },
            { $unwind: "$parts" },
            {
                $group: {
                    _id: "$parts.gst",
                    taxableValue: { $sum: "$parts.taxableAmount" },
                    gstAmount: { $sum: { $multiply: ["$parts.taxableAmount", { $divide: ["$parts.gst", 100] }] } }
                }
            }
        ]);

        const gstBreakdownLabour = await Invoice.aggregate([
            { $match: match },
            { $unwind: "$labour" },
            {
                $group: {
                    _id: "$labour.gst",
                    taxableValue: { $sum: "$labour.taxableAmount" },
                    gstAmount: { $sum: { $multiply: ["$labour.taxableAmount", { $divide: ["$labour.gst", 100] }] } }
                }
            }
        ]);

        const gstBreakdownOutside = await Invoice.aggregate([
            { $match: match },
            { $unwind: "$outsideWork" },
            {
                $group: {
                    _id: "$outsideWork.gst",
                    taxableValue: { $sum: "$outsideWork.taxableAmount" },
                    gstAmount: { $sum: { $multiply: ["$outsideWork.taxableAmount", { $divide: ["$outsideWork.gst", 100] }] } }
                }
            }
        ]);

        // Merge GST breakdowns
        const finalizeGst = () => {
            const map = new Map();
            [...gstBreakdownParts, ...gstBreakdownLabour, ...gstBreakdownOutside].forEach(item => {
                const rate = item._id || 18;
                if (!map.has(rate)) {
                    map.set(rate, { rate, taxableValue: 0, gstAmount: 0 });
                }
                const current = map.get(rate);
                current.taxableValue += item.taxableValue;
                current.gstAmount += item.gstAmount;
            });
            return Array.from(map.values()).sort((a, b) => a.rate - b.rate);
        };

        // 4. Payment Mode Breakdown
        const paymentModeBreakdown = await Invoice.aggregate([
            { $match: match },
            {
                $group: {
                    _id: "$paymentMethod",
                    total: { $sum: "$amountPaid" },
                    count: { $sum: 1 }
                }
            }
        ]);

        return NextResponse.json({
            summary: summary[0] || { totalBilling: 0, totalCollected: 0, totalPending: 0, totalCgst: 0, totalSgst: 0, count: 0 },
            dailySummary,
            gstBreakdown: finalizeGst(),
            paymentModeBreakdown
        });

    } catch (error) {
        console.error('Billing report error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
