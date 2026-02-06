import mongoose from 'mongoose';

const VehicleBrandSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.VehicleBrand || mongoose.model('VehicleBrand', VehicleBrandSchema);
