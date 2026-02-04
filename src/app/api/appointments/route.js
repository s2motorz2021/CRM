import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const branch = searchParams.get('branch');
        const date = searchParams.get('date');

        let query = {};
        if (branch) query.branch = branch;
        if (date) {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            query.date = { $gte: start, $lte: end };
        }

        const appointments = await Appointment.find(query)
            .populate('customerId')
            .populate('vehicleId')
            .sort({ date: 1 });

        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        let appointment;

        if (data._id) {
            appointment = await Appointment.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            appointment = await Appointment.create(data);
        }
        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        await Appointment.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Appointment deleted' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
