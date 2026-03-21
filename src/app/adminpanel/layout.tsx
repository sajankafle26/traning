"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaGraduationCap, FaCalendarAlt, FaComments, FaRss, FaTools, FaCode,
    FaBoxOpen, FaVideo, FaBriefcase, FaTicketAlt, FaSignOutAlt, FaCog,
    FaFolderOpen, FaUserGraduate, FaChalkboardTeacher, FaBuilding,
    FaDoorOpen, FaClipboardCheck, FaBullhorn, FaMoneyBillWave, FaSchool,
    FaChevronDown, FaChevronRight, FaHome, FaTachometerAlt, FaUsers
} from "react-icons/fa";
import { signOut } from "next-auth/react";
import { FaFileInvoiceDollar } from "react-icons/fa6";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [instituteExpanded, setInstituteExpanded] = useState(
        pathname?.startsWith("/adminpanel/institute") ?? false
    );

    const navGroups = [
        {
            label: "Overview",
            items: [
                { label: "Dashboard", href: "/adminpanel", icon: FaTachometerAlt },
            ]
        },
        {
            label: "Content",
            items: [
                { label: "Video Courses", href: "/adminpanel/video-courses", icon: FaVideo },
                { label: "Live Trainings", href: "/adminpanel/live-courses", icon: FaGraduationCap },
                { label: "Upcoming Batches", href: "/adminpanel/batches", icon: FaCalendarAlt },
                { label: "Blogs", href: "/adminpanel/blogs", icon: FaRss },
                { label: "Products", href: "/adminpanel/products", icon: FaBoxOpen },
                { label: "Services", href: "/adminpanel/services", icon: FaTools },
                { label: "Tech Stack", href: "/adminpanel/tech-stack", icon: FaCode },
                { label: "Portfolio", href: "/adminpanel/portfolio", icon: FaFolderOpen },
            ]
        },
        {
            label: "Community",
            items: [
                { label: "Testimonials", href: "/adminpanel/testimonials", icon: FaComments },
                { label: "Internships", href: "/adminpanel/internships", icon: FaBriefcase },
            ]
        },
        {
            label: "Management",
            items: [
                { label: "Finance", href: "/adminpanel/finance", icon: FaMoneyBillWave },
                { label: "Orders", href: "/adminpanel/orders", icon: FaFileInvoiceDollar },
                { label: "Enrollments", href: "/adminpanel/enrollments", icon: FaGraduationCap },
                { label: "Coupons", href: "/adminpanel/coupons", icon: FaTicketAlt },
                { label: "Certificates", href: "/adminpanel/certificates", icon: FaGraduationCap },
                { label: "Tickets", href: "/adminpanel/tickets", icon: FaTicketAlt },
            ]
        },
    ];

    const instituteItems = [
        { label: "Dashboard", href: "/adminpanel/institute", icon: FaHome },
        { label: "Students", href: "/adminpanel/institute/students", icon: FaUserGraduate },
        { label: "Teachers", href: "/adminpanel/institute/teachers", icon: FaChalkboardTeacher },
        { label: "Groups", href: "/adminpanel/institute/groups", icon: FaUsers },
        { label: "Attendance", href: "/adminpanel/institute/attendance", icon: FaClipboardCheck },
        { label: "Notices", href: "/adminpanel/institute/notices", icon: FaBullhorn },
        { label: "Fees", href: "/adminpanel/institute/fees", icon: FaMoneyBillWave },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <div className="min-h-screen bg-[#080d14] flex">

            {/* ── Sidebar ── */}
            <aside className="w-64 flex-shrink-0 bg-[#0d1520]/95 border-r border-slate-800/60 flex flex-col fixed top-0 left-0 h-full z-30 hidden md:flex pt-20 backdrop-blur-xl">

                {/* Logo area */}
                <div className="px-5 pb-5 border-b border-slate-800/60">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <FaTachometerAlt className="text-white text-xs" />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm tracking-tight">Admin Panel</p>
                            <p className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">Control Center</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">

                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <p className="px-3 mb-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
                                {group.label}
                            </p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.href + item.label}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all no-underline ${
                                                active
                                                    ? "bg-indigo-600/90 text-white shadow-lg shadow-indigo-900/50"
                                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                                            }`}
                                        >
                                            <item.icon className={`text-base flex-shrink-0 ${active ? "text-white" : "text-slate-500"}`} />
                                            <span className="truncate">{item.label}</span>
                                            {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Institute Section — collapsible */}
                    <div>
                        <button
                            onClick={() => setInstituteExpanded(p => !p)}
                            className="w-full flex items-center gap-2 px-3 mb-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-400 transition-colors"
                        >
                            <FaSchool className="text-indigo-500 text-xs" />
                            <span className="flex-1 text-left">Institute</span>
                            {instituteExpanded
                                ? <FaChevronDown className="text-[8px]" />
                                : <FaChevronRight className="text-[8px]" />
                            }
                        </button>

                        {instituteExpanded && (
                            <div className="space-y-0.5 border-l-2 border-indigo-500/20 ml-4 pl-3">
                                {instituteItems.map((item) => {
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all no-underline ${
                                                active
                                                    ? "bg-indigo-600/90 text-white shadow-lg shadow-indigo-900/50"
                                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                                            }`}
                                        >
                                            <item.icon className={`text-sm flex-shrink-0 ${active ? "text-white" : "text-slate-500"}`} />
                                            <span className="truncate">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Site Settings */}
                    <div>
                        <p className="px-3 mb-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">Settings</p>
                        <div className="space-y-0.5">
                            <Link
                                href="/adminpanel/site-settings"
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all no-underline ${isActive("/adminpanel/site-settings") ? "bg-indigo-600/90 text-white shadow-lg shadow-indigo-900/50" : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"}`}
                            >
                                <FaCog className={`text-base flex-shrink-0 ${isActive("/adminpanel/site-settings") ? "text-white" : "text-slate-500"}`} />
                                <span>Site Settings</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Footer */}
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

            {/* ── Main Content ── */}
            <main className="flex-1 md:ml-64 p-6 md:p-8 pt-24 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
