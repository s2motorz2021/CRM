import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Role from '@/models/Role';

export async function GET() {
    try {
        await dbConnect();

        // Clear existing roles
        await Role.deleteMany({});

        // Seed default roles
        const defaultRoles = [
            {
                name: 'Admin',
                description: 'Full system access',
                department: 'Admin',
                permissions: { dashboard: true, crm: true, billing: true, inventory: true, hr: true, finance: true, settings: true, reports: true },
                canAssignJobs: false,
            },
            {
                name: 'Workshop Manager',
                description: 'Manages workshop operations',
                department: 'Workshop',
                permissions: { dashboard: true, crm: true, billing: true, inventory: true, hr: false, finance: false, settings: false, reports: true },
                canAssignJobs: false,
            },
            {
                name: 'Service Advisor',
                description: 'Customer facing advisor',
                department: 'Workshop',
                permissions: { dashboard: true, crm: true, billing: true, inventory: false, hr: false, finance: false, settings: false, reports: false },
                canAssignJobs: false,
            },
            {
                name: 'Senior Mechanic',
                description: 'Experienced technician',
                department: 'Workshop',
                permissions: { dashboard: true, crm: false, billing: false, inventory: false, hr: false, finance: false, settings: false, reports: false },
                canAssignJobs: true,
            },
            {
                name: 'Mechanic',
                description: 'General technician',
                department: 'Workshop',
                permissions: { dashboard: true, crm: false, billing: false, inventory: false, hr: false, finance: false, settings: false, reports: false },
                canAssignJobs: true,
            },
            {
                name: 'Helper',
                description: 'Assistant technician',
                department: 'Workshop',
                permissions: { dashboard: true, crm: false, billing: false, inventory: false, hr: false, finance: false, settings: false, reports: false },
                canAssignJobs: true,
            },
            {
                name: 'Accountant',
                description: 'Finance and billing',
                department: 'Finance',
                permissions: { dashboard: true, crm: false, billing: true, inventory: false, hr: false, finance: true, settings: false, reports: true },
                canAssignJobs: false,
            },
            {
                name: 'Spare Parts Manager',
                description: 'Manages inventory and parts',
                department: 'Other',
                permissions: { dashboard: true, crm: false, billing: false, inventory: true, hr: false, finance: false, settings: false, reports: true },
                canAssignJobs: false,
            },
        ];

        await Role.insertMany(defaultRoles);

        return NextResponse.json({ success: true, message: 'Roles seeded successfully', count: defaultRoles.length });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
