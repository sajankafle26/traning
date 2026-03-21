"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMoneyBillWave, FaDownload, FaPrint, FaCheckCircle, FaExclamationCircle, FaFilter } from "react-icons/fa";

const StudentFeesPage = () => {
    const [fees, setFees] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profRes, feeRes] = await Promise.all([
                    axios.get("/api/student/profile"),
                    axios.get("/api/institute/fees")
                ]);
                const myFees = feeRes.data.filter((f: any) => f.student?._id === profRes.data._id);
                setFees(myFees);
            } catch (e) { console.error(e); } finally { setLoading(false); }
        };
        fetchData();
    }, []);

    const filtered = fees.filter(f => filter === "All" || f.status === filter);

    const handlePrint = (fee: any) => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;
        
        const html = `
            <html>
            <head>
                <title>Fee Invoice - ${fee.student?.name}</title>
                <style>
                    body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #1e293b; }
                    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 40px; }
                    .invoice-title { font-size: 28px; font-weight: 800; color: #4f46e5; text-transform: uppercase; }
                    .meta { display: grid; grid-template-cols: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
                    .section-title { font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase; margin-bottom: 8px; }
                    .content { font-size: 14px; font-weight: 600; }
                    table { width: 100%; border-collapse: collapse; margin: 40px 0; }
                    th { text-align: left; padding: 15px; background: #f8fafc; font-size: 12px; text-transform: uppercase; color: #64748b; }
                    td { padding: 15px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: 600; }
                    .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                    .badge { padding: 4px 10px; rounded: 4px; font-size: 10px; text-transform: uppercase; font-weight: 900; }
                    .paid { background: #dcfce7; color: #15803d; }
                    .unpaid { background: #fee2e2; color: #b91c1c; }
                    @media print { .no-print { display: none; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <div><div class="invoice-title">SANGALO TECH</div><div style="font-size: 10px; color: #64748b;">OFFICIAL FEE RECEIPT</div></div>
                    <div style="text-align: right;"><div class="content">#INV-${fee._id.substring(18)}</div><div class="content">${new Date().toLocaleDateString()}</div></div>
                </div>
                <div class="meta">
                    <div><div class="section-title">Billed To</div><div class="content">${fee.student?.name}</div><div class="content">Roll No: ${fee.student?.rollNo}</div><div class="content">${fee.student?.email}</div></div>
                    <div style="text-align: right;"><div class="section-title">Payment Info</div><div class="content">Type: ${fee.feeType}</div><div class="content">Status: ${fee.status}</div></div>
                </div>
                <table>
                    <thead><tr><th>Description</th><th>Period</th><th style="text-align: right;">Amount</th></tr></thead>
                    <tbody><tr><td>${fee.feeType} Fees</td><td>${fee.month || 'N/A'}</td><td style="text-align: right;">Rs. ${fee.amount.toLocaleString()}</td></tr></tbody>
                    <tfoot><tr><td colspan="2" style="text-align: right; font-weight: 900;">Total Amount</td><td style="text-align: right; font-weight: 900; color: #4f46e5; font-size: 18px;">Rs. ${fee.amount.toLocaleString()}</td></tr></tfoot>
                </table>
                <div class="footer">This is a computer generated document. Signed by Sangalo Tech Admin Management.</div>
                <script>window.onload = () => { window.print(); }</script>
            </body>
            </html>
        `;
        printWindow.document.write(html);
        printWindow.document.close();
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Fees & Invoices</h1>
                    <p className="text-slate-400 text-sm mt-1">Manage your payments and download official receipts</p>
                </div>
                <div className="flex items-center gap-3">
                    <FaFilter className="text-slate-500 text-xs" />
                    <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
                        {["All", "Paid", "Unpaid", "Partial"].map(t => (
                            <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${filter === t ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-300"}`}>{t}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden">
                {loading ? (
                    <div className="p-8 space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-slate-800/40 rounded-2xl animate-pulse" />)}</div>
                ) : filtered.length === 0 ? (
                    <div className="py-24 text-center">
                        <FaMoneyBillWave className="text-5xl text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No fee records found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800/60">
                        {filtered.map((fee: any) => (
                            <div key={fee._id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 group hover:bg-white/[0.02] transition-colors">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0 ${fee.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                    {fee.status === 'Paid' ? <FaCheckCircle /> : <FaExclamationCircle />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-white font-black text-base">{fee.feeType} Fee</h3>
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${fee.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                            {fee.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-slate-500 text-xs font-bold">
                                        <span>Month: {fee.month || 'N/A'}</span>
                                        <span>Due Date: {fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : 'N/A'}</span>
                                        {fee.paidDate && <span>Paid Date: {new Date(fee.paidDate).toLocaleDateString()}</span>}
                                    </div>
                                </div>
                                <div className="text-left md:text-right shrink-0">
                                    <p className="text-xl font-black text-white">Rs. {fee.amount.toLocaleString()}</p>
                                    <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handlePrint(fee)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 transition-all"><FaPrint /> Print Invoice</button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-700 transition-all"><FaDownload /> PDF</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="p-8 bg-gradient-to-br from-indigo-900/20 to-slate-900/40 border border-indigo-500/10 rounded-[2.5rem]">
                <h3 className="text-white font-black text-sm mb-4">Payment Methods</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Payments can be made via eSewa, Khalti, Bank Transfer, or Cash at the counter. For online payments, please use the merchant code provided in the office.</p>
                <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed">
                    <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">eSewa</div>
                    <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">Khalti</div>
                    <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">Bank</div>
                </div>
            </div>
        </div>
    );
};

export default StudentFeesPage;
