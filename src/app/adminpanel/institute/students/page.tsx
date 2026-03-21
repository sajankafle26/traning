"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserGraduate, FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaVideo } from "react-icons/fa";

const GENDERS = ["Male", "Female", "Other"];
const STATUSES = ["Active", "Inactive", "Graduated"];

const emptyForm = {
    name: "", email: "", phone: "", address: "", dateOfBirth: "",
    gender: "Male", rollNo: "", status: "Active", parentName: "", parentPhone: "",
    enrolledCourses: [] as string[], group: "",
};

const StudentsPage = () => {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterGroup, setFilterGroup] = useState("All");
    const [saving, setSaving] = useState(false);

    const [courses, setCourses] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => { 
        fetchStudents(); 
        fetchCourses();
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const res = await axios.get("/api/institute/groups");
            setGroups(res.data);
        } catch (e) { console.error(e); }
    };

    const fetchCourses = async () => {
        try {
            const res = await axios.get("/api/courses");
            setCourses(res.data);
        } catch (e) { console.error(e); }
    };

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/institute/students");
            setStudents(res.data);
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editId) {
                await axios.put(`/api/institute/students/${editId}`, form);
            } else {
                await axios.post("/api/institute/students", form);
            }
            setShowForm(false);
            setForm(emptyForm);
            setEditId(null);
            fetchStudents();
        } catch (e) { console.error(e); } finally { setSaving(false); }
    };

    const handleEdit = (s: any) => {
        setForm({
            name: s.name || "", email: s.email || "", phone: s.phone || "",
            address: s.address || "", dateOfBirth: s.dateOfBirth ? s.dateOfBirth.split("T")[0] : "",
            gender: s.gender || "Male", rollNo: s.rollNo || "", status: s.status || "Active",
            parentName: s.parentName || "", parentPhone: s.parentPhone || "",
            enrolledCourses: s.enrolledCourses || [],
            group: s.group?._id || s.group || "",
        });
        setEditId(s._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this student?")) return;
        await axios.delete(`/api/institute/students/${id}`);
        fetchStudents();
    };

    const filtered = students.filter(s => {
        const matchSearch = s.name?.toLowerCase().includes(search.toLowerCase()) || s.email?.toLowerCase().includes(search.toLowerCase()) || s.rollNo?.includes(search);
        const matchStatus = filterStatus === "All" || s.status === filterStatus;
        const matchGroup = filterGroup === "All" || (s.group?._id === filterGroup || s.group === filterGroup);
        return matchSearch && matchStatus && matchGroup;
    });

    const statusColor = (status: string) => {
        if (status === "Active") return "text-green-400 bg-green-500/10 border-green-500/20";
        if (status === "Graduated") return "text-blue-400 bg-blue-500/10 border-blue-500/20";
        return "text-slate-400 bg-slate-700/30 border-slate-700";
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-white">Student Management</h1>
                    <p className="text-slate-400 text-sm mt-1">{students.length} students enrolled</p>
                </div>
                <button
                    onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg"
                >
                    <FaPlus /> Add Student
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text" placeholder="Search by name, email or roll no..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="flex bg-slate-900/40 border border-slate-800 rounded-xl p-1">
                    {["All", ...STATUSES].map(s => (
                        <button key={s} onClick={() => setFilterStatus(s)}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${filterStatus === s ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"}`}>
                            {s}
                        </button>
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
                <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-slate-900/40 rounded-2xl animate-pulse" />)}</div>
            ) : filtered.length === 0 ? (
                <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] py-24 text-center">
                    <FaUserGraduate className="text-5xl text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold">No students found</p>
                </div>
            ) : (
                <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Student</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hidden md:table-cell">Roll No</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hidden lg:table-cell">Group</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500 hidden lg:table-cell">Phone</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filtered.map((s: any) => (
                                <tr key={s._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-sm uppercase flex-shrink-0">
                                                {s.name?.[0] || 'S'}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">{s.name}</p>
                                                <p className="text-slate-500 text-[10px]">{s.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm font-bold hidden md:table-cell">{s.rollNo || "—"}</td>
                                    <td className="px-6 py-4 text-indigo-400 text-xs font-bold hidden lg:table-cell">{s.group?.name || "—"}</td>
                                    <td className="px-6 py-4 text-slate-400 text-sm hidden lg:table-cell">{s.phone || "—"}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${statusColor(s.status)}`}>{s.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(s)} className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors"><FaEdit /></button>
                                            <button onClick={() => handleDelete(s._id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black text-white">{editId ? "Edit Student" : "Add New Student"}</h2>
                                <button onClick={() => { setShowForm(false); setEditId(null); }}
                                    className="w-10 h-10 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors"><FaTimes /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {[
                                    { name: "name", label: "Full Name", type: "text", required: true },
                                    { name: "email", label: "Email", type: "email", required: true },
                                    { name: "phone", label: "Phone", type: "text" },
                                    { name: "rollNo", label: "Roll No", type: "text" },
                                    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
                                    { name: "parentName", label: "Parent Name", type: "text" },
                                    { name: "parentPhone", label: "Parent Phone", type: "text" },
                                ].map(f => (
                                    <div key={f.name}>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">{f.label}</label>
                                        <input
                                            type={f.type} required={f.required}
                                            value={(form as any)[f.name]}
                                            onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Gender</label>
                                    <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                        {GENDERS.map(g => <option key={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-2">Institute Group</label>
                                    <select value={form.group} onChange={e => setForm(p => ({ ...p, group: e.target.value }))}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-indigo-300 text-sm focus:outline-none focus:border-indigo-500 font-bold">
                                        <option value="">No Group</option>
                                        {groups.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Status</label>
                                    <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500">
                                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Address</label>
                                    <textarea value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} rows={2}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none" />
                                </div>

                                {/* Course Enrollment */}
                                <div className="sm:col-span-2 border-t border-slate-800 pt-6 mt-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-4 flex items-center gap-2">
                                        <FaVideo /> Professional Course Access
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {courses.map(course => (
                                            <label key={course._id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                                                form.enrolledCourses.includes(course._id) 
                                                ? "bg-indigo-500/10 border-indigo-500/50 text-white" 
                                                : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600"
                                            }`}>
                                                <div className="flex items-center gap-3">
                                                    <input 
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={form.enrolledCourses.includes(course._id)}
                                                        onChange={(e) => {
                                                            const checked = e.target.checked;
                                                            setForm(p => ({
                                                                ...p,
                                                                enrolledCourses: checked 
                                                                    ? [...p.enrolledCourses, course._id]
                                                                    : p.enrolledCourses.filter(id => id !== course._id)
                                                            }));
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="text-xs font-bold">{course.title}</p>
                                                        <p className="text-[9px] opacity-60">Rs. {course.price?.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                                {form.enrolledCourses.includes(course._id) && (
                                                    <span className="text-[8px] font-black uppercase tracking-widest bg-indigo-500 text-white px-2 py-0.5 rounded shadow-lg shadow-indigo-500/20">Enrolled</span>
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                    {courses.length === 0 && (
                                        <p className="text-xs text-slate-500 italic">No courses available to enroll.</p>
                                    )}
                                </div>
                                <div className="sm:col-span-2 flex gap-3 pt-2">
                                    <button type="button" onClick={() => { setShowForm(false); setEditId(null); }}
                                        className="flex-1 py-3 rounded-xl border border-slate-700 text-slate-400 font-black text-sm hover:bg-slate-800 transition-all">Cancel</button>
                                    <button type="submit" disabled={saving}
                                        className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-sm hover:bg-indigo-500 transition-all disabled:opacity-60">
                                        {saving ? "Saving..." : editId ? "Save Changes" : "Add Student"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentsPage;
