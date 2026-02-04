import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
    registrationNo: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
}, { timestamps: true });

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
