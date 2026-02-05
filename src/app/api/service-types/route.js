import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ServiceType from '@/models/ServiceType';

export async function GET() {
    try {
        await dbConnect();
        const serviceTypes = await ServiceType.find({ isActive: true }).sort({ name: 1 });
        return NextResponse.json(serviceTypes);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        console.log('ServiceType API POST data:', data);

        // Ensure numeric fields are correctly cast
        if (data.ratePerHour) data.ratePerHour = Number(data.ratePerHour);

        let serviceType;
        const id = data._id || data.id;
        const isValidObjectId = typeof id === 'string' && id.length === 24;

        if (isValidObjectId) {
            serviceType = await ServiceType.findByIdAndUpdate(id, data, { new: true });
            if (!serviceType) {
                delete data._id;
                delete data.id;
                serviceType = await ServiceType.create(data);
            }
        } else {
            // Treat as new item
            delete data._id;
            delete data.id;
            serviceType = await ServiceType.create(data);
        }

        return NextResponse.json(serviceType);
    } catch (error) {
        console.error('ServiceType API POST error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            // Try reading from body if not in query params
            try {
                const body = await request.json();
                if (body && body.id) {
                    const isValidObjectId = typeof body.id === 'string' && body.id.length === 24;
                    if (isValidObjectId) {
                        await ServiceType.findByIdAndUpdate(body.id, { isActive: false });
                        return NextResponse.json({ success: true });
                    }
                }
            } catch (e) { }
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const isValidObjectId = typeof id === 'string' && id.length === 24;
        if (isValidObjectId) {
            await ServiceType.findByIdAndUpdate(id, { isActive: false });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
