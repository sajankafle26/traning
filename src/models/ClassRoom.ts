import mongoose from 'mongoose';

const ClassRoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    schedule: { type: String },
    room: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    days: [{ type: String }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InstituteStudent' }],
    capacity: { type: Number, default: 30 },
}, { timestamps: true });

export default mongoose.models.ClassRoom || mongoose.model('ClassRoom', ClassRoomSchema);
