"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { Course, UpcomingBatch, SyllabusModule, VideoCourse } from "@/types";
import { apiService } from "@/services/apiService";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaBolt,
  FaBriefcase,
  FaBuilding,
  FaCertificate,
  FaCheck,
  FaChevronDown,
  FaCircleCheck,
  FaCreditCard,
  FaGithub,
  FaGlobe,
  FaHandshake,
  FaHeadset,
  FaListCheck,
  FaLinkedinIn,
  FaMicrochip,
  FaPaperPlane,
  FaRocket,
  FaScroll,
  FaServer,
  FaSpinner,
  FaUsers,
  FaClock,
  FaLink,
  FaCartPlus,
  FaBasketShopping,
  FaPlay,
  FaYoutube,
} from "react-icons/fa6";
import Image from "next/image";
import StickyEnroll from "@/components/StickyEnroll";

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

const toHeroImageSrc = (src?: string) => {
  if (!src)
    return "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&q=70&w=1200";
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith("/")) return src;
  return `/${src}`;
};

const toHoursLabel = (duration: string) => {
  const m = duration?.match(/^\s*([\d.]+)/);
  return m ? `${m[1]} Hrs` : duration || "N/A";
};

/* -------------------------------------------------------------------------- */
/*                              Syllabus Accordion                            */
/* -------------------------------------------------------------------------- */

type ReadingLink = { label: string; url?: string };
type MixedCurriculumItem =
  | string
  | {
      id: string;
      title: string;
      objectives?: string[];
      keyTopics?: string[];
      activities?: string[];
      deliverables?: string[];
      tools?: string[];
      duration?: string;
      prerequisites?: string[];
      reading?: ReadingLink[];
    };

const isCurriculumItem = (
  v: MixedCurriculumItem
): v is Exclude<MixedCurriculumItem, string> =>
  !!v && typeof v === "object" && "title" in v;

const getCurriculumTitle = (v: MixedCurriculumItem) =>
  isCurriculumItem(v) ? v.title : v;

const getModuleItems = (mod: SyllabusModule | any): string[] => {
  if (Array.isArray(mod?.topics)) return mod.topics as string[];
  if (Array.isArray(mod?.lessons)) {
    return mod.lessons.map((l: any) =>
      l?.duration ? `${l.title} • ${l.duration}` : l.title
    );
  }
  return [];
};

const SectionList = ({
  label,
  items,
  icon,
}: {
  label: string;
  items?: string[];
  icon?: React.ReactNode;
}) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
        {icon}
        {label}
      </div>
      <ul className="grid sm:grid-cols-2 gap-3">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
            <span className="w-5 h-5 rounded-full bg-[#00548B]/10 text-[#00548B] flex items-center justify-center mt-0.5 shrink-0">
              <FaCheck className="text-[10px]" aria-hidden />
            </span>
            <span className="leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ReadingList = ({ items }: { items?: ReadingLink[] }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
        <FaLink /> Recommended Reading
      </div>
      <ul className="space-y-2">
        {items.map((r, i) => (
          <li key={i}>
            {r.url ? (
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#00548B] font-semibold hover:underline text-sm"
              >
                {r.label}
              </a>
            ) : (
              <span className="text-slate-600 font-medium text-sm">{r.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                          Curriculum Accordion                              */
/* -------------------------------------------------------------------------- */

const CurriculumAccordion = ({
  curriculum,
  title = "Curriculum",
  subtitle,
  description,
  defaultOpenIndex = 0,
}: {
  curriculum?: MixedCurriculumItem[];
  title?: string;
  subtitle?: string;
  description?: string;
  defaultOpenIndex?: number | null;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const items = curriculum ?? [];

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 border border-slate-100 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <FaListCheck className="text-2xl text-slate-300" aria-hidden />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Curriculum</h3>
        <p className="text-slate-400 text-sm mt-2">
          The curriculum will be published soon.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        {subtitle && (
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B] block">
            {subtitle}
          </span>
        )}
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2>
        {description && (
          <div
            className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>

      <div className="space-y-3">
        {items.map((raw, i) => {
          const name = getCurriculumTitle(raw);
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-200 ${
                isOpen
                  ? "bg-white border-slate-200 shadow-sm"
                  : "bg-white border-slate-100 hover:border-slate-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={isOpen}
                aria-controls={`curriculum-panel-${i}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                      isOpen
                        ? "bg-[#00548B] text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <h4
                    className={`text-base font-bold tracking-tight transition-colors ${
                      isOpen ? "text-slate-900" : "text-slate-600"
                    }`}
                  >
                    {name}
                  </h4>
                </div>
                <FaChevronDown
                  className={`text-xs text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={`curriculum-panel-${i}`}
                className={`transition-all duration-300 overflow-hidden ${
                  isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-6 pt-2 space-y-6 border-t border-slate-50">
                  {!isCurriculumItem(raw) ? (
                    <p className="text-slate-500 font-medium leading-relaxed text-sm">
                      {raw}
                    </p>
                  ) : (
                    <>
                      {raw.duration && (
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 px-3 py-1.5 rounded-md border border-slate-100">
                          <FaClock /> {raw.duration}
                        </span>
                      )}
                      <div className="grid gap-6">
                        <SectionList label="Objectives" items={raw.objectives} />
                        <SectionList label="Key Topics" items={raw.keyTopics} />
                        <SectionList label="Activities" items={raw.activities} />
                        <SectionList label="Deliverables" items={raw.deliverables} />
                        <SectionList label="Tools" items={raw.tools} />
                        <ReadingList items={raw.reading} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                             Main Course Details                            */
/* -------------------------------------------------------------------------- */

interface CourseDetailsProps {
  course: Course;
  onBack: () => void;
  onNavigate?: (target: string) => void;
}

const CourseDetails = ({ course, onBack }: CourseDetailsProps) => {
  const [batches, setBatches] = useState<UpcomingBatch[]>([]);
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    phone: "",
    preferredBatch: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  const { data: session } = useSession();

  const isVideoCourse = !!(course as any).lessons;

  useEffect(() => {
    if (session && isVideoCourse) {
      checkEnrollment();
    }
  }, [session, course.id, isVideoCourse]);

  const checkEnrollment = async () => {
    try {
      const res = await axios.get("/api/user/enrolled-courses");
      const enrolled = res.data.some(
        (c: any) => (c._id || c.id) === (course.id || (course as any)._id)
      );
      setIsEnrolled(enrolled);
    } catch (err) {
      console.error("Failed to check enrollment", err);
    }
  };

  const handleBuyNow = () => {
    addToCart(course as any as VideoCourse);
    router.push("/checkout");
  };

  const instructor = course.instructor as any;
  const instructorName: string = instructor?.name ?? "Program Mentor";
  const instructorAvatar: string =
    instructor?.avatar ?? instructor?.image ?? "https://i.pravatar.cc/150?u=mentor";
  const instructorTitle: string = instructor?.title ?? instructor?.role ?? "Instructor";
  const instructorBio: string =
    instructor?.bio ?? "Mentoring driven learners to industry readiness.";

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const allBatches = await apiService.getBatches();
        setBatches(
          (allBatches || []).filter(
            (b) => b.courseId === course.id || b.courseTitle === course.title
          )
        );
      } catch {
        setBatches([]);
      }
    };
    fetchBatches();
    window.scrollTo(0, 0);
  }, [course]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.submitEnrollment({
        name: formData.studentName,
        email: formData.email,
        phone: formData.phone,
        courseId: course.id,
        courseTitle: course.title,
        batchId: formData.preferredBatch,
        message: formData.message,
      });
      setSuccess(true);
    } catch (err) {
      alert("Failed to submit enrollment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-3xl mx-auto">
              <FaCheck />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Application Sent!
              </h2>
              <p className="text-slate-400 text-sm px-6">
                We&apos;ve reserved a tentative spot for you. Our counselor will call
                you within 24 hours to confirm.
              </p>
            </div>
            <button
              onClick={onBack}
              className="bg-[#00548B] text-white px-8 py-4 rounded-lg font-bold text-sm hover:bg-[#004381] transition-all"
            >
              Return to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  const heroImageSrc = toHeroImageSrc(course.image);

  return (
    <div className="min-h-screen bg-white">
      {/* ===================== Hero ===================== */}
      <header className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-[1400px] px-4 mx-auto py-8 md:py-16">
          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors mb-6 md:mb-8"
          >
            <FaArrowLeftLong className="text-xs" />
            Back to Courses
          </button>

          <div className="grid lg:grid-cols-5 gap-8 md:gap-10 items-start">
            {/* Left: Course Info */}
            <div className="lg:col-span-3 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                {course.category && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00548B] bg-[#00548B]/10 px-3 py-1.5 rounded-md">
                    {course.category}
                  </span>
                )}
                {course.module && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md">
                    {course.module}
                  </span>
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-3 py-1.5 rounded-md flex items-center gap-1.5">
                  <FaClock /> {course.duration}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {course.title}
              </h1>

              <div
                className="text-slate-400 text-sm leading-relaxed max-w-2xl hidden md:block"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-2">
                {[
                  { icon: FaBolt, label: "Intensity", value: "Industrial" },
                  { icon: FaMicrochip, label: "Lab Time", value: toHoursLabel(course.duration) },
                  { icon: FaUsers, label: "Mentorship", value: "1:8 Ratio" },
                  { icon: FaBriefcase, label: "Placement", value: "Direct Hire" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-lg p-3 md:p-4 text-center">
                    <stat.icon className="text-[#00548B] text-sm mx-auto mb-1.5" />
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-2 order-first lg:order-last">
              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                <Image
                  src={heroImageSrc}
                  alt={course.title}
                  width={600}
                  height={400}
                  priority
                  className="w-full h-[200px] md:h-[320px] object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== Content ===================== */}
      <div className="max-w-[1400px] px-4 mx-auto py-12 md:py-16 grid lg:grid-cols-12 gap-10 md:gap-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-16">
          {/* Overview */}
          <section className="space-y-6 hidden md:block">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B] block">
                Overview
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                What You Will Learn
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  title: "Industrial Lab Sessions",
                  desc: "Real-world office experience instead of boring classrooms.",
                  Icon: FaBuilding,
                },
                {
                  title: "Live Project Shadowing",
                  desc: "Work alongside senior architects on live enterprise apps.",
                  Icon: FaUsers,
                },
                {
                  title: "Career Prep",
                  desc: "GitHub, LinkedIn optimization, and mock interview drills.",
                  Icon: FaRocket,
                },
                {
                  title: "Direct Hiring",
                  desc: "Top 20% performers are directly hired by our software house.",
                  Icon: FaHandshake,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00548B]/10 flex items-center justify-center shrink-0">
                    <item.Icon className="text-sm text-[#00548B]" aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Curriculum */}
          <CurriculumAccordion
            curriculum={course.curriculum as MixedCurriculumItem[]}
          />

          {/* Outcomes */}
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B] block">
                Outcomes
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                What You Get
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Industrial Lab", desc: "Real-world office environment.", Icon: FaBuilding },
                { label: "Cloud Access", desc: "Enterprise cloud resources.", Icon: FaServer },
                { label: "Certification", desc: "Industry recognized credentials.", Icon: FaCertificate },
                { label: "Global Job Sync", desc: "International interview prep.", Icon: FaGlobe },
              ].map((o, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-all text-center"
                >
                  <o.Icon className="text-xl text-[#00548B] mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{o.label}</h3>
                  <p className="text-[11px] text-slate-400">{o.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Instructor */}
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B] block">
                Instructor
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Your Mentor
              </h2>
            </div>
            <div className="flex gap-5 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <img
                src={instructorAvatar}
                alt={instructorName}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-slate-900">{instructorName}</h3>
                <p className="text-xs text-[#00548B] font-semibold">{instructorTitle}</p>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{instructorBio}</p>
                {(instructor?.links?.linkedin || instructor?.links?.portfolio) && (
                  <div className="flex gap-3 mt-3">
                    {instructor?.links?.linkedin && (
                      <a href={instructor.links.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#00548B] transition-colors">
                        <FaLinkedinIn className="text-sm" />
                      </a>
                    )}
                    {instructor?.links?.portfolio && (
                      <a href={instructor.links.portfolio} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#00548B] transition-colors">
                        <FaGlobe className="text-sm" />
                      </a>
                    )}
                    {instructor?.links?.github && (
                      <a href={instructor.links.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#00548B] transition-colors">
                        <FaGithub className="text-sm" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Student Video Testimonials */}
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B] block">
                Student Stories
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                What Our Students Say
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { videoId: "cZW9ylyCnpY", name: "Student Feedback", course: "IT Training" },
                { videoId: "KdIT_8j7wIQ", name: "Student Feedback", course: "IT Training" },
                { videoId: "vb-KIlaARdo", name: "Student Feedback", course: "IT Training" },
              ].map((item) => (
                <a
                  key={item.videoId}
                  href={`https://www.youtube.com/watch?v=${item.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                      alt={`${item.name} - Sangalo Tech testimonial`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <FaPlay className="text-white text-sm ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded text-[9px] font-bold">
                        <FaYoutube className="text-xs" />
                        YouTube
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#00548B] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400">{item.course}</p>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* ===================== Right Column: Sidebar ===================== */}
        <div className="lg:col-span-4" data-enroll-form>
          <div className="sticky top-24 space-y-5">
            {/* Enrollment Card */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6">
                {/* Price */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                    Total Investment
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900">
                      Rs. {course.price?.toLocaleString("en-NP")}
                    </span>
                  </div>
                  {(course as any).originalPrice && (
                    <p className="text-sm text-slate-400 line-through mt-1">
                      Rs. {(course as any).originalPrice.toLocaleString("en-NP")}
                    </p>
                  )}
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md">
                    <FaCheck className="text-[8px]" />
                    Scholarships Available
                  </div>
                </div>

                {isVideoCourse ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-slate-900">Instant Access</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Get lifetime access to this masterclass. Includes source code, certificates, and community support.
                    </p>

                    {isEnrolled ? (
                      <Link
                        href="/student-dashboard"
                        className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-sm hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 no-underline"
                      >
                        <FaPlay className="text-sm" /> Continue Learning
                      </Link>
                    ) : (
                      <div className="space-y-3">
                        <button
                          onClick={handleBuyNow}
                          className="w-full bg-[#00548B] text-white py-4 rounded-lg font-bold text-sm hover:bg-[#004381] transition-all flex items-center justify-center gap-2"
                        >
                          <FaBasketShopping className="text-sm" /> Buy Now
                        </button>
                        <button
                          onClick={() => addToCart(course as any as VideoCourse)}
                          className="w-full bg-white text-slate-900 border border-slate-200 py-4 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                          <FaCartPlus className="text-sm" /> Add to Cart
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-4 pt-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><FaClock className="text-[#00548B]" /> {course.duration}</span>
                      <span className="flex items-center gap-1.5"><FaCertificate className="text-[#00548B]" /> Certificate</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] text-sm font-medium text-slate-800 transition-all placeholder:text-slate-300"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Contact Info</label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] text-sm font-medium text-slate-800 transition-all placeholder:text-slate-300"
                          placeholder="Email"
                        />
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] text-sm font-medium text-slate-800 transition-all placeholder:text-slate-300"
                          placeholder="Phone"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Preferred Schedule</label>
                      <div className="relative">
                        <select
                          required
                          value={formData.preferredBatch}
                          onChange={(e) => setFormData({ ...formData, preferredBatch: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] text-sm font-medium text-slate-800 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select a time slot</option>
                          {batches.length > 0 ? (
                            batches.map((b) => (
                              <option key={b.id} value={b.time}>
                                {b.time} (Starts {b.startDate})
                              </option>
                            ))
                          ) : (
                            <option value="Waitlist">Join Priority Waitlist</option>
                          )}
                          <option value="Flexible">I&apos;m flexible with timings</option>
                        </select>
                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Goals / Background</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] text-sm font-medium text-slate-800 transition-all resize-none placeholder:text-slate-300"
                        rows={3}
                        placeholder="Tell us about your goals..."
                      />
                    </div>

                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full bg-[#00548B] text-white py-4 rounded-lg font-bold text-sm hover:bg-[#004381] transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane className="text-sm" />}
                      {loading ? "Processing..." : "Submit Application"}
                    </button>

                    <p className="text-[10px] text-center text-slate-300 font-medium">
                      By submitting, you agree to our Terms &amp; Conditions.
                    </p>
                  </form>
                )}

                {/* Stats */}
                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg py-3 text-center">
                    <div className="text-lg font-black text-slate-900">8</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Seats / Batch</div>
                  </div>
                  <div className="bg-emerald-50 rounded-lg py-3 text-center">
                    <div className="text-lg font-black text-emerald-600">Free</div>
                    <div className="text-[9px] font-bold text-emerald-600/70 uppercase tracking-wider">Demo Session</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-[#00548B]/20 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#00548B]/10 text-[#00548B] rounded-lg flex items-center justify-center">
                  <FaHeadset className="text-sm" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Have Questions?</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    Chat with an Advisor <FaArrowRightLong size={10} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StickyEnroll
        courseTitle={course.title}
        price={course.price}
        onEnrollClick={() => {
          const form = document.querySelector("[data-enroll-form]");
          form?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default CourseDetails;
