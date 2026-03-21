"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBuilding, FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const emptyForm = { name: "", code: "", description: "", totalSeats: "50", duration: "" };

const DepartmentsPage = () => {
    const [depts, setDepts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchDepts(); }, []);

    const fetchDepts = async () => {
        setLoading(true);
        try { const res = await axios.get("/api/institute/departments"); setDepts(res.data); }
        catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        try {
            const payload = { ...form, totalSeats: Number(form.totalSeats) };
            if (editId) await axios.put(`/api/institute/departments/${editId}`, payload);
            else await axios.post("/api/institute/departments", payload);
            setShowForm(false); setForm(emptyForm); setEditId(null); fetchDepts();
        } catch (e) { console.error(e); } finally { setSaving(false); }
    };

    const handleEdit = (d: any) => {
        setForm({ name: d.name || "", code: d.code || "", description: d.description || "", totalSeats: d.totalSeats?.toString() || "50", duration: d.duration || "" });
        setEditId(d._id); setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this department?")) return;
        await axios.delete(`/api/institute/departments/${id}`); fetchDepts();
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Departments</h1>
                    <p className="text-slate-400 text-sm mt-1">{depts.length} academic departments</p>
                </div>
                <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg">
                    <FaPlus /> Add Department
                </button>
            </div>

            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-40 bg-slate-900/40 rounded-[2rem] animate-pulse" />)}</div>
            ) : depts.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] py-24 text-center">
                    <FaBuilding className="text-5xl text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">No departments yet</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {depts.map((d: any) => (
                        <div key={d._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-7 relative group hover:border-slate-700 transition-all">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(d)} className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"><FaEdit /></button>
                                <button onClick={() => handleDelete(d._id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"><FaTrash /></button>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-black text-xl">{d.code?.[0] || 'D'}</div>
                                <div>
                                    <h3 className="text-white font-black text-base">{d.name}</h3>
                                    <p className="text-purple-400 text-xs font-black">{d.code}</p>
                                </div>
                            </div>
                            {d.description && <p className="text-slate-500 text-xs mb-4 line-clamp-2">{d.description}</p>}
                            <div className="flex gap-4 border-t border-slate-800 pt-4">
                                <div><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Seats</p><p className="text-white font-black">{d.totalSeats}</p></div>
                                {d.duration && <div><p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Duration</p><p className="text-white font-black">{d.duration}</p></div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-lg">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-white">{editId ? "Edit Department" : "Add Department"}</h2>
                                <button onClick={() => { setShowForm(false); setEditId(null); }} className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {[
                                    { name: "name", label: "Department Name", type: "text", required: true },
                                    { name: "code", label: "Department Code", type: "text", required: true },
                                    { name: "duration", label: "Duration (e.g. 2 Years)", type: "text" },
                                    { name: "totalSeats", label: "Total Seats", type: "number" },
                                ].map(f => (
                                    <div key={f.name}>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">{f.label}</label>
                                        <input type={f.type} required={f.required} value={(form as any)[f.name]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                    </div>
                                ))}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Description</label>
                                    <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-black text-sm hover:bg-slate-800 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-sm hover:bg-indigo-500 transition-all disabled:opacity-60">{saving ? "Saving..." : editId ? "Save Changes" : "Add Department"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentsPage;
