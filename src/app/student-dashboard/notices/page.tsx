"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBullhorn, FaCircle, FaCalendarAlt, FaChevronRight } from "react-icons/fa";

const StudentNoticesPage = () => {
    const [notices, setNotices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState<any>(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await axios.get("/api/institute/notices");
                // In a real app, we'd filter by department too, but here we show all relevant
                const studentNotices = res.data.filter((n: any) => n.targetAudience === "All" || n.targetAudience === "Students");
                setNotices(studentNotices);
                if (studentNotices.length > 0) setSelectedNotice(studentNotices[0]);
            } catch (e) { console.error(e); } finally { setLoading(false); }
        };
        fetchNotices();
    }, []);

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-2xl font-black text-white">Notice Board</h1>
                <p className="text-slate-400 text-sm mt-1">Official announcements and important updates from the institute</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 min-h-[600px]">
                {/* Notice List */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                    {loading ? (
                        [...Array(5)].map((_, i) => <div key={i} className="h-24 bg-slate-900/40 rounded-2xl animate-pulse" />)
                    ) : notices.map((notice) => (
                        <button
                            key={notice._id}
                            onClick={() => setSelectedNotice(notice)}
                            className={`w-full text-left p-6 rounded-[2rem] border transition-all flex items-start gap-4 no-underline group ${
                                selectedNotice?._id === notice._id
                                    ? "bg-indigo-600 text-white border-indigo-500 shadow-xl shadow-indigo-900/40"
                                    : "bg-slate-900/40 text-slate-300 border-slate-800 hover:border-slate-700"
                            }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                selectedNotice?._id === notice._id ? "bg-white/20 text-white" : "bg-indigo-500/10 text-indigo-400"
                            }`}>
                                <FaBullhorn />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${selectedNotice?._id === notice._id ? "text-indigo-200" : "text-indigo-500"}`}>
                                        {notice.category}
                                    </span>
                                    <span className={`text-[9px] font-bold ${selectedNotice?._id === notice._id ? "text-indigo-200" : "text-slate-600"}`}>
                                        {new Date(notice.date).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className={`font-black text-sm line-clamp-1 ${selectedNotice?._id === notice._id ? "text-white" : "text-white"}`}>{notice.title}</h3>
                                <p className={`text-[11px] mt-1 line-clamp-1 ${selectedNotice?._id === notice._id ? "text-indigo-100/70" : "text-slate-500"}`}>
                                    {notice.content}
                                </p>
                            </div>
                            <FaChevronRight className={`text-xs mt-2 transition-transform group-hover:translate-x-1 ${selectedNotice?._id === notice._id ? "text-white" : "text-slate-700"}`} />
                        </button>
                    ))}
                </div>

                {/* Notice Detail */}
                <div className="lg:col-span-12 xl:col-span-7">
                    {selectedNotice ? (
                        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 sticky top-24">
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <span className="px-4 py-1.5 bg-indigo-600/20 text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
                                    {selectedNotice.category}
                                </span>
                                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <FaCalendarAlt className="text-indigo-500" />
                                    {new Date(selectedNotice.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest ml-auto">
                                    <FaCircle className="text-[6px] animate-pulse" /> Verified Notice
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-white leading-tight mb-8 tracking-tight">{selectedNotice.title}</h2>
                            
                            <div className="prose prose-invert max-w-none">
                                <p className="text-slate-400 text-lg leading-relaxed whitespace-pre-wrap">
                                    {selectedNotice.content}
                                </p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Posted By</p>
                                    <p className="text-white font-bold mt-1">Institute Administration</p>
                                </div>
                                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                                    Report Issue
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full bg-slate-900/40 border border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center">
                            <FaBullhorn className="text-6xl text-slate-800 mb-6" />
                            <h3 className="text-white font-black text-xl mb-2">Select a notice</h3>
                            <p className="text-slate-500 max-w-xs">Click on any notice from the list to read the full details and attachments.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentNoticesPage;
