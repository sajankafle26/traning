import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    fileType: { type: String, enum: ['PDF', 'Video', 'Link'], required: true },
    url: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });

export default mongoose.models.Material || mongoose.model('Material', MaterialSchema);
