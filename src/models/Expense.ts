import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: ['Salary', 'Rent', 'Utility', 'Marketing', 'Maintenance', 'Other'], default: 'Other' },
    date: { type: Date, required: true, default: Date.now },
    remarks: { type: String },
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
