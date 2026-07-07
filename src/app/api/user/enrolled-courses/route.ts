import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import VideoCourse from "@/models/VideoCourse";
import InstituteStudent from "@/models/InstituteStudent";
import { auth } from "@/auth";
import { cachedApiGet, buildCacheKey } from "@/lib/cache";

export async function GET() {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const email = (session.user as any).email || (session.user as any).id || "unknown";

        return cachedApiGet(buildCacheKey("api", "user", email, "enrolled"), async () => {
            await dbConnect();
            // Ensure VideoCourse is registered for populate
            const _vc = VideoCourse;
            const [user, student] = await Promise.all([
                User.findById((session.user as any).id).populate("enrolledCourses"),
                InstituteStudent.findOne({ email: session.user.email }).populate("enrolledCourses")
            ]);

            if (!user) throw new Error("NOT_FOUND");

            // Merge courses from User record and Institute record (if linked by email)
            const userCourses = user.enrolledCourses || [];
            const studentCourses = student?.enrolledCourses || [];
            
            // Use a Map or Set to ensure uniqueness by ID
            const courseMap = new Map();
            [...userCourses, ...studentCourses].forEach((c: any) => {
                if (c?._id) courseMap.set(c._id.toString(), c);
            });

            return Array.from(courseMap.values());
        }, 60);
    } catch (error: any) {
        if (error.message === "NOT_FOUND") {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
