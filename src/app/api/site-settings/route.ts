import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SiteSetting from "@/models/SiteSetting";
import { auth } from "@/auth";
import { cachedApiGet, buildCacheKey, invalidateModelCache } from "@/lib/cache";

export async function GET() {
    try {
        return cachedApiGet(buildCacheKey("api", "site-settings", "all"), async () => {
            await dbConnect();
            let settings = await SiteSetting.findOne();
            if (!settings) {
                settings = await SiteSetting.create({});
            }
            return settings;
        }, 600);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        await dbConnect();

        const settings = await SiteSetting.findOneAndUpdate({}, data, { upsert: true, new: true });
        invalidateModelCache("site-settings");
        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
