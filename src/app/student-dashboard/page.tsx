"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarCheck, FaMoneyBillWave, FaBullhorn, FaBookOpen, FaArrowRight, FaCircle, FaCirclePlay, FaCircleCheck, FaXmark, FaFileInvoiceDollar } from "react-icons/fa6";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import VideoCoursePlayer from "@/components/VideoCoursePlayer";

const StudentDashboard = () => {
    const [profile, setProfile] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const isSuccess = searchParams.get("success") === "true";
    const [showSuccess, setShowSuccess] = useState(isSuccess);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const profRes = await axios.get("/api/student/profile");
                setProfile(profRes.data);
                
                // Fetch summary stats, notices, etc.
                const [notices, attendance, fees, enrolledRes] = await Promise.all([
                    axios.get("/api/institute/notices"),
                    axios.get("/api/institute/attendance"),
                    axios.get("/api/institute/fees"),
                    axios.get("/api/user/enrolled-courses")
                ]);
                
                setEnrolledCourses(enrolledRes.data);

                // Filter data for this specific student
                const myAttendance = attendance.data.filter((a: any) => a.student?._id === profRes.data._id);
                const myFees = fees.data.filter((f: any) => f.student?._id === profRes.data._id);
                const deptNotices = notices.data.filter((n: any) => n.targetAudience === "All" || n.targetAudience === "Students");

                const presentCount = myAttendance.filter((a: any) => a.status === "Present").length;
                const attendancePct = myAttendance.length > 0 ? (presentCount / myAttendance.length) * 100 : 0;
                const pendingFees = myFees.reduce((acc: number, f: any) => acc + (f.status !== "Paid" ? f.amount : 0), 0);

                const orderRes = await axios.get("/api/user/orders");
                setRecentOrders(orderRes.data.slice(0, 3)); // Only show top 3

                setStats({
                    attendancePct: attendancePct.toFixed(1),
                    pendingFees,
                    totalMaterials: 0, // Will fetch materials in next step
                    latestNotice: deptNotices[0]
                });
            } catch (err: any) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [status, router]);

    useEffect(() => {
        const cid = searchParams.get("courseId");
        if (cid && enrolledCourses.length > 0) {
            const course = enrolledCourses.find((c: any) => c._id === cid || c.id === cid);
            if (course) {
                setSelectedCourse(course);
                // Clean up the URL
                const newUrl = window.location.pathname;
                window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
            }
        }
    }, [searchParams, enrolledCourses]);

    if (loading) return <div className="space-y-8 animate-pulse">
        <div className="h-32 bg-slate-900/40 rounded-[2rem]" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-slate-900/40 rounded-[2rem]" />)}
        </div>
        <div className="h-64 bg-slate-900/40 rounded-[2rem]" />
    </div>;

    if (error) return <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-8 rounded-[2rem] text-center">
        <h2 className="text-xl font-black mb-2">Oops!</h2>
        <p>{error}</p>
        <p className="text-sm mt-4 opacity-70 text-slate-400">If you are a regular user, please ask the admin to link your email to an institute student record.</p>
    </div>;

    if (selectedCourse) {
        return <VideoCoursePlayer course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
    }

    const cards = [
        { label: "Attendance", value: `${stats.attendancePct}%`, icon: FaCalendarCheck, color: "text-emerald-400", bg: "bg-emerald-500/10", href: "/student-dashboard/attendance", sub: "Present Days" },
        { label: "Pending Fees", value: `Rs. ${stats.pendingFees.toLocaleString()}`, icon: FaMoneyBillWave, color: "text-amber-400", bg: "bg-amber-500/10", href: "/student-dashboard/fees", sub: "Unpaid Balance" },
        { label: "My Purchases", value: "History", icon: FaFileInvoiceDollar, color: "text-blue-400", bg: "bg-blue-500/10", href: "/student-dashboard/orders", sub: "View Invoices" },
        { label: "Learning Materials", value: "Browse", icon: FaBookOpen, color: "text-indigo-400", bg: "bg-indigo-500/10", href: "/student-dashboard/materials", sub: "View PDFs & Videos" },
    ];

    return (
        <div className="space-y-8">
            {showSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-[2rem] flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
                            <FaCircleCheck className="text-xl" />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-sm uppercase tracking-widest">Payment Successful!</h3>
                            <p className="text-emerald-400 text-xs font-bold">Your course has been added to your library. Happy learning!</p>
                        </div>
                    </div>
                    <button onClick={() => setShowSuccess(false)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
                        <FaXmark />
                    </button>
                </div>
            )}

            {/* Profile Header */}
            <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-[3rem] p-10 md:p-12 shadow-2xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-[80px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-indigo-900/40 border-4 border-slate-800 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            {profile.name[0]}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-slate-900 flex items-center justify-center text-white text-[10px]" title="Online">
                            <FaCircle className="animate-pulse" />
                        </div>
                    </div>
                    
                    <div className="text-center md:text-left space-y-2">
                        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">Student Cabinet</p>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-slate-400">{profile.name.split(' ')[0]}</span>.
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-2">
                            <span className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span className="text-indigo-500">ID:</span> {profile.rollNo}
                            </span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span className="text-indigo-500">STATUS:</span> {profile.status}
                            </span>
                        </div>
                    </div>
                    
                    <div className="md:ml-auto text-center md:text-right space-y-4">
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                            <span className="text-white text-[10px] font-black uppercase tracking-widest leading-none">Status: {profile.status}</span>
                        </div>
                        <p className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase opacity-60">
                            Joined {new Date(profile.enrollmentDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <Link key={i} href={card.href} className="group bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 hover:border-slate-700 transition-all no-underline">
                        <div className="flex items-start justify-between mb-6">
                            <div className={`w-14 h-14 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                                <card.icon />
                            </div>
                            <FaArrowRight className="text-slate-700 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{card.label}</p>
                        <p className="text-2xl font-black text-white tracking-tight">{card.value}</p>
                        <p className="text-[10px] font-bold text-slate-600 uppercase mt-2">{card.sub}</p>
                    </Link>
                ))}
            </div>

            {/* Enrolled Video Courses */}
            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl">
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3 text-indigo-500 font-black text-xs uppercase tracking-widest">
                            <FaCirclePlay /> Access your library
                        </div>
                        <h2 className="text-white font-black text-3xl tracking-tight">My Professional Courses</h2>
                    </div>
                    {enrolledCourses.length > 0 && (
                        <Link href="/video-marketplace" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest no-underline hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/40">
                            Marketplace <FaArrowRight />
                        </Link>
                    )}
                </div>

                {enrolledCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrolledCourses.map((course: any) => (
                            <div 
                                key={course._id} 
                                onClick={() => setSelectedCourse(course)}
                                className="group bg-slate-800/30 border border-slate-700/50 rounded-[2.5rem] overflow-hidden cursor-pointer hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all duration-500 flex flex-col h-full shadow-lg"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                                            <FaCirclePlay className="text-indigo-600 text-3xl" />
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 h-8 w-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/50 text-xs">
                                        <FaCirclePlay className="text-3xl" />
                                    </div>
                                </div>
                                <div className="p-8 space-y-3 flex-grow">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Ready to watch
                                    </div>
                                    <h3 className="text-white font-black text-xl leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2">{course.title}</h3>
                                    <div className="pt-4 mt-auto flex items-center justify-between border-t border-slate-700/50">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{course.instructor}</span>
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{course.lessons?.length || 0} Modules</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center border-2 border-dashed border-slate-800 rounded-[2rem] group hover:border-slate-700 transition-colors">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-600 group-hover:text-orange-400 transition-colors">
                            <FaCirclePlay className="text-3xl" />
                        </div>
                        <h3 className="text-white font-bold text-base mb-2">No courses yet</h3>
                        <p className="text-slate-500 text-xs mb-6 max-w-xs mx-auto">Start your learning journey today by exploring our professional video courses library.</p>
                        <Link href="/video-marketplace" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all no-underline shadow-lg shadow-orange-900/20">
                            Visit Marketplace <FaArrowRight />
                        </Link>
                    </div>
                )}
            </div>

            {/* Content Bottom Grid */}
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Latest Notice */}
                <div className="lg:col-span-8">
                    <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 h-full">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center"><FaBullhorn /></div>
                                <h2 className="text-white font-black text-lg">Latest Notice</h2>
                            </div>
                            <Link href="/student-dashboard/notices" className="text-xs font-black text-indigo-400 hover:text-indigo-300 uppercase tracking-widest no-underline">View All →</Link>
                        </div>

                        {stats.latestNotice ? (
                            <div className="bg-white/5 border border-white/5 rounded-3xl p-8 group hover:border-indigo-500/30 transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest">{stats.latestNotice.category}</span>
                                    <span className="text-slate-500 text-[10px] font-bold">{new Date(stats.latestNotice.date).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-xl font-black text-white mb-4">{stats.latestNotice.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">"{stats.latestNotice.content.substring(0, 150)}..."</p>
                                <Link href="/student-dashboard/notices" className="inline-flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest bg-white/5 hover:bg-white/10 px-5 py-3 rounded-xl transition-all no-underline">
                                    Read Full Notice
                                </Link>
                            </div>
                        ) : (
                            <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                                <p className="text-slate-500 font-bold">No recent notices</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Orders Side Section */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/5">
                                    <FaFileInvoiceDollar />
                                </div>
                                <h2 className="text-white font-black text-lg tracking-tight">Recent Orders</h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order: any) => (
                                    <div key={order._id} className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors group/order">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-white font-bold text-xs truncate max-w-[120px] group-hover/order:text-indigo-400 transition-colors">{order.courseTitle || "Course Order"}</h4>
                                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                                                order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                                order.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                                            <span className="flex items-center gap-1"><FaCalendarCheck className="text-[10px]" /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span className="text-white">Rs. {order.amount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center bg-white/5 rounded-2xl border border-dashed border-slate-800">
                                    <p className="text-slate-500 text-xs italic">No transactions found</p>
                                </div>
                            )}
                        </div>
                        
                        <Link href="/student-dashboard/orders" className="w-full mt-6 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest no-underline transition-all shadow-xl shadow-indigo-900/20 active:scale-95">
                            Full Purchase History <FaArrowRight />
                        </Link>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-white font-black text-xl mb-2 italic tracking-tight">Level Up Your Career</h3>
                            <p className="text-indigo-100 text-xs mb-6 font-medium leading-relaxed opacity-80">Access professional certifications and industry-standard projects to boost your portfolio.</p>
                            <Link href="/video-marketplace" className="inline-flex bg-white text-indigo-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest no-underline hover:shadow-2xl transition-all hover:-translate-y-0.5 active:translate-y-0">
                                Visit Course Store
                            </Link>
                        </div>
                        <FaBookOpen className="absolute -right-4 -bottom-4 text-white/10 text-8xl -rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-700" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
