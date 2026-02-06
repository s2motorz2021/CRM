
import mongoose from 'mongoose';

const InventorySettingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.InventorySetting || mongoose.model('InventorySetting', InventorySettingSchema);
