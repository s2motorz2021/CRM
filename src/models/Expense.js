import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    expenseNo: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true }, // Rent, Electricity, Tools, Salary, etc.
    description: String,
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['cash', 'card', 'upi', 'bank_transfer'], required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    rejectionReason: String,
    branch: { type: String, required: true },
    attachment: String, // URL to receipt photo
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
}, {
    timestamps: true,
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
