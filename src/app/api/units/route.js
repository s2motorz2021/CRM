import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Unit from '@/models/Unit';

// Default units to seed
const defaultUnits = [
    { name: 'Numbers', abbreviation: 'Nos', decimalValue: 1 },
    { name: 'Liter', abbreviation: 'lts', decimalValue: 1 },
    { name: 'Milli Liter', abbreviation: 'ml', decimalValue: 0.001 },
    { name: 'Kilogram', abbreviation: 'Kg', decimalValue: 1 },
    { name: 'Grams', abbreviation: 'gm', decimalValue: 0.001 },
];

export async function GET() {
    try {
        await dbConnect();
        let units = await Unit.find({}).sort({ name: 1 });

        // Seed default units if none exist at all
        if (units.length === 0) {
            try {
                await Unit.insertMany(defaultUnits);
                units = await Unit.find({}).sort({ name: 1 });
            } catch (seedError) {
                console.error('Error seeding units:', seedError);
                // If seeding fails, return empty array
            }
        }

        return NextResponse.json(units);
    } catch (error) {
        console.error('GET /api/units error:', error);
        return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Ensure isActive is set
        if (body.isActive === undefined) {
            body.isActive = true;
        }

        if (body._id) {
            // Update existing
            const updated = await Unit.findByIdAndUpdate(body._id, body, { new: true });
            if (!updated) {
                return NextResponse.json({ error: 'Unit not found' }, { status: 404 });
            }
            return NextResponse.json(updated);
        } else {
            // Create new
            const newUnit = new Unit({
                name: body.name,
                abbreviation: body.abbreviation,
                decimalValue: body.decimalValue ?? 1,
                isActive: body.isActive ?? true,
            });
            await newUnit.save();
            return NextResponse.json(newUnit, { status: 201 });
        }
    } catch (error) {
        console.error('POST /api/units error:', error);
        return NextResponse.json({ error: error.message || 'Failed to save unit' }, { status: 500 });
    }
}
