import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';

export async function GET() {
    try {
        await dbConnect();
        const customers = await Customer.find({}).sort({ name: 1 });
        return NextResponse.json(customers);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        let customer;

        if (data._id) {
            customer = await Customer.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            customer = await Customer.create(data);
        }
        return NextResponse.json(customer);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
