import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'InstituteStudent', required: true },
    date: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ['Present', 'Absent', 'Late'], default: 'Present' },
    remarks: { type: String },
}, { timestamps: true });

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
