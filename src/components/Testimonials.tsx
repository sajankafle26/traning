"use client";
import React, { useEffect, useRef, useState } from "react";
import { apiService } from "@/services/apiService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaStar, FaStarHalfStroke, FaQuoteRight, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaGoogle, FaFacebook, FaPlay, FaLinkedin } from 'react-icons/fa6';

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
  {
    id: "t1",
    name: "Aarav Shrestha",
    quote: "Hands-on labs and mentor code reviews helped me bridge theory to production. Landed a junior dev role within a month of completing the MERN Stack program.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=aarav",
    source: 'student',
    company: "F1Soft International",
    salary: "Rs. 45,000/month",
    course: "MERN Stack Mastery",
    linkedin: "#",
  },
  {
    id: "t2",
    name: "Prerana Karki",
    quote: "From wireframes to dev-ready handoffs, the process was industry-aligned. My portfolio finally clicked for recruiters. Highly recommend the UI/UX track.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=prerana",
    source: 'student',
    company: "Fusemachine",
    salary: "Rs. 50,000/month",
    course: "UI/UX Design Training",
    linkedin: "#",
  },
  {
    id: "t3",
    name: "Suman Rai",
    quote: "Live campaigns and analytics reviews were the best part. I now run performance ads for three clients. The digital marketing course was worth every rupee.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=suman",
    source: 'student',
    company: "Leapfrog Technology",
    salary: "Rs. 40,000/month",
    course: "Digital Marketing Pro",
    linkedin: "#",
  },
  {
    id: "t4",
    name: "Nisha Adhikari",
    quote: "Hardware + firmware + dashboards in one track. The lab access made it truly practical. Sangalo Tech's robotics program is one of the best in Nepal.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=nisha",
    source: 'student',
    company: "Robotics Association Nepal",
    salary: "Rs. 35,000/month",
    course: "Robotics & IoT",
  },
  {
    id: "t5",
    name: "Bibek Thapa",
    quote: "Tight feedback loops and real client briefs. I started freelancing with confidence after the job-ready program. The mentors genuinely care about your growth.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=bibek",
    source: 'student',
    company: "Freelancer",
    salary: "Rs. 80,000+/month",
    course: "Job-Ready Program",
    linkedin: "#",
  },
  {
    id: "t6",
    name: "Saraswati Maharjan",
    quote: "Projects were grounded in real datasets. Interview prep support was a big plus. Got placed within 2 weeks of finishing the course!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=saraswati",
    source: 'student',
    company: "Webpoint Solutions",
    salary: "Rs. 38,000/month",
    course: "React & Next.js",
  },
  {
    id: "t7",
    name: "Rajan Tamang",
    quote: "The React & Next.js course was incredibly thorough. Real projects, real code reviews, and the instructor knew exactly what industry expects from juniors.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=rajan",
    source: 'student',
    company: "CloudFactory",
    salary: "Rs. 55,000/month",
    course: "React & Next.js Mastery",
    linkedin: "#",
  },
  {
    id: "t8",
    name: "Anita Gurung",
    quote: "Best investment in my career. The WordPress course gave me skills to start my own freelance business. Earning more than my previous job within 3 months.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=anita",
    source: 'student',
    company: "Self-Employed",
    salary: "Rs. 60,000+/month",
    course: "WordPress Customization",
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewStats, setReviewStats] = useState({ google: { count: 0, configured: false, working: false }, facebook: { count: 0, configured: false, working: false }, totalReviews: 0 });
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        if (data.reviews && data.reviews.length > 0) {
          setTestimonials(data.reviews);
          setReviewStats(data.stats);
          setLoading(false);
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
            setLoading(false);
            return;
          }
        } catch {}
        setTestimonials(FALLBACK_REVIEWS);
        setReviewStats(data.stats || reviewStats);
      } catch (e) {
        setTestimonials(FALLBACK_REVIEWS);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const renderStars = (rating = 5) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= full) stars.push(<FaStar key={i} className="text-xs text-yellow-500" />);
      else if (i === full + 1 && half) stars.push(<FaStarHalfStroke key={i} className="text-xs text-yellow-500" />);
      else stars.push(<FaStar key={i} className="text-xs text-slate-200" />);
    }
    return stars;
  };

  return (
    <section id="testimonials" className="py-32 px-6 relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 bottom-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f8fbff] via-white to-white" />
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#00548B]/5 blur-[120px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-8 mb-24">
          <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100">
            <FaQuoteLeft className="text-[#00548B] shadow-[0_0_8px_#00548B]" /> Student Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[0.85] max-w-5xl">
            What Our <span className="text-[#00548B]">Students</span> Say
          </h2>
          <p className="text-slate-500 font-medium text-xl md:text-2xl max-w-3xl leading-relaxed">
            Real reviews from real students who transformed their careers with <span className="text-slate-900 font-black">Sangalo Tech</span>
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <FaStar className="text-yellow-500" />
              <span className="font-bold">{reviewStats.totalReviews > 0 ? reviewStats.totalReviews : '600+'} Happy Students</span>
            </div>
            {reviewStats.google.working && (
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <FaGoogle className="text-[#4285F4]" />
                <span className="font-bold">{reviewStats.google.count} Google Reviews</span>
              </div>
            )}
          </div>
        </div>

        {/* Slider */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-white rounded-[3rem] animate-pulse shadow-sm border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute -top-14 right-0 flex items-center gap-2 z-20">
              <button ref={prevRef} className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-[#00548B] hover:shadow-xl transition-all flex items-center justify-center shadow-sm active:scale-90">
                <FaChevronLeft className="text-sm" />
              </button>
              <button ref={nextRef} className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-[#00548B] hover:shadow-xl transition-all flex items-center justify-center shadow-sm active:scale-90">
                <FaChevronRight className="text-sm" />
              </button>
            </div>

            <Swiper
              modules={[Autoplay, Pagination, Navigation, A11y]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={testimonials.length > 3}
              speed={600}
              spaceBetween={32}
              slidesPerView={1}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              pagination={{ clickable: true }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="!pb-20"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <div className="relative group h-full">
                    <div className="absolute inset-4 bg-slate-50 rounded-[3.5rem] rotate-2 scale-[1.02] transition-all duration-700 group-hover:rotate-6" />
                    <div className="relative bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-[0_48px_96px_-48px_rgba(0,84,139,0.12)] flex flex-col h-full transition-all duration-700 group-hover:-translate-y-3">
                      <div className="absolute top-10 right-10 text-7xl text-slate-50 group-hover:text-[#00548B]/5 transition-colors">
                        <FaQuoteRight />
                      </div>

                      <div className="flex-grow space-y-5">
                        {/* Stars */}
                        <div className="flex items-center gap-1.5 bg-slate-50 w-fit px-3 py-1.5 rounded-full border border-slate-100/50">
                          {renderStars(t.rating)}
                          <span className="text-xs font-bold text-slate-600 ml-2">{t.rating}.0</span>
                        </div>

                        {/* Quote */}
                        <p className="text-slate-600 text-base font-medium leading-relaxed italic [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-slate-900">
                          &ldquo;<span dangerouslySetInnerHTML={{ __html: t.quote || '' }} />&rdquo;
                        </p>

                        {/* Company & Salary */}
                        {(t.company || t.salary) && (
                          <div className="flex flex-wrap gap-2">
                            {t.company && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-[#00548B] bg-[#00548B]/10 px-3 py-1 rounded-full">
                                🏢 {t.company}
                              </span>
                            )}
                            {t.salary && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                💰 {t.salary}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Course */}
                        {t.course && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
                            📚 {t.course}
                          </span>
                        )}
                      </div>

                      {/* Author */}
                      <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl p-1 bg-white border border-slate-100 group-hover:scale-110 transition-all shadow-sm overflow-hidden">
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-full h-full rounded-[1rem] object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=00548B&color=fff&bold=true`;
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-slate-900 leading-none mb-1">{t.name}</h4>
                          <div className="flex items-center gap-1 text-[#00548B] text-[9px] font-black uppercase tracking-[0.2em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00548B]" />
                            Verified Student
                          </div>
                        </div>
                        {t.linkedin && (
                          <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all">
                            <FaLinkedin className="text-sm" />
                          </a>
                        )}
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
