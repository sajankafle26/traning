import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: String,
    bio: String,
    linkedin: String,
    twitter: String,
    github: String,
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
