"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Types & data
import { VideoCourse } from "@/types";
import { apiService } from "@/services/apiService";
import { VIDEO_COURSES } from "@/constants";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PaymentModal from "./PaymentModal";
import { useCart } from "@/context/CartContext";
import CartToast from "./CartToast";

import { FaArrowRight, FaPlay, FaUser, FaStar, FaStarHalfStroke, FaClock, FaLayerGroup, FaXmark, FaLockOpen, FaCirclePlay, FaCartShopping } from 'react-icons/fa6';

const VideoMarketplace = () => {
  const { data: session } = useSession();
  const { addToCart } = useCart();
  const [videoCourses, setVideoCourses] = useState<VideoCourse[]>([]);
  const [previewVideo, setPreviewVideo] = useState<VideoCourse | null>(null);
  const [paymentCourse, setPaymentCourse] = useState<VideoCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [addedCourse, setAddedCourse] = useState<VideoCourse | null>(null);
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiService.getVideoCourses();
        setVideoCourses(data.length > 0 ? data : VIDEO_COURSES);
      } catch (e) {
        setVideoCourses(VIDEO_COURSES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (session) {
      const fetchEnrollments = async () => {
        try {
          const res = await axios.get("/api/user/enrolled-courses");
          setEnrolledIds(res.data.map((c: any) => c._id || c.id));
        } catch (e) {
          console.error("Error fetching enrollments", e);
        }
      };
      fetchEnrollments();
    }
  }, [session]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating || 5);
    const hasHalfStar = (rating || 5) % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-[10px]" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfStroke key={i} className="text-yellow-400 text-[10px]" />);
      } else {
        stars.push(<FaStar key={i} className="text-slate-200 text-[10px]" />);
      }
    }
    return stars;
  };

  return (
    <section id="videos" className="py-32 px-6 relative overflow-hidden bg-slate-950">
      {/* Dynamic Deep Architecture Grid */}
      <div className="absolute inset-x-0 top-0 h-[800px] pointer-events-none opacity-[0.05] architect-grid" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950 via-[#00548B]/20 to-slate-950" />

      {/* Atmospheric Cinematic Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#00548B]/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
          <div className="space-y-6 max-w-4xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md text-slate-300 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]" />
              Elite Masterclass Series
            </div>
            
            <div className="space-y-4">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] flex flex-col">
                <span className="opacity-90">Master the</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-400">Digital Craft.</span>
              </h2>
              <div className="w-24 h-1.5 bg-indigo-600 rounded-full mx-auto lg:mx-0" />
            </div>

            <p className="text-slate-400 font-medium text-xl md:text-2xl leading-tight max-w-2xl">
              Accelerate your <span className="text-white font-bold">engineering journey</span> with lifetime access to professional <span className="text-white/90">Lab demonstrations</span> and architectural project walkthroughs.
            </p>
          </div>
          <Link
            href="/video-marketplace"
            className="hidden lg:flex items-center gap-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-900/40 hover:bg-indigo-500 transition-all active:scale-95 no-underline border border-white/10"
          >
            Explore Library <FaArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-white rounded-[3rem] animate-pulse shadow-sm border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, Navigation, A11y, Keyboard]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={32}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            navigation
            className="!pb-20"
          >
            {videoCourses.map((course) => (
              <SwiperSlide key={course.id} className="h-auto">
                <div className="group relative bg-slate-900/40 border border-slate-800/50 rounded-[3.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-4 shadow-2xl flex flex-col h-full hover:bg-slate-900/60 hover:border-indigo-500/30">
                  {/* Thumbnail Section */}
                  <div
                    className="relative aspect-video overflow-hidden cursor-pointer"
                    onClick={() => setPreviewVideo(course)}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[4px]">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                        <FaPlay className="text-indigo-600 text-xl ml-1" />
                      </div>
                    </div>
                    {/* Category */}
                    <div className="absolute top-6 right-6">
                      <span className="bg-slate-950/80 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg border border-white/10">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex flex-col flex-grow space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400">
                        <FaUser className="opacity-50" /> {course.instructor}
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 border-y border-slate-800/50 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">{renderStars(course.rating)}</div>
                        <span className="text-white font-black">{course.rating || 5}</span>
                      </div>
                      <div className="flex items-center gap-4 uppercase tracking-[0.2em]">
                        <span className="flex items-center gap-1.5"><FaClock className="text-indigo-400" /> {course.totalHours}</span>
                        <span className="flex items-center gap-1.5"><FaLayerGroup className="text-indigo-400" /> {typeof course.lessons === 'number' ? course.lessons : course.lessons?.length || 0} Modules</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 flex items-center justify-between gap-6">
                      <div className="flex flex-col">
                        {course.originalPrice > 0 && (
                          <span className="text-[11px] text-slate-500 line-through font-bold tracking-tight">Rs. {course.originalPrice}</span>
                        )}
                        <span className="text-3xl font-black text-white tracking-tighter">Rs. {course.price}</span>
                      </div>
                      {enrolledIds.includes(course._id || course.id) ? (
                        <Link
                          href="/student-dashboard"
                          className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-5 px-8 rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center gap-2 no-underline"
                        >
                          <FaCirclePlay /> Go to Dashboard
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            addToCart(course);
                            setAddedCourse(course);
                          }}
                          className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-5 px-8 rounded-2xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/20 active:scale-95 flex items-center gap-2"
                        >
                          <FaCartShopping /> Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Preview Modal - Architect Dark */}
      {previewVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-6xl rounded-[4rem] overflow-hidden shadow-[0_64px_128px_-32px_rgba(0,0,0,0.8)] border border-white/20 relative">
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute top-10 right-10 w-16 h-16 bg-slate-900/10 hover:bg-slate-900/20 text-slate-900 rounded-full flex items-center justify-center z-50 transition-all active:scale-90"
            >
              <FaXmark className="text-2xl" />
            </button>

            <div className="grid lg:grid-cols-2">
              <div className="aspect-video lg:aspect-square bg-slate-900 p-2">
                <video src={previewVideo.previewUrl} className="w-full h-full object-cover rounded-[3rem]" controls autoPlay />
              </div>

              <div className="p-12 md:p-20 flex flex-col justify-center space-y-10">
                <div className="space-y-6">
                  <div className="inline-flex bg-[#00548B]/10 text-[#00548B] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#00548B]/20">
                    Architectural Showcase
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">
                    {previewVideo.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed">
                    Analyze our curriculum and lab methodologies through this high-fidelity masterclass showcase.
                  </p>
                </div>

                <div className="flex flex-col gap-8 pt-10 border-t border-slate-100">
                  {enrolledIds.includes(previewVideo._id || previewVideo.id) ? (
                    <Link
                      href="/student-dashboard"
                      className="w-full bg-emerald-600 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-3 no-underline"
                    >
                      <FaCirclePlay /> Go to Dashboard
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(previewVideo);
                        setAddedCourse(previewVideo);
                        setPreviewVideo(null);
                      }}
                      className="w-full bg-[#00548B] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-3"
                    >
                      <FaCartShopping /> Add to Cart
                    </button>
                  )}
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 text-center">
                    Lifetime Access • Case Study Source Code Included
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {addedCourse && (
        <CartToast course={addedCourse} onClose={() => setAddedCourse(null)} />
      )}

      {paymentCourse && (
        <PaymentModal
          course={paymentCourse}
          isOpen={!!paymentCourse}
          onClose={() => setPaymentCourse(null)}
        />
      )}
    </section>
  );
};

export default VideoMarketplace;