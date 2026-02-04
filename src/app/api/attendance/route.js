import dbConnect from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');
        const staffId = searchParams.get('staffId');

        let query = {};
        if (date) query.date = date;
        if (staffId) query.staffId = staffId;

        const attendance = await Attendance.find(query);
        return NextResponse.json(attendance);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { staffId, date, status } = body;

        const attendance = await Attendance.findOneAndUpdate(
            { staffId, date },
            { status },
            { upsert: true, new: true }
        );

        return NextResponse.json(attendance);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save attendance' }, { status: 500 });
    }
}
