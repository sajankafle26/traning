"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiService } from "@/services/apiService";
import { slugify } from "@/utils/slug";
import type { Course } from "@/types";
import {
  FaArrowRight, FaClock, FaUsers, FaGraduationCap, FaCertificate,
  FaCode, FaBullhorn, FaWordpress, FaCogs, FaRocket, FaPenNib, FaLaptopCode
} from "react-icons/fa";

const CATEGORY_ICONS: Record<string, any> = {
  js: FaCode,
  dm: FaBullhorn,
  wp: FaWordpress,
  robotics: FaCogs,
  design: FaPenNib,
  frontend: FaLaptopCode,
  default: FaGraduationCap,
};

const CATEGORY_COLORS: Record<string, string> = {
  js: "bg-blue-500",
  dm: "bg-emerald-500",
  wp: "bg-violet-500",
  robotics: "bg-amber-500",
  design: "bg-pink-500",
  frontend: "bg-cyan-500",
  default: "bg-[#00548B]",
};

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiService.getCourses();
        const normalized = (data || []).map((c: any) => ({
          ...c,
          slug: c.slug ?? slugify(c.title ?? `course-${c.id}`),
        }));
        setCourses(normalized);
      } catch (e) {
        console.error("Failed to fetch courses:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ["all", ...new Set(courses.map(c => c.category).filter(Boolean) as string[])];

  const filtered = filter === "all" ? courses : courses.filter(c => c.category === filter);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden" style={{ backgroundColor: '#00548B' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/15 mb-8">
            <FaGraduationCap className="text-xs" />
            Our Courses
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] max-w-5xl mx-auto">
            Professional
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-200">
              IT Training Programs
            </span>
          </h1>
          <p className="mt-8 text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Industry-aligned courses designed to make you job-ready from day one
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat || 'default'] || FaGraduationCap;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                    filter === cat
                      ? "bg-[#00548B] text-white shadow-lg shadow-[#00548B]/20"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-[#00548B]/20 hover:text-[#00548B]"
                  }`}
                >
                  <Icon className="text-xs" />
                  {cat === "all" ? "All Courses" : cat}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 animate-pulse">
                  <div className="aspect-[16/10] bg-slate-100" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-slate-100 rounded-xl w-3/4" />
                    <div className="h-4 bg-slate-100 rounded-xl w-full" />
                    <div className="h-4 bg-slate-100 rounded-xl w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <FaGraduationCap className="text-5xl text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-3">No Courses Found</h3>
              <p className="text-slate-500">No courses available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((course) => {
                const Icon = CATEGORY_ICONS[course.category || 'default'] || FaGraduationCap;
                const color = CATEGORY_COLORS[course.category || 'default'] || 'bg-[#00548B]';
                return (
                  <Link key={course.id} href={`/courses/${course.slug}`} className="block group">
                    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-[#00548B]/10 transition-all duration-500 hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={course.image || `https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=80&w=800`}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=80&w=800`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {course.duration && (
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#00548B] px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                            <FaClock className="inline mr-1" /> {course.duration}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
                            <Icon className="text-white text-sm" />
                          </div>
                          <span className="text-[10px] font-bold text-[#00548B] uppercase tracking-widest bg-[#00548B]/10 px-3 py-1 rounded-full">
                            {course.module || course.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-[#00548B] transition-colors leading-tight">
                          {course.title}
                        </h3>
                        <div
                          className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 [&_p]:mb-2 [&_p:last-child]:mb-0"
                          dangerouslySetInnerHTML={{ __html: course.description }}
                        />
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Fee From</span>
                            <span className="text-2xl font-black text-[#00548B]">Rs. {course.price?.toLocaleString()}</span>
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-[#00548B] text-white flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-[#00548B]/20">
                            <FaArrowRight className="text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: '#00548B' }}>
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[0.9] mb-6">
            Can&apos;t Find What You Need?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Contact us for custom training programs tailored to your team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#00548B] px-10 py-5 rounded-2xl font-bold text-sm hover:shadow-2xl hover:-translate-y-1 transition-all no-underline">
              Contact Us <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
