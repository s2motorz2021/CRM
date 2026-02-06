
import mongoose from 'mongoose';

const RampSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bayType: { type: String, required: true },
    branch: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Ramp || mongoose.model('Ramp', RampSchema);
