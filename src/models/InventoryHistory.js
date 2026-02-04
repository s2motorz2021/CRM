import mongoose from 'mongoose';

const InventoryHistorySchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    vendor: { type: String, default: '-' },
    type: { type: String, required: true }, // e.g., 'purchase', 'adjustment', 'return', 'part_created'
    invoiceNo: { type: String, default: '-' },
    items: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    user: { type: String, default: 'Admin' },
    reason: { type: String },
}, { timestamps: true });

export default mongoose.models.InventoryHistory || mongoose.model('InventoryHistory', InventoryHistorySchema);
