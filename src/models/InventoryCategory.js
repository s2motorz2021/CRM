import mongoose from 'mongoose';

const InventoryCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.InventoryCategory || mongoose.model('InventoryCategory', InventoryCategorySchema);
