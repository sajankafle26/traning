"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const ServicesAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Services"
            apiPath="/api/services"
            fields={[
                { name: "title", label: "Service Title", type: "text" },
                { name: "slug", label: "Slug (leave empty for auto-generation)", type: "text" },
                { name: "description", label: "Description", type: "richtext" },
                { name: "icon", label: "FontAwesome Icon Class (e.g. fa-solid fa-code)", type: "text" },
                { name: "image", label: "Service Image", type: "image" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden relative group hover:shadow-xl transition-all">
                    {item.image && (
                        <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                    <div className="p-5">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button onClick={() => onEdit(item)} className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-indigo-600 transition-colors">Edit</button>
                            <button onClick={() => onDelete(item._id)} className="bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-red-600 transition-colors">Delete</button>
                        </div>
                        <div className="w-12 h-12 bg-[#00548B]/10 text-[#00548B] rounded-xl flex items-center justify-center text-xl mb-3">
                            <i className={item.icon}></i>
                        </div>
                        <h3 className="text-slate-900 font-bold text-lg mb-2">{item.title}</h3>
                        <div
                            className="text-slate-600 text-sm line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                    </div>
                </div>
            )}
        />
    );
};

export default ServicesAdmin;
