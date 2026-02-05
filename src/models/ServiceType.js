import mongoose from 'mongoose';

const ServiceTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ratePerHour: { type: Number, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});

export default mongoose.models.ServiceType || mongoose.model('ServiceType', ServiceTypeSchema);
