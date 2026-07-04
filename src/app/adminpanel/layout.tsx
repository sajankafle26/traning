"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaGraduationCap, FaCalendarAlt, FaComments, FaRss, FaTools, FaCode,
    FaBoxOpen, FaVideo, FaBriefcase, FaTicketAlt, FaSignOutAlt, FaCog,
    FaFolderOpen, FaUserGraduate, FaChalkboardTeacher,
    FaClipboardCheck, FaBullhorn, FaMoneyBillWave, FaSchool,
    FaChevronDown, FaChevronRight, FaHome, FaTachometerAlt, FaUsers,
    FaBars, FaTimes, FaFileInvoiceDollar, FaUserTie, FaImages
} from "react-icons/fa";
import { signOut } from "next-auth/react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
                { label: "Team", href: "/adminpanel/team", icon: FaUserTie },
                { label: "Gallery", href: "/adminpanel/gallery", icon: FaImages },
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
                { label: "Students", href: "/adminpanel/students", icon: FaUserGraduate },
                { label: "Finance", href: "/adminpanel/finance", icon: FaMoneyBillWave },
                { label: "Orders", href: "/adminpanel/orders", icon: FaFileInvoiceDollar },
                { label: "Enrollments", href: "/adminpanel/enrollments", icon: FaGraduationCap },
                { label: "Coupons", href: "/adminpanel/coupons", icon: FaTicketAlt },
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

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="px-5 py-5 border-b border-slate-200">
                <Link href="/adminpanel" className="flex items-center gap-3 no-underline">
                    <div className="w-9 h-9 rounded-xl bg-[#00548B] flex items-center justify-center">
                        <FaTachometerAlt className="text-white text-sm" />
                    </div>
                    <div>
                        <p className="text-slate-900 font-black text-sm">Admin Panel</p>
                        <p className="text-slate-400 text-[9px] font-bold tracking-widest uppercase">Sangalo Tech</p>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                {navGroups.map((group) => (
                    <div key={group.label}>
                        <p className="px-3 mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                            {group.label}
                        </p>
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href + item.label}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all no-underline ${
                                            active
                                                ? "bg-[#00548B] text-white shadow-lg shadow-[#00548B]/20"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                    >
                                        <item.icon className={`text-sm flex-shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                                        <span className="truncate">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Institute */}
                <div>
                    <button
                        onClick={() => setInstituteExpanded(p => !p)}
                        className="w-full flex items-center gap-2 px-3 mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#00548B] transition-colors"
                    >
                        <FaSchool className="text-[#00548B] text-xs" />
                        <span className="flex-1 text-left">Institute</span>
                        {instituteExpanded ? <FaChevronDown className="text-[8px]" /> : <FaChevronRight className="text-[8px]" />}
                    </button>

                    {instituteExpanded && (
                        <div className="space-y-0.5 border-l-2 border-[#00548B]/20 ml-4 pl-3">
                            {instituteItems.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all no-underline ${
                                            active
                                                ? "bg-[#00548B] text-white shadow-lg shadow-[#00548B]/20"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                        }`}
                                    >
                                        <item.icon className={`text-sm flex-shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                                        <span className="truncate">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Settings */}
                <div>
                    <p className="px-3 mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">Settings</p>
                    <div className="space-y-0.5">
                        <Link
                            href="/adminpanel/site-settings"
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all no-underline ${
                                isActive("/adminpanel/site-settings")
                                    ? "bg-[#00548B] text-white shadow-lg shadow-[#00548B]/20"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                            <FaCog className={`text-sm flex-shrink-0 ${isActive("/adminpanel/site-settings") ? "text-white" : "text-slate-400"}`} />
                            <span>Site Settings</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200">
                <button
                    onClick={async () => {
                        await signOut({ redirect: false });
                        window.location.href = "/studentlogin";
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all group"
                >
                    <FaSignOutAlt className="text-sm group-hover:translate-x-0.5 transition-transform" />
                    <span>Sign Out</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Desktop Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 flex-col fixed top-0 left-0 h-full z-30 hidden md:flex">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    <aside className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col">
                        <div className="flex justify-end p-4">
                            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                {/* Mobile Header */}
                <div className="md:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="text-slate-600">
                        <FaBars className="text-xl" />
                    </button>
                    <p className="font-black text-slate-900 text-sm">Admin Panel</p>
                </div>

                <main className="p-6 md:p-8 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
