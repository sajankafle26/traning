"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaFileInvoiceDollar, FaCircleCheck, FaClock, FaCalendar, FaDownload, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { generateInvoicePDF } from "@/utils/invoiceGenerator";

const OrdersPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("/api/user/orders");
                setOrders(res.data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [status, router]);

    if (loading) return (
        <div className="min-h-screen bg-[#020617] p-8 pt-32 space-y-8 animate-pulse">
            <div className="h-20 bg-slate-900/50 rounded-3xl" />
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 bg-slate-900/50 rounded-3xl" />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <Link href="/student-dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors no-underline">
                            <FaArrowLeft /> Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Purchase History</h1>
                    </div>
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-10 hover:border-slate-700 transition-all shadow-xl">
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    <div className="space-y-6 flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center text-xl">
                                                <FaFileInvoiceDollar />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Order ID: {order.transactionId || order._id.substring(0, 10)}</p>
                                                <h3 className="text-xl font-black text-white">{order.courseTitle || (order.items && order.items.length > 0 ? order.items[0].courseTitle : "Course Purchase")}</h3>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Date</p>
                                                <p className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                                    <FaCalendar className="text-indigo-500" /> {new Date(order.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Amount</p>
                                                <p className="text-sm font-bold text-slate-300">Rs. {order.amount.toLocaleString()}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Method</p>
                                                <p className="text-sm font-bold text-slate-300 uppercase tracking-tighter">{order.paymentMethod}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Status</p>
                                                <p className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg inline-flex items-center gap-1.5 ${
                                                    order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                }`}>
                                                    <FaCircleCheck className="text-[8px] animate-pulse" /> {order.status}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex md:flex-col justify-end gap-3">
                                        {order.status === 'completed' ? (
                                            <Link 
                                                href={`/student-dashboard?courseId=${order.courseId || (order.items && order.items[0]?.courseId)}`} 
                                                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/40 no-underline"
                                            >
                                                <FaCircleCheck /> Watch Now
                                            </Link>
                                        ) : (
                                            <div className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-slate-800 text-slate-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed border border-slate-700">
                                                <FaClock /> Awaiting Approval
                                            </div>
                                        )}
                                        <button 
                                            onClick={() => generateInvoicePDF(order, session?.user?.name || "Student")}
                                            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 no-underline"
                                        >
                                            <FaDownload /> Invoice
                                        </button>
                                    </div>
                                </div>
                                {order.items && order.items.length > 1 && (
                                    <div className="mt-8 pt-6 border-t border-slate-800">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Items In this Order</p>
                                        <div className="space-y-3">
                                            {order.items.map((item: any, idx: number) => (
                                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                                                    <span className="text-xs font-bold text-slate-300">{item.courseTitle}</span>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-xs font-bold text-indigo-400">Rs. {item.price.toLocaleString()}</span>
                                                        <Link href={`/student-dashboard?courseId=${item.courseId}`} className="text-[8px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 no-underline hover:bg-emerald-500/20 transition-all">Watch</Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center space-y-8 bg-slate-900/30 rounded-[4rem] border border-dashed border-slate-800">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-4xl text-slate-600">
                            <FaFileInvoiceDollar />
                        </div>
                        <div className="space-y-2">
                             <h3 className="text-2xl font-black text-white">No purchases found</h3>
                             <p className="text-slate-500 font-medium">You haven't purchased any professional courses yet.</p>
                        </div>
                        <Link href="/video-marketplace" className="inline-flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 no-underline">
                           Browse Marketplace <FaArrowRight />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
