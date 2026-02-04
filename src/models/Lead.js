const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    vehicle: { type: String },
    source: {
        type: String,
        enum: ['whatsapp', 'walkin', 'referral', 'oldcustomer', 'campaign', 'servicedue'],
        default: 'walkin'
    },
    status: {
        type: String,
        enum: ['new', 'followup', 'converted', 'lost'],
        default: 'new'
    },
    notes: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
}, { timestamps: true });

module.exports = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
