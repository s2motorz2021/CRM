import mongoose from 'mongoose';

const AdvanceSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    staffName: String,
    branch: String,
    amount: { type: Number, required: true },
    reason: String,
    requestedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    requestedBy: String,
    status: { type: String, enum: ['requested', 'approved', 'rejected', 'closed'], default: 'requested' },
    approvedBy: String,
    approvedDate: String,
    disbursementMode: String,
    disbursementDate: String,
    repaymentType: { type: String, enum: ['emi', 'onetime'], default: 'onetime' },
    emiAmount: { type: Number, default: 0 },
    totalRepaid: { type: Number, default: 0 },
    outstanding: { type: Number, required: true },
    repayments: [{
        amount: Number,
        date: String,
        method: String
    }]
}, {
    timestamps: true,
});

export default mongoose.models.Advance || mongoose.model('Advance', AdvanceSchema);
