"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaCalendarCheck, FaMoneyBillWave, FaBullhorn, FaBookOpen, FaSignOutAlt, FaUserGraduate, FaFileInvoiceDollar } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const StudentLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/studentlogin");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#080d14] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!session) return null;

    const navItems = [
        { label: "Overview", href: "/student-dashboard", icon: FaTachometerAlt },
        { label: "Attendance", href: "/student-dashboard/attendance", icon: FaCalendarCheck },
        { label: "Fees & Invoices", href: "/student-dashboard/fees", icon: FaMoneyBillWave },
        { label: "My Orders", href: "/student-dashboard/orders", icon: FaFileInvoiceDollar },
        { label: "Notice Board", href: "/student-dashboard/notices", icon: FaBullhorn },
        { label: "Learning Materials", href: "/student-dashboard/materials", icon: FaBookOpen },
    ];

    return (
        <div className="min-h-screen bg-[#080d14] flex">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-[#0d1520]/95 border-r border-slate-800/60 flex flex-col fixed top-0 left-0 h-full z-30 pt-24 backdrop-blur-xl">
                <div className="px-6 pb-6 border-b border-slate-800/60">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <FaUserGraduate className="text-white text-lg" />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm tracking-tight">Student Portal</p>
                            <p className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">My Institute</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all no-underline ${
                                    active
                                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/50"
                                        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                                }`}
                            >
                                <item.icon className={`text-base flex-shrink-0 ${active ? "text-white" : "text-slate-500"}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800/60">
                    <button
                        onClick={async () => {
                            await signOut({ redirect: false });
                            window.location.href = "/studentlogin";
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all group"
                    >
                        <FaSignOutAlt className="text-base group-hover:translate-x-0.5 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 pt-24 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default StudentLayout;
