import mongoose from 'mongoose';

const PurchaseOrderSchema = new mongoose.Schema({
    invoiceNo: { type: String, required: true, unique: true },
    supplier: { type: String, required: true },
    invoiceDate: { type: Date, required: true },
    items: [{
        partCode: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    gst: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdBy: { type: String },
    approvedBy: { type: String },
}, { timestamps: true });

export default mongoose.models.PurchaseOrder || mongoose.model('PurchaseOrder', PurchaseOrderSchema);
