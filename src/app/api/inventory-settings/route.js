
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import InventorySetting from '@/models/InventorySetting';

export async function GET() {
    await dbConnect();
    try {
        const settings = await InventorySetting.find({ isActive: true }).sort({ createdAt: -1 });
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        if (body._id) {
            const updated = await InventorySetting.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json(updated);
        } else {
            const newSetting = await InventorySetting.create(body);
            return NextResponse.json(newSetting);
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
