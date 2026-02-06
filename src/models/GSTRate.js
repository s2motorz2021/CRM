
import mongoose from 'mongoose';

const GSTRateSchema = new mongoose.Schema({
    rate: { type: Number, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.GSTRate || mongoose.model('GSTRate', GSTRateSchema);
