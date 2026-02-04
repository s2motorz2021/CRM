import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['present', 'absent', 'halfday'], required: true }
}, {
    timestamps: true,
});

// Compound index to prevent duplicate attendance for same staff on same day
AttendanceSchema.index({ staffId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
