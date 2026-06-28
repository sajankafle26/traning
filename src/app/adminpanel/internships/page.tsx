"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const InternshipsAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Internships"
            apiPath="/api/internships"
            fields={[
                { name: "title", label: "Position Title", type: "text" },
                { name: "description", label: "Description", type: "richtext" },
                { name: "icon", label: "FontAwesome Icon Class (e.g. fa-solid fa-code)", type: "text" },
                { name: "type", label: "Employment Type (e.g. Hybrid, Paid)", type: "text" },
                { name: "duration", label: "Duration (e.g. 3 Months)", type: "text" },
                { name: "stipend", label: "Stipend (e.g. Rs. 15,000 / mo)", type: "text" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-600 font-bold text-xs uppercase">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-600 font-bold text-xs uppercase">Delete</button>
                    </div>
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-slate-100 text-green-500 rounded-2xl flex items-center justify-center text-2xl">
                            <i className={item.icon || 'fa-solid fa-briefcase'}></i>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                            {item.type}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <div
                        className="text-slate-400 text-sm mb-6 line-clamp-2 prose-p:m-0"
                        dangerouslySetInnerHTML={{ __html: item.description || "" }}
                    />
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                        <div>
                            <span className="block text-[9px] font-black text-slate-500 uppercase">Duration</span>
                            <span className="font-bold text-slate-900">{item.duration}</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-[9px] font-black text-slate-500 uppercase">Perks</span>
                            <span className="font-bold text-green-500">{item.stipend}</span>
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default InternshipsAdmin;
