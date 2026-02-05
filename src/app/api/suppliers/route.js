import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Supplier from '@/models/Supplier';

export async function GET() {
    try {
        await dbConnect();
        const suppliers = await Supplier.find({ isActive: true }).sort({ name: 1 });
        return NextResponse.json(suppliers);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        let supplier;

        if (data._id || data.id) {
            const id = data._id || data.id;
            supplier = await Supplier.findByIdAndUpdate(id, data, { new: true });
        } else {
            supplier = await Supplier.create(data);
        }
        return NextResponse.json(supplier);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { id } = await request.json();
        await Supplier.findByIdAndUpdate(id, { isActive: false });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
