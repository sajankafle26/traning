"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaCode,
  FaBullhorn,
  FaWordpress,
  FaMicrochip,
  FaClock,
  FaUsers,
  FaProjectDiagram,
  FaCertificate,
  FaArrowRight,
  FaGraduationCap,
  FaCogs,
  FaBoxOpen,
  FaRocket,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { apiService } from "@/services/apiService";
import type { Course, ServiceItem, Product } from "@/types";
import { slugify } from "@/utils/slug";

type MainTab = "services" | "courses" | "products";

const serviceIcons: Record<string, React.ReactNode> = {
  web: <FaCode className="text-2xl" />,
  marketing: <FaBullhorn className="text-2xl" />,
  software: <FaCogs className="text-2xl" />,
  consulting: <FaRocket className="text-2xl" />,
  default: <FaCogs className="text-2xl" />,
};

const Programs = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<MainTab>("services");
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [coursesData, servicesData, productsData] = await Promise.all([
          apiService.getCourses(),
          apiService.getServices(),
          apiService.getProducts(),
        ]);

        const normalized: Course[] = (coursesData || []).map((c: any) => ({
          ...c,
          slug: c.slug ?? slugify(c.title ?? `course-${c.id}`),
        }));

        setCourses(normalized);
        setServices(servicesData || []);
        setProducts(productsData || []);
      } catch (err) {
        console.error("Programs Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const mainTabs = [
    { id: "services" as MainTab, label: "Services", icon: <FaCogs /> },
    { id: "courses" as MainTab, label: "Courses", icon: <FaGraduationCap /> },
    { id: "products" as MainTab, label: "Products", icon: <FaBoxOpen /> },
  ];

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background - Same as Hero */}
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
            What We Offer
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95]">
            <span className="block text-white">Our Services</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-300">
              & Professional Programs
            </span>
          </h2>
          <p className="text-white/60 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive IT solutions and professional training to accelerate your career and business growth
          </p>
        </div>

        {/* Main Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white/10 backdrop-blur-xl p-2 rounded-2xl gap-2 border border-white/20">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-[#004381] shadow-xl"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[500px]">
          {/* SERVICES TAB */}
          {activeTab === "services" && (
            <div className="space-y-10 animate-in fade-in duration-500">
              {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 animate-pulse space-y-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl" />
                      <div className="h-6 bg-slate-100 rounded-xl w-3/4" />
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
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  className="coursesSwiper pb-14"
                >
                  {services.map((service) => (
                    <SwiperSlide key={service.id}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="block group"
                      >
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 h-full">
                          {/* Service Image */}
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={service.image || "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=600"}
                              alt={service.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#004381]/80 via-transparent to-transparent" />
                            <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-sangalo-900 group-hover:scale-110 transition-all duration-500 shadow-lg">
                              {serviceIcons[service.icon] || serviceIcons.default}
                            </div>
                          </div>

                          {/* Service Content */}
                          <div className="p-6 space-y-4">
                            <h4 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                              {service.title}
                            </h4>
                            <p
                              className="text-sm text-white/60 font-medium leading-relaxed line-clamp-3"
                              dangerouslySetInnerHTML={{ __html: service.description }}
                            />
                            <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-all duration-300 pt-2">
                              <span className="text-[10px] font-black uppercase tracking-widest">Learn More</span>
                              <FaArrowRight className="text-xs" />
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
                  href="/services"
                  className="inline-flex items-center gap-3 bg-sangalo-900 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-sangalo-800 transition-all shadow-xl"
                >
                  View All Services
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          )}

          {/* COURSES TAB */}
          {activeTab === "courses" && (
            <div className="space-y-10 animate-in fade-in duration-500">
              {loading ? (
                <div className="flex gap-6 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-shrink-0 w-[350px] bg-white rounded-3xl p-4 border border-slate-100 animate-pulse">
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
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 h-full">
                          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5">
                            <img
                              src={course.image || "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=70&w=800"}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-sangalo-900 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                              {course.duration}
                            </div>
                          </div>
                          <div className="px-2 space-y-4">
                            <div className="space-y-2">
                              <span className="text-[9px] font-black text-cyan-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-lg border border-white/20 inline-block">
                                {course.module}
                              </span>
                              <h4 className="font-black text-white group-hover:text-cyan-300 transition-colors leading-tight text-lg">
                                {course.title}
                              </h4>
                            </div>
                            <div
                              className="text-sm text-white/60 font-medium line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: course.description }}
                            />
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div>
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Fee From</span>
                                <span className="text-xl font-black text-white">Rs. {course.price.toLocaleString()}</span>
                              </div>
                              <div className="w-12 h-12 rounded-xl bg-white text-sangalo-900 flex items-center justify-center group-hover:scale-110 transition-all shadow-lg">
                                <FaArrowRight className="text-sm" />
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
          )}

          {/* PRODUCTS TAB */}
          {activeTab === "products" && (
            <div className="space-y-10 animate-in fade-in duration-500">
              {loading ? (
                <div className="flex gap-6 overflow-hidden">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex-shrink-0 w-[400px] bg-white/10 rounded-3xl overflow-hidden border border-white/20 animate-pulse">
                      <div className="aspect-[16/9] bg-white/10" />
                      <div className="p-8 space-y-4">
                        <div className="h-6 bg-white/10 rounded-xl w-3/4" />
                        <div className="h-4 bg-white/10 rounded-xl w-full" />
                      </div>
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
                  autoplay={{ delay: 4500, disableOnInteraction: false }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="coursesSwiper pb-14"
                >
                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 h-full">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#004381]/80 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-6 right-6">
                            <h4 className="text-xl font-black text-white">{product.title}</h4>
                          </div>
                        </div>
                        <div className="p-6 space-y-4">
                          <div
                            className="text-sm text-white/60 font-medium leading-relaxed line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: product.description }}
                          />
                          {product.link && (
                            <a
                              href={product.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-white text-sangalo-900 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-cyan-300 transition-all"
                            >
                              View Details
                              <FaArrowUpRightFromSquare className="text-[9px]" />
                            </a>
                          )}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <div className="text-center">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-3 bg-white text-[#004381] px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-cyan-300 transition-all shadow-xl"
                >
                  View All Products
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="pt-16 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <FaClock />, value: "2Hrs/Day", label: "Lab Sessions" },
            { icon: <FaUsers />, value: "Included", label: "Project Shadowing" },
            { icon: <FaProjectDiagram />, value: "100%", label: "Internship Support" },
            { icon: <FaCertificate />, value: "Global", label: "Certification" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-sangalo-50 border border-sangalo-100 hover:bg-sangalo-900 group transition-all duration-300">
              <div className="w-12 h-12 bg-white text-sangalo-900 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-white/20 group-hover:text-white transition-all">
                {stat.icon}
              </div>
              <div>
                <div className="text-xl font-black text-sangalo-900 group-hover:text-white transition-colors">{stat.value}</div>
                <div className="text-[10px] font-bold text-sangalo-600 group-hover:text-white/70 uppercase tracking-widest transition-colors">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
