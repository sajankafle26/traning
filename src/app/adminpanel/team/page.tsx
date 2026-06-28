"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const TeamAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Team"
            apiPath="/api/team"
            fields={[
                { name: "name", label: "Full Name", type: "text" },
                { name: "role", label: "Role / Position", type: "text" },
                { name: "image", label: "Profile Photo", type: "image" },
                { name: "bio", label: "Short Bio", type: "textarea" },
                { name: "linkedin", label: "LinkedIn URL", type: "text" },
                { name: "twitter", label: "Twitter URL", type: "text" },
                { name: "github", label: "GitHub URL", type: "text" },
                { name: "order", label: "Sort Order", type: "number" },
                { name: "active", label: "Active (show on site)", type: "toggle" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden relative group hover:shadow-xl transition-all">
                    {/* Photo */}
                    <div className="aspect-square overflow-hidden bg-slate-100">
                        <img
                            src={item.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=00548B&color=fff&size=256&bold=true`}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=00548B&color=fff&size=256&bold=true`;
                            }}
                        />
                    </div>
                    <div className="p-5">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button onClick={() => onEdit(item)} className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-indigo-600 transition-colors">Edit</button>
                            <button onClick={() => onDelete(item._id)} className="bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-red-600 transition-colors">Delete</button>
                        </div>
                        <h3 className="text-slate-900 font-bold text-lg mb-1">{item.name}</h3>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#00548B] bg-[#00548B]/10 px-3 py-1 rounded-full mb-3">
                            {item.role}
                        </span>
                        {item.bio && (
                            <p className="text-slate-500 text-sm line-clamp-2 mb-3">{item.bio}</p>
                        )}
                        <div className="flex gap-2">
                            {item.linkedin && <span className="text-xs text-blue-600">LinkedIn</span>}
                            {item.twitter && <span className="text-xs text-sky-500">Twitter</span>}
                            {item.github && <span className="text-xs text-slate-600">GitHub</span>}
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

export default TeamAdmin;
