// Script to drop the unique index on abbreviation field in Units collection
// Run with: node scripts/drop-unit-index.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function dropIndex() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const db = mongoose.connection.db;

        // Drop the unique index on abbreviation
        try {
            await db.collection('units').dropIndex('abbreviation_1');
            console.log('✅ Successfully dropped abbreviation_1 index');
        } catch (err) {
            if (err.code === 27) {
                console.log('Index abbreviation_1 does not exist, nothing to drop');
            } else {
                throw err;
            }
        }

        // Also clear any existing units to start fresh
        const result = await db.collection('units').deleteMany({});
        console.log(`✅ Cleared ${result.deletedCount} existing units`);

        console.log('Done! Please restart the app to auto-seed default units.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

dropIndex();
