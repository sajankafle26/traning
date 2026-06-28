"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
    FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaDoorOpen,
    FaClipboardCheck, FaBullhorn, FaMoneyBillWave, FaUserCheck
} from "react-icons/fa";

const InstituteAdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/institute/stats").then(res => {
            setStats(res.data);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    const statCards = [
        { label: "Total Students", value: stats?.totalStudents ?? "—", icon: FaUserGraduate, color: "text-indigo-600", bg: "bg-indigo-50", href: "/adminpanel/institute/students" },
        { label: "Active Students", value: stats?.activeStudents ?? "—", icon: FaUserCheck, color: "text-green-700", bg: "bg-green-50", href: "/adminpanel/institute/students" },
        { label: "Total Teachers", value: stats?.totalTeachers ?? "—", icon: FaChalkboardTeacher, color: "text-blue-700", bg: "bg-blue-50", href: "/adminpanel/institute/teachers" },
        { label: "Fee Collected", value: stats ? `Rs. ${stats.feeCollected?.toLocaleString()}` : "—", icon: FaMoneyBillWave, color: "text-emerald-700", bg: "bg-emerald-50", href: "/adminpanel/institute/fees" },
        { label: "Pending Fees", value: stats?.pendingFees ?? "—", icon: FaMoneyBillWave, color: "text-rose-700", bg: "bg-rose-50", href: "/adminpanel/institute/fees" },
        { label: "Notices", value: stats?.totalNotices ?? "—", icon: FaBullhorn, color: "text-orange-700", bg: "bg-orange-50", href: "/adminpanel/institute/notices" },
    ];

    const quickLinks = [
        { label: "Manage Students", href: "/adminpanel/institute/students", icon: FaUserGraduate, desc: "Add, edit, view student records" },
        { label: "Manage Teachers", href: "/adminpanel/institute/teachers", icon: FaChalkboardTeacher, desc: "Faculty & staff management" },
        { label: "Attendance", href: "/adminpanel/institute/attendance", icon: FaClipboardCheck, desc: "Track daily attendance" },
        { label: "Notice Board", href: "/adminpanel/institute/notices", icon: FaBullhorn, desc: "Post announcements" },
        { label: "Fee Management", href: "/adminpanel/institute/fees", icon: FaMoneyBillWave, desc: "Track & manage fee records" },
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Institute Management</h1>
                <p className="text-slate-500 text-sm mt-1">Complete overview of your institute operations</p>
            </div>

            {/* Stats Grid */}
            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-slate-100 border border-slate-200 rounded-2xl p-6 animate-pulse h-28" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {statCards.map((card, i) => (
                        <Link key={i} href={card.href} className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-4 group hover:border-slate-300 transition-all no-underline">
                            <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                <card.icon />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500">{card.label}</p>
                                <p className="text-2xl font-black text-slate-900 mt-0.5">{card.value}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Quick Links + Recent Students */}
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Quick Links */}
                <div className="lg:col-span-5 space-y-3">
                    <h2 className="text-sm font-semibold text-slate-500 mb-4">Quick Access</h2>
                    {quickLinks.map((link, i) => (
                        <Link key={i} href={link.href} className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 hover:border-[#00548B]/40 group transition-all no-underline">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                <link.icon />
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold text-sm">{link.label}</p>
                                <p className="text-slate-500 text-xs">{link.desc}</p>
                            </div>
                            <span className="ml-auto text-slate-300 group-hover:text-[#00548B] transition-colors">→</span>
                        </Link>
                    ))}
                </div>

                {/* Recent Students */}
                <div className="lg:col-span-7">
                    <h2 className="text-sm font-semibold text-slate-500 mb-4">Recent Enrollments</h2>
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                        {stats?.recentStudents?.length > 0 ? (
                            <table className="w-full">
                                <thead className="border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Student</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Enrolled</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {stats.recentStudents.map((s: any) => (
                                        <tr key={s._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs uppercase">
                                                        {s.name?.[0] || 'S'}
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-900 font-bold text-sm">{s.name}</p>
                                                        <p className="text-slate-500 text-[10px]">{s.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${s.status === 'Active' ? 'text-green-700 bg-green-50 border-green-200' : 'text-slate-500 bg-slate-50 border-slate-200'}`}>
                                                    {s.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-xs font-bold">
                                                {new Date(s.enrollmentDate || s.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="py-20 text-center">
                                <FaUserGraduate className="text-4xl text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-500 font-bold text-sm">No students enrolled yet</p>
                                <Link href="/adminpanel/institute/students" className="inline-block mt-4 px-6 py-2.5 bg-[#00548B] text-white text-xs font-black rounded-xl no-underline hover:bg-[#004381] transition-colors">
                                    Add First Student
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstituteAdminDashboard;
