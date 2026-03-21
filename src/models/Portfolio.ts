import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: String,
    category: String,
    tags: [String],
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
