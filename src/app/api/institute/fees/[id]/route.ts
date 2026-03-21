import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import FeeRecord from "@/models/FeeRecord";
import { sendFeeReceipt } from "@/lib/mail";
import { auth } from "@/auth";

export const PUT = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        const body = await req.json();
        await dbConnect();

        // Check original status to avoid duplicate emails
        const original = await FeeRecord.findById(id).populate("student");
        const data = await FeeRecord.findByIdAndUpdate(id, body, { new: true }).populate("student");

        // If status changed to Paid, send email
        if (body.status === "Paid" && original.status !== "Paid" && data.student?.email) {
            try {
                await sendFeeReceipt(data.student.email, data.student.name, data.amount, data.feeType);
            } catch (err) {
                console.error("Failed to send fee update email:", err);
            }
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        await dbConnect();
        await FeeRecord.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};
