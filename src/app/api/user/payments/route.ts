import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { auth } from "@/auth";
import { cachedApiGet, buildCacheKey } from "@/lib/cache";

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const email = (session.user as any).email || (session.user as any).id || "unknown";

        return cachedApiGet(buildCacheKey("api", "user", email, "payments"), async () => {
            await dbConnect();
            return await Order.find({ user: (session.user as any).id }).sort({ createdAt: -1 });
        }, 60);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
