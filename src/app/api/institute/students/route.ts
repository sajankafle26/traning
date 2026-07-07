import { createHandler } from "@/lib/apiHandlers";
import InstituteStudent from "@/models/InstituteStudent";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { cachedApiGet, buildCacheKey } from "@/lib/cache";

const handlers = createHandler(InstituteStudent);

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        return cachedApiGet(buildCacheKey("api", "institute", "students", searchParams.toString() || "all"), async () => {
            await dbConnect();
            const query: any = {};
            searchParams.forEach((value, key) => { query[key] = value; });
            return await InstituteStudent.find(query).populate('group').lean();
        }, 120);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = handlers.POST;
