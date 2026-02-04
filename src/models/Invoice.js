import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    invoiceNo: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    jobCardId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobCard' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },

    // Customer GSTIN (optional)
    customerGstin: { type: String, default: '' },

    // Invoice Items
    parts: [{
        code: String,
        name: String,
        hsn: String,
        qty: { type: Number, min: 0 },
        rate: { type: Number, min: 0 },
        gst: { type: Number, default: 18 },
        taxableAmount: Number,
        lineTotal: Number
    }],
    labour: [{
        code: String,
        name: String,
        sac: { type: String, default: '998714' },
        qty: { type: Number, min: 0 },
        rate: { type: Number, min: 0 },
        gst: { type: Number, default: 18 },
        taxableAmount: Number,
        lineTotal: Number
    }],
    outsideWork: [{
        code: String,
        name: String,
        sac: { type: String, default: '998719' },
        qty: { type: Number, min: 0 },
        rate: { type: Number, min: 0 },
        gst: { type: Number, default: 18 },
        taxableAmount: Number,
        lineTotal: Number
    }],

    // Totals
    subtotal: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    manualDiscount: { type: Number, default: 0 },
    couponCode: String,
    couponDiscount: { type: Number, default: 0 },
    roundOff: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },

    // Payment Tracking
    paymentStatus: {
        type: String,
        default: 'pending',
        lowercase: true
    },
    paymentMethod: {
        type: String,
        lowercase: true
    },
    paymentDetails: {
        cash: { type: Number, default: 0 },
        card: { type: Number, default: 0 },
        upi: { type: Number, default: 0 }
    },
    amountPaid: { type: Number, default: 0 },
    balanceAmount: { type: Number, default: 0 },
    paidAt: Date,

    // Next Service
    nextServiceDate: Date,
    nextServiceKm: Number,
    nextServiceRecommendation: String,

    // Status & Locking
    status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
    isLocked: { type: Boolean, default: false },
    lockedAt: Date,
    lockedReason: String,

    // Audit
    branch: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    auditLog: {
        type: [{
            action: String,
            field: String,
            oldValue: mongoose.Schema.Types.Mixed,
            newValue: mongoose.Schema.Types.Mixed,
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
            userName: String,
            timestamp: { type: Date, default: Date.now }
        }],
        default: []
    }
}, {
    timestamps: true,
});

// Pre-save hook to calculate balance and status
InvoiceSchema.pre('save', function (next) {
    console.log('--- Invoice Pre-Save Hook Start ---');
    console.log('Doc state (input):', {
        invoiceNo: this.invoiceNo,
        grandTotal: this.grandTotal,
        amountPaid: this.amountPaid,
        balanceAmount: this.balanceAmount,
        paymentStatus: this.paymentStatus
    });

    const total = Number(this.grandTotal) || 0;
    const paid = Number(this.amountPaid) || 0;

    this.balanceAmount = total - paid;
    console.log('Calculated balanceAmount:', this.balanceAmount);

    // Auto-update status if not manually set to something else or to ensure correctness
    if (this.balanceAmount <= 0 && total > 0) {
        this.paymentStatus = 'paid';
        if (!this.paidAt) this.paidAt = new Date();
    } else if (paid > 0) {
        this.paymentStatus = 'partial';
    } else {
        this.paymentStatus = 'pending';
    }

    console.log('Calculated paymentStatus:', this.paymentStatus);

    // Auto-lock if fully paid
    if (this.paymentStatus === 'paid' && !this.isLocked) {
        this.isLocked = true;
        this.lockedAt = new Date();
        this.lockedReason = 'Payment completed';
    }

    console.log('--- Invoice Pre-Save Hook End ---');
    next();
});




export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
