import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true },
    src: { type: String, required: true },
    thumb: String,
    category: { type: String, default: 'General' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
