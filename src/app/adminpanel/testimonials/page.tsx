"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";

const TestimonialsAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Testimonials"
            apiPath="/api/testimonials"
            fields={[
                { name: "name", label: "Student Name", type: "text" },
                { name: "course", label: "Course Name", type: "text" },
                { name: "company", label: "Company / Placement", type: "text" },
                { name: "salary", label: "Salary (e.g. Rs. 45,000/mo)", type: "text" },
                { name: "rating", label: "Rating (1-5)", type: "number" },
                { name: "quote", label: "Testimonial", type: "richtext" },
                { name: "image", label: "Student Photo", type: "image" },
                { name: "linkedin", label: "LinkedIn URL", type: "text" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-2xl p-6 relative group hover:shadow-lg transition-all">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-[#00548B] font-bold text-xs bg-[#00548B]/10 px-3 py-1 rounded-lg hover:bg-[#00548B]/20 transition">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-600 font-bold text-xs bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 transition">Delete</button>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <img src={item.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=00548B&color=fff&bold=true`} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <h3 className="text-slate-900 font-bold">{item.name}</h3>
                            <p className="text-slate-400 text-xs">{item.course}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {item.company && <span className="text-[10px] font-bold text-[#00548B] bg-[#00548B]/10 px-2.5 py-1 rounded-full">{item.company}</span>}
                        {item.salary && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{item.salary}</span>}
                        {item.rating && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">{item.rating}/5</span>}
                    </div>
                    <div className="text-slate-600 text-sm" dangerouslySetInnerHTML={{ __html: item.quote || '' }} />
                </div>
            )}
        />
    );
};

export default TestimonialsAdmin;
