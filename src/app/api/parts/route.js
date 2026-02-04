import dbConnect from '@/lib/mongodb';
import SparePart from '@/models/SparePart';
import InventoryHistory from '@/models/InventoryHistory';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const parts = await SparePart.find({}).sort({ name: 1 });
        return NextResponse.json(parts);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        let part;

        if (data._id) {
            part = await SparePart.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            part = await SparePart.create(data);
            // Log part creation
            await InventoryHistory.create({
                type: 'part_created',
                reason: `New part: ${part.name}`,
                user: 'Admin'
            });
        }
        return NextResponse.json(part);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { id } = await request.json();
        await SparePart.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Part deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
