"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDoorOpen, FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const emptyForm = { name: "", room: "", schedule: "", startTime: "", endTime: "", capacity: "30", days: [] as string[] };

const ClassroomsPage = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => { fetchClasses(); }, []);

    const fetchClasses = async () => {
        setLoading(true);
        try { const res = await axios.get("/api/institute/classrooms"); setClasses(res.data); }
        catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        try {
            const payload = { ...form, capacity: Number(form.capacity) };
            if (editId) await axios.put(`/api/institute/classrooms/${editId}`, payload);
            else await axios.post("/api/institute/classrooms", payload);
            setShowForm(false); setForm(emptyForm); setEditId(null); fetchClasses();
        } catch (e) { console.error(e); } finally { setSaving(false); }
    };

    const handleEdit = (c: any) => {
        setForm({ name: c.name || "", room: c.room || "", schedule: c.schedule || "", startTime: c.startTime || "", endTime: c.endTime || "", capacity: c.capacity?.toString() || "30", days: c.days || [] });
        setEditId(c._id); setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this classroom?")) return;
        await axios.delete(`/api/institute/classrooms/${id}`); fetchClasses();
    };

    const toggleDay = (d: string) => setForm(p => ({ ...p, days: p.days.includes(d) ? p.days.filter(x => x !== d) : [...p.days, d] }));

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Classrooms</h1>
                    <p className="text-slate-400 text-sm mt-1">{classes.length} active classes</p>
                </div>
                <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg">
                    <FaPlus /> Add Classroom
                </button>
            </div>

            {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-40 bg-slate-900/40 rounded-[2rem] animate-pulse" />)}</div>
            ) : classes.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] py-24 text-center">
                    <FaDoorOpen className="text-5xl text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">No classrooms yet</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classes.map((c: any) => (
                        <div key={c._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-7 relative group hover:border-slate-700 transition-all">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(c)} className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"><FaEdit /></button>
                                <button onClick={() => handleDelete(c._id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"><FaTrash /></button>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl mb-4"><FaDoorOpen /></div>
                            <h3 className="text-white font-black text-base mb-1">{c.name}</h3>
                            {c.room && <p className="text-amber-400 text-xs font-black mb-2">Room: {c.room}</p>}
                            {(c.startTime || c.endTime) && <p className="text-slate-400 text-xs mb-3">{c.startTime} – {c.endTime}</p>}
                            {c.days?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {c.days.map((d: string) => <span key={d} className="text-[9px] font-black bg-slate-800 text-slate-400 px-2 py-1 rounded-lg">{d.slice(0,3)}</span>)}
                                </div>
                            )}
                            <div className="flex items-center gap-2 border-t border-slate-800 pt-3 mt-2">
                                <span className="text-[10px] text-slate-500 font-black uppercase">Capacity:</span>
                                <span className="text-white font-black text-sm">{c.capacity}</span>
                                {c.students?.length >= 0 && <span className="text-slate-500 text-xs ml-auto">{c.students?.length || 0} enrolled</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-white">{editId ? "Edit Classroom" : "Add Classroom"}</h2>
                                <button onClick={() => { setShowForm(false); setEditId(null); }} className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {[
                                    { name: "name", label: "Class Name", type: "text", required: true },
                                    { name: "room", label: "Room Number/Name", type: "text" },
                                    { name: "startTime", label: "Start Time", type: "time" },
                                    { name: "endTime", label: "End Time", type: "time" },
                                    { name: "capacity", label: "Capacity", type: "number" },
                                    { name: "schedule", label: "Schedule Notes", type: "text" },
                                ].map(f => (
                                    <div key={f.name}>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">{f.label}</label>
                                        <input type={f.type} required={f.required} value={(form as any)[f.name]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                    </div>
                                ))}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Class Days</label>
                                    <div className="flex flex-wrap gap-2">
                                        {DAYS.map(d => (
                                            <button key={d} type="button" onClick={() => toggleDay(d)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${form.days.includes(d) ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
                                                {d.slice(0, 3)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-black text-sm hover:bg-slate-800 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-sm hover:bg-indigo-500 transition-all disabled:opacity-60">{saving ? "Saving..." : editId ? "Save Changes" : "Add Classroom"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassroomsPage;
