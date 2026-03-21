"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const InstituteGroupsAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Institute Groups"
            apiPath="/api/institute/groups"
            fields={[
                { name: "name", label: "Group Name", type: "text" },
                { name: "description", label: "Description", type: "textarea" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 relative group transform hover:-translate-y-1 transition duration-300 shadow-xl">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-400 font-bold text-xs uppercase hover:underline">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-500 font-bold text-xs uppercase hover:underline">Delete</button>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-black text-xl border border-indigo-500/20">
                            {item.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-white font-black text-lg">{item.name}</h3>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                </div>
            )}
        />
    );
};

export default InstituteGroupsAdmin;
