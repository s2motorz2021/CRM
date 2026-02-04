import mongoose from 'mongoose';

const InventoryRequestSchema = new mongoose.Schema({
    jobCardNo: { type: String, required: true },
    technicianName: { type: String, required: true },
    partName: { type: String, required: true },
    partNumber: { type: String, required: true },
    qty: { type: Number, required: true },
    requestedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvedAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.InventoryRequest || mongoose.model('InventoryRequest', InventoryRequestSchema);
