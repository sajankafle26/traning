"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiService } from "@/services/apiService";
import { slugify } from "@/utils/slug";
import type { Course } from "@/types";
import FAQSection from "@/components/FAQSection";
import {
  FaArrowRight, FaClock, FaUsers, FaGraduationCap, FaCertificate,
  FaCode, FaBullhorn, FaWordpress, FaCogs, FaRocket, FaPenNib, FaLaptopCode,
  FaCheckCircle, FaStar, FaHandshake
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

const CATEGORY_LABELS: Record<string, string> = {
  js: "Development",
  dm: "Marketing",
  wp: "WordPress",
  robotics: "Robotics",
  design: "Design",
  frontend: "Frontend",
  default: "Course",
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

const COURSE_FAQS = [
  {
    question: "What courses does Sangalo Tech offer?",
    answer: "Sangalo Tech offers 9+ professional IT training courses including MERN Stack Mastery, React & Next.js, PHP Laravel, Python Django, UI/UX Design, Digital Marketing, WordPress Customization, Robotics & IoT, and Data Science with ML & AI. All courses are designed to make you job-ready.",
  },
  {
    question: "How much do the courses cost at Sangalo Tech?",
    answer: "Course fees range from Rs. 8,000 to Rs. 24,000 depending on the program. Most development courses start at Rs. 8,000 for foundational courses, while advanced full-stack programs like MERN Stack and Data Science range from Rs. 16,000 to Rs. 24,000. We also offer installment payment options.",
  },
  {
    question: "Does Sangalo Tech provide job placement after course completion?",
    answer: "Yes, Sangalo Tech provides 100% placement assistance. We have partnerships with top IT companies in Nepal and conduct regular hiring drives. Our graduates have been placed at companies like F1Soft, Leapfrog, Fusemachine, and Webpoint.",
  },
  {
    question: "Are the courses suitable for beginners?",
    answer: "Absolutely! Our courses are designed from beginner to advanced level. You don't need any prior coding experience for most courses — just basic computer knowledge and a willingness to learn. We start with fundamentals and gradually move to advanced topics.",
  },
  {
    question: "Where is Sangalo Tech located in Nepal?",
    answer: "Sangalo Tech Pvt. Ltd. is located in Lokenthali, Bhaktapur, Nepal. We are easily accessible from Kathmandu and Lalitpur. We also offer hybrid and some fully remote learning options for select courses.",
  },
];

const STATS = [
  { number: "600+", label: "Students Trained", icon: FaUsers },
  { number: "9+", label: "Professional Courses", icon: FaGraduationCap },
  { number: "95%", label: "Placement Rate", icon: FaHandshake },
  { number: "6+", label: "Years Experience", icon: FaCertificate },
];

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

  const courseListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Professional IT Training Courses at Sangalo Tech Nepal",
    description: "Explore job-ready IT courses including MERN Stack, React & Next.js, Python Django, UI/UX Design, Digital Marketing, and more at Sangalo Tech, Nepal's top IT training institute.",
    numberOfItems: filtered.length,
    itemListElement: filtered.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://sangalotech.com/courses/${course.slug}`,
      name: course.title,
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListJsonLd) }} />

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
            Professional IT Training
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] max-w-5xl mx-auto">
            IT Training Courses
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-200">
              in Nepal
            </span>
          </h1>
          <p className="mt-8 text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Industry-aligned courses designed to make you job-ready from day one.
            Learn from real developers building real products.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16">
            {STATS.map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <stat.icon className="text-white/80 text-lg mb-2" />
                <div className="text-2xl font-black text-white">{stat.number}</div>
                <div className="text-xs text-white/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#00548B] transition-colors no-underline text-slate-500">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Courses</span>
        </div>
      </div>

      {/* Courses */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
              Explore Programs
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              All <span className="text-[#00548B]">Courses</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Choose from our comprehensive range of IT training programs. Each course is designed with industry input to ensure maximum employability.
            </p>
          </div>

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
                  {cat === "all" ? "All Courses" : CATEGORY_LABELS[cat] || cat}
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
                    <article className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-[#00548B]/10 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={course.image || `https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=80&w=800`}
                          alt={`${course.title} training at Sangalo Tech Nepal`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
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
                        <div className="absolute top-4 left-4 bg-[#00548B]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                          <FaStar className="inline mr-1" /> Popular
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4 flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
                            <Icon className="text-white text-sm" />
                          </div>
                          <span className="text-[10px] font-bold text-[#00548B] uppercase tracking-widest bg-[#00548B]/10 px-3 py-1 rounded-full">
                            {CATEGORY_LABELS[course.category || 'default'] || course.module || course.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 group-hover:text-[#00548B] transition-colors leading-tight">
                          {course.title}
                        </h3>
                        <div
                          className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 [&_p]:mb-2 [&_p:last-child]:mb-0 flex-1"
                          dangerouslySetInnerHTML={{ __html: course.description }}
                        />

                        {/* Quick Benefits */}
                        <div className="flex flex-wrap gap-2">
                          {['Certificate', 'Job Ready', 'Projects'].map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                              <FaCheckCircle className="text-[7px]" /> {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Fee From</span>
                            <span className="text-2xl font-black text-[#00548B]">Rs. {course.price?.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#00548B] font-bold text-sm group-hover:gap-3 transition-all">
                            <span className="hidden sm:inline">View Details</span>
                            <div className="w-12 h-12 rounded-xl bg-[#00548B] text-white flex items-center justify-center group-hover:scale-110 transition-all shadow-lg shadow-[#00548B]/20">
                              <FaArrowRight className="text-sm" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#f8fbff] to-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Why <span className="text-[#00548B]">Choose Sangalo Tech?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaRocket, title: "Project-Based Learning", desc: "Build real-world projects from day one, not just theory." },
              { icon: FaHandshake, title: "100% Placement Support", desc: "Dedicated career services with top IT company partnerships." },
              { icon: FaCertificate, title: "Industry Certification", desc: "Get certified by a recognized IT training institute in Nepal." },
              { icon: FaUsers, title: "Expert Mentors", desc: "Learn from senior developers actively working in the industry." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-[#00548B]/20 transition-all duration-300 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#00548B]/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon className="text-2xl text-[#00548B]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our courses and training programs"
        faqs={COURSE_FAQS}
      />

      {/* CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: '#00548B' }}>
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[0.9] mb-6">
            Ready to Start<br />Your IT Career?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Join 600+ students who have transformed their careers with Sangalo Tech.
            Enroll now and become job-ready in months.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#00548B] px-10 py-5 rounded-2xl font-bold text-sm hover:shadow-2xl hover:-translate-y-1 transition-all no-underline">
              Enroll Now <FaArrowRight />
            </Link>
            <Link href="/upcoming" className="inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all no-underline">
              View Upcoming Batches
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
