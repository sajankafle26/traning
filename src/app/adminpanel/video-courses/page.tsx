"use client";
import React from "react";
import AdminCRUD from "@/components/AdminCRUD";
import { FaVideo, FaClock, FaLayerGroup, FaUser } from "react-icons/fa6";

const VideoCoursesAdmin = () => {
    return (
        <AdminCRUD
            title="Manage Video Courses"
            apiPath="/api/courses"
            fields={[
                { name: "title", label: "Course Title", type: "text" },
                { name: "instructor", label: "Instructor Name", type: "text" },
                { name: "category", label: "Category", type: "text" },
                { name: "description", label: "Description (Rich Text)", type: "richtext" },
                { name: "price", label: "Price (NPR)", type: "number" },
                { name: "originalPrice", label: "Original Price (for Discount Display)", type: "number" },
                { name: "totalHours", label: "Total Duration (e.g. 15h 30m)", type: "text" },
                { name: "thumbnail", label: "Course Thumbnail URL", type: "image" },
                { name: "previewVideo", label: "Course Preview Video (URL or Upload)", type: "video" },
                { name: "rating", label: "Initial Rating (1-5)", type: "number" },
                { name: "lessons", label: "Lessons (Paste JSON array of modules)", type: "json" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-7 relative group flex flex-col h-full hover:border-indigo-500/30 transition-all shadow-xl">
                    <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button onClick={() => onEdit(item)} className="bg-indigo-600/90 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="bg-rose-600/90 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500">Delete</button>
                    </div>
                    
                    <div className="aspect-video relative mb-6 overflow-hidden rounded-3xl">
                        {item.thumbnail ? (
                            <img src={item.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                        ) : (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                <FaVideo className="text-slate-600 text-3xl" />
                            </div>
                        )}
                        <div className="absolute top-4 left-4">
                            <span className="bg-slate-950/80 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                                {item.category}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">
                                <FaUser /> {item.instructor}
                            </div>
                            <h3 className="text-white font-black text-xl leading-tight line-clamp-2">{item.title}</h3>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-y border-slate-800/50 py-3">
                            <span className="flex items-center gap-1.5"><FaClock className="text-indigo-500" /> {item.totalHours}</span>
                            <span className="flex items-center gap-1.5"><FaLayerGroup className="text-indigo-500" /> {item.lessons?.length || 0} Modules</span>
                        </div>

                        <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                                {item.originalPrice > item.price && (
                                    <span className="text-[10px] text-slate-500 line-through font-bold">Rs. {item.originalPrice}</span>
                                )}
                                <span className="text-2xl font-black text-white tracking-tight">Rs. {item.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        />
    );
};

export default VideoCoursesAdmin;
