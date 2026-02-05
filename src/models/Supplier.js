import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String },
    phone: { type: String, required: true },
    email: { type: String },
    gstin: { type: String },
    address: { type: String },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});

export default mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);
