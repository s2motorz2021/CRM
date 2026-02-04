import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Vehicle from '@/models/Vehicle';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const customerId = searchParams.get('customerId');

        const query = customerId ? { customerId } : {};
        const vehicles = await Vehicle.find(query).sort({ registrationNo: 1 });
        return NextResponse.json(vehicles);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        let vehicle;

        if (data._id) {
            vehicle = await Vehicle.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            vehicle = await Vehicle.create(data);
        }
        return NextResponse.json(vehicle);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
