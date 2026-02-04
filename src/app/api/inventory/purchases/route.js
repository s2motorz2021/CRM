import dbConnect from '@/lib/mongodb';
import PurchaseOrder from '@/models/PurchaseOrder';
import SparePart from '@/models/SparePart';
import InventoryHistory from '@/models/InventoryHistory';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const purchases = await PurchaseOrder.find({}).sort({ createdAt: -1 });
        return NextResponse.json(purchases);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        if (data._id && data.status === 'approved') {
            const po = await PurchaseOrder.findById(data._id);
            if (!po) return NextResponse.json({ error: 'PO not found' }, { status: 404 });

            if (po.status !== 'approved') {
                // Update stock for each item
                for (const item of po.items) {
                    await SparePart.findOneAndUpdate(
                        { partNumber: item.partNumber },
                        { $inc: { stock: item.qty } }
                    );
                }

                po.status = 'approved';
                po.approvedBy = data.approvedBy || 'Finance';
                await po.save();

                // Add to history
                await InventoryHistory.create({
                    vendor: po.supplier,
                    type: 'purchase',
                    invoiceNo: po.invoiceNo,
                    items: po.items.length,
                    amount: po.grandTotal,
                    user: po.approvedBy
                });
            }
            return NextResponse.json(po);
        }

        // Create new PO
        const po = await PurchaseOrder.create(data);
        return NextResponse.json(po);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
