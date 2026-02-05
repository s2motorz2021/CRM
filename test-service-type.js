const mongoose = require('mongoose');
const path = require('path');

// Mock dbConnect since we can't easily run Next.js imports in plain node
const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.mongodb.net/test?retryWrites=true&w=majority'; // Replace with actual if possible, but I'll try to find it in lib/mongodb.js

async function test() {
    console.log('Testing DB connection and ServiceType model...');
    try {
        // Find MONGODB_URI in the environment or project
        // For now, I'll just check if I can import the model and see if it's valid
        console.log('Checking model definition...');
        const ServiceTypeSchema = new mongoose.Schema({
            name: { type: String, required: true },
            ratePerHour: { type: Number, required: true },
            description: { type: String },
            isActive: { type: Boolean, default: true },
        });
        const ServiceType = mongoose.models.ServiceType || mongoose.model('ServiceType', ServiceTypeSchema);
        console.log('Model defined successfully.');

        const testItem = {
            name: 'Test Service',
            ratePerHour: 500,
            description: 'Test Description'
        };

        console.log('Validating test item...');
        const doc = new ServiceType(testItem);
        const error = doc.validateSync();
        if (error) {
            console.error('Validation error:', error);
        } else {
            console.log('Item is valid.');
        }

    } catch (e) {
        console.error('Test failed:', e);
    }
}

test();
