import { materialHandlers } from "@/lib/apiHandlers";
import dbConnect from "@/lib/dbConnect";
import Material from "@/models/Material";
import { NextResponse } from "next/server";
import { cachedApiGet, buildCacheKey } from "@/lib/cache";

export const GET = async () => {
    try {
        return cachedApiGet(buildCacheKey("api", "institute", "materials", "list"), async () => {
            await dbConnect();
            return await Material.find({}).populate('department').populate('teacher').sort({ createdAt: -1 });
        }, 120);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = materialHandlers.POST;
