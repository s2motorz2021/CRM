import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const includeAll = searchParams.get('all') === 'true';

        // Auto-expire check for all coupons
        await Coupon.updateMany(
            { expiryDate: { $lt: new Date() }, status: 'active' },
            { $set: { status: 'expired', isActive: false } }
        );

        let query = {};
        if (!includeAll) {
            query.isActive = true;
        }
        if (status) {
            query.status = status;
        }

        const coupons = await Coupon.find(query).sort({ createdAt: -1 });
        return NextResponse.json(coupons);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        // Validate unique code for new coupons
        if (!data._id) {
            const existing = await Coupon.findOne({ code: data.code.toUpperCase() });
            if (existing) {
                return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
            }
        }

        // Validate percentage range
        if (data.type === 'percent' && (data.value < 1 || data.value > 100)) {
            return NextResponse.json({ error: 'Percentage must be between 1-100' }, { status: 400 });
        }

        let coupon;
        if (data._id) {
            // Update existing coupon
            const existing = await Coupon.findById(data._id);
            if (!existing) {
                return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
            }

            // Add audit log entry
            const auditEntry = {
                action: 'edited',
                userName: data.updatedByName || 'System',
                details: `Updated coupon fields`,
                timestamp: new Date()
            };

            coupon = await Coupon.findByIdAndUpdate(
                data._id,
                { ...data, $push: { auditLog: auditEntry } },
                { new: true }
            );
        } else {
            // Create new coupon with audit log
            data.auditLog = [{
                action: 'created',
                userName: data.createdByName || 'System',
                details: `Created coupon: ${data.code}`,
                timestamp: new Date()
            }];
            coupon = await Coupon.create(data);
        }

        return NextResponse.json(coupon);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        await dbConnect();
        const data = await request.json();
        const { _id, action, userName } = data;

        if (!_id) {
            return NextResponse.json({ error: 'Coupon ID required' }, { status: 400 });
        }

        const coupon = await Coupon.findById(_id);
        if (!coupon) {
            return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
        }

        let updateData = {};
        let auditEntry = { userName: userName || 'System', timestamp: new Date() };

        if (action === 'disable') {
            updateData = { status: 'disabled', isActive: false };
            auditEntry.action = 'disabled';
            auditEntry.details = 'Coupon disabled manually';
        } else if (action === 'enable') {
            // Check if not expired
            if (new Date(coupon.expiryDate) < new Date()) {
                return NextResponse.json({ error: 'Cannot enable expired coupon' }, { status: 400 });
            }
            updateData = { status: 'active', isActive: true };
            auditEntry.action = 'enabled';
            auditEntry.details = 'Coupon enabled';
        } else if (action === 'apply') {
            // Track usage
            updateData = { $inc: { usageCount: 1 } };
            auditEntry.action = 'applied';
            auditEntry.details = data.invoiceNo ? `Applied to invoice ${data.invoiceNo}` : 'Applied to invoice';
        }

        const updated = await Coupon.findByIdAndUpdate(
            _id,
            { ...updateData, $push: { auditLog: auditEntry } },
            { new: true }
        );

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
