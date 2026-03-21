"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlay, FaCheckCircle, FaLock, FaTrophy, FaArrowLeft, FaQuestionCircle, FaPlus, FaRegCommentDots } from "react-icons/fa";
import CertificateTemplate from "./CertificateTemplate";

const VideoCoursePlayer = ({ course, onBack }: { course: any, onBack: () => void }) => {
    const [currentLesson, setCurrentLesson] = useState(course.lessons?.[0] || null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFullyCompleted, setIsFullyCompleted] = useState(false);
    const [certificate, setCertificate] = useState<any>(null);
    const [showCert, setShowCert] = useState(false);
    const [activeTab, setActiveTab] = useState<"lessons" | "support">("lessons");
    const [tickets, setTickets] = useState<any[]>([]);
    const [showNewTicketForm, setShowNewTicketForm] = useState(false);
    const [newTicketSubject, setNewTicketSubject] = useState("");
    const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

    useEffect(() => {
        fetchProgress();
    }, [course._id]);

    const fetchProgress = async () => {
        try {
            const res = await axios.get(`/api/courses/progress?courseId=${course._id}`);
            setCompletedLessons(res.data.lessonIds || []);
            checkCompletion(res.data.lessonIds || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`/api/tickets?courseId=${course._id}`);
            setTickets(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (activeTab === "support") {
            fetchTickets();
        }
    }, [activeTab, course._id]);

    const handleCreateTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTicketSubject.trim()) return;

        setIsSubmittingTicket(true);
        try {
            await axios.post("/api/tickets", {
                subject: newTicketSubject,
                courseId: course._id,
                priority: "Medium"
            });
            setNewTicketSubject("");
            setShowNewTicketForm(false);
            fetchTickets();
        } catch (err) {
            console.error(err);
            alert("Failed to create ticket.");
        } finally {
            setIsSubmittingTicket(false);
        }
    };

    const checkCompletion = (completed: string[]) => {
        if (course.lessons && completed.length >= course.lessons.length) {
            setIsFullyCompleted(true);
            fetchCertificate();
        }
    };

    const fetchCertificate = async () => {
        try {
            const res = await axios.post("/api/certificates/generate", { courseId: course._id });
            setCertificate(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const markAsCompleted = async (lessonId: string) => {
        try {
            const res = await axios.post("/api/courses/progress", {
                courseId: course._id,
                lessonId
            });
            const newCompleted = [...completedLessons];
            if (!newCompleted.includes(lessonId)) {
                newCompleted.push(lessonId);
                setCompletedLessons(newCompleted);
            }
            if (res.data.isFullyCompleted) {
                setIsFullyCompleted(true);
                fetchCertificate();
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#0a1118] text-white flex items-center justify-center">Loading Player...</div>;

    if (showCert && certificate) {
        return (
            <div className="min-h-screen bg-slate-900 p-10 pt-32">
                <button onClick={() => setShowCert(false)} className="mb-8 text-indigo-400 font-bold flex items-center gap-2">
                    <FaArrowLeft /> Back to Course
                </button>
                <CertificateTemplate cert={certificate} />
                <div className="mt-12 text-center">
                    <button
                        onClick={() => window.print()}
                        className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition shadow-2xl"
                    >
                        Print / Save as PDF
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col pt-20">
            {/* Header / Navigation */}
            <header className="h-20 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-6 lg:px-12 fixed top-0 w-full z-10">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={onBack}
                        className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all active:scale-95 group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-0.5">Currently Learning</p>
                        <h1 className="text-white font-black text-lg lg:text-xl tracking-tight leading-none">{course.title}</h1>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Overall Progress</div>
                        <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-indigo-500 transition-all duration-1000 shadow-[0_0_10px_#6366f1]"
                                style={{ width: `${(completedLessons.length / (course.lessons?.length || 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                    {isFullyCompleted && certificate && (
                        <button
                            onClick={() => setShowCert(true)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-xl shadow-emerald-900/20"
                        >
                            <FaTrophy /> Get Certificate
                        </button>
                    )}
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                {/* Main Player Area */}
                <div className="flex-1 bg-black flex flex-col overflow-y-auto custom-scrollbar">
                    <div className="aspect-video w-full bg-slate-950 shadow-2xl relative">
                        {currentLesson ? (
                            <iframe
                                src={currentLesson.videoUrl}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                <FaPlay className="text-6xl text-slate-800 animate-pulse" />
                                <p className="text-slate-500 font-black uppercase tracking-widest">Select a lesson to begin</p>
                            </div>
                        )}
                    </div>

                    <div className="p-8 lg:p-12 space-y-8 max-w-5xl mx-auto w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="space-y-3">
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">{currentLesson?.title || "Welcome to the Course"}</h2>
                                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
                                    <span className="flex items-center gap-1.5"><FaCheckCircle className={completedLessons.includes(currentLesson?._id) ? "text-emerald-500" : "text-slate-700"} /> Module {course.lessons?.indexOf(currentLesson) + 1}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                    <span>{currentLesson?.duration || "Intro"} Total Time</span>
                                </div>
                            </div>
                            {currentLesson && !completedLessons.includes(currentLesson._id) && (
                                <button
                                    onClick={() => markAsCompleted(currentLesson._id)}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-indigo-900/40 active:scale-95 whitespace-nowrap"
                                >
                                    Mark as Completed
                                </button>
                            )}
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <p className="text-xl text-slate-400 font-medium leading-relaxed">
                                {currentLesson?.description || "In this lesson, we'll dive deep into the core concepts and architectural patterns that define professional engineering workflows."}
                            </p>
                        </div>

                        <div className="pt-8 border-t border-slate-800">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] space-y-4">
                                    <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-3">
                                        <FaQuestionCircle className="text-indigo-500" /> Lesson Support
                                    </h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                        Stuck on a concept? Post a ticket in the support tab and our mentors will respond within 24 hours.
                                    </p>
                                    <button 
                                        onClick={() => setActiveTab("support")}
                                        className="text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                                    >
                                        Go to Support Tab →
                                    </button>
                                </div>
                                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] space-y-4">
                                    <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-3">
                                        <FaTrophy className="text-emerald-500" /> Course Certification
                                    </h3>
                                    <p className="text-slate-500 text-xs font-medium leading-relaxed">
                                        Complete all lessons to unlock your blockchain-verified professional certificate of completion.
                                    </p>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                        {completedLessons.length} / {course.lessons?.length || 0} COMPLETED
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <div className="lg:w-96 bg-slate-900/50 backdrop-blur-3xl border-l border-slate-800 flex flex-col h-full">
                    <div className="flex p-2 bg-slate-950/50 border-b border-slate-800">
                        <button
                            onClick={() => setActiveTab("lessons")}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeTab === "lessons" ? "text-white bg-indigo-600 shadow-xl shadow-indigo-900/20" : "text-slate-500 hover:text-slate-300"}`}
                        >
                            Lessons
                        </button>
                        <button
                            onClick={() => setActiveTab("support")}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${activeTab === "support" ? "text-white bg-indigo-600 shadow-xl shadow-indigo-900/20" : "text-slate-500 hover:text-slate-300"}`}
                        >
                            Support
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto no-scrollbar custom-scrollbar">
                    {activeTab === "lessons" ? (
                        <div className="p-6 space-y-3">
                            {course.lessons?.map((lesson: any, index: number) => {
                                const isCompleted = completedLessons.includes(lesson._id);
                                const isActive = currentLesson?._id === lesson._id;

                                return (
                                    <button
                                        key={lesson._id}
                                        onClick={() => setCurrentLesson(lesson)}
                                        className={`w-full group flex items-start gap-4 p-5 rounded-3xl transition-all text-left relative overflow-hidden ${
                                            isActive 
                                            ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-900/40" 
                                            : "hover:bg-white/5 border border-transparent"
                                        }`}
                                    >
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                                        )}
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                                            isActive 
                                            ? "bg-white/20 text-white" 
                                            : isCompleted 
                                                ? "bg-emerald-500/10 text-emerald-400" 
                                                : "bg-slate-800 text-slate-500 group-hover:bg-slate-700"
                                        }`}>
                                            {isCompleted && !isActive ? <FaCheckCircle className="text-sm" /> : <span className="text-[10px] font-black">{index + 1}</span>}
                                        </div>
                                        <div className="flex-1 pr-2">
                                            <p className={`font-black text-xs leading-tight mb-1 transition-colors ${isActive ? "text-white" : "text-slate-300 group-hover:text-indigo-400"}`}>
                                                {lesson.title}
                                            </p>
                                            <p className={`text-[9px] font-black uppercase tracking-widest ${isActive ? "text-indigo-200" : "text-slate-600"}`}>
                                                {lesson.duration || "5:00"}
                                            </p>
                                        </div>
                                        {isActive && (
                                            <div className="mt-1">
                                                <FaPlay className="text-[8px] animate-pulse" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                                <p className="text-xs text-slate-400 font-bold">Have an issue or question?</p>
                                <button
                                    onClick={() => setShowNewTicketForm(true)}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                                >
                                    <FaPlus /> New Ticket
                                </button>
                            </div>

                            {showNewTicketForm && (
                                <form onSubmit={handleCreateTicket} className="bg-white/5 p-6 rounded-3xl border border-indigo-500/20 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Subject / Question</label>
                                        <input
                                            autoFocus
                                            required
                                            type="text"
                                            placeholder="e.g., Error on line 45, or clarify React use effect..."
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-indigo-500"
                                            value={newTicketSubject}
                                            onChange={(e) => setNewTicketSubject(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            type="submit"
                                            disabled={isSubmittingTicket}
                                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                                        >
                                            {isSubmittingTicket ? "Creating..." : "Submit Ticket"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowNewTicketForm(false)}
                                            className="px-4 py-3 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="space-y-3">
                                {tickets.length === 0 ? (
                                    <div className="py-10 text-center">
                                        <FaQuestionCircle className="text-slate-800 text-4xl mx-auto mb-4" />
                                        <p className="text-slate-500 text-xs font-bold">No support tickets for this course yet.</p>
                                    </div>
                                ) : (
                                    tickets.map((ticket) => (
                                        <div
                                            key={ticket._id}
                                            className="p-4 bg-slate-800/30 border border-slate-800 rounded-2xl flex items-start gap-4 hover:border-slate-700 transition-colors cursor-pointer group"
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${ticket.status === 'Resolved' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                                                }`}>
                                                <FaRegCommentDots />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-white text-sm font-bold leading-tight mb-1 group-hover:text-indigo-400 transition-colors">{ticket.subject}</p>
                                                <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-black">
                                                    <span className={ticket.status === 'Resolved' ? 'text-green-500' : 'text-orange-500'}>{ticket.status}</span>
                                                    <span className="text-slate-600">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default VideoCoursePlayer;
