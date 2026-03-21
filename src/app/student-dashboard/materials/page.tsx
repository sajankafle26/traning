"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook, FaSearch, FaFilePdf, FaVideo, FaLink, FaExternalLinkAlt, FaDownload, FaPlay } from "react-icons/fa";

const StudentMaterialsPage = () => {
    const [materials, setMaterials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const [profRes, matRes] = await Promise.all([
                    axios.get("/api/student/profile"),
                    axios.get("/api/institute/materials")
                ]);
                setMaterials(matRes.data);
            } catch (e) { console.error(e); } finally { setLoading(false); }
        };
        fetchMaterials();
    }, []);

    const filtered = materials.filter(m => {
        const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
        const matchType = filterType === "All" || m.fileType === filterType;
        return matchSearch && matchType;
    });

    const getIcon = (type: string) => {
        if (type === "PDF") return <FaFilePdf className="text-rose-400" />;
        if (type === "Video") return <FaVideo className="text-blue-400" />;
        return <FaLink className="text-emerald-400" />;
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Learning Materials</h1>
                    <p className="text-slate-400 text-sm mt-1">Access study materials, recorded lectures, and helpful links</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="text" placeholder="Search materials..." value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500" />
                </div>
                <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
                    {["All", "PDF", "Video", "Link"].map(t => (
                        <button key={t} onClick={() => setFilterType(t)} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${filterType === t ? "bg-emerald-600 text-white" : "text-slate-500 hover:text-slate-300"}`}>{t}</button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <div key={i} className="h-56 bg-slate-900/40 rounded-[2.5rem] animate-pulse" />)}</div>
            ) : filtered.length === 0 ? (
                <div className="py-24 text-center border-2 border-dashed border-slate-800 rounded-[2.5rem]">
                    <FaBook className="text-5xl text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No materials found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((m: any) => (
                        <div key={m._id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-7 flex flex-col group hover:border-emerald-500/30 transition-all shadow-xl">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl shadow-inner">{getIcon(m.fileType)}</div>
                                <span className="px-3 py-1 bg-white/5 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/5">{m.fileType}</span>
                            </div>
                            <h3 className="text-white font-black text-lg mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1">{m.title}</h3>
                            <p className="text-slate-500 text-xs mb-6 line-clamp-2 leading-relaxed">{m.description || 'No description provided for this resource.'}</p>
                            
                            <div className="mt-auto pt-6 border-t border-slate-800 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">Uploaded by Admin</span>
                                    <span className="text-slate-600 text-[9px] font-bold">{new Date(m.createdAt).toLocaleDateString()}</span>
                                </div>
                                <a href={m.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all no-underline shadow-lg shadow-emerald-900/40">
                                    {m.fileType === 'Video' ? <><FaPlay className="text-[8px]" /> Watch Now</> : m.fileType === 'PDF' ? <><FaDownload className="text-[8px]" /> Download PDF</> : <><FaExternalLinkAlt className="text-[8px]" /> Open Link</>}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentMaterialsPage;
