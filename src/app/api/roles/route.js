import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Role from '@/models/Role';

export async function GET() {
    try {
        await dbConnect();
        const roles = await Role.find({ isActive: true }).sort({ name: 1 });
        return NextResponse.json(roles);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const data = await request.json();
        console.log('Roles API POST data:', data);
        let role;

        const id = data._id || data.id;
        const isValidObjectId = typeof id === 'string' && id.length === 24;

        if (isValidObjectId) {
            role = await Role.findByIdAndUpdate(id, data, { new: true });
            if (!role) {
                delete data._id;
                delete data.id;
                role = await Role.create(data);
            }
        } else {
            delete data._id;
            delete data.id;
            role = await Role.create(data);
        }
        return NextResponse.json(role);
    } catch (error) {
        console.error('Roles API POST error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { id } = await request.json();
        const isValidObjectId = typeof id === 'string' && id.length === 24;

        if (isValidObjectId) {
            await Role.findByIdAndUpdate(id, { isActive: false });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Roles API DELETE error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
