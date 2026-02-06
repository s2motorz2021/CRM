
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import GSTRate from '@/models/GSTRate';

export async function GET() {
    await dbConnect();
    try {
        const rates = await GSTRate.find({ isActive: true }).sort({ createdAt: -1 });
        return NextResponse.json(rates);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        if (body._id) {
            const updated = await GSTRate.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json(updated);
        } else {
            const newRate = await GSTRate.create(body);
            return NextResponse.json(newRate);
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
