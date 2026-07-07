import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import FeeRecord from "@/models/FeeRecord";
import InstituteStudent from "@/models/InstituteStudent";
import { sendFeeReceipt } from "@/lib/mail";
import { auth } from "@/auth";
import { cachedApiGet, buildCacheKey, invalidateModelCache } from "@/lib/cache";

export const GET = async () => {
    try {
        return cachedApiGet(buildCacheKey("api", "institute", "fees", "list"), async () => {
            await dbConnect();
            return await FeeRecord.find({}).populate("student").sort({ createdAt: -1 });
        }, 120);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        await dbConnect();
        const data = await FeeRecord.create(body);
        const populated = await FeeRecord.findById(data._id).populate("student");
        
        // If created as Paid, send email
        if (body.status === "Paid" && populated.student?.email) {
            try {
                await sendFeeReceipt(populated.student.email, populated.student.name, body.amount, body.feeType);
            } catch (err) {
                console.error("Failed to send fee email:", err);
            }
        }
        
        invalidateModelCache("fees");
        return NextResponse.json(populated, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
