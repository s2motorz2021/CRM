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
        let role;

        if (data._id) {
            role = await Role.findByIdAndUpdate(data._id, data, { new: true });
        } else {
            role = await Role.create(data);
        }
        return NextResponse.json(role);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await dbConnect();
        const { id } = await request.json();
        await Role.findByIdAndUpdate(id, { isActive: false });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
