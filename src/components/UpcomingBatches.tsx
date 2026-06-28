"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCalendarCheck, FaClock, FaArrowRight, FaUserGroup, FaCalendarDays } from "react-icons/fa6";
import { apiService } from "@/services/apiService";
import { UpcomingBatch } from "@/types";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const getDaysUntil = (dateStr: string) => {
  if (!dateStr || dateStr === "TBA") return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return null;
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
};

const getStartBadge = (dateStr: string) => {
  const days = getDaysUntil(dateStr);
  if (days === null) return { text: "Upcoming", color: "bg-slate-100 text-slate-700 border-slate-200" };
  if (days === 0) return { text: "Starts Today", color: "bg-orange-100 text-orange-700 border-orange-200" };
  if (days === 1) return { text: "Starts Tomorrow", color: "bg-orange-100 text-orange-700 border-orange-200" };
  if (days <= 7) return { text: `Starts in ${days} days`, color: "bg-orange-100 text-orange-700 border-orange-200" };
  if (days <= 30) return { text: `Starts in ${Math.ceil(days / 7)} weeks`, color: "bg-blue-100 text-blue-700 border-blue-200" };
  return { text: `Starts in ${Math.ceil(days / 30)} months`, color: "bg-slate-100 text-slate-700 border-slate-200" };
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "TBA";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
};

const BatchCard: React.FC<{ batch: UpcomingBatch }> = ({ batch }) => {
  const badge = getStartBadge(batch.startDate);

  return (
    <div className="relative mt-4">
      {/* Top Badge */}
      <span
        className={`absolute -top-3 right-4 z-20 inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap px-3 py-1 rounded-full border shadow-sm ${badge.color}`}
      >
        <span className="size-1.5 rounded-full bg-current opacity-70" />
        {badge.text}
      </span>

      {/* Card */}
      <Link
        href={`/onlineform?course=${encodeURIComponent(batch.courseTitle)}&batch=${batch.id || (batch as any)._id}`}
        className="block bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#00548B]/20 transition-all duration-200 overflow-hidden relative no-underline"
      >
        <div className="p-5">
          <h3 className="font-semibold text-lg text-slate-800 line-clamp-1 mb-3">
            {batch.courseTitle}
          </h3>

          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <FaCalendarDays className="text-slate-400 text-xs" />
              <span>Batch starts: <strong className="text-slate-900">{formatDate(batch.startDate)}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="text-slate-400 text-xs" />
              <span>{batch.time}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <FaUserGroup className="text-slate-400 text-xs" />
                <span className={`font-medium ${batch.seatsLeft <= 5 ? 'text-orange-600' : 'text-slate-700'}`}>
                  {batch.seatsLeft} seats left
                </span>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00548B] bg-[#00548B]/10 px-2.5 py-1 rounded-full">
                Enroll Now <FaArrowRight className="text-[10px]" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const UpcomingBatches = () => {
  const [batches, setBatches] = useState<UpcomingBatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const batchData = await apiService.getBatches();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredBatches = (batchData || []).filter((batch: UpcomingBatch) => {
          if (!batch.startDate || batch.startDate === "TBA") return true;
          const batchDate = new Date(batch.startDate);
          if (isNaN(batchDate.getTime())) return true;
          return batchDate >= today;
        });
        setBatches(filteredBatches);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <section id="upcoming-batches" className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-[#f8fbff] via-gray-50 to-white">
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            New Batch Starting Soon
          </h2>
          <p className="text-sm md:text-base italic text-slate-600 mt-2">
            Join the live class and secure your seat
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-white rounded-xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : batches.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-[#00548B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCalendarCheck className="text-2xl text-[#00548B]" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Upcoming Batches</h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">Stay tuned for new batch announcements. Pre-register for priority updates.</p>
          </div>
        ) : (
          <>
            {/* Mobile: Swiper */}
            <div className="lg:hidden">
              <Swiper
                modules={[Autoplay, Pagination, A11y, Keyboard]}
                slidesPerView={1}
                spaceBetween={20}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="!pb-12"
              >
                {batches.map((batch) => (
                  <SwiperSlide key={batch.id || (batch as any)._id} className="h-full">
                    <BatchCard batch={batch} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {batches.map((batch) => (
                <BatchCard key={batch.id || (batch as any)._id} batch={batch} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default UpcomingBatches;
