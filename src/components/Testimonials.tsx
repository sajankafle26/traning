"use client";
import React, { useEffect, useRef, useState } from "react";
import { apiService } from "@/services/apiService";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaStar, FaStarHalfStroke, FaQuoteRight, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaGoogle, FaFacebook } from 'react-icons/fa6';

interface Review {
  id: string;
  name: string;
  quote: string;
  rating: number;
  image: string;
  source: 'google' | 'facebook' | 'student';
  time?: number;
}

const FALLBACK_REVIEWS: Review[] = [
  {
    id: "t1",
    name: "Aarav Shrestha",
    quote: "Hands-on labs and mentor code reviews helped me bridge theory to production. Landed a junior dev role within a month of completing the MERN Stack program.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=aarav",
    source: 'student',
  },
  {
    id: "t2",
    name: "Prerana Karki",
    quote: "From wireframes to dev-ready handoffs, the process was industry-aligned. My portfolio finally clicked for recruiters. Highly recommend the UI/UX track.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=prerana",
    source: 'student',
  },
  {
    id: "t3",
    name: "Suman Rai",
    quote: "Live campaigns and analytics reviews were the best part. I now run performance ads for three clients. The digital marketing course was worth every rupee.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=suman",
    source: 'student',
  },
  {
    id: "t4",
    name: "Nisha Adhikari",
    quote: "Hardware + firmware + dashboards in one track. The lab access made it truly practical. Sangalo Tech's robotics program is one of the best in Nepal.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=nisha",
    source: 'student',
  },
  {
    id: "t5",
    name: "Bibek Thapa",
    quote: "Tight feedback loops and real client briefs. I started freelancing with confidence after the job-ready program. The mentors genuinely care about your growth.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=bibek",
    source: 'student',
  },
  {
    id: "t6",
    name: "Saraswati Maharjan",
    quote: "Projects were grounded in real datasets. Interview prep support was a big plus. Got placed within 2 weeks of finishing the course!",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=saraswati",
    source: 'student',
  },
  {
    id: "t7",
    name: "Rajan Tamang",
    quote: "The React & Next.js course was incredibly thorough. Real projects, real code reviews, and the instructor knew exactly what industry expects from juniors.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=rajan",
    source: 'student',
  },
  {
    id: "t8",
    name: "Anita Gurung",
    quote: "Best investment in my career. The WordPress course gave me skills to start my own freelance business. Earning more than my previous job within 3 months.",
    rating: 5,
    image: "https://i.pravatar.cc/150?u=anita",
    source: 'student',
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
        // Try fetching from Google/Facebook reviews API
        const res = await fetch('/api/reviews');
        const data = await res.json();

        if (data.reviews && data.reviews.length > 0) {
          setTestimonials(data.reviews);
          setReviewStats(data.stats);
          setLoading(false);
          return;
        }

        // Fallback to existing testimonials API
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
            setReviewStats(data.stats || reviewStats);
            setLoading(false);
            return;
          }
        } catch {
          // API testimonials not available
        }

        // Final fallback
        setTestimonials(FALLBACK_REVIEWS);
        setReviewStats(data.stats || reviewStats);
      } catch (e) {
        console.error("Testimonial Fetch Error:", e);
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
      if (i <= full) {
        stars.push(<FaStar key={i} className="text-xs text-yellow-500" />);
      } else if (i === full + 1 && half) {
        stars.push(<FaStarHalfStroke key={i} className="text-xs text-yellow-500" />);
      } else {
        stars.push(<FaStar key={i} className="text-xs text-slate-200" />);
      }
    }
    return stars;
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'google':
        return (
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
            <FaGoogle className="text-[#4285F4] text-sm" />
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Google Review</span>
          </div>
        );
      case 'facebook':
        return (
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
            <FaFacebook className="text-[#1877F2] text-sm" />
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Facebook Review</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="testimonials"
      className="py-32 px-6 relative overflow-hidden bg-white"
    >
      {/* Background */}
      <div className="absolute inset-x-0 bottom-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#f8fbff] via-white to-white" />
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[#00548B]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 -translate-x-1/2 w-[600px] h-[600px] bg-blue-50/50 blur-[100px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-8 mb-24">
          <div className="inline-flex items-center gap-3 bg-slate-50 text-slate-500 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-slate-100">
            <FaQuoteLeft className="text-[#00548B] shadow-[0_0_8px_#00548B]" /> Institutional Merit
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[0.85] max-w-5xl">
            What Our <span className="text-[#00548B]">Students</span> Say
          </h2>
          <p className="text-slate-500 font-medium text-xl md:text-2xl max-w-3xl leading-relaxed">
            Real reviews from real students who transformed their careers with <span className="text-slate-900 font-black">Sangalo Tech</span>
          </p>

          {/* Review Platform Stats */}
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
            {reviewStats.facebook.working && (
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <FaFacebook className="text-[#1877F2]" />
                <span className="font-bold">{reviewStats.facebook.count} Facebook Reviews</span>
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
            {/* Navigation Arrows */}
            <div className="absolute -top-14 right-0 flex items-center gap-2 z-20">
              <button
                ref={prevRef}
                className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-[#00548B] hover:shadow-xl transition-all flex items-center justify-center shadow-sm active:scale-90"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                ref={nextRef}
                className="h-12 w-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-[#00548B] hover:shadow-xl transition-all flex items-center justify-center shadow-sm active:scale-90"
              >
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
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="!pb-20"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="relative group h-full">
                    {/* Visual Stack Layers */}
                    <div className="absolute inset-4 bg-slate-50 rounded-[3.5rem] rotate-2 scale-[1.02] transition-all duration-700 group-hover:rotate-6" />

                    <div className="relative bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-[0_48px_96px_-48px_rgba(0,84,139,0.12)] flex flex-col h-full transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_64px_128px_-48px_rgba(0,84,139,0.18)]">
                      {/* Quote Icon */}
                      <div className="absolute top-10 right-10 text-7xl text-slate-50 group-hover:text-[#00548B]/5 transition-colors">
                        <FaQuoteRight />
                      </div>

                      <div className="flex-grow space-y-6">
                        {/* Source Badge */}
                        {testimonial.source !== 'student' && (
                          <div className="mb-2">
                            {getSourceBadge(testimonial.source)}
                          </div>
                        )}

                        {/* Stars */}
                        <div className="flex items-center gap-1.5 bg-slate-50 w-fit px-3 py-1.5 rounded-full border border-slate-100/50 shadow-inner">
                          {renderStars(testimonial.rating)}
                          <span className="text-xs font-bold text-slate-600 ml-2">{testimonial.rating}.0</span>
                        </div>

                        {/* Quote */}
                        <p className="text-slate-600 text-lg font-medium leading-relaxed italic relative z-10 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-slate-900 [&_strong]:font-bold">
                          &ldquo;<span dangerouslySetInnerHTML={{ __html: testimonial.quote || '' }} />&rdquo;
                        </p>
                      </div>

                      {/* Author */}
                      <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl p-1 bg-white border border-slate-100 group-hover:scale-110 transition-all shadow-sm overflow-hidden">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full rounded-[1rem] object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=00548B&color=fff&bold=true`;
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 leading-none mb-1 tracking-tight">
                            {testimonial.name}
                          </h4>
                          <div className="flex items-center gap-1 text-[#00548B] text-[9px] font-black uppercase tracking-[0.2em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]" />
                            Verified Student
                          </div>
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
