import mongoose from 'mongoose';

const VehicleColorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.VehicleColor || mongoose.model('VehicleColor', VehicleColorSchema);
