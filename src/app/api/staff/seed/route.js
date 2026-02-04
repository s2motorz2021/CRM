import dbConnect from '@/lib/mongodb';
import Staff from '@/models/Staff';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await dbConnect();

        // Clear existing staff to avoid duplicates during seeding
        await Staff.deleteMany({});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const sampleStaff = [
            { name: 'Rajesh Kumar', photo: '👨‍🔧', gender: 'Male', dob: '1990-05-15', doj: '2020-03-10', experience: '6 years', role: 'Senior Mechanic', branch: 'Main Branch', phone: '9876543210', email: 'rajesh@s2motorz.com', bankAccount: '12345678901', ifsc: 'HDFC0001234', aadhaar: '1234-5678-9012', pan: 'ABCDE1234F', status: 'active', basicSalary: 25000, password: hashedPassword },
            { name: 'Amit Sharma', photo: '👨‍🔧', gender: 'Male', dob: '1992-08-22', doj: '2021-06-15', experience: '4 years', role: 'Mechanic', branch: 'Main Branch', phone: '9876543211', email: 'amit@s2motorz.com', bankAccount: '23456789012', ifsc: 'ICIC0005678', aadhaar: '2345-6789-0123', pan: 'BCDEF2345G', status: 'active', basicSalary: 18000, password: hashedPassword },
            { name: 'Priya Patel', photo: '👩‍💼', gender: 'Female', dob: '1995-02-10', doj: '2022-01-05', experience: '3 years', role: 'Service Advisor', branch: 'Main Branch', phone: '9876543212', email: 'priya@s2motorz.com', bankAccount: '34567890123', ifsc: 'SBIN0004567', aadhaar: '3456-7890-1234', pan: 'CDEFG3456H', status: 'active', basicSalary: 20000, password: hashedPassword },
            { name: 'Suresh Yadav', photo: '👨‍🔧', gender: 'Male', dob: '1988-11-30', doj: '2019-09-20', experience: '8 years', role: 'Workshop Manager', branch: 'Main Branch', phone: '9876543213', email: 'suresh@s2motorz.com', bankAccount: '45678901234', ifsc: 'AXIS0006789', aadhaar: '4567-8901-2345', pan: 'DEFGH4567I', status: 'active', basicSalary: 35000, password: hashedPassword },
        ];

        // Insert sample staff
        const staff = await Staff.insertMany(sampleStaff);

        return NextResponse.json({ message: 'Database seeded successfully', count: staff.length }, { status: 200 });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: 'Failed to seed database', details: error.message }, { status: 500 });
    }
}
