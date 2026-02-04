import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Staff from '@/models/Staff';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-123';

export async function POST(request) {
    try {
        await dbConnect();
        const { phone, password } = await request.json();

        if (!phone || !password) {
            return NextResponse.json({ error: 'Phone and password are required' }, { status: 400 });
        }

        const user = await Staff.findOne({ phone });
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create Token
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const userData = {
            _id: user._id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            photo: user.photo,
            branch: user.branch
        };

        const response = NextResponse.json({
            message: 'Login successful',
            user: userData,
            token
        });

        // Set cookie (optional, but good for security)
        response.cookies.set('s2_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 1 day
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
