import dbConnect from '@/lib/mongodb';
import InventoryRequest from '@/models/InventoryRequest';
import SparePart from '@/models/SparePart';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const requests = await InventoryRequest.find({}).sort({ requestedAt: -1 });
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        // If it's an update to status (Approve/Reject)
        if (data._id && data.status) {
            const invReq = await InventoryRequest.findById(data._id);
            if (!invReq) return NextResponse.json({ error: 'Request not found' }, { status: 404 });

            if (data.status === 'approved') {
                const part = await SparePart.findOne({ partCode: invReq.partCode });
                if (part) {
                    part.stock = Math.max(0, part.stock - invReq.qty);
                    await part.save();
                }
                invReq.approvedAt = new Date();
            }

            invReq.status = data.status;
            await invReq.save();
            return NextResponse.json(invReq);
        }

        // Creating a new request (usually from Job Cards)
        const newReq = await InventoryRequest.create(data);
        return NextResponse.json(newReq);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
