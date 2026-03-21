"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
    FaSearch, 
    FaFilter, 
    FaStar, 
    FaStarHalfAlt, 
    FaClock, 
    FaUser, 
    FaCartPlus, 
    FaPlayCircle, 
    FaCheckCircle,
    FaArrowRight,
    FaRegPlayCircle
} from "react-icons/fa";
import { apiService } from "@/services/apiService";
import { VideoCourse } from "@/types";
import { useCart } from "@/context/CartContext";
import CartToast from "@/components/CartToast";

const VideoMarketplacePage = () => {
    const { data: session } = useSession();
    const { addToCart } = useCart();
    const [courses, setCourses] = useState<VideoCourse[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<VideoCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [addedCourse, setAddedCourse] = useState<VideoCourse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await apiService.getVideoCourses();
                setCourses(data);
                setFilteredCourses(data);
            } catch (err) {
                console.error("Failed to fetch video courses", err);
            } finally {
                setLoading(false);
            }
        };

        const fetchEnrollments = async () => {
            if (session) {
                try {
                    const res = await axios.get("/api/user/enrolled-courses");
                    setEnrolledIds(res.data.map((c: any) => c._id || c.id));
                } catch (err) {
                    console.error("Failed to fetch enrollments", err);
                }
            }
        };

        fetchData();
        fetchEnrollments();
    }, [session]);

    useEffect(() => {
        let results = courses;
        if (selectedCategory !== "All") {
            results = results.filter(c => c.category === selectedCategory);
        }
        if (searchTerm) {
            results = results.filter(c => 
                c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredCourses(results);
    }, [searchTerm, selectedCategory, courses]);

    const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<FaStar key={i} className="text-amber-400" />);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                stars.push(<FaStarHalfAlt key={i} className="text-amber-400" />);
            } else {
                stars.push(<FaStar key={i} className="text-slate-700" />);
            }
        }
        return stars;
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 pt-32 pb-20 px-6 font-sans">
            {/* Background Glows */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-16 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                Professional <span className="text-indigo-500">Masterclasses</span>
                            </h1>
                            <p className="text-slate-400 text-lg max-w-2xl font-medium">
                                Upgrade your skills with our curated library of unlisted video content. Expert guidance, real-world projects, and lifetime access.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-slate-500">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {courses.length} Courses Available
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col lg:flex-row gap-6 p-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] shadow-2xl">
                        <div className="flex-1 relative group">
                            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
                            <input 
                                type="text"
                                placeholder="Search by course title or instructor..."
                                className="w-full bg-transparent border-0 pl-14 pr-6 py-5 text-white font-bold placeholder:text-slate-600 focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="h-px lg:h-12 lg:w-px bg-slate-800 self-center" />
                        <div className="flex items-center gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                        selectedCategory === cat 
                                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" 
                                        : "bg-slate-800/50 text-slate-500 hover:text-white hover:bg-slate-800"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-video bg-slate-900/50 rounded-[3rem] animate-pulse border border-slate-800" />
                        ))}
                    </div>
                ) : filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredCourses.map((course) => {
                            const isEnrolled = enrolledIds.includes(course._id || course.id);
                            return (
                                <div 
                                    key={course.id} 
                                    className="group bg-slate-900/40 border border-slate-800 rounded-[3.5rem] overflow-hidden hover:border-indigo-500/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 shadow-2xl hover:shadow-indigo-500/10"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <img 
                                            src={course.thumbnail} 
                                            alt={course.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-indigo-600/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10">
                                                {course.category}
                                            </span>
                                        </div>
                                        {isEnrolled && (
                                            <div className="absolute top-6 right-6">
                                                <div className="bg-emerald-500/90 backdrop-blur-md text-white p-2 rounded-full shadow-lg border border-white/10" title="Owned">
                                                    <FaCheckCircle className="text-sm" />
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                                                <FaRegPlayCircle className="text-indigo-600 text-4xl" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-10 flex flex-col flex-grow space-y-6">
                                        <div className="space-y-4 flex-grow">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                <FaUser className="text-indigo-500 opacity-70" /> {course.instructor}
                                            </div>
                                            <h3 className="text-2xl font-black text-white tracking-tight leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                {course.title}
                                            </h3>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1">
                                                    {renderStars(course.rating)}
                                                </div>
                                                <span className="text-xs font-black text-amber-400">{course.rating}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between py-6 border-y border-slate-800">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5 line-through">
                                                    Rs. {course.originalPrice}
                                                </span>
                                                <span className="text-3xl font-black text-white tracking-tighter">
                                                    Rs. {course.price}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
                                                    <FaClock className="text-indigo-500" /> {course.totalHours} Hrs
                                                </div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                    {typeof course.lessons === 'number' ? course.lessons : course.lessons?.length || 0} Lessons
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            {isEnrolled ? (
                                                <Link 
                                                    href="/student-dashboard" 
                                                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 no-underline shadow-xl shadow-emerald-600/20"
                                                >
                                                    <FaPlayCircle /> Start Learning
                                                </Link>
                                            ) : (
                                                <button 
                                                    onClick={() => {
                                                        addToCart(course);
                                                        setAddedCourse(course);
                                                    }}
                                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 active:scale-95"
                                                >
                                                    <FaCartPlus /> Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-32 text-center space-y-8 bg-slate-900/30 rounded-[4rem] border border-dashed border-slate-800">
                        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-4xl text-slate-600">
                            <FaSearch />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-white">No courses match your search</h3>
                            <p className="text-slate-500 font-medium">Try different keywords or browse all categories.</p>
                        </div>
                        <button 
                            onClick={() => {setSearchTerm(""); setSelectedCategory("All");}}
                            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Notification Toast */}
            {addedCourse && <CartToast course={addedCourse} onClose={() => setAddedCourse(null)} />}
        </div>
    );
};

export default VideoMarketplacePage;
