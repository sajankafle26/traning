import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notice from "@/models/Notice";
import InstituteStudent from "@/models/InstituteStudent";
import { sendNoticeAlert } from "@/lib/mail";
import { auth } from "@/auth";

export const GET = async () => {
    await dbConnect();
    try {
        const data = await Notice.find({}).sort({ date: -1 });
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

        const data = await Notice.create(body);

        // If high importance, send email to all active students
        if (body.category === "General" || body.category === "Exam") { 
            // We can refine this to "High Importance" if we add a flag, 
            // but for now let's say General notices trigger email if user wants.
            // Let's assume user wants it for Exam and Urgent stuff.
            const students = await InstituteStudent.find({ status: "Active" });
            const emails = students.map(s => s.email).filter(Boolean);
            if (emails.length > 0) {
                try {
                    await sendNoticeAlert(emails, body.title, body.content);
                } catch (err) {
                    console.error("Failed to send notice email alerts:", err);
                }
            }
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
