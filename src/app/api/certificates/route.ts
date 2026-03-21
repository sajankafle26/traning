import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Certificate from "@/models/Certificate";
import { auth } from "@/auth";
import User from "@/models/User";

export async function GET(req: Request) {
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

        const isAdmin = user.role === 'admin';

        let query = {};
        if (!isAdmin) {
            query = { user: user._id };
        }

        const certificates = await Certificate.find(query).sort({ issueDate: -1 });
        return NextResponse.json(certificates);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
