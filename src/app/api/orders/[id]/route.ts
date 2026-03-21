import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import User from "@/models/User";
import { auth } from "@/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const order = await Order.findById(id);
        if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });
        return NextResponse.json(order);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        
        await dbConnect();
        
        const oldOrder = await Order.findById(id);
        if (!oldOrder) return NextResponse.json({ message: "Order not found" }, { status: 404 });

        const updatedOrder = await Order.findByIdAndUpdate(id, body, { new: true });
        if (!updatedOrder) return NextResponse.json({ message: "Order not found" }, { status: 404 });

        // If status changed to completed, enroll the user in the courses
        if (body.status === 'completed' && oldOrder.status !== 'completed') {
            const userId = updatedOrder.user;
            const courseIds = updatedOrder.items.map((item: any) => item.courseId);
            
            if (courseIds.length > 0) {
                await User.findByIdAndUpdate(userId, {
                    $addToSet: { enrolledCourses: { $each: courseIds } }
                });
                console.log(`Admin approved order ${id}: User ${userId} enrolled in ${courseIds.length} courses.`);
            }
        }

        return NextResponse.json(updatedOrder);
    } catch (error: any) {
        console.error("Order Update Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;
        await dbConnect();
        await Order.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
