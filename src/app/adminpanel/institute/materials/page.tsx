"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBook, FaPlus, FaEdit, FaTrash, FaTimes, FaSearch, FaFilePdf, FaVideo, FaLink, FaExternalLinkAlt } from "react-icons/fa";

const FILE_TYPES = ["PDF", "Video", "Link"];
const emptyForm = { title: "", description: "", fileType: "PDF", url: "", teacher: "" };

const MaterialsPage = () => {
    const [materials, setMaterials] = useState<any[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => { fetchAll(); }, []);
    const fetchAll = async () => {
        setLoading(true);
        try {
            const [matRes, teaRes] = await Promise.all([
                axios.get("/api/institute/materials"),
                axios.get("/api/institute/teachers")
            ]);
            setMaterials(matRes.data);
            setTeachers(teaRes.data);
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setSaving(true);
        try {
            if (editId) await axios.put(`/api/institute/materials/${editId}`, form);
            else await axios.post("/api/institute/materials", form);
            setShowForm(false); setForm(emptyForm); setEditId(null); fetchAll();
        } catch (e) { console.error(e); } finally { setSaving(false); }
    };

    const handleEdit = (m: any) => {
        setForm({
            title: m.title,
            description: m.description || "",
            fileType: m.fileType,
            url: m.url,
            teacher: m.teacher?._id || m.teacher || ""
        });
        setEditId(m._id); setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this material?")) return;
        await axios.delete(`/api/institute/materials/${id}`); fetchAll();
    };

    const filtered = materials.filter(m => {
        const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
        return matchSearch;
    });

    const getIcon = (type: string) => {
        if (type === "PDF") return <FaFilePdf className="text-rose-400" />;
        if (type === "Video") return <FaVideo className="text-blue-400" />;
        return <FaLink className="text-emerald-400" />;
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div><h1 className="text-2xl font-black text-white">Learning Materials</h1><p className="text-slate-400 text-sm mt-1">{materials.length} resources available</p></div>
                <button onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg"><FaPlus /> Add Material</button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="text" placeholder="Search by title..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500" />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-slate-900/40 rounded-[2rem] animate-pulse" />)}</div>
            ) : filtered.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] py-24 text-center">
                    <FaBook className="text-5xl text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">No materials found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((m: any) => (
                        <div key={m._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 group hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl">{getIcon(m.fileType)}</div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(m)} className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors"><FaEdit /></button>
                                    <button onClick={() => handleDelete(m._id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"><FaTrash /></button>
                                </div>
                            </div>
                            <h3 className="text-white font-bold mb-2">{m.title}</h3>
                            <p className="text-slate-500 text-xs mb-4 line-clamp-2">{m.description}</p>
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                                <a href={m.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-white transition-colors">View <FaExternalLinkAlt className="text-[10px]" /></a>
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
                                <h2 className="text-xl font-black text-white">{editId ? "Edit Material" : "Add Material"}</h2>
                                <button onClick={() => setShowForm(false)} className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Title</label>
                                    <input type="text" required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Type</label>
                                    <select value={form.fileType} onChange={e => setForm(p => ({ ...p, fileType: e.target.value }))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                        {FILE_TYPES.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">URL / Link</label>
                                    <input type="text" required value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} placeholder="e.g. Google Drive link, YouTube link, etc." className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Teacher (Optional)</label>
                                    <select value={form.teacher} onChange={e => setForm(p => ({ ...p, teacher: e.target.value }))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                        <option value="">Select Teacher</option>
                                        {teachers.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Description</label>
                                    <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-black text-sm hover:bg-slate-800 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-sm hover:bg-indigo-500 transition-all disabled:opacity-60">{saving ? "Saving..." : editId ? "Save Changes" : "Add Material"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterialsPage;
