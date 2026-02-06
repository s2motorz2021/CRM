
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdvisorVoice from '@/models/AdvisorVoice';

export async function GET() {
    await dbConnect();
    try {
        const voices = await AdvisorVoice.find({ isActive: true }).sort({ createdAt: -1 });
        return NextResponse.json(voices);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        if (body._id) {
            const updated = await AdvisorVoice.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json(updated);
        } else {
            const newVoice = await AdvisorVoice.create(body);
            return NextResponse.json(newVoice);
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
