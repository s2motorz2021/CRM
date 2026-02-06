import mongoose from 'mongoose';

const VehicleModelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: Number },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.VehicleModel || mongoose.model('VehicleModel', VehicleModelSchema);
