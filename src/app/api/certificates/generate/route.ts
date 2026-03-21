import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import VideoCourse from "@/models/VideoCourse";
import Certificate from "@/models/Certificate";
import { auth } from "@/auth";

export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const { courseId } = await req.json();
        if (!courseId) {
            return NextResponse.json({ message: "Course ID is required" }, { status: 400 });
        }

        // Check if certificate already exists
        const existingCert = await Certificate.findOne({
            user: user._id,
            course: courseId
        });

        if (existingCert) {
            return NextResponse.json(existingCert);
        }

        const course = await VideoCourse.findById(courseId);

        if (!course) {
            return NextResponse.json({ message: "Course not found" }, { status: 404 });
        }

        // Verify completion
        const progress = user.completedLessons.find(
            (p: any) => p.courseId.toString() === courseId
        );

        if (!progress || progress.lessonIds.length < course.lessons.length) {
            return NextResponse.json({
                message: "Course not yet completed",
                completed: progress?.lessonIds?.length || 0,
                total: course.lessons.length
            }, { status: 400 });
        }

        // Generate certificate using Web Crypto API
        const randomArray = new Uint8Array(3);
        crypto.getRandomValues(randomArray);
        const certNumber = `ST-${course.category.toUpperCase()}-${Array.from(randomArray).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()}`;

        const certificate = await Certificate.create({
            user: user._id,
            course: course._id,
            courseTitle: course.title,
            userName: user.name,
            certificateNumber: certNumber,
            issueDate: new Date()
        });

        // Add to user's certificates
        user.certificates.push(certificate._id);
        await user.save();

        return NextResponse.json(certificate, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
