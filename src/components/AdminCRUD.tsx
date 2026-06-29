import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LexicalEditor from "./LexicalEditor/LexicalEditor";
import { FaUpload, FaWandMagicSparkles, FaPlus } from "react-icons/fa6";
import { FaTimes, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

interface AdminCRUDProps {
    title: string;
    apiPath: string;
    fields: { name: string; label: string; type: string; options?: string[] }[];
    renderItem: (item: any, onDelete: (id: string) => void, onEdit: (item: any) => void) => React.ReactNode;
    preprocessData?: (data: any) => any;
}

const AdminCRUD: React.FC<AdminCRUDProps> = ({ title, apiPath, fields, renderItem, preprocessData }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploading, setUploading] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (status === "loading") return;
        if (status === "unauthenticated" || (session?.user as any)?.role !== "admin") {
            router.push("/studentlogin");
        } else if (status === "authenticated") {
            fetchItems();
        }
    }, [status, session]);

    const fetchItems = async () => {
        try {
            const res = await axios.get(apiPath);
            setItems(res.data);
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const isVideo = file.type.startsWith("video/");
        const allowedTypes = [
            "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp",
            "video/mp4", "video/webm", "video/ogg", "video/quicktime"
        ];
        const maxSize = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            alert(`Invalid file type. Please upload an image or video file.\n\nYou selected: ${file.type}`);
            e.target.value = "";
            return;
        }

        if (file.size > maxSize) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            alert(`File is too large (${sizeMB}MB). Maximum file size is ${isVideo ? '100MB' : '10MB'}.`);
            e.target.value = "";
            return;
        }

        setUploading(fieldName);
        const data = new FormData();
        data.append("file", file);

        try {
            const res = await axios.post("/api/upload", data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data?.url) {
                setFormData((prev: any) => ({ ...prev, [fieldName]: res.data.url }));
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.message || "Upload failed.";
            if (err.response?.status === 401) {
                alert("Unauthorized. Please log in as admin.");
                router.push("/studentlogin");
            } else {
                alert(`Upload Error: ${errorMessage}`);
            }
            e.target.value = "";
        } finally {
            setUploading(null);
        }
    };

    const handleAiGenerate = async (fieldName: string) => {
        const promptText = prompt(`What should the AI generate for ${fieldName}?`);
        if (!promptText) return;

        setUploading(fieldName);
        try {
            const res = await axios.post("/api/ai/generate", {
                prompt: promptText,
                context: `Generating content for field '${fieldName}' in '${title}'.`
            });
            setFormData((prev: Record<string, any>) => ({ ...prev, [fieldName]: res.data.response }));
        } catch (err) {
            alert("AI Generation Failed");
        } finally {
            setUploading(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let processedData = { ...formData };
            fields.forEach(field => {
                if (field.type === 'json' && typeof processedData[field.name] === 'string') {
                    try {
                        processedData[field.name] = JSON.parse(processedData[field.name]);
                    } catch {
                        alert(`Invalid JSON in field ${field.label}`);
                        throw new Error("Invalid JSON");
                    }
                }
            });
            if (preprocessData) {
                processedData = preprocessData(processedData);
            }

            if (editingId) {
                await axios.put(`${apiPath}/${editingId}`, processedData);
            } else {
                await axios.post(apiPath, processedData);
            }

            setShowForm(false);
            setEditingId(null);
            fetchItems();
            setFormData({});
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await axios.delete(`${apiPath}/${id}`);
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item: any) => {
        const initialFormData = { ...item };
        fields.forEach(field => {
            if (field.type === 'json' && typeof initialFormData[field.name] === 'object') {
                initialFormData[field.name] = JSON.stringify(initialFormData[field.name], null, 2);
            }
        });
        setFormData(initialFormData);
        setEditingId(item._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredItems = items.filter((item: any) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return item.title?.toLowerCase().includes(query) ||
               item.name?.toLowerCase().includes(query) ||
               item.email?.toLowerCase().includes(query);
    });

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#00548B]/20 border-t-[#00548B] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">{title}</h1>
                    <p className="text-sm text-slate-500 mt-1">{items.length} items total</p>
                </div>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        if (showForm) {
                            setEditingId(null);
                            setFormData({});
                        }
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 ${
                        showForm
                            ? "bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-none"
                            : "bg-[#00548B] text-white hover:bg-[#004381] shadow-[#00548B]/20"
                    }`}
                >
                    {showForm ? <><FaTimes /> Cancel</> : <><FaPlus /> Add New</>}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-6">
                        {editingId ? "Edit Item" : "Create New Item"}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fields.map((field) => (
                            <div key={field.name} className={`space-y-2 ${field.type === 'textarea' || field.type === 'richtext' || field.type === 'json' ? 'md:col-span-2' : ''}`}>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{field.label}</label>

                                {field.type === "richtext" ? (
                                    <div className="relative group/ai">
                                        <button
                                            type="button"
                                            onClick={() => handleAiGenerate(field.name)}
                                            className="absolute -top-10 right-0 text-[10px] font-bold text-[#00548B] flex items-center gap-1.5 bg-[#00548B]/10 px-3 py-1.5 rounded-lg hover:bg-[#00548B]/20 transition-all opacity-0 group-hover/ai:opacity-100 z-10"
                                        >
                                            <FaWandMagicSparkles /> AI Generate
                                        </button>
                                        <LexicalEditor
                                            value={formData[field.name] || ""}
                                            onChange={(html) => setFormData({ ...formData, [field.name]: html })}
                                        />
                                    </div>
                                ) : field.type === "textarea" || field.type === "json" ? (
                                    <div className="relative group/ai">
                                        <button
                                            type="button"
                                            onClick={() => handleAiGenerate(field.name)}
                                            className="absolute -top-10 right-0 text-[10px] font-bold text-[#00548B] flex items-center gap-1.5 bg-[#00548B]/10 px-3 py-1.5 rounded-lg hover:bg-[#00548B]/20 transition-all opacity-0 group-hover/ai:opacity-100 z-10"
                                        >
                                            <FaWandMagicSparkles /> AI Generate
                                        </button>
                                        <textarea
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] transition-all resize-none h-40"
                                            value={formData[field.name] || ""}
                                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                            placeholder={field.type === "json" ? '{ "key": "value" }' : ""}
                                        />
                                    </div>
                                ) : field.type === "image" || field.type === "video" ? (
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <input
                                                type="text"
                                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] transition-all"
                                                value={formData[field.name] || ""}
                                                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                                placeholder="Paste URL or Upload..."
                                            />
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept={field.type === "video" ? "video/*" : "image/*"}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={(e) => handleFileUpload(e, field.name)}
                                                    disabled={!!uploading}
                                                />
                                                <button
                                                    type="button"
                                                    className={`h-full px-4 rounded-xl font-bold text-xs transition flex items-center gap-2 whitespace-nowrap ${
                                                        uploading === field.name
                                                            ? "bg-[#00548B] text-white cursor-wait"
                                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                    }`}
                                                    disabled={!!uploading}
                                                >
                                                    {uploading === field.name ? (
                                                        <><span className="animate-spin">⏳</span> Uploading...</>
                                                    ) : (
                                                        <><FaUpload /> Upload</>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        {formData[field.name] && (
                                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-200">
                                                {field.type === "video" ? (
                                                    <video src={formData[field.name]} controls className="w-full h-full object-cover" />
                                                ) : (
                                                    <img src={formData[field.name]} alt="Preview" className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : field.type === "select" ? (
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] transition-all"
                                        value={formData[field.name] || ""}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                    >
                                        <option value="">Select Option</option>
                                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] transition-all"
                                        value={formData[field.name] || ""}
                                        onChange={(e) => setFormData({ ...formData, [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                                    />
                                )}
                            </div>
                        ))}
                        <div className="md:col-span-2 pt-4">
                            <button type="submit" className="w-full bg-[#00548B] hover:bg-[#004381] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#00548B]/20 active:scale-[0.98]">
                                {editingId ? "Update Item" : "Create Item"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search */}
            {items.length > 5 && (
                <div className="relative mb-6">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] transition-all"
                    />
                </div>
            )}

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item: any) => renderItem(item, handleDelete, handleEdit))
                ) : (
                    <div className="md:col-span-3 py-16 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium text-sm">No items found. Create one above.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCRUD;
