
import mongoose from 'mongoose';

const CustomerVoiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.CustomerVoice || mongoose.model('CustomerVoice', CustomerVoiceSchema);
