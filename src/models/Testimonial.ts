import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    course: String,
    quote: { type: String, required: true },
    image: String,
    placement: String,
    company: String,
    salary: String,
    rating: { type: Number, default: 5 },
    linkedin: String,
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
