"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyBillWave, FaArrowUp, FaArrowDown, FaPlus, FaWallet, FaDownload, FaCalendarDay, FaCalendarAlt, FaCalendar, FaTimes, FaChartLine } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const EXPENSE_CATEGORIES = ["Salary", "Rent", "Utility", "Marketing", "Maintenance", "Other"];
const emptyExpense = { title: "", amount: "", category: "Other", date: new Date().toISOString().split("T")[0], remarks: "" };

const FinanceDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [expenseForm, setExpenseForm] = useState(emptyExpense);
    const [saving, setSaving] = useState(false);
    const [filterPeriod, setFilterPeriod] = useState("All");

    useEffect(() => { fetchStats(); }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/finance/stats");
            setStats(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.post("/api/finance/expenses", {
                ...expenseForm,
                amount: Number(expenseForm.amount)
            });
            setShowExpenseModal(false);
            setExpenseForm(emptyExpense);
            fetchStats();
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    const generatePDF = () => {
        if (!stats) return;
        
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(22);
        doc.setTextColor(79, 70, 229); // Indigo 600
        doc.text("Institute Financial Report", 14, 22);
        
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
        if (filterPeriod !== "All") {
            doc.text(`Filter: ${filterPeriod}`, 14, 36);
        }

        // Summary Statistics
        let currentY = 50;
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text("Summary", 14, currentY);
        currentY += 10;
        
        autoTable(doc, {
            startY: currentY,
            head: [['Metric', 'Amount (Rs.)']],
            body: [
                ['Total Income', stats.totalIncome.toLocaleString()],
                ['Total Expense', stats.totalExpense.toLocaleString()],
                ['Net Profit', stats.netProfit.toLocaleString()]
            ],
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] }
        });

        currentY = (doc as any).lastAutoTable.finalY + 15;

        // Transactions
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text("Recent Transactions", 14, currentY);
        currentY += 10;

        const tableData = filteredTransactions.map((t: any) => [
            new Date(t.date || t.createdAt || t.paidDate).toLocaleDateString(),
            t.type,
            t.title || t.courseTitle || `${t.feeType} Fee`,
            t.source,
            t.type === 'Income' ? `+Rs. ${t.amount.toLocaleString()}` : `-Rs. ${t.amount.toLocaleString()}`
        ]);

        autoTable(doc, {
            startY: currentY,
            head: [['Date', 'Type', 'Description', 'Source/Category', 'Amount']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [40, 40, 40] },
            didParseCell: function(data) {
                if (data.section === 'body' && data.column.index === 4) {
                    if (data.cell.raw && typeof data.cell.raw === 'string' && data.cell.raw.startsWith('+')) {
                        data.cell.styles.textColor = [16, 185, 129]; // Emerald
                    } else if (data.cell.raw && typeof data.cell.raw === 'string' && data.cell.raw.startsWith('-')) {
                        data.cell.styles.textColor = [244, 63, 94]; // Rose
                    }
                }
            }
        });

        doc.save(`Financial_Report_${new Date().getTime()}.pdf`);
    };

    const filterOptions = ["All", "Today", "This Month", "This Year"];

    // Basic filtering logic for transactions based on selected period
    const getFilteredTransactions = () => {
        if (!stats?.recentTransactions) return [];
        const now = new Date();
        return stats.recentTransactions.filter((t: any) => {
            if (filterPeriod === "All") return true;
            const tDate = new Date(t.date || t.createdAt || t.paidDate);
            if (filterPeriod === "Today") {
                return tDate.toDateString() === now.toDateString();
            } else if (filterPeriod === "This Month") {
                return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
            } else if (filterPeriod === "This Year") {
                return tDate.getFullYear() === now.getFullYear();
            }
            return true;
        });
    };

    const filteredTransactions = getFilteredTransactions();

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Financial Overview</h1>
                    <p className="text-slate-400 text-sm mt-1">Track your institute's income, expenses, and overall profitability</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={generatePDF} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg border border-slate-700">
                        <FaDownload /> Export PDF
                    </button>
                    <button onClick={() => setShowExpenseModal(true)} className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg shadow-rose-900/40">
                        <FaPlus /> Add Expense
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="space-y-8 animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-slate-900/40 rounded-[2rem]" />)}
                    </div>
                    <div className="h-96 bg-slate-900/40 rounded-[2rem]" />
                </div>
            ) : (
                <>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 flex items-center gap-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                <FaArrowUp />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Income</p>
                                <p className="text-3xl font-black text-white">Rs. {stats.totalIncome.toLocaleString()}</p>
                            </div>
                        </div>
                        
                        <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 flex items-center gap-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors" />
                            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                <FaArrowDown />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Expenses</p>
                                <p className="text-3xl font-black text-white">Rs. {stats.totalExpense.toLocaleString()}</p>
                            </div>
                        </div>
                        
                        <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 flex items-center gap-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                <FaWallet />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Net Profit</p>
                                <p className={`text-3xl font-black ${stats.netProfit >= 0 ? "text-white" : "text-rose-400"}`}>
                                    Rs. {stats.netProfit.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Transactions List */}
                        <div className="lg:col-span-8 space-y-4 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-lg"><FaChartLine /></div>
                                    <h2 className="text-white font-black text-xl">Recent Transactions</h2>
                                </div>
                                <select 
                                    value={filterPeriod} 
                                    onChange={(e) => setFilterPeriod(e.target.value)}
                                    className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-xs font-bold focus:outline-none focus:border-indigo-500"
                                >
                                    {filterOptions.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                            </div>

                            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                {filteredTransactions.length > 0 ? (
                                    filteredTransactions.map((t: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl hover:border-slate-700 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                                                    t.type === 'Income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                                                }`}>
                                                    {t.type === 'Income' ? <FaArrowUp /> : <FaArrowDown />}
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-bold text-sm">
                                                        {t.title || t.courseTitle || `${t.feeType} Fee`}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{t.source}</span>
                                                        <span className="text-slate-600 text-[10px] font-bold">
                                                            {new Date(t.date || t.createdAt || t.paidDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-black text-base ${t.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                    {t.type === 'Income' ? '+' : '-'} Rs. {t.amount.toLocaleString()}
                                                </p>
                                                {t.paymentMethod && (
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{t.paymentMethod}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
                                        <FaMoneyBillWave className="text-4xl text-slate-700 mx-auto mb-4" />
                                        <p className="text-slate-500 font-bold">No transactions found for this period</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Summary side panel or perhaps daily breakdown chart placeholder */}
                        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-indigo-950/20 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-3xl mb-6 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                                <FaCalendarAlt />
                            </div>
                            <h3 className="text-white font-black text-xl mb-2">Detailed Reports</h3>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Download a comprehensive PDF report containing all statements, aggregations, and individual transactions for accounting purposes.</p>
                            <button onClick={generatePDF} className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-900/40">
                                <FaDownload /> Generate Report
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Add Expense Modal */}
            {showExpenseModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-white">Record Expense</h2>
                                <button onClick={() => setShowExpenseModal(false)} className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                                    <FaTimes />
                                </button>
                            </div>
                            <form onSubmit={handleAddExpense} className="space-y-5">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Title / Description</label>
                                    <input 
                                        type="text" required placeholder="e.g., Office Rent, Server Cost" 
                                        value={expenseForm.title} onChange={e => setExpenseForm(p => ({ ...p, title: e.target.value }))} 
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500" 
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Amount (Rs.)</label>
                                        <input 
                                            type="number" required min="1" 
                                            value={expenseForm.amount} onChange={e => setExpenseForm(p => ({ ...p, amount: e.target.value }))} 
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Date</label>
                                        <input 
                                            type="date" required 
                                            value={expenseForm.date} onChange={e => setExpenseForm(p => ({ ...p, date: e.target.value }))} 
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500 style-date-picker" 
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Category</label>
                                    <select 
                                        value={expenseForm.category} onChange={e => setExpenseForm(p => ({ ...p, category: e.target.value }))} 
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500"
                                    >
                                        {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Remarks (Optional)</label>
                                    <textarea 
                                        rows={2} value={expenseForm.remarks} onChange={e => setExpenseForm(p => ({ ...p, remarks: e.target.value }))} 
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-rose-500 resize-none" 
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => setShowExpenseModal(false)} className="flex-1 py-3.5 rounded-xl border border-slate-700 text-slate-400 font-black text-sm hover:bg-slate-800 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3.5 rounded-xl bg-rose-600 text-white font-black text-sm hover:bg-rose-500 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                                        {saving ? "Saving..." : <><FaPlus /> Record Expense</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
                .style-date-picker::-webkit-calendar-picker-indicator {
                    filter: invert(1);
                    opacity: 0.5;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default FinanceDashboard;
