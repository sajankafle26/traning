import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import InstituteStudent from "@/models/InstituteStudent";
import Department from "@/models/Department";
import { auth } from "@/auth";
import { cachedApiGet, buildCacheKey } from "@/lib/cache";

export const GET = async () => {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;

        return cachedApiGet(buildCacheKey("api", "student", email, "profile"), async () => {
            await dbConnect();
            const student = await InstituteStudent.findOne({ email: session.user.email });

            if (!student) throw new Error("NOT_FOUND");

            return student;
        }, 60);
    } catch (error: any) {
        if (error.message === "NOT_FOUND") {
            return NextResponse.json({ message: "Student record not found" }, { status: 404 });
        }
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
