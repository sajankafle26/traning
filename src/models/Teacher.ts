import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    qualification: { type: String },
    designation: { type: String },
    joiningDate: { type: Date, default: Date.now },
    salary: { type: Number },
    status: { type: String, enum: ['Active', 'Inactive', 'On Leave'], default: 'Active' },
    photo: { type: String },
    subjects: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
