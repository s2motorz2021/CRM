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
        console.log('Supplier API POST data:', data);
        let supplier;

        const id = data._id || data.id;
        // Only try to update if ID is a valid MongoDB ObjectId (string of 24 chars)
        const isValidObjectId = typeof id === 'string' && id.length === 24;

        if (isValidObjectId) {
            supplier = await Supplier.findByIdAndUpdate(id, data, { new: true });
            if (!supplier) {
                // If not found, create new
                delete data._id;
                delete data.id;
                supplier = await Supplier.create(data);
            }
        } else {
            // New supplier or sample data ID
            delete data._id;
            delete data.id;
            supplier = await Supplier.create(data);
        }
        return NextResponse.json(supplier);
    } catch (error) {
        console.error('Supplier API POST error:', error);
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
