import mongoose from 'mongoose';

const SparePartSchema = new mongoose.Schema({
    partNumber: { type: String, required: true, unique: true },
    barcode: { type: String, unique: true },
    barcodeType: { type: String, default: 'Code 128' },
    name: { type: String, required: true },
    brand: { type: String },
    category: { type: String },
    purchasePrice: { type: Number, default: 0 },
    salePrice: { type: Number, required: true },
    mrp: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    minStock: { type: Number, default: 5 },
    rackLocation: { type: String },
    compatibleModels: { type: String },
}, { timestamps: true });

export default mongoose.models.SparePart || mongoose.model('SparePart', SparePartSchema);
