import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import InstituteStudent from "@/models/InstituteStudent";
import Department from "@/models/Department";
import { auth } from "@/auth";

export const GET = async () => {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        // Find the student record associated with this user's email
        const student = await InstituteStudent.findOne({ email: session.user.email });

        if (!student) {
            return NextResponse.json({ message: "Student record not found" }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
