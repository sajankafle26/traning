import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/models/Enrollment";
import { auth } from "@/auth";
import { cachedApiGet, buildCacheKey, invalidateModelCache } from "@/lib/cache";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await dbConnect();
        const enrollment = await Enrollment.create(body);
        invalidateModelCache("enrollments");
        return NextResponse.json(enrollment, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        return cachedApiGet(buildCacheKey("api", "enrollments", "list"), async () => {
            await dbConnect();
            return await Enrollment.find({}).sort({ createdAt: -1 });
        }, 120);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
