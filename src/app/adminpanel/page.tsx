"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
    FaDollarSign, FaShoppingCart, FaUsers, FaHourglassHalf,
    FaArrowUp, FaChartLine, FaVideo,
    FaGraduationCap, FaTicketAlt, FaSchool, FaEllipsisV,
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
        {
            label: "Total Revenue", value: `Rs. ${stats?.totalEarnings?.toLocaleString() || "0"}`,
            icon: FaDollarSign, change: "+12.5%", up: true,
            gradient: "from-violet-600 to-indigo-600", glow: "shadow-indigo-500/25",
            bg: "bg-gradient-to-br from-violet-600/10 to-indigo-600/10", border: "border-indigo-500/20",
        },
        {
            label: "Total Sales", value: stats?.totalSales || 0,
            icon: FaShoppingCart, change: "+8.2%", up: true,
            gradient: "from-blue-500 to-cyan-500", glow: "shadow-cyan-500/25",
            bg: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10", border: "border-cyan-500/20",
        },
        {
            label: "Active Students", value: stats?.totalStudents || 0,
            icon: FaUsers, change: "+24", up: true,
            gradient: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/25",
            bg: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10", border: "border-emerald-500/20",
        },
        {
            label: "Pending Orders", value: stats?.pendingOrders || 0,
            icon: FaHourglassHalf, change: "-3", up: false,
            gradient: "from-orange-500 to-rose-500", glow: "shadow-orange-500/25",
            bg: "bg-gradient-to-br from-orange-500/10 to-rose-500/10", border: "border-orange-500/20",
        },
        {
            label: "Video Courses", value: stats?.totalVideoCourses || 0,
            icon: FaVideo, change: "+2", up: true,
            gradient: "from-amber-400 to-orange-500", glow: "shadow-orange-500/25",
            bg: "bg-gradient-to-br from-amber-400/10 to-orange-500/10", border: "border-orange-500/20",
        },
    ];

    const quickActions = [
        { label: "Add Course", href: "/adminpanel/video-courses", icon: FaVideo, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
        { label: "Orders", href: "/adminpanel/orders", icon: FaFileInvoiceDollar, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
        { label: "Enrollments", href: "/adminpanel/enrollments", icon: FaGraduationCap, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
        { label: "Add Student", href: "/adminpanel/institute/students", icon: FaUserGraduate, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
        { label: "Tickets", href: "/adminpanel/tickets", icon: FaTicketAlt, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
        { label: "Institute", href: "/adminpanel/institute", icon: FaSchool, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    ];

    if (status === "loading" || loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">

            {/* Welcome Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-[2rem] p-8 shadow-2xl shadow-indigo-900/40">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl pointer-events-none" />
                <div className="absolute bottom-0 left-24 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 blur-xl pointer-events-none" />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <p className="text-indigo-200 text-xs font-black uppercase tracking-[0.2em] mb-1">Welcome back 👋</p>
                        <h1 className="text-3xl font-black text-white tracking-tight">Admin Dashboard</h1>
                        <p className="text-indigo-200/70 text-sm mt-1">
                            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 rounded-xl">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-white text-xs font-black">System Online</span>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-4 rounded-2xl text-sm font-bold flex items-center gap-3">
                    <FaCircle className="text-[8px] animate-pulse" /> {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {statCards.map((card, i) => (
                    <div key={i} className={`relative overflow-hidden ${card.bg} border ${card.border} rounded-[1.75rem] p-6 group hover:scale-[1.02] transition-all duration-300 shadow-xl ${card.glow}`}>
                        {/* Glow orb */}
                        <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-5">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white text-lg shadow-lg`}>
                                    <card.icon />
                                </div>
                                <span className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${card.up ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
                                    {card.up ? <FaArrowUp className="text-[8px]" /> : <FaArrowUp className="text-[8px] rotate-180" />} {card.change}
                                </span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 mb-1">{card.label}</p>
                            {loading ? (
                                <div className="h-7 w-24 bg-slate-700/50 rounded-lg animate-pulse mt-1" />
                            ) : (
                                <p className="text-2xl font-black text-white tracking-tight">{card.value}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid xl:grid-cols-12 gap-6">

                {/* Recent Purchases — left (8 cols) */}
                <div className="xl:col-span-8 space-y-5">

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {quickActions.map((a, i) => (
                            <Link key={i} href={a.href}
                                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border ${a.color} font-bold text-sm hover:opacity-80 transition-all no-underline group`}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                                    <a.icon />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-widest opacity-80">{a.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Recent Purchases Table */}
                    <div className="bg-slate-900/50 border border-slate-800/80 rounded-[2rem] overflow-hidden">
                        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                                    <FaChartLine />
                                </div>
                                <div>
                                    <h2 className="text-white font-black text-sm">Recent Purchases</h2>
                                    <p className="text-slate-500 text-[10px]">Latest transactions</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Live</span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="p-6 space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 animate-pulse">
                                        <div className="w-10 h-10 rounded-xl bg-slate-700 flex-shrink-0" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 bg-slate-700 rounded w-32" />
                                            <div className="h-2 bg-slate-700 rounded w-20" />
                                        </div>
                                        <div className="h-4 w-16 bg-slate-700 rounded" />
                                    </div>
                                ))}
                            </div>
                        ) : stats?.recentPurchases?.length > 0 ? (
                            <div className="divide-y divide-slate-800/60">
                                {stats.recentPurchases.map((order: any, idx: number) => (
                                    <div key={order._id} className="flex items-center gap-4 px-7 py-4 hover:bg-white/[0.02] transition-colors group">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-500/20">
                                            {order.user?.name?.[0] || "U"}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-bold text-sm truncate">{order.user?.name || "Unknown"}</p>
                                            <p className="text-slate-500 text-[10px] truncate">{order.courseTitle || "Video Course"}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-emerald-400 font-black text-sm">Rs. {order.amount?.toLocaleString()}</p>
                                            <p className="text-slate-600 text-[10px]">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                                            <FaCircle className="text-[6px]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                                    <FaShoppingCart />
                                </div>
                                <p className="text-slate-500 font-bold text-sm">No recent sales</p>
                                <p className="text-slate-600 text-xs mt-1">Sales will appear here as they come in</p>
                            </div>
                        )}

                        <div className="px-7 py-4 border-t border-slate-800">
                            <button className="w-full py-3 bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border border-slate-800 hover:border-slate-700">
                                View All Transactions →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel (4 cols) */}
                <div className="xl:col-span-4 space-y-5">

                    {/* Overview Card */}
                    <div className="bg-slate-900/50 border border-slate-800/80 rounded-[2rem] p-6">
                        <h3 className="text-white font-black text-sm mb-5 flex items-center gap-2">
                            <span className="w-1 h-4 rounded-full bg-indigo-500 inline-block" />
                            Platform Overview
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: "Revenue", value: `Rs. ${stats?.totalEarnings?.toLocaleString() || 0}`, pct: 78, color: "bg-indigo-500" },
                                { label: "Sales", value: stats?.totalSales || 0, pct: 54, color: "bg-violet-500" },
                                { label: "Students", value: stats?.totalStudents || 0, pct: 62, color: "bg-emerald-500" },
                                { label: "Pending", value: stats?.pendingOrders || 0, pct: 20, color: "bg-orange-500" },
                            ].map((item, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                        <span className="text-white font-black text-xs">{loading ? "—" : item.value}</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                                            style={{ width: loading ? "0%" : `${item.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Institute Snapshot */}
                    <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/40 border border-slate-800/80 rounded-[2rem] p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-white font-black text-sm flex items-center gap-2">
                                <span className="w-1 h-4 rounded-full bg-purple-500 inline-block" />
                                Institute
                            </h3>
                            <Link href="/adminpanel/institute" className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 transition-colors no-underline uppercase tracking-widest">
                                View →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Students", val: "—", icon: "🎓", color: "text-indigo-400" },
                                { label: "Teachers", val: "—", icon: "👩‍🏫", color: "text-blue-400" },
                                { label: "Fees Due", val: "—", icon: "💰", color: "text-amber-400" },
                                { label: "Notices", val: "—", icon: "📋", color: "text-emerald-400" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center hover:border-white/10 transition-colors">
                                    <div className="text-2xl mb-1">{item.icon}</div>
                                    <p className={`text-base font-black ${item.color}`}>{item.val}</p>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mt-0.5">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <Link href="/adminpanel/institute" className="mt-4 block w-full text-center py-3 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.15em] border border-indigo-500/20 transition-all no-underline">
                            Manage Institute
                        </Link>
                    </div>

                    {/* System Status */}
                    <div className="bg-slate-900/50 border border-slate-800/80 rounded-[2rem] p-6">
                        <h3 className="text-white font-black text-sm mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 rounded-full bg-emerald-500 inline-block" />
                            System Status
                        </h3>
                        <div className="space-y-3">
                            {[
                                { label: "Database", status: "Operational", ok: true },
                                { label: "Payment Gateway", status: "Operational", ok: true },
                                { label: "File Storage", status: "Operational", ok: true },
                                { label: "Email Service", status: "Idle", ok: null },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-slate-400 text-xs font-bold">{s.label}</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${s.ok === true ? "bg-emerald-400 animate-pulse" : s.ok === false ? "bg-rose-400" : "bg-amber-400"}`} />
                                        <span className={`text-[10px] font-black ${s.ok === true ? "text-emerald-400" : s.ok === false ? "text-rose-400" : "text-amber-400"}`}>{s.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
