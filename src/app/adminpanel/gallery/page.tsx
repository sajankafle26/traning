"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const GalleryAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Gallery"
            apiPath="/api/gallery"
            fields={[
                { name: "title", label: "Title", type: "text" },
                { name: "type", label: "Type (image or video)", type: "text" },
                { name: "src", label: "Image Upload or URL", type: "image" },
                { name: "thumb", label: "Thumbnail Upload or URL (for videos)", type: "image" },
                { name: "category", label: "Category", type: "text" },
                { name: "order", label: "Sort Order", type: "number" },
                { name: "active", label: "Active", type: "toggle" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden relative group hover:shadow-xl transition-all">
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                        {item.type === "video" ? (
                            <div className="w-full h-full flex items-center justify-center bg-slate-900">
                                <img
                                    src={item.thumb || `https://img.youtube.com/vi/${item.src?.match(/embed\/([^?]+)/)?.[1] || ''}/mqdefault.jpg`}
                                    alt={item.title}
                                    className="w-full h-full object-cover opacity-70"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=600';
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white text-xs font-bold ml-0.5">&#9654;</span>
                                    </div>
                                </div>
                                <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">VIDEO</span>
                            </div>
                        ) : (
                            <img
                                src={item.src || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600';
                                }}
                            />
                        )}
                    </div>
                    <div className="p-5">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button onClick={() => onEdit(item)} className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-indigo-600 transition-colors">Edit</button>
                            <button onClick={() => onDelete(item._id)} className="bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-red-600 transition-colors">Delete</button>
                        </div>
                        <h3 className="text-slate-900 font-bold text-lg mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00548B] bg-[#00548B]/10 px-3 py-1 rounded-full">{item.category}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${item.type === 'video' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                {item.type}
                            </span>
                        </div>
                        {!item.active && (
                            <span className="inline-block mt-2 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Hidden</span>
                        )}
                    </div>
                </div>
            )}
        />
    );
};

export default GalleryAdmin;
