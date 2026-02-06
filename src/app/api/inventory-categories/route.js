import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import InventoryCategory from '@/models/InventoryCategory';

export async function GET() {
    try {
        await dbConnect();
        const categories = await InventoryCategory.find({ isActive: true }).sort({ name: 1 });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();

        let category;
        const id = data._id || data.id;
        const isValidObjectId = typeof id === 'string' && id.length === 24;

        if (isValidObjectId) {
            category = await InventoryCategory.findByIdAndUpdate(id, data, { new: true });
            if (!category) {
                delete data._id;
                delete data.id;
                category = await InventoryCategory.create(data);
            }
        } else {
            delete data._id;
            delete data.id;
            category = await InventoryCategory.create(data);
        }

        return NextResponse.json(category);
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
                        await InventoryCategory.findByIdAndUpdate(body.id, { isActive: false });
                        return NextResponse.json({ success: true });
                    }
                }
            } catch (e) { }
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const isValidObjectId = typeof id === 'string' && id.length === 24;
        if (isValidObjectId) {
            await InventoryCategory.findByIdAndUpdate(id, { isActive: false });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
