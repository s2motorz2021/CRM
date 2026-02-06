import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import VehicleModel from '@/models/VehicleModel';

export async function GET() {
    try {
        await dbConnect();
        const models = await VehicleModel.find({ isActive: true }).sort({ name: 1 });
        return NextResponse.json(models);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        // Ensure numeric fields are correctly cast
        if (data.year) data.year = Number(data.year);

        let model;
        const id = data._id || data.id;
        const isValidObjectId = typeof id === 'string' && id.length === 24;

        if (isValidObjectId) {
            model = await VehicleModel.findByIdAndUpdate(id, data, { new: true });
            if (!model) {
                delete data._id;
                delete data.id;
                model = await VehicleModel.create(data);
            }
        } else {
            delete data._id;
            delete data.id;
            model = await VehicleModel.create(data);
        }

        return NextResponse.json(model);
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
                        await VehicleModel.findByIdAndUpdate(body.id, { isActive: false });
                        return NextResponse.json({ success: true });
                    }
                }
            } catch (e) { }
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const isValidObjectId = typeof id === 'string' && id.length === 24;
        if (isValidObjectId) {
            await VehicleModel.findByIdAndUpdate(id, { isActive: false });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
