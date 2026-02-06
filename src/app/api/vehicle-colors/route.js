import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VehicleColor from '@/models/VehicleColor';

export async function GET() {
    try {
        await dbConnect();
        const colors = await VehicleColor.find({ isActive: true }).sort({ name: 1 });
        return NextResponse.json(colors);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        let color;
        const id = data._id || data.id;
        const isValidObjectId = typeof id === 'string' && id.length === 24;

        if (isValidObjectId) {
            color = await VehicleColor.findByIdAndUpdate(id, data, { new: true });
            if (!color) {
                delete data._id;
                delete data.id;
                color = await VehicleColor.create(data);
            }
        } else {
            delete data._id;
            delete data.id;
            color = await VehicleColor.create(data);
        }

        return NextResponse.json(color);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            try {
                const body = await request.json();
                if (body && body.id) {
                    const isValidObjectId = typeof body.id === 'string' && body.id.length === 24;
                    if (isValidObjectId) {
                        await VehicleColor.findByIdAndUpdate(body.id, { isActive: false });
                        return NextResponse.json({ success: true });
                    }
                }
            } catch (e) { }
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const isValidObjectId = typeof id === 'string' && id.length === 24;
        if (isValidObjectId) {
            await VehicleColor.findByIdAndUpdate(id, { isActive: false });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
