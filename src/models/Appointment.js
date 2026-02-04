import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    notes: String,
    branch: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
}, {
    timestamps: true,
});

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
