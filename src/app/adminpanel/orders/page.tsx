"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";
import axios from "axios";
import { FaFileInvoiceDollar, FaCircle } from "react-icons/fa6";

const OrdersAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Orders"
            apiPath="/api/orders"
            fields={[
                { name: "courseTitle", label: "Course Title", type: "text" },
                { name: "amount", label: "Amount (Rs.)", type: "number" },
                { name: "paymentMethod", label: "Payment Method", type: "text" },
                { name: "status", label: "Status", type: "select", options: ["pending", "completed", "failed"] },
                { name: "transactionId", label: "Transaction ID", type: "text" },
            ]}
            renderItem={(item, onDelete, onEdit) => {
                const statusColors = {
                    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                    failed: "bg-rose-500/10 text-rose-400 border-rose-500/20",
                };
                const status = (item.status || "pending") as keyof typeof statusColors;

                const handleApprove = async () => {
                    if (!confirm("Is cash payment verified? This will grant the student access to the course.")) return;
                    try {
                        await axios.put(`/api/orders/${item._id}`, { status: "completed" });
                        window.location.reload();
                    } catch (err) {
                        console.error(err);
                        alert("Approval failed.");
                    }
                };

                return (
                    <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl">
                                    <FaFileInvoiceDollar />
                                </div>
                                <div className="">
                                    <h3 className="text-white font-black text-base">{item.courseTitle || "Multi-item Order"}</h3>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()} • {item.paymentMethod}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${statusColors[status]}`}>
                                    <FaCircle className="text-[6px] animate-pulse" /> {status}
                                </div>
                                {status === "pending" && (
                                    <button 
                                        onClick={handleApprove}
                                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all"
                                    >
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                            <div>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1 text-left">Transaction ID</p>
                                <p className="text-white font-mono text-xs">{item.transactionId || "N/A"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1 text-right">Amount</p>
                                <p className="text-xl font-black text-emerald-400">Rs. {item.amount?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                );
            }}
        />
    );
};

export default OrdersAdmin;
