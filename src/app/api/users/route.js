import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Staff from '@/models/Staff';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await dbConnect();
        const staff = await Staff.find({}).sort({ name: 1 });

        // Format as users (exclude password)
        const users = staff.map(s => ({
            _id: s._id,
            name: s.name,
            username: s.phone, // Using phone as username
            email: s.email || '',
            role: s.role,
            branch: s.branch,
            phone: s.phone,
            isActive: s.status === 'active',
            lastLogin: s.updatedAt,
        }));

        return NextResponse.json(users);
    } catch (error) {
        console.error('GET /api/users error:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        if (body._id) {
            // Update existing user
            const updateData = {
                name: body.name,
                email: body.email,
                role: body.role,
                branch: body.branch,
                phone: body.phone || body.username,
                status: body.isActive ? 'active' : 'inactive',
            };

            // Only update password if provided
            if (body.password) {
                updateData.password = await bcrypt.hash(body.password, 10);
            }

            const updated = await Staff.findByIdAndUpdate(body._id, updateData, { new: true });
            if (!updated) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            return NextResponse.json({
                _id: updated._id,
                name: updated.name,
                username: updated.phone,
                email: updated.email,
                role: updated.role,
                branch: updated.branch,
                phone: updated.phone,
                isActive: updated.status === 'active',
            });
        } else {
            // Create new user
            const hashedPassword = await bcrypt.hash(body.password || 'password123', 10);

            const newUser = new Staff({
                name: body.name,
                email: body.email,
                role: body.role || 'Service Advisor',
                branch: body.branch || 'Main Branch',
                phone: body.phone || body.username,
                password: hashedPassword,
                basicSalary: body.basicSalary || 0,
                status: 'active',
            });

            await newUser.save();

            return NextResponse.json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.phone,
                email: newUser.email,
                role: newUser.role,
                branch: newUser.branch,
                phone: newUser.phone,
                isActive: true,
            }, { status: 201 });
        }
    } catch (error) {
        console.error('POST /api/users error:', error);
        return NextResponse.json({ error: error.message || 'Failed to save user' }, { status: 500 });
    }
}
