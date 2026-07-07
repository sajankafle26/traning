import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import User from "@/models/User";
import VideoCourse from "@/models/VideoCourse";
import { auth } from "@/auth";
import { cachedApiGet, buildCacheKey } from "@/lib/cache";

export async function GET() {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        return cachedApiGet(buildCacheKey("api", "admin", "stats"), async () => {
            await dbConnect();

            const totalEarningsArr = await Order.aggregate([
                { $match: { status: 'completed' } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);
            const totalEarnings = totalEarningsArr[0]?.total || 0;

            const totalSales = await Order.countDocuments({ status: 'completed' });

            const totalStudents = await User.countDocuments({ role: 'student' });

            const pendingOrders = await Order.countDocuments({ status: 'pending' });

            const totalVideoCourses = await VideoCourse.countDocuments();

            const recentPurchases = await Order.find({ status: 'completed' })
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('user', 'name email');

            const typeStats = await Order.aggregate([
                { $match: { status: 'completed' } },
                { $group: { _id: "$courseType", total: { $sum: "$amount" }, count: { $sum: 1 } } }
            ]);

            return {
                totalEarnings,
                totalSales,
                totalStudents,
                pendingOrders,
                totalVideoCourses,
                recentPurchases,
                typeStats
            };
        }, 60);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
