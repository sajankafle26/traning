import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Certificate from "@/models/Certificate";
import { auth } from "@/auth";
import User from "@/models/User";
import { cachedApiGet, buildCacheKey } from "@/lib/cache";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        return cachedApiGet(buildCacheKey("api", "certificates", "list"), async () => {
            await dbConnect();
            const user = await User.findOne({ email: session.user.email });
            if (!user) throw new Error("NOT_FOUND");

            const isAdmin = user.role === 'admin';

            let query = {};
            if (!isAdmin) {
                query = { user: user._id };
            }

            return await Certificate.find(query).sort({ issueDate: -1 });
        }, 300);
    } catch (error: any) {
        if (error.message === "NOT_FOUND") {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
