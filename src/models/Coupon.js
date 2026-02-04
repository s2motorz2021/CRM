import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
    // Basic Info
    campaignName: { type: String, required: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    description: { type: String, default: '' },

    // Discount Details
    type: { type: String, enum: ['percent', 'flat'], required: true },
    value: { type: Number, required: true, min: 1 },
    maxDiscount: { type: Number }, // Max cap for percentage discounts
    minOrder: { type: Number, default: 0 }, // Minimum purchase amount

    // Validity
    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },

    // Applicability
    applicability: {
        type: String,
        enum: ['full_bill', 'labour_only', 'spare_only'],
        default: 'full_bill'
    },

    // Display
    themeColor: { type: String, default: '#00B8D4' },

    // Status & Limits
    status: { type: String, enum: ['active', 'expired', 'disabled'], default: 'active' },
    isActive: { type: Boolean, default: true },
    usageLimit: { type: Number, default: 0 }, // 0 = unlimited
    usageCount: { type: Number, default: 0 },

    // Audit
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    createdByName: String,
    auditLog: [{
        action: { type: String, enum: ['created', 'edited', 'applied', 'disabled', 'enabled'] },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
        userName: String,
        details: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true,
});

// Pre-save hook to auto-uppercase code and check expiry
CouponSchema.pre('save', function (next) {
    this.code = this.code.toUpperCase();

    // Auto-expire check
    if (this.expiryDate && new Date(this.expiryDate) < new Date()) {
        this.status = 'expired';
        this.isActive = false;
    }

    next();
});

// Validate discount value
CouponSchema.pre('save', function (next) {
    if (this.type === 'percent' && (this.value < 1 || this.value > 100)) {
        return next(new Error('Percentage discount must be between 1-100'));
    }
    next();
});

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
