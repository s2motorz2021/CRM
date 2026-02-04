import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET() {
    try {
        await dbConnect();
        const leads = await Lead.find({}).sort({ createdAt: -1 });
        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        let lead;

        if (data._id) {
            lead = await Lead.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            lead = await Lead.create(data);
        }
        return NextResponse.json(lead);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { id } = await request.json();
        await Lead.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Lead deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
