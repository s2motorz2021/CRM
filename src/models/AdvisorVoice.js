
import mongoose from 'mongoose';

const AdvisorVoiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.AdvisorVoice || mongoose.model('AdvisorVoice', AdvisorVoiceSchema);
