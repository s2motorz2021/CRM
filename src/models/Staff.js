import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, default: '👨‍🔧' },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    dob: String,
    doj: String,
    experience: String,
    role: { type: String, required: true },
    branch: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: String,
    bankAccount: String,
    ifsc: String,
    aadhaar: String,
    pan: String,
    status: { type: String, enum: ['active', 'inactive', 'on leave'], default: 'active' },
    basicSalary: { type: Number, required: true },
    attendance: [{
        date: String,
        status: { type: String, enum: ['present', 'absent', 'halfday'] }
    }],
    advances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advance'
    }]
}, {
    timestamps: true,
});

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema);
