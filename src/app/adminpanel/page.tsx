"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
    FaDollarSign, FaShoppingCart, FaUsers, FaHourglassHalf,
    FaArrowUp, FaChartLine, FaVideo,
    FaGraduationCap, FaTicketAlt, FaSchool,
    FaCircle, FaUserGraduate
} from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated" || (session?.user as any)?.role !== "admin") {
            router.push("/studentlogin");
        }
    }, [status, session]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("/api/admin/stats");
                setStats(res.data);
            } catch {
                setError("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: "Total Revenue", value: `Rs. ${stats?.totalEarnings?.toLocaleString() || "0"}`, icon: FaDollarSign, color: "bg-blue-500", change: "+12.5%", up: true },
        { label: "Total Sales", value: stats?.totalSales || 0, icon: FaShoppingCart, color: "bg-emerald-500", change: "+8.2%", up: true },
        { label: "Active Students", value: stats?.totalStudents || 0, icon: FaUsers, color: "bg-violet-500", change: "+24", up: true },
        { label: "Pending Orders", value: stats?.pendingOrders || 0, icon: FaHourglassHalf, color: "bg-orange-500", change: "-3", up: false },
        { label: "Video Courses", value: stats?.totalVideoCourses || 0, icon: FaVideo, color: "bg-amber-500", change: "+2", up: true },
    ];

    const quickActions = [
        { label: "Add Course", href: "/adminpanel/video-courses", icon: FaVideo, color: "bg-blue-50 text-blue-600 border-blue-100" },
        { label: "Orders", href: "/adminpanel/orders", icon: FaFileInvoiceDollar, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
        { label: "Enrollments", href: "/adminpanel/enrollments", icon: FaGraduationCap, color: "bg-violet-50 text-violet-600 border-violet-100" },
        { label: "Add Student", href: "/adminpanel/institute/students", icon: FaUserGraduate, color: "bg-rose-50 text-rose-600 border-rose-100" },
        { label: "Services", href: "/adminpanel/services", icon: FaGraduationCap, color: "bg-amber-50 text-amber-600 border-amber-100" },
        { label: "Institute", href: "/adminpanel/institute", icon: FaSchool, color: "bg-purple-50 text-purple-600 border-purple-100" },
    ];

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-[#00548B]/20 border-t-[#00548B] rounded-full animate-spin" />
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-8">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-[#00548B] rounded-2xl p-8 shadow-lg shadow-[#00548B]/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl" />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Welcome back</p>
                        <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
                        <p className="text-white/50 text-sm mt-1">
                            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-white text-xs font-bold">System Online</span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-bold">
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center text-white`}>
                                <card.icon />
                            </div>
                            <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${card.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                                {card.up ? <FaArrowUp className="text-[8px]" /> : <FaArrowUp className="text-[8px] rotate-180" />} {card.change}
                            </span>
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{card.label}</p>
                        <p className="text-xl font-black text-slate-900">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {quickActions.map((a, i) => (
                    <Link key={i} href={a.href}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${a.color} font-bold text-sm hover:shadow-md transition-all no-underline`}>
                        <a.icon className="text-lg" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{a.label}</span>
                    </Link>
                ))}
            </div>

            {/* Recent Purchases */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#00548B]/10 text-[#00548B] flex items-center justify-center">
                            <FaChartLine />
                        </div>
                        <div>
                            <h2 className="text-slate-900 font-bold text-sm">Recent Purchases</h2>
                            <p className="text-slate-400 text-[10px]">Latest transactions</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Live</span>
                    </div>
                </div>

                {stats?.recentPurchases?.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                        {stats.recentPurchases.map((order: any) => (
                            <div key={order._id} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors">
                                <div className="w-9 h-9 rounded-xl bg-[#00548B]/10 text-[#00548B] flex items-center justify-center font-bold text-sm">
                                    {order.user?.name?.[0] || "U"}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-900 font-bold text-sm truncate">{order.user?.name || "Unknown"}</p>
                                    <p className="text-slate-400 text-[10px] truncate">{order.courseTitle || "Video Course"}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-emerald-600 font-bold text-sm">Rs. {order.amount?.toLocaleString()}</p>
                                    <p className="text-slate-400 text-[10px]">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-16 text-center">
                        <FaShoppingCart className="text-3xl text-slate-200 mx-auto mb-3" />
                        <p className="text-slate-400 font-bold text-sm">No recent sales</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
