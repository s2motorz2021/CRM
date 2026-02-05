import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    department: { type: String, enum: ['Workshop', 'Admin', 'Finance', 'Sales', 'Other'], default: 'Workshop' },
    permissions: {
        dashboard: { type: Boolean, default: true },
        crm: { type: Boolean, default: false },
        billing: { type: Boolean, default: false },
        inventory: { type: Boolean, default: false },
        hr: { type: Boolean, default: false },
        finance: { type: Boolean, default: false },
        settings: { type: Boolean, default: false },
        reports: { type: Boolean, default: false },
    },
    canAssignJobs: { type: Boolean, default: false }, // Can be assigned as technician in job cards
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});

export default mongoose.models.Role || mongoose.model('Role', RoleSchema);
