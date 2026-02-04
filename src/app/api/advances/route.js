import dbConnect from '@/lib/mongodb';
import Advance from '@/models/Advance';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const advances = await Advance.find({}).sort({ createdAt: -1 });
        return NextResponse.json(advances);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch advances' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        if (body._id) {
            const updatedAdvance = await Advance.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json(updatedAdvance);
        } else {
            const newAdvance = await Advance.create(body);
            return NextResponse.json(newAdvance, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save advance' }, { status: 500 });
    }
}
