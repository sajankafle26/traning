"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBullhorn, FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

const CATEGORIES = ["General", "Exam", "Holiday", "Fee", "Event"];
const AUDIENCES = ["All", "Students", "Teachers"];
const emptyForm = { title: "", content: "", category: "General", targetAudience: "All", isImportant: false, expiresAt: "" };

const NoticesPage = () => {
    const [notices, setNotices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [filterCat, setFilterCat] = useState("All");

    useEffect(() => { fetchNotices(); }, []);
    const fetchNotices = async () => {
        setLoading(true);
        try { const res = await axios.get("/api/institute/notices"); setNotices(res.data); }
        catch (e) { console.error(e); } finally { setLoading(false); }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        try {
            if (editId) await axios.put(`/api/institute/notices/${editId}`, form);
            else await axios.post("/api/institute/notices", form);
            setShowForm(false); setForm(emptyForm); setEditId(null); fetchNotices();
        } catch (e) { console.error(e); } finally { setSaving(false); }
    };
    const handleEdit = (n: any) => {
        setForm({ title: n.title || "", content: n.content || "", category: n.category || "General", targetAudience: n.targetAudience || "All", isImportant: n.isImportant || false, expiresAt: n.expiresAt ? n.expiresAt.split("T")[0] : "" });
        setEditId(n._id); setShowForm(true);
    };
    const handleDelete = async (id: string) => {
        if (!confirm("Delete notice?")) return;
        await axios.delete(`/api/institute/notices/${id}`); fetchNotices();
    };
    const catColor = (c: string) => ({ General: "bg-slate-100 text-slate-600", Exam: "bg-blue-50 text-blue-600", Holiday: "bg-green-50 text-green-600", Fee: "bg-amber-50 text-amber-600", Event: "bg-purple-50 text-purple-600" } as any)[c] || "bg-slate-100 text-slate-600";
    const filtered = filterCat === "All" ? notices : notices.filter(n => n.category === filterCat);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div><h1 className="text-2xl font-black text-slate-900">Notice Board</h1><p className="text-slate-500 text-sm mt-1">{notices.length} notices posted</p></div>
                <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }} className="flex items-center gap-2 bg-[#00548B] hover:bg-[#004381] text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg"><FaPlus /> Post Notice</button>
            </div>
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 overflow-x-auto">
                {["All", ...CATEGORIES].map(c => (
                    <button key={c} onClick={() => setFilterCat(c)} className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all whitespace-nowrap ${filterCat === c ? "bg-[#00548B] text-white" : "text-slate-500 hover:text-slate-900"}`}>{c}</button>
                ))}
            </div>
            {loading ? (
                <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-slate-100 rounded-2xl animate-pulse" />)}</div>
            ) : filtered.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl py-24 text-center">
                    <FaBullhorn className="text-5xl text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold">No notices found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((n: any) => (
                        <div key={n._id} className={`bg-white border rounded-2xl p-6 relative group hover:border-slate-300 transition-all ${n.isImportant ? "border-amber-300" : "border-slate-200"}`}>
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(n)} className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"><FaEdit /></button>
                                <button onClick={() => handleDelete(n._id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"><FaTrash /></button>
                            </div>
                            <div className="flex items-start gap-4 pr-20">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.isImportant ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-400"}`}><FaBullhorn /></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="text-slate-900 font-black text-base">{n.title}</h3>
                                        {n.isImportant && <span className="text-[9px] font-black bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">IMPORTANT</span>}
                                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${catColor(n.category)}`}>{n.category}</span>
                                        <span className="text-[9px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{n.targetAudience}</span>
                                    </div>
                                    <p className="text-slate-500 text-sm">{n.content}</p>
                                    <p className="text-slate-500 text-[10px] font-bold mt-2">{new Date(n.date || n.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-slate-900">{editId ? "Edit Notice" : "Post Notice"}</h2>
                                <button onClick={() => { setShowForm(false); setEditId(null); }} className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div><label className="text-xs font-semibold text-slate-500 block mb-2">Title</label><input type="text" required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B]" /></div>
                                <div><label className="text-xs font-semibold text-slate-500 block mb-2">Content</label><textarea required value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] resize-none" /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-xs font-semibold text-slate-500 block mb-2">Category</label><select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B]">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
                                    <div><label className="text-xs font-semibold text-slate-500 block mb-2">Target</label><select value={form.targetAudience} onChange={e => setForm(p => ({ ...p, targetAudience: e.target.value }))} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B]">{AUDIENCES.map(a => <option key={a}>{a}</option>)}</select></div>
                                </div>
                                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" checked={form.isImportant} onChange={e => setForm(p => ({ ...p, isImportant: e.target.checked }))} className="w-4 h-4 accent-amber-500 rounded" /><span className="text-sm font-bold text-slate-600">Mark as Important</span></label>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-black text-sm hover:bg-slate-50 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-[#00548B] text-white font-black text-sm hover:bg-[#004381] transition-all disabled:opacity-60">{saving ? "Saving..." : editId ? "Update" : "Post Notice"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoticesPage;
