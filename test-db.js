// require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
console.log('Testing connection to:', uri ? uri.replace(/:([^:@]+)@/, ':****@') : 'undefined');

async function testConnection() {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB!');
        await mongoose.disconnect();
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();
