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

        let serviceType;
        if (data._id) {
            // Handle both ObjectId and numeric IDs from sample data gracefully
            if (typeof data._id === 'number' || !data._id.match(/^[0-9a-fA-F]{24}$/)) {
                // If it's a numeric ID or invalid ObjectId, treat as new but try to find by name or just create
                serviceType = await ServiceType.create(data);
            } else {
                serviceType = await ServiceType.findByIdAndUpdate(data._id, data, { new: true });
                if (!serviceType) {
                    serviceType = await ServiceType.create(data);
                }
            }
        } else {
            serviceType = await ServiceType.create(data);
        }

        return NextResponse.json(serviceType);
    } catch (error) {
        console.error('Error in ServiceType POST:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            await ServiceType.findByIdAndUpdate(id, { isActive: false });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
