"use client";
import React, { useState } from "react";
import AdminCRUD from "@/components/AdminCRUD";
import { FaGoogle, FaCheck, FaSpinner } from "react-icons/fa6";

const BlogsAdmin = () => {
    const [posting, setPosting] = useState<string | null>(null);
    const [posted, setPosted] = useState<string[]>([]);

    const postToGBP = async (item: any) => {
        setPosting(item._id);
        try {
            const res = await fetch('/api/google-business', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: item.title,
                    excerpt: item.excerpt,
                    slug: item.slug || item.title?.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
                    image: item.image,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setPosted(prev => [...prev, item._id]);
            } else {
                alert('Failed: ' + (data.error || 'Unknown error'));
            }
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setPosting(null);
        }
    };

    return (
        <AdminCRUD
            title="Manage Blogs"
            apiPath="/api/blogs"
            fields={[
                { name: "title", label: "Blog Title", type: "text" },
                { name: "slug", label: "Slug", type: "text" },
                { name: "date", label: "Date", type: "text" },
                { name: "excerpt", label: "Excerpt", type: "textarea" },
                { name: "image", label: "Feature Image", type: "image" },
                { name: "link", label: "Read More Link", type: "text" },
            ]}
            renderItem={(item, onDelete, onEdit) => (
                <div key={item._id} className="bg-white border border-slate-200 rounded-[2rem] p-6 relative group">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="text-indigo-600 font-bold text-xs">Edit</button>
                        <button onClick={() => onDelete(item._id)} className="text-red-600 font-bold text-xs">Delete</button>
                    </div>
                    <img src={item.image} className="w-full aspect-video object-cover rounded-2xl mb-4" />
                    <h3 className="text-slate-900 font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-xs mb-2">{item.date}</p>
                    <p className="text-slate-600 text-sm line-clamp-2">{item.excerpt}</p>

                    {/* Post to Google Business Profile */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        {posted.includes(item._id) ? (
                            <span className="inline-flex items-center gap-2 text-green-600 text-xs font-bold">
                                <FaCheck /> Posted to Google
                            </span>
                        ) : (
                            <button
                                onClick={() => postToGBP(item)}
                                disabled={posting === item._id}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {posting === item._id ? (
                                    <><FaSpinner className="animate-spin" /> Posting...</>
                                ) : (
                                    <><FaGoogle /> Post to Google</>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            )}
        />
    );
};

export default BlogsAdmin;
