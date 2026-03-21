import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import InstituteStudent from "@/models/InstituteStudent";
import Teacher from "@/models/Teacher";
import FeeRecord from "@/models/FeeRecord";
import Notice from "@/models/Notice";
import Attendance from "@/models/Attendance";

export async function GET() {
    await dbConnect();
    try {
        const [
            totalStudents,
            totalTeachers,
            activeStudents,
            paidFees,
            unpaidFees,
            totalNotices,
            totalAttendance,
            recentStudents,
        ] = await Promise.all([
            InstituteStudent.countDocuments(),
            Teacher.countDocuments(),
            InstituteStudent.countDocuments({ status: 'Active' }),
            FeeRecord.aggregate([{ $match: { status: 'Paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
            FeeRecord.countDocuments({ status: 'Unpaid' }),
            Notice.countDocuments(),
            Attendance.countDocuments({ status: 'Present' }),
            InstituteStudent.find().sort({ createdAt: -1 }).limit(5).lean(),
        ]);

        return NextResponse.json({
            totalStudents,
            totalTeachers,
            activeStudents,
            feeCollected: paidFees[0]?.total || 0,
            pendingFees: unpaidFees,
            totalNotices,
            presentToday: totalAttendance,
            recentStudents,
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
