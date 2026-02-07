import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

// One-time utility to drop the old unique index and clear units
export async function POST() {
    try {
        await dbConnect();
        const db = mongoose.connection.db;

        // Drop the unique index on abbreviation if it exists
        try {
            await db.collection('units').dropIndex('abbreviation_1');
            console.log('Dropped abbreviation_1 index');
        } catch (err) {
            // Index might not exist, that's OK
            console.log('Index abbreviation_1 not found or already dropped');
        }

        // Clear all existing units to allow fresh seeding
        const result = await db.collection('units').deleteMany({});
        console.log(`Deleted ${result.deletedCount} units`);

        return NextResponse.json({
            success: true,
            message: `Index dropped, ${result.deletedCount} units cleared. Refresh Units page to seed defaults.`
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
