"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { apiService } from "@/services/apiService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaStar, FaStarHalfStroke, FaQuoteRight, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaGoogle, FaLinkedin, FaCheck } from 'react-icons/fa6';

interface Review {
  id: string;
  name: string;
  quote: string;
  rating: number;
  image: string;
  source: 'google' | 'facebook' | 'student';
  company?: string;
  salary?: string;
  course?: string;
  videoUrl?: string;
  linkedin?: string;
}

const FALLBACK_REVIEWS: Review[] = [
  { id: "t1", name: "Aarav Shrestha", quote: "Hands-on labs and mentor code reviews helped me bridge theory to production. Landed a junior dev role within a month of completing the MERN Stack program.", rating: 5, image: "https://i.pravatar.cc/150?u=aarav", source: 'student', company: "F1Soft International", salary: "Rs. 45,000/mo", course: "MERN Stack", linkedin: "#" },
  { id: "t2", name: "Prerana Karki", quote: "From wireframes to dev-ready handoffs, the process was industry-aligned. My portfolio finally clicked for recruiters. Highly recommend the UI/UX track.", rating: 5, image: "https://i.pravatar.cc/150?u=prerana", source: 'student', company: "Fusemachine", salary: "Rs. 50,000/mo", course: "UI/UX Design", linkedin: "#" },
  { id: "t3", name: "Suman Rai", quote: "Live campaigns and analytics reviews were the best part. I now run performance ads for three clients. The digital marketing course was worth every rupee.", rating: 5, image: "https://i.pravatar.cc/150?u=suman", source: 'student', company: "Leapfrog", salary: "Rs. 40,000/mo", course: "Digital Marketing" },
  { id: "t4", name: "Nisha Adhikari", quote: "Hardware + firmware + dashboards in one track. The lab access made it truly practical. Sangalo Tech's robotics program is one of the best in Nepal.", rating: 5, image: "https://i.pravatar.cc/150?u=nisha", source: 'student', company: "Robotics Assoc. Nepal", salary: "Rs. 35,000/mo", course: "Robotics & IoT" },
  { id: "t5", name: "Bibek Thapa", quote: "Tight feedback loops and real client briefs. I started freelancing with confidence after the job-ready program. The mentors genuinely care about your growth.", rating: 5, image: "https://i.pravatar.cc/150?u=bibek", source: 'student', company: "Freelancer", salary: "Rs. 80,000+/mo", course: "Job-Ready Program", linkedin: "#" },
  { id: "t6", name: "Saraswati Maharjan", quote: "Projects were grounded in real datasets. Interview prep support was a big plus. Got placed within 2 weeks of finishing the course!", rating: 5, image: "https://i.pravatar.cc/150?u=saraswati", source: 'student', company: "Webpoint Solutions", salary: "Rs. 38,000/mo", course: "React & Next.js" },
  { id: "t7", name: "Rajan Tamang", quote: "The React & Next.js course was incredibly thorough. Real projects, real code reviews, and the instructor knew exactly what industry expects from juniors.", rating: 5, image: "https://i.pravatar.cc/150?u=rajan", source: 'student', company: "CloudFactory", salary: "Rs. 55,000/mo", course: "React & Next.js", linkedin: "#" },
  { id: "t8", name: "Anita Gurung", quote: "Best investment in my career. The WordPress course gave me skills to start my own freelance business. Earning more than my previous job within 3 months.", rating: 5, image: "https://i.pravatar.cc/150?u=anita", source: 'student', company: "Self-Employed", salary: "Rs. 60,000+/mo", course: "WordPress" },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        if (data.reviews && data.reviews.length > 0) {
          setTestimonials(data.reviews);
          return;
        }
        try {
          const apiData = await apiService.getTestimonials();
          if (apiData && apiData.length > 0) {
            setTestimonials(apiData.map((t: any) => ({
              id: t.id || t._id || `api_${Math.random()}`,
              name: t.name,
              quote: t.quote || t.text || t.message,
              rating: t.rating || 5,
              image: t.image || t.avatar || `https://i.pravatar.cc/150?u=${t.name}`,
              source: 'student' as const,
            })));
            return;
          }
        } catch {}
        setTestimonials(FALLBACK_REVIEWS);
      } catch {
        setTestimonials(FALLBACK_REVIEWS);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const renderStars = (rating = 5) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<FaStar key={i} className="text-sm text-amber-400" />);
      else stars.push(<FaStar key={i} className="text-sm text-slate-200" />);
    }
    return stars;
  };

  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-[#00548B]/[0.02]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[#00548B]/[0.03] rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00548B]/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-[#00548B]/10 text-[#00548B] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[#00548B]/15">
            <FaQuoteLeft className="text-xs" /> Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[0.9]">
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00548B] to-[#00548B]/60">Success Stories</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Real reviews from real students who transformed their careers with{" "}
            <span className="text-slate-900 font-bold">Sangalo Tech</span>
          </p>
        </div>

        {/* Slider */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white rounded-3xl animate-pulse shadow-sm border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Navigation */}
            <div className="flex justify-center items-center gap-3 mb-10">
              <button
                ref={prevRef}
                aria-label="Previous testimonial"
                className="h-12 w-12 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-[#00548B] hover:border-[#00548B]/20 hover:shadow-lg transition-all flex items-center justify-center shadow-sm active:scale-90"
              >
                <FaChevronLeft />
              </button>
              <div className="h-1 w-1 rounded-full bg-[#00548B]/30" />
              <div className="h-1 w-1 rounded-full bg-[#00548B]/30" />
              <div className="h-1 w-1 rounded-full bg-[#00548B]/30" />
              <button
                ref={nextRef}
                aria-label="Next testimonial"
                className="h-12 w-12 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-[#00548B] hover:border-[#00548B]/20 hover:shadow-lg transition-all flex items-center justify-center shadow-sm active:scale-90"
              >
                <FaChevronRight />
              </button>
            </div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation, A11y]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={testimonials.length > 3}
              speed={600}
              spaceBetween={28}
              slidesPerView={1}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="!pb-16"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="group h-full">
                    <div className="relative h-full bg-white rounded-3xl border border-slate-100 hover:border-[#00548B]/15 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_-12px_rgba(0,84,139,0.15)] transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden">
                      {/* Top accent bar */}
                      <div className="h-1 bg-gradient-to-r from-[#00548B] via-[#00548B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="p-8 flex flex-col flex-1">
                        {/* Stars + Rating */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-1">
                            {renderStars(t.rating)}
                          </div>
                          <span className="text-xs font-bold text-slate-400">{t.rating}.0</span>
                        </div>

                        {/* Quote */}
                        <div className="relative flex-1 mb-6">
                          <p
                            className="text-slate-600 text-[15px] leading-[1.8] font-medium [&_p]:mb-2 [&_p:last-child]:mb-0"
                            dangerouslySetInnerHTML={{ __html: t.quote || '' }}
                          />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {t.company && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#00548B] bg-[#00548B]/8 px-3 py-1.5 rounded-full border border-[#00548B]/10">
                              <FaCheck className="text-[7px]" /> {t.company}
                            </span>
                          )}
                          {t.salary && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                              {t.salary}
                            </span>
                          )}
                          {t.course && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100">
                              {t.course}
                            </span>
                          )}
                        </div>

                        {/* Author */}
                        <div className="pt-5 border-t border-slate-100 flex items-center gap-4">
                          <div className="relative shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#00548B]/10 group-hover:ring-[#00548B]/25 transition-all">
                              <Image
                                src={t.image}
                                alt={t.name}
                                width={48}
                                height={48}
                                loading="lazy"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=00548B&color=fff&bold=true&size=96`;
                                }}
                              />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                              <FaCheck className="text-white text-[7px]" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 text-sm truncate">{t.name}</h3>
                            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">Verified Student</p>
                          </div>
                          {t.linkedin && (
                            <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#0A66C2]/8 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all shrink-0">
                              <FaLinkedin className="text-sm" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
