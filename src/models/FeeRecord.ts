import mongoose from 'mongoose';

const FeeRecordSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'InstituteStudent', required: true },
    amount: { type: Number, required: true },
    feeType: { type: String, enum: ['Tuition', 'Exam', 'Library', 'Transport', 'Hostel', 'Other'], default: 'Tuition' },
    status: { type: String, enum: ['Paid', 'Unpaid', 'Partial'], default: 'Unpaid' },
    dueDate: { type: Date },
    paidDate: { type: Date },
    month: { type: String },
    remarks: { type: String },
}, { timestamps: true });

export default mongoose.models.FeeRecord || mongoose.model('FeeRecord', FeeRecordSchema);
