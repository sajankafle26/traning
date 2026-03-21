import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    description: { type: String },
    totalSeats: { type: Number, default: 50 },
    duration: { type: String },
}, { timestamps: true });

export default mongoose.models.Department || mongoose.model('Department', DepartmentSchema);
