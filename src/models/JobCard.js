import mongoose from 'mongoose';

const JobCardSchema = new mongoose.Schema({
    jobCardNo: { type: String, required: true, unique: true },
    type: { type: String, enum: ['service', 'quick'], default: 'service' },
    status: { type: String, default: 'new' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },

    serviceType: { type: String },
    odometer: { type: Number },
    fuelLevel: { type: Number, default: 50 },
    oilLevel: { type: String, default: 'Normal' },
    batteryNo: { type: String },

    customerVoice: { type: String },
    advisorVoiceUrl: { type: String },

    estimatedAmount: { type: Number, default: 0 },
    advanceAmount: { type: Number, default: 0 },
    advanceMethod: { type: String },

    labourItems: [{
        name: { type: String },
        rate: { type: Number },
        qty: { type: Number },
        technicianId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
    }],

    spareRequests: [{
        partCode: { type: String },
        name: { type: String },
        rate: { type: Number },
        qty: { type: Number },
        status: { type: String, default: 'pending' }
    }],

    outsideWork: [{
        name: { type: String },
        vendor: { type: String },
        rate: { type: Number },
        status: { type: String, default: 'pending' }
    }],

    inspection: {
        engineOil: { type: String, default: 'Normal' },
        brakeFluid: { type: String, default: 'Normal' },
        coolant: { type: String, default: 'Normal' },
        brakePads: { type: String, default: 'Good' },
        tires: { type: String, default: 'Good' },
        battery: { type: String, default: 'Good' },
        lights: { type: String, default: 'Functional' },
        filters: { type: String, default: 'Clean' }
    },

    nextService: {
        advice: { type: String },
        dueDate: { type: Date },
        dueOdometer: { type: Number }
    },

    delivery: {
        type: { type: String, default: 'pickup' },
        address: { type: String },
        challanNo: { type: String },
        personName: { type: String }
    },

    signatures: {
        customer: { type: String }, // Base64 or URL
        advisor: { type: String }
    },

    isLocked: { type: Boolean, default: false },
    estimateSent: {
        print: { type: Boolean, default: false },
        whatsapp: { type: Boolean, default: false },
        email: { type: Boolean, default: false }
    }
}, { timestamps: true });

export default mongoose.models.JobCard || mongoose.model('JobCard', JobCardSchema);
