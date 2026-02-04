import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Staff from '@/models/Staff';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await dbConnect();

        // Check if admin already exists
        const adminExists = await Staff.findOne({ role: 'Manager' });
        if (adminExists) {
            return NextResponse.json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = await Staff.create({
            name: 'Central Admin',
            phone: '9999999999',
            password: hashedPassword,
            role: 'Manager',
            branch: 'Main Branch',
            basicSalary: 50000,
            status: 'active'
        });

        return NextResponse.json({
            message: 'Admin user created successfully',
            phone: '9999999999',
            password: 'admin123 (Please change this after login)'
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
