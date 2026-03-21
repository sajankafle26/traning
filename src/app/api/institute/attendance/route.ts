import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { createHandler } from "@/lib/apiHandlers";
import Attendance from "@/models/Attendance";
import InstituteStudent from "@/models/InstituteStudent";
import { sendAbsentAlert } from "@/lib/mail";
import { auth } from "@/auth";

export const GET = async () => {
    await dbConnect();
    try {
        const data = await Attendance.find({}).populate("student").sort({ date: -1 });
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        await dbConnect();

        const data = await Attendance.create(body);

        // If status is Absent, send email
        if (body.status === "Absent") {
            const student = await InstituteStudent.findById(body.student);
            if (student && student.email) {
                try {
                    await sendAbsentAlert(student.email, student.name, new Date(body.date).toLocaleDateString());
                } catch (err) {
                    console.error("Failed to send absent alert email:", err);
                }
            }
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
