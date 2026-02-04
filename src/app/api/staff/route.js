import dbConnect from '@/lib/mongodb';
import Staff from '@/models/Staff';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const staff = await Staff.find({}).sort({ createdAt: -1 });
        return NextResponse.json(staff);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        if (body._id) {
            // Update existing
            const updatedStaff = await Staff.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json(updatedStaff);
        } else {
            // Create new
            const newStaff = await Staff.create(body);
            return NextResponse.json(newStaff, { status: 201 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to save staff', details: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { id } = await request.json();
        await Staff.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Staff deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete staff' }, { status: 500 });
    }
}
