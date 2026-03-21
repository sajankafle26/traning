"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChalkboardTeacher, FaPlus, FaEdit, FaTrash, FaTimes, FaSearch } from "react-icons/fa";

const STATUSES = ["Active", "Inactive", "On Leave"];

const emptyForm = {
    name: "", email: "", phone: "", address: "", qualification: "",
    designation: "", joiningDate: "", salary: "", status: "Active", subjects: "",
};

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchTeachers(); }, []);

    const fetchTeachers = async () => {
        setLoading(true);
        try { const res = await axios.get("/api/institute/teachers"); setTeachers(res.data); }
        catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...form, salary: form.salary ? Number(form.salary) : undefined, subjects: form.subjects ? form.subjects.split(",").map(s => s.trim()) : [] };
            if (editId) await axios.put(`/api/institute/teachers/${editId}`, payload);
            else await axios.post("/api/institute/teachers", payload);
            setShowForm(false); setForm(emptyForm); setEditId(null); fetchTeachers();
        } catch (e) { console.error(e); } finally { setSaving(false); }
    };

    const handleEdit = (t: any) => {
        setForm({ name: t.name || "", email: t.email || "", phone: t.phone || "", address: t.address || "", qualification: t.qualification || "", designation: t.designation || "", joiningDate: t.joiningDate ? t.joiningDate.split("T")[0] : "", salary: t.salary?.toString() || "", status: t.status || "Active", subjects: (t.subjects || []).join(", ") });
        setEditId(t._id); setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this teacher?")) return;
        await axios.delete(`/api/institute/teachers/${id}`); fetchTeachers();
    };

    const filtered = teachers.filter(t => t.name?.toLowerCase().includes(search.toLowerCase()) || t.email?.toLowerCase().includes(search.toLowerCase()));
    const statusColor = (s: string) => s === "Active" ? "text-green-400 bg-green-500/10 border-green-500/20" : s === "On Leave" ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-slate-400 bg-slate-700/30 border-slate-700";

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Teacher Management</h1>
                    <p className="text-slate-400 text-sm mt-1">{teachers.length} faculty members</p>
                </div>
                <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg">
                    <FaPlus /> Add Teacher
                </button>
            </div>

            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Search teachers..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500" />
            </div>

            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(6)].map((_, i) => <div key={i} className="h-44 bg-slate-900/40 rounded-[2rem] animate-pulse" />)}</div>
            ) : filtered.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] py-24 text-center">
                    <FaChalkboardTeacher className="text-5xl text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">No teachers found</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((t: any) => (
                        <div key={t._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 group hover:border-slate-700 transition-all relative">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(t)} className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"><FaEdit /></button>
                                <button onClick={() => handleDelete(t._id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"><FaTrash /></button>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl font-black mb-4">
                                {t.name?.[0] || 'T'}
                            </div>
                            <h3 className="text-white font-black text-base">{t.name}</h3>
                            <p className="text-slate-400 text-xs mb-1">{t.designation || "Teacher"}</p>
                            <p className="text-slate-500 text-[10px] mb-3">{t.email}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${statusColor(t.status)}`}>{t.status}</span>
                                {t.qualification && <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-lg">{t.qualification}</span>}
                            </div>
                            {t.salary && <p className="text-emerald-400 font-black text-sm mt-3">Rs. {Number(t.salary).toLocaleString()}/mo</p>}
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-white">{editId ? "Edit Teacher" : "Add Teacher"}</h2>
                                <button onClick={() => { setShowForm(false); setEditId(null); }} className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {[
                                    { name: "name", label: "Full Name", type: "text", required: true },
                                    { name: "email", label: "Email", type: "email", required: true },
                                    { name: "phone", label: "Phone", type: "text" },
                                    { name: "designation", label: "Designation", type: "text" },
                                    { name: "qualification", label: "Qualification", type: "text" },
                                    { name: "salary", label: "Monthly Salary (NPR)", type: "number" },
                                    { name: "joiningDate", label: "Joining Date", type: "date" },
                                    { name: "subjects", label: "Subjects (comma separated)", type: "text" },
                                ].map(f => (
                                    <div key={f.name}>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">{f.label}</label>
                                        <input type={f.type} required={f.required} value={(form as any)[f.name]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                    </div>
                                ))}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Status</label>
                                    <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Address</label>
                                    <textarea value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none" />
                                </div>
                                <div className="sm:col-span-2 flex gap-3 pt-2">
                                    <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-black text-sm hover:bg-slate-800 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-sm hover:bg-indigo-500 transition-all disabled:opacity-60">{saving ? "Saving..." : editId ? "Save Changes" : "Add Teacher"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeachersPage;
