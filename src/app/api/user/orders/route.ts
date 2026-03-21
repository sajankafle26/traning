import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        
        // Find orders by user email or ID (assuming session.user has ID or we find by email)
        // Usually session.user.id is available if configured in callbacks
        const orders = await Order.find({ user: (session.user as any).id }).sort({ createdAt: -1 });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Fetch Orders Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
