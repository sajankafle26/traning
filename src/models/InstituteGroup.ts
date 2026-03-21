import mongoose from 'mongoose';

const InstituteGroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.models.InstituteGroup || mongoose.model('InstituteGroup', InstituteGroupSchema);
