import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Staff from '@/models/Staff';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-123';

export async function GET(request) {
    try {
        const token = request.cookies.get('s2_token')?.value || request.headers.get('authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        await dbConnect();

        const user = await Staff.findById(decoded.id).select('-password');
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}
