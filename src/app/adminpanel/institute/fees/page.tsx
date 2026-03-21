"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
    FaMoneyBillWave, FaPlus, FaEdit, FaTrash, FaTimes, FaSearch,
    FaCheckCircle, FaPrint, FaFileInvoice, FaUser, FaSpinner
} from "react-icons/fa";

const FEE_TYPES = ["Tuition", "Exam", "Library", "Transport", "Hostel", "Other"];
const STATUSES = ["Paid", "Unpaid", "Partial"];
const PAYMENT_METHODS = ["Cash", "eSewa", "Khalti", "Bank Transfer", "Cheque"];
const emptyForm = { student: "", studentObj: null as any, amount: "", feeType: "Tuition", status: "Unpaid", dueDate: "", paidDate: "", month: "", remarks: "" };

/* ───────── Invoice Component ───────── */
const FeeInvoice = ({ fee, onClose }: { fee: any; onClose: () => void }) => {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const handlePrint = () => {
        const content = invoiceRef.current?.innerHTML || "";
        const win = window.open("", "_blank", "width=800,height=600");
        if (!win) return;
        win.document.write(`
            <!DOCTYPE html><html><head><title>Fee Invoice</title>
            <style>
                * { margin:0; padding:0; box-sizing:border-box; }
                body { font-family: 'Segoe UI', Arial, sans-serif; background:#fff; color:#1a1a2e; padding:40px; }
                .invoice-wrap { max-width:680px; margin:0 auto; }
                .header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:3px solid #4f46e5; padding-bottom:24px; margin-bottom:24px; }
                .institute-name { font-size:22px; font-weight:900; color:#4f46e5; letter-spacing:-0.5px; }
                .invoice-label { font-size:28px; font-weight:900; color:#1a1a2e; text-align:right; }
                .invoice-number { font-size:12px; color:#64748b; font-weight:700; text-align:right; margin-top:4px; }
                .section { margin-bottom:20px; }
                .section-title { font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:2px; color:#64748b; margin-bottom:8px; }
                .info-card { background:#f8fafc; border-radius:12px; padding:16px; }
                .info-row { display:flex; gap:12px; margin-bottom:8px; }
                .info-label { font-size:11px; color:#64748b; font-weight:700; min-width:100px; }
                .info-value { font-size:12px; color:#1a1a2e; font-weight:700; }
                table { width:100%; border-collapse:collapse; border-radius:12px; overflow:hidden; margin-bottom:20px; }
                thead { background:#4f46e5; }
                th { padding:12px 16px; text-align:left; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:1.5px; color:white; }
                td { padding:14px 16px; font-size:13px; border-bottom:1px solid #e2e8f0; }
                .total-row { background:#f8fafc; }
                .total-row td { font-weight:900; font-size:15px; color:#4f46e5; border-bottom:none; }
                .status-badge { display:inline-block; padding:4px 12px; border-radius:20px; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:1px; }
                .status-paid { background:#dcfce7; color:#166534; }
                .status-unpaid { background:#fee2e2; color:#991b1b; }
                .status-partial { background:#fef9c3; color:#854d0e; }
                .footer { text-align:center; padding-top:20px; border-top:2px dashed #e2e8f0; color:#94a3b8; font-size:11px; font-weight:700; }
                @media print { body { padding:20px; } }
            </style></head>
            <body><div class="invoice-wrap">${content}</div></body></html>
        `);
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 300);
    };

    const student = fee.student;
    const invoiceNo = `INV-${fee._id?.slice(-8).toUpperCase() || "00000000"}`;
    const statusClass = fee.status === "Paid" ? "status-paid" : fee.status === "Partial" ? "status-partial" : "status-unpaid";

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Action Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-[2rem] z-10">
                    <h2 className="text-lg font-black text-slate-900 flex items-center gap-2"><FaFileInvoice className="text-indigo-600" /> Fee Invoice</h2>
                    <div className="flex gap-2">
                        <button onClick={handlePrint} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-black text-sm transition-all"><FaPrint /> Print</button>
                        <button onClick={onClose} className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"><FaTimes /></button>
                    </div>
                </div>

                {/* Printable Content */}
                <div ref={invoiceRef} className="p-8">
                    {/* Header */}
                    <div className="header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "3px solid #4f46e5", paddingBottom: "24px", marginBottom: "24px" }}>
                        <div>
                            <div className="institute-name" style={{ fontSize: "22px", fontWeight: 900, color: "#4f46e5" }}>Institute Management</div>
                            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Official Fee Receipt</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div className="invoice-label" style={{ fontSize: "28px", fontWeight: 900, color: "#1a1a2e" }}>INVOICE</div>
                            <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 700 }}>{invoiceNo}</div>
                            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                                {new Date(fee.createdAt || Date.now()).toLocaleDateString("en-NP", { year: "numeric", month: "long", day: "numeric" })}
                            </div>
                        </div>
                    </div>

                    {/* Student Info */}
                    <div className="section" style={{ marginBottom: "20px" }}>
                        <div style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "2px", color: "#64748b", marginBottom: "8px" }}>Billed To</div>
                        <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "16px" }}>
                            <div style={{ display: "flex", gap: "12px", marginBottom: "6px" }}>
                                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, minWidth: "100px" }}>Student Name</span>
                                <span style={{ fontSize: "12px", color: "#1a1a2e", fontWeight: 700 }}>{student?.name || "—"}</span>
                            </div>
                            <div style={{ display: "flex", gap: "12px", marginBottom: "6px" }}>
                                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, minWidth: "100px" }}>Roll No</span>
                                <span style={{ fontSize: "12px", color: "#1a1a2e", fontWeight: 700 }}>{student?.rollNo || "—"}</span>
                            </div>
                            <div style={{ display: "flex", gap: "12px", marginBottom: "6px" }}>
                                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, minWidth: "100px" }}>Email</span>
                                <span style={{ fontSize: "12px", color: "#1a1a2e", fontWeight: 700 }}>{student?.email || "—"}</span>
                            </div>
                            {student?.phone && (
                                <div style={{ display: "flex", gap: "12px" }}>
                                    <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700, minWidth: "100px" }}>Phone</span>
                                    <span style={{ fontSize: "12px", color: "#1a1a2e", fontWeight: 700 }}>{student.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Fee Table */}
                    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                        <thead>
                            <tr style={{ background: "#4f46e5" }}>
                                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1.5px", color: "white" }}>Description</th>
                                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1.5px", color: "white" }}>Month</th>
                                <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1.5px", color: "white" }}>Due Date</th>
                                <th style={{ padding: "12px 16px", textAlign: "right", fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1.5px", color: "white" }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: "14px 16px", fontSize: "13px", borderBottom: "1px solid #e2e8f0" }}>{fee.feeType} Fee</td>
                                <td style={{ padding: "14px 16px", fontSize: "13px", borderBottom: "1px solid #e2e8f0" }}>{fee.month || "—"}</td>
                                <td style={{ padding: "14px 16px", fontSize: "13px", borderBottom: "1px solid #e2e8f0" }}>{fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : "—"}</td>
                                <td style={{ padding: "14px 16px", fontSize: "13px", borderBottom: "1px solid #e2e8f0", textAlign: "right", fontWeight: 700 }}>Rs. {fee.amount?.toLocaleString()}</td>
                            </tr>
                            <tr style={{ background: "#f8fafc" }}>
                                <td colSpan={3} style={{ padding: "14px 16px", fontWeight: 900, fontSize: "15px", color: "#4f46e5" }}>Total</td>
                                <td style={{ padding: "14px 16px", fontWeight: 900, fontSize: "15px", color: "#4f46e5", textAlign: "right" }}>Rs. {fee.amount?.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Status + Payment Info */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
                        <div>
                            <div style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "2px", color: "#64748b", marginBottom: "6px" }}>Payment Status</div>
                            <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", background: fee.status === "Paid" ? "#dcfce7" : fee.status === "Partial" ? "#fef9c3" : "#fee2e2", color: fee.status === "Paid" ? "#166534" : fee.status === "Partial" ? "#854d0e" : "#991b1b" }}>{fee.status}</span>
                        </div>
                        {fee.paidDate && (
                            <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "10px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "2px", color: "#64748b", marginBottom: "6px" }}>Paid On</div>
                                <div style={{ fontSize: "13px", fontWeight: 700, color: "#166534" }}>{new Date(fee.paidDate).toLocaleDateString()}</div>
                            </div>
                        )}
                    </div>

                    {fee.remarks && (
                        <div style={{ background: "#fffbeb", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", fontSize: "12px", color: "#92400e", fontWeight: 600 }}>
                            <strong>Note:</strong> {fee.remarks}
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{ textAlign: "center", paddingTop: "20px", borderTop: "2px dashed #e2e8f0", color: "#94a3b8", fontSize: "11px", fontWeight: 700 }}>
                        This is a computer-generated invoice. No signature required. • Thank you!
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ───────── Payment Modal ───────── */
const PaymentInitiateModal = ({ fee, onClose, onSuccess }: { fee: any; onClose: () => void; onSuccess: () => void }) => {
    const [method, setMethod] = useState("Cash");
    const [paidDate, setPaidDate] = useState(new Date().toISOString().split("T")[0]);
    const [remarks, setRemarks] = useState("");
    const [saving, setSaving] = useState(false);

    const handleConfirm = async () => {
        setSaving(true);
        try {
            await axios.put(`/api/institute/fees/${fee._id}`, {
                status: "Paid",
                paidDate: new Date(paidDate).toISOString(),
                remarks: remarks || `Paid via ${method}`,
            });
            onSuccess();
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    const methodConfig: Record<string, { bg: string; icon: string; label: string }> = {
        Cash: { bg: "bg-emerald-600", icon: "💵", label: "Cash Payment" },
        eSewa: { bg: "bg-[#60bb46]", icon: "e", label: "eSewa" },
        Khalti: { bg: "bg-[#5c2d91]", icon: "K", label: "Khalti" },
        "Bank Transfer": { bg: "bg-blue-600", icon: "🏦", label: "Bank Transfer" },
        Cheque: { bg: "bg-amber-600", icon: "📄", label: "Cheque" },
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-md">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black text-white">Initiate Payment</h2>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"><FaTimes /></button>
                    </div>

                    {/* Fee Summary */}
                    <div className="bg-slate-800/60 rounded-2xl p-5 mb-6 border border-slate-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl font-black">
                                {(fee.student?.name || "S")[0]}
                            </div>
                            <div>
                                <p className="text-white font-black">{fee.student?.name || "Unknown"}</p>
                                <p className="text-slate-400 text-xs">{fee.student?.rollNo || fee.student?.email}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-slate-700 pt-4">
                            <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{fee.feeType} Fee {fee.month ? `· ${fee.month}` : ""}</p>
                            </div>
                            <p className="text-2xl font-black text-emerald-400">Rs. {fee.amount?.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-3">Payment Method</label>
                        <div className="grid grid-cols-3 gap-2">
                            {PAYMENT_METHODS.map(m => (
                                <button key={m} type="button" onClick={() => setMethod(m)}
                                    className={`py-3 px-2 rounded-xl text-[11px] font-black transition-all text-center ${method === m ? "bg-indigo-600 text-white ring-2 ring-indigo-500/50" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Paid Date */}
                    <div className="mb-5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Payment Date</label>
                        <input type="date" value={paidDate} onChange={e => setPaidDate(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                    </div>

                    {/* Remarks */}
                    <div className="mb-6">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Remarks (optional)</label>
                        <input type="text" placeholder="e.g. Receipt No. 12345" value={remarks} onChange={e => setRemarks(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                    </div>

                    <div className="flex gap-3">
                        <button onClick={onClose} className="flex-1 py-3.5 rounded-xl border border-slate-700 text-slate-400 font-black text-sm hover:bg-slate-800 transition-all">Cancel</button>
                        <button onClick={handleConfirm} disabled={saving}
                            className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                            {saving ? <><FaSpinner className="animate-spin" /> Processing...</> : <><FaCheckCircle /> Confirm Paid</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ───────── Main FeesPage ───────── */
const FeesPage = () => {
    const [fees, setFees] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [filterStatus, setFilterStatus] = useState("All");
    const [search, setSearch] = useState("");
    // Payment
    const [paymentFee, setPaymentFee] = useState<any | null>(null);
    // Invoice
    const [invoiceFee, setInvoiceFee] = useState<any | null>(null);
    // Student search in form
    const [studentQuery, setStudentQuery] = useState("");
    const [studentDropdown, setStudentDropdown] = useState(false);
    const [groups, setGroups] = useState<any[]>([]);
    const [filterGroup, setFilterGroup] = useState("All");

    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [feeRes, stuRes, grpRes] = await Promise.all([
                axios.get("/api/institute/fees"),
                axios.get("/api/institute/students"),
                axios.get("/api/institute/groups"),
            ]);
            setFees(feeRes.data);
            setStudents(stuRes.data);
            setGroups(grpRes.data);
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        try {
            const payload = { ...form, amount: Number(form.amount), studentObj: undefined };
            if (editId) await axios.put(`/api/institute/fees/${editId}`, payload);
            else await axios.post("/api/institute/fees", payload);
            setShowForm(false); setForm(emptyForm); setStudentQuery(""); setEditId(null); fetchAll();
        } catch (e) { console.error(e); } finally { setSaving(false); }
    };

    const handleEdit = (f: any) => {
        setForm({
            student: f.student?._id || f.student || "",
            studentObj: f.student || null,
            amount: f.amount?.toString() || "",
            feeType: f.feeType || "Tuition",
            status: f.status || "Unpaid",
            dueDate: f.dueDate ? f.dueDate.split("T")[0] : "",
            paidDate: f.paidDate ? f.paidDate.split("T")[0] : "",
            month: f.month || "",
            remarks: f.remarks || "",
        });
        setStudentQuery(f.student?.name || "");
        setEditId(f._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this fee record?")) return;
        await axios.delete(`/api/institute/fees/${id}`); fetchAll();
    };

    const openPayment = (f: any) => setPaymentFee(f);
    const openInvoice = (f: any) => setInvoiceFee(f);

    const filteredFees = fees.filter(f => {
        const matchStatus = filterStatus === "All" || f.status === filterStatus;
        const matchGrp = filterGroup === "All" || (f.student?.group?._id === filterGroup || f.student?.group === filterGroup);
        const name = f.student?.name || "";
        const matchSearch = name.toLowerCase().includes(search.toLowerCase())
            || (f.student?.rollNo || "").includes(search)
            || (f.feeType || "").toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch && matchGrp;
    });

    const totalPaid = fees.filter(f => f.status === "Paid").reduce((s, f) => s + (f.amount || 0), 0);
    const totalUnpaid = fees.filter(f => f.status === "Unpaid").reduce((s, f) => s + (f.amount || 0), 0);
    const statusColor = (s: string) =>
        s === "Paid" ? "text-green-400 bg-green-500/10 border-green-500/20"
            : s === "Partial" ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                : "text-rose-400 bg-rose-500/10 border-rose-500/20";

    // Filtered students for dropdown
    const matchedStudents = students.filter(s =>
        !studentQuery
            ? true
            : s.name?.toLowerCase().includes(studentQuery.toLowerCase())
            || s.rollNo?.toLowerCase().includes(studentQuery.toLowerCase())
            || s.email?.toLowerCase().includes(studentQuery.toLowerCase())
    ).slice(0, 8);

    const selectStudent = (s: any) => {
        setForm(p => ({ ...p, student: s._id, studentObj: s }));
        setStudentQuery(s.name);
        setStudentDropdown(false);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Fee Management</h1>
                    <p className="text-slate-400 text-sm mt-1">{fees.length} fee records</p>
                </div>
                <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); setStudentQuery(""); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg">
                    <FaPlus /> Add Fee Record
                </button>
            </div>

            {/* Summary */}
            <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <FaMoneyBillWave className="text-2xl text-emerald-400" />
                    <div><p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/70">Collected</p><p className="text-xl font-black text-emerald-400">Rs. {totalPaid.toLocaleString()}</p></div>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <FaMoneyBillWave className="text-2xl text-rose-400" />
                    <div><p className="text-[10px] font-black uppercase tracking-widest text-rose-400/70">Pending</p><p className="text-xl font-black text-rose-400">Rs. {totalUnpaid.toLocaleString()}</p></div>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <FaMoneyBillWave className="text-2xl text-indigo-400" />
                    <div><p className="text-[10px] font-black uppercase tracking-widest text-indigo-400/70">Total</p><p className="text-xl font-black text-indigo-400">Rs. {(totalPaid + totalUnpaid).toLocaleString()}</p></div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="text" placeholder="Search by student name, roll no or fee type..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="flex bg-slate-900/40 border border-slate-800 rounded-xl p-1">
                    {["All", ...STATUSES].map(s => (
                        <button key={s} onClick={() => setFilterStatus(s)}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${filterStatus === s ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}>{s}</button>
                    ))}
                </div>
                <div className="flex bg-slate-900/40 border border-slate-800 rounded-xl p-1">
                    <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)}
                        className="bg-transparent text-xs font-black uppercase tracking-widest text-slate-400 focus:outline-none px-4 py-2 cursor-pointer">
                        <option value="All">All Groups</option>
                        {groups.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-slate-900/40 rounded-xl animate-pulse" />)}</div>
            ) : filteredFees.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] py-24 text-center">
                    <FaMoneyBillWave className="text-5xl text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">No fee records found</p>
                </div>
            ) : (
                <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Student</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hidden md:table-cell">Type</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Amount</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hidden lg:table-cell">Due</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredFees.map((f: any) => (
                                <tr key={f._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xs">{(f.student?.name || "S")[0]}</div>
                                            <div>
                                                <p className="text-white font-bold text-sm">{f.student?.name || "Unknown"}</p>
                                                <p className="text-slate-500 text-[10px]">
                                                    {f.student?.rollNo || ""} {f.month ? `· ${f.month}` : ""}
                                                    {f.student?.group?.name && ` • ${f.student.group.name}`}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">{f.feeType}</td>
                                    <td className="px-6 py-4 text-white font-black text-sm">Rs. {f.amount?.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-slate-400 text-xs hidden lg:table-cell">{f.dueDate ? new Date(f.dueDate).toLocaleDateString() : "—"}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${statusColor(f.status)}`}>{f.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {/* Print Invoice */}
                                            <button onClick={() => openInvoice(f)} className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors" title="Print Invoice">
                                                <FaPrint />
                                            </button>
                                            {/* Initiate Payment */}
                                            {f.status !== "Paid" && (
                                                <button onClick={() => openPayment(f)} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Initiate Payment">
                                                    <FaCheckCircle />
                                                </button>
                                            )}
                                            <button onClick={() => handleEdit(f)} className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors"><FaEdit /></button>
                                            <button onClick={() => handleDelete(f._id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-white">{editId ? "Edit Fee Record" : "Add Fee Record"}</h2>
                                <button onClick={() => { setShowForm(false); setEditId(null); setStudentQuery(""); }}
                                    className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Student Search */}
                                <div className="relative">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Student</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Search student by name, roll no or email..."
                                            value={studentQuery}
                                            onChange={e => { setStudentQuery(e.target.value); setStudentDropdown(true); setForm(p => ({ ...p, student: "", studentObj: null })); }}
                                            onFocus={() => setStudentDropdown(true)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-500"
                                        />
                                        {/* Hidden validation trick */}
                                        <input type="text" required readOnly value={form.student} className="sr-only" tabIndex={-1} />
                                    </div>
                                    {/* Dropdown */}
                                    {studentDropdown && studentQuery && (
                                        <div className="absolute left-0 right-0 top-full mt-1 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-10 max-h-52 overflow-y-auto">
                                            {matchedStudents.length === 0 ? (
                                                <div className="px-4 py-3 text-slate-500 text-sm font-bold">No students found</div>
                                            ) : matchedStudents.map(s => (
                                                <button key={s._id} type="button" onMouseDown={() => selectStudent(s)}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-left">
                                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-black flex-shrink-0">{s.name?.[0]}</div>
                                                    <div>
                                                        <p className="text-white text-sm font-bold">{s.name}</p>
                                                        <p className="text-slate-400 text-[10px]">{s.rollNo ? `Roll: ${s.rollNo} · ` : ""}{s.email}</p>
                                                    </div>
                                                    <span className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-full ${s.status === "Active" ? "text-green-400 bg-green-500/10" : "text-slate-400 bg-slate-700"}`}>{s.status}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {/* Selected student pill */}
                                    {form.studentObj && (
                                        <div className="mt-2 flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-3 py-2">
                                            <FaCheckCircle className="text-indigo-400 text-xs" />
                                            <span className="text-indigo-300 text-xs font-bold">{form.studentObj.name}</span>
                                            {form.studentObj.rollNo && <span className="text-slate-500 text-[10px]">· Roll {form.studentObj.rollNo}</span>}
                                            <button type="button" onClick={() => { setForm(p => ({ ...p, student: "", studentObj: null })); setStudentQuery(""); }}
                                                className="ml-auto text-slate-500 hover:text-rose-400"><FaTimes className="text-xs" /></button>
                                        </div>
                                    )}
                                    {form.student && !studentDropdown && (
                                        <p
                                            onClick={() => setStudentDropdown(true)}
                                            className="mt-1 text-[10px] text-slate-500 cursor-pointer hover:text-slate-300"
                                        >
                                            Click to change student
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Amount (NPR)</label>
                                        <input type="number" required value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Fee Type</label>
                                        <select value={form.feeType} onChange={e => setForm(p => ({ ...p, feeType: e.target.value }))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                            {FEE_TYPES.map(t => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Status</label>
                                        <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                            {STATUSES.map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Month</label>
                                        <input type="text" placeholder="e.g. January 2024" value={form.month} onChange={e => setForm(p => ({ ...p, month: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Due Date</label>
                                        <input type="date" value={form.dueDate} onChange={e => setForm(p => ({ ...p, dueDate: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Paid Date</label>
                                        <input type="date" value={form.paidDate} onChange={e => setForm(p => ({ ...p, paidDate: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Remarks</label>
                                    <input type="text" value={form.remarks} onChange={e => setForm(p => ({ ...p, remarks: e.target.value }))}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => { setShowForm(false); setEditId(null); setStudentQuery(""); }}
                                        className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-black text-sm hover:bg-slate-800 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving || !form.student}
                                        className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-sm hover:bg-indigo-500 transition-all disabled:opacity-60">
                                        {saving ? "Saving..." : editId ? "Save Changes" : "Add Record"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {paymentFee && (
                <PaymentInitiateModal
                    fee={paymentFee}
                    onClose={() => setPaymentFee(null)}
                    onSuccess={() => { setPaymentFee(null); fetchAll(); }}
                />
            )}

            {/* Invoice Modal */}
            {invoiceFee && (
                <FeeInvoice
                    fee={invoiceFee}
                    onClose={() => setInvoiceFee(null)}
                />
            )}
        </div>
    );
};

export default FeesPage;
