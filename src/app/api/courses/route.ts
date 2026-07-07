import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import VideoCourse from "@/models/VideoCourse";
import { auth } from "@/auth";
import { getOrSetCache, setCache, buildCacheKey, getCache } from "@/lib/cache";

const CACHE_TTL = 300; // 5 minutes

export async function GET() {
    try {
        const cacheKey = buildCacheKey("api", "courses", "list");
        const cached = await getCache<any[]>(cacheKey);
        if (cached) return NextResponse.json(cached);

        await dbConnect();
        const courses = await VideoCourse.find({});
        await setCache(cacheKey, courses, CACHE_TTL);
        return NextResponse.json(courses);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        await dbConnect();

        const course = await VideoCourse.create(body);
        // Invalidate courses list cache
        await setCache(buildCacheKey("api", "courses", "list"), null, 1);
        return NextResponse.json(course, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
