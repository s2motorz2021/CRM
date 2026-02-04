import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Customer from '@/models/Customer';
import Vehicle from '@/models/Vehicle';
import JobCard from '@/models/JobCard';
import Staff from '@/models/Staff';

export async function GET() {
    try {
        await dbConnect();

        // Clear existing data
        await JobCard.deleteMany({});
        await Vehicle.deleteMany({});
        await Customer.deleteMany({});

        // Create Sample Customers
        const customers = await Customer.insertMany([
            { name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@example.com', address: 'Andheri, Mumbai' },
            { name: 'Priya Patel', phone: '9876543211', email: 'priya@example.com', address: 'Kothrud, Pune' },
            { name: 'Amit Kumar', phone: '9876543212', email: 'amit@example.com', address: 'MG Road, Pune' },
        ]);

        // Create Sample Vehicles
        const vehicles = await Vehicle.insertMany([
            { registrationNo: 'MH 01 AB 1234', brand: 'Honda', model: 'Activa 6G', color: 'Black', customerId: customers[0]._id },
            { registrationNo: 'MH 01 CD 5678', brand: 'TVS', model: 'Jupiter', color: 'White', customerId: customers[0]._id },
            { registrationNo: 'MH 02 EF 9012', brand: 'Bajaj', model: 'Pulsar 150', color: 'Blue', customerId: customers[1]._id },
            { registrationNo: 'MH 03 GH 3456', brand: 'Royal Enfield', model: 'Classic 350', color: 'Grey', customerId: customers[2]._id },
        ]);

        // Find a technician for initial assignment
        const technician = await Staff.findOne({ role: 'Technician' });
        const techId = technician ? technician._id : null;

        // Create Sample Job Cards
        const today = new Date();
        await JobCard.create([
            {
                jobCardNo: 'JC-001',
                type: 'service',
                status: 'work_in_progress',
                customerId: customers[0]._id,
                vehicleId: vehicles[0]._id,
                technicianId: techId,
                serviceType: 'General Service',
                odometer: 12500,
                customerVoice: 'Engine making noise',
                estimatedAmount: 2500,
                labourItems: [{ name: 'General Service Labour', rate: 500, qty: 1 }],
                spareRequests: [{ name: 'Engine Oil 1L', rate: 450, qty: 2, status: 'approved' }],
                createdAt: new Date(today - 2 * 24 * 60 * 60 * 1000),
            },
            {
                jobCardNo: 'JC-002',
                type: 'quick',
                status: 'new',
                customerId: customers[1]._id,
                vehicleId: vehicles[2]._id,
                serviceType: 'Oil Change',
                estimatedAmount: 800,
                createdAt: new Date(today - 1 * 60 * 60 * 1000),
            },
            {
                jobCardNo: 'JC-003',
                type: 'service',
                status: 'completed',
                customerId: customers[2]._id,
                vehicleId: vehicles[3]._id,
                technicianId: techId,
                serviceType: 'Brake Service',
                odometer: 8900,
                customerVoice: 'Front brake squeaking',
                estimatedAmount: 3500,
                isLocked: true,
                createdAt: new Date(today - 1 * 24 * 60 * 60 * 1000),
            }
        ]);

        return NextResponse.json({ message: 'Job Card system seeded successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
