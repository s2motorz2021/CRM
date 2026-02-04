import dbConnect from '@/lib/mongodb';
import InventoryHistory from '@/models/InventoryHistory';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const history = await InventoryHistory.find({}).sort({ date: -1 });
        return NextResponse.json(history);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
