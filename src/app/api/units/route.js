import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Unit from '@/models/Unit';

// Default units to seed
const defaultUnits = [
    { name: 'Numbers', abbreviation: 'Nos' },
    { name: 'Liter', abbreviation: 'lts' },
    { name: 'Milli Liter', abbreviation: 'ml' },
    { name: 'Kilogram', abbreviation: 'Kg' },
    { name: 'Grams', abbreviation: 'gm' },
];

export async function GET() {
    try {
        await dbConnect();
        let units = await Unit.find({ isActive: true }).sort({ name: 1 });

        // Seed default units if none exist
        if (units.length === 0) {
            await Unit.insertMany(defaultUnits);
            units = await Unit.find({ isActive: true }).sort({ name: 1 });
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

        if (body._id) {
            // Update existing
            const updated = await Unit.findByIdAndUpdate(body._id, body, { new: true });
            return NextResponse.json(updated);
        } else {
            // Create new
            const newUnit = new Unit(body);
            await newUnit.save();
            return NextResponse.json(newUnit, { status: 201 });
        }
    } catch (error) {
        console.error('POST /api/units error:', error);
        return NextResponse.json({ error: 'Failed to save unit' }, { status: 500 });
    }
}
