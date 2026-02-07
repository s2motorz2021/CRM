import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    decimalValue: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Unit || mongoose.model('Unit', UnitSchema);
