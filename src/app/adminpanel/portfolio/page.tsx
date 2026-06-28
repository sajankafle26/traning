"use client";
import AdminCRUD from "@/components/AdminCRUD";
import React from "react";

const PortfolioPage = () => {
    const fields = [
        { name: "title", label: "Project Title", type: "text" },
        { name: "description", label: "Project Description", type: "textarea" },
        { name: "link", label: "Project URL", type: "text" },
        { name: "category", label: "Category", type: "text" },
        { name: "tags", label: "Tags (comma-separated)", type: "text" },
        { name: "image", label: "Project Image", type: "image" },
    ];

    const renderItem = (item: any, onDelete: (id: string) => void, onEdit: (item: any) => void) => (
        <div key={item._id} className="bg-white p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src={item.image || `https://i.pravatar.cc/150?u=${item.title}`}
                    alt={item.title}
                    className="w-16 h-12 rounded-lg object-cover"
                />
                <div>
                    <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-1">{item.description}</p>
                </div>
            </div>
            
            <div className="mb-4">
               {item.category && <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-1 rounded-full mr-2">{item.category}</span>}
            </div>

            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onEdit(item)}
                    className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg font-bold hover:bg-indigo-100 transition text-xs"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(item._id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg font-bold hover:bg-red-100 transition text-xs"
                >
                    Delete
                </button>
            </div>
        </div>
    );

    return (
        <AdminCRUD
            title="Portfolio Projects"
            apiPath="/api/portfolio"
            fields={fields}
            renderItem={renderItem}
        />
    );
};

export default PortfolioPage;
