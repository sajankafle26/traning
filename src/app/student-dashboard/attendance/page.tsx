"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AttendancePage = () => {
    const [attendance, setAttendance] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profRes, attRes] = await Promise.all([
                    axios.get("/api/student/profile"),
                    axios.get("/api/institute/attendance")
                ]);
                const myAttendance = attRes.data.filter((a: any) => a.student?._id === profRes.data._id);
                setAttendance(myAttendance);
            } catch (e) { console.error(e); } finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const startDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

    const renderCalendar = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth);
        const startDay = startDayOfMonth(currentMonth);
        
        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 border border-slate-800/20 opacity-20" />);
        }

        // Days of current month
        for (let d = 1; d <= totalDays; d++) {
            const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d).toISOString().split('T')[0];
            const record = attendance.find(a => a.date.split('T')[0] === dateStr);
            
            days.push(
                <div key={d} className="h-24 md:h-32 border border-slate-800/40 p-2 md:p-3 relative group hover:bg-white/[0.02] transition-colors">
                    <span className="text-slate-600 font-black text-xs md:text-sm">{d}</span>
                    {record && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 md:gap-2 pointer-events-none">
                            {record.status === "Present" && <FaCheckCircle className="text-emerald-500 text-lg md:text-2xl" />}
                            {record.status === "Absent" && <FaTimesCircle className="text-rose-500 text-lg md:text-2xl" />}
                            {record.status === "Late" && <FaClock className="text-amber-500 text-lg md:text-2xl" />}
                            <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${
                                record.status === "Present" ? "text-emerald-400" : record.status === "Absent" ? "text-rose-400" : "text-amber-400"
                            }`}>{record.status}</span>
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };

    const stats = {
        total: attendance.length,
        present: attendance.filter(a => a.status === "Present").length,
        absent: attendance.filter(a => a.status === "Absent").length,
        late: attendance.filter(a => a.status === "Late").length,
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Attendance Calendar</h1>
                    <p className="text-slate-400 text-sm mt-1">Track your daily presence and punctuality</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Present</p>
                        <p className="text-xl font-black text-white">{stats.present}</p>
                    </div>
                    <div className="px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Absent</p>
                        <p className="text-xl font-black text-white">{stats.absent}</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-800 bg-white/5">
                    <h2 className="text-lg font-black text-white flex items-center gap-3">
                        <FaCalendarAlt className="text-indigo-500" />
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={prevMonth} className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"><FaChevronLeft /></button>
                        <button onClick={nextMonth} className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"><FaChevronRight /></button>
                    </div>
                </div>

                <div className="grid grid-cols-7 bg-slate-800/20">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="py-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">{d}</div>
                    ))}
                </div>

                <div className="grid grid-cols-7">
                    {loading ? (
                        [...Array(31)].map((_, i) => <div key={i} className="h-24 md:h-32 border border-slate-800/10 animate-pulse bg-slate-800/5" />)
                    ) : renderCalendar()}
                </div>
            </div>
            
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4 text-sm font-bold text-slate-400">
                <FaClock className="text-indigo-400 text-xl" />
                <p>Consistent attendance is key to your academic success. Aim for at least 90% attendance to maximize your learning and maintain enrollment eligibility.</p>
            </div>
        </div>
    );
};

export default AttendancePage;
