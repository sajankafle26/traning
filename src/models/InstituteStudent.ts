import mongoose from 'mongoose';

const InstituteStudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'InstituteGroup' },
    rollNo: { type: String, unique: true, sparse: true },
    enrollmentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Active', 'Inactive', 'Graduated'], default: 'Active' },
    photo: { type: String },
    parentName: { type: String },
    parentPhone: { type: String },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VideoCourse' }],
}, { timestamps: true });

export default mongoose.models.InstituteStudent || mongoose.model('InstituteStudent', InstituteStudentSchema);
