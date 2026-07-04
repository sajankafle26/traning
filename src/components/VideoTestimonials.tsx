"use client";
import React, { useState } from "react";
import { FaPlay, FaYoutube, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface VideoTestimonial {
  id: string;
  videoId: string;
  name: string;
  role: string;
  course: string;
  thumbnail: string;
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "v1",
    videoId: "cZW9ylyCnpY",
    name: "Student Feedback",
    role: "Sangalo Tech Graduate",
    course: "IT Training",
    thumbnail: "https://i.pravatar.cc/400?u=student1",
  },
  {
    id: "v2",
    videoId: "KdIT_8j7wIQ",
    name: "Student Feedback",
    role: "Sangalo Tech Graduate",
    course: "IT Training",
    thumbnail: "https://i.pravatar.cc/400?u=student2",
  },
  {
    id: "v3",
    videoId: "vb-KIlaARdo",
    name: "Student Feedback",
    role: "Sangalo Tech Graduate",
    course: "IT Training",
    thumbnail: "https://i.pravatar.cc/400?u=student3",
  },
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B] block">
            Student Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Video Testimonials
          </h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Hear from our graduates about their learning experience
          </p>
        </div>

        {/* Video Grid */}
        <div className="relative">
          {/* Navigation */}
          <button
            className="video-test-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm hidden md:flex"
            aria-label="Previous"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            className="video-test-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm hidden md:flex"
            aria-label="Next"
          >
            <FaChevronRight className="text-sm" />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".video-test-prev",
              nextEl: ".video-test-next",
            }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-12"
          >
            {VIDEO_TESTIMONIALS.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="group cursor-pointer"
                  onClick={() => setActiveVideo(item.videoId)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4">
                    <img
                      src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                      alt={`${item.name} - ${item.course} testimonial`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Play Button */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <FaPlay className="text-white text-lg ml-1" />
                      </div>
                    </div>
                    {/* YouTube Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 rounded-md text-[10px] font-bold">
                        <FaYoutube className="text-sm" />
                        YouTube
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 group-hover:text-[#00548B] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-400">{item.role}</p>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#00548B] bg-[#00548B]/8 px-2.5 py-1 rounded-md">
                      {item.course}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="https://www.youtube.com/@Sangalotech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-red-700 transition no-underline"
          >
            <FaYoutube className="text-lg" />
            Watch More on YouTube
          </a>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white text-2xl font-bold hover:text-slate-300 transition"
              aria-label="Close video modal"
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="Video Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
