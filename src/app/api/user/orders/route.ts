import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { cachedApiGet, buildCacheKey } from "@/lib/cache";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const email = (session.user as any).email || (session.user as any).id || "unknown";

        return cachedApiGet(buildCacheKey("api", "user", email, "orders"), async () => {
            await dbConnect();
            return await Order.find({ user: (session.user as any).id }).sort({ createdAt: -1 });
        }, 60);
    } catch (error) {
        console.error("Fetch Orders Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
