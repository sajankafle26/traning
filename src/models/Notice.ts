import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['General', 'Exam', 'Holiday', 'Fee', 'Event'], default: 'General' },
    targetAudience: { type: String, enum: ['All', 'Students', 'Teachers'], default: 'All' },
    isImportant: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    expiresAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
