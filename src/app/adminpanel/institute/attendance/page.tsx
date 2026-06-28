"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaClipboardCheck, FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const STATUSES = ["Present", "Absent", "Late"];
const emptyForm = { student: "", date: new Date().toISOString().split("T")[0], status: "Present", remarks: "" };

const AttendancePage = () => {
    const [records, setRecords] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0]);
    const [groups, setGroups] = useState<any[]>([]);
    const [filterGroup, setFilterGroup] = useState("All");

    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [attRes, stuRes, grpRes] = await Promise.all([
                axios.get("/api/institute/attendance"), 
                axios.get("/api/institute/students"),
                axios.get("/api/institute/groups")
            ]);
            setRecords(attRes.data); setStudents(stuRes.data); setGroups(grpRes.data);
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        try {
            if (editId) await axios.put(`/api/institute/attendance/${editId}`, form);
            else await axios.post("/api/institute/attendance", form);
            setShowForm(false); setForm(emptyForm); setEditId(null); fetchAll();
        } catch (e) { console.error(e); } finally { setSaving(false); }
    };

    const handleEdit = (r: any) => {
        setForm({ student: r.student?._id || r.student || "", date: r.date ? r.date.split("T")[0] : "", status: r.status, remarks: r.remarks || "" });
        setEditId(r._id); setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this record?")) return;
        await axios.delete(`/api/institute/attendance/${id}`); fetchAll();
    };

    const filtered = records.filter(r => {
        const matchDate = r.date?.startsWith(filterDate);
        const matchGrp = filterGroup === "All" || (r.student?.group?._id === filterGroup || r.student?.group === filterGroup);
        return matchDate && matchGrp;
    });
    const presentCount = filtered.filter(r => r.status === "Present").length;
    const absentCount = filtered.filter(r => r.status === "Absent").length;
    const lateCount = filtered.filter(r => r.status === "Late").length;

    const statusColor = (s: string) => s === "Present" ? "bg-green-50 text-green-700 border-green-200" : s === "Late" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-rose-50 text-rose-700 border-rose-200";

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">Attendance</h1>
                    <p className="text-slate-500 text-sm mt-1">Track daily student attendance</p>
                </div>
                <button onClick={() => { setShowForm(true); setEditId(null); setForm({ ...emptyForm, date: filterDate }); }}
                    className="flex items-center gap-2 bg-[#00548B] hover:bg-[#004381] text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg">
                    <FaPlus /> Mark Attendance
                </button>
            </div>

            {/* Date Filter + Summary */}
            <div className="grid sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                    <label className="text-xs font-semibold text-slate-500 block mb-2">Filter by Date</label>
                    <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B]" />
                </div>
                <div className="sm:col-span-1 border-r border-slate-200 pr-4">
                    <label className="text-xs font-semibold text-slate-500 block mb-2">Filter by Group</label>
                    <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B]">
                        <option value="All">All Groups</option>
                        {groups.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
                    </select>
                </div>
                {[
                    { label: "Present", val: presentCount, color: "text-green-600 bg-green-50" },
                    { label: "Absent", val: absentCount, color: "text-rose-600 bg-rose-50" },
                    { label: "Late", val: lateCount, color: "text-amber-600 bg-amber-50" },
                ].map(s => (
                    <div key={s.label} className={`${s.color} rounded-2xl p-5 flex items-center gap-3`}>
                        <FaClipboardCheck className="text-2xl opacity-70" />
                        <div><p className="text-xs font-semibold opacity-70">{s.label}</p><p className="text-2xl font-black">{s.val}</p></div>
                    </div>
                ))}
            </div>

            {loading ? (
                <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />)}</div>
            ) : filtered.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl py-24 text-center">
                    <FaClipboardCheck className="text-5xl text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold">No records for this date</p>
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Student</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 hidden md:table-cell">Remarks</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((r: any) => (
                                <tr key={r._id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs uppercase">
                                                {(r.student?.name || "S")[0]}
                                            </div>
                                            <div>
                                                <p className="text-slate-900 font-bold text-sm">{r.student?.name || "Unknown"}</p>
                                                <p className="text-slate-500 text-[10px]">
                                                    {r.student?.rollNo || r.student?.email}
                                                    {r.student?.group?.name && ` • ${r.student.group.name}`}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4"><span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${statusColor(r.status)}`}>{r.status}</span></td>
                                    <td className="px-6 py-4 text-slate-500 text-xs hidden md:table-cell">{r.remarks || "—"}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(r)} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"><FaEdit /></button>
                                            <button onClick={() => handleDelete(r._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-xl">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-slate-900">{editId ? "Edit Record" : "Mark Attendance"}</h2>
                                <button onClick={() => { setShowForm(false); setEditId(null); }} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 block mb-2">Student</label>
                                    <select value={form.student} onChange={e => setForm(p => ({ ...p, student: e.target.value }))} required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B]">
                                        <option value="">Select Student</option>
                                        {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.rollNo || s.email})</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 block mb-2">Date</label>
                                    <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B]" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 block mb-2">Status</label>
                                    <div className="flex gap-2">
                                        {STATUSES.map(s => (
                                            <button key={s} type="button" onClick={() => setForm(p => ({ ...p, status: s }))}
                                                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${form.status === s ? (s === "Present" ? "bg-green-600 text-white" : s === "Late" ? "bg-amber-600 text-white" : "bg-rose-600 text-white") : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 block mb-2">Remarks</label>
                                    <input type="text" value={form.remarks} onChange={e => setForm(p => ({ ...p, remarks: e.target.value }))}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B]" placeholder="Optional..." />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-black text-sm hover:bg-slate-50 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-[#00548B] text-white font-black text-sm hover:bg-[#004381] transition-all disabled:opacity-60">{saving ? "Saving..." : editId ? "Update" : "Save"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendancePage;
