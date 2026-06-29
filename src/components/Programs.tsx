"use client";
import React, { useState, useEffect } from "react";
import {
  FaCode, FaClock, FaUsers,
  FaProjectDiagram, FaCertificate, FaArrowRight, FaGraduationCap,
  FaCheckCircle, FaLaptopCode,
  FaBriefcase, FaHandshake
} from "react-icons/fa";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { apiService } from "@/services/apiService";
import type { Course } from "@/types";
import { slugify } from "@/utils/slug";

const Programs = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const coursesData = await apiService.getCourses();
        const normalized: Course[] = (coursesData || []).map((c: any) => ({
          ...c,
          slug: c.slug ?? slugify(c.title ?? `course-${c.id}`),
        }));
        setCourses(normalized);
      } catch (err) {
        console.error("Programs Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section id="programs" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundColor: "#004381" }} />
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 opacity-[0.25]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-ping" />
            IT Training Institute
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95]">
            <span className="block text-white">Professional</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-300">
              Training Programs
            </span>
          </h2>
          <p className="text-white/60 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Job-ready IT courses with internship, live projects, certification, and 100% placement assistance
          </p>
        </div>

        {/* Courses Slider */}
        <div className="min-h-[500px]">
          <div className="space-y-10 animate-in fade-in duration-500">
            {loading ? (
              <div className="flex gap-6 overflow-hidden">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-shrink-0 w-[380px] bg-white rounded-3xl p-4 border border-slate-100 animate-pulse">
                    <div className="aspect-[16/10] bg-slate-100 rounded-2xl mb-4" />
                    <div className="h-6 bg-slate-100 rounded-xl w-3/4 mb-2" />
                    <div className="h-4 bg-slate-100 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                className="coursesSwiper pb-14"
              >
                {courses.map((course) => (
                  <SwiperSlide key={course.id}>
                    <Link href={`/courses/${course.slug}`} className="block group">
                      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                        {/* Image */}
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                          <img
                            src={course.image || "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=70&w=800"}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-sangalo-900 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                            {course.duration}
                          </div>
                          <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                            Popular
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-2 space-y-4 flex flex-col flex-1">
                          <div className="space-y-2">
                            <span className="text-[9px] font-black text-cyan-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-lg border border-white/20 inline-block">
                              {course.module}
                            </span>
                            <h4 className="font-black text-white group-hover:text-cyan-300 transition-colors leading-tight text-lg">
                              {course.title}
                            </h4>
                          </div>

                          {/* Feature Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              { icon: FaClock, text: course.duration || "3 Months" },
                              { icon: FaBriefcase, text: "Internship" },
                              { icon: FaProjectDiagram, text: "Live Projects" },
                              { icon: FaCertificate, text: "Certificate" },
                              { icon: FaHandshake, text: "Job Assistance" },
                            ].map((tag, i) => (
                              <span key={i} className="inline-flex items-center gap-1 text-[8px] font-bold text-green-300 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">
                                <FaCheckCircle className="text-[6px]" /> {tag.text}
                              </span>
                            ))}
                          </div>

                          <div
                            className="text-sm text-white/60 font-medium line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: course.description }}
                          />

                          {/* Price + CTA */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                            <div>
                              <span className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Fee From</span>
                              <span className="text-xl font-black text-white">Rs. {course.price?.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-all duration-300">
                              <span className="text-[10px] font-black uppercase tracking-widest">Enroll Now</span>
                              <div className="w-12 h-12 rounded-xl bg-white text-sangalo-900 flex items-center justify-center group-hover:scale-110 transition-all shadow-lg">
                                <FaArrowRight className="text-sm" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="text-center">
              <Link
                href="/courses"
                className="inline-flex items-center gap-3 bg-sangalo-900 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-sangalo-800 transition-all shadow-xl"
              >
                View All Courses
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
