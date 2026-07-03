"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCalendarCheck, FaClock, FaArrowRight, FaUserGroup, FaCalendarDays, FaBolt } from "react-icons/fa6";
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
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const getStartBadge = (dateStr: string) => {
  const days = getDaysUntil(dateStr);
  if (days === null) return { text: "Upcoming", color: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" };
  if (days === 0) return { text: "Starts Today", color: "bg-orange-50 text-orange-600 border-orange-200", dot: "bg-orange-500" };
  if (days === 1) return { text: "Starts Tomorrow", color: "bg-orange-50 text-orange-600 border-orange-200", dot: "bg-orange-500" };
  if (days <= 7) return { text: `Starts in ${days} days`, color: "bg-orange-50 text-orange-600 border-orange-200", dot: "bg-orange-500" };
  if (days <= 30) return { text: `Starts in ${Math.ceil(days / 7)} weeks`, color: "bg-blue-50 text-blue-600 border-blue-200", dot: "bg-blue-500" };
  return { text: `Starts in ${Math.ceil(days / 30)} months`, color: "bg-slate-50 text-slate-600 border-slate-200", dot: "bg-slate-400" };
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "TBA";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
  } catch {
    return dateStr;
  }
};

const BatchCard: React.FC<{ batch: UpcomingBatch }> = ({ batch }) => {
  const badge = getStartBadge(batch.startDate);
  const lowSeats = batch.seatsLeft <= 5;

  return (
    <Link
      href={`/onlineform?course=${encodeURIComponent(batch.courseTitle)}&batch=${batch.id || (batch as any)._id}`}
      className="group block relative no-underline"
    >
      {/* Top Badge */}
      <span className={`absolute -top-3 right-4 z-20 inline-flex items-center gap-1.5 text-[11px] font-bold whitespace-nowrap px-3 py-1 rounded-full border shadow-sm ${badge.color}`}>
        <span className={`size-1.5 rounded-full ${badge.dot} opacity-80`} />
        {badge.text}
      </span>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 group-hover:shadow-lg group-hover:border-[#00548B]/25 transition-all duration-300 overflow-hidden">
        <div className="p-5 space-y-3">
          {/* Title */}
          <h3 className="font-bold text-base text-slate-900 line-clamp-1 group-hover:text-[#00548B] transition-colors">
            {batch.courseTitle}
          </h3>

          {/* Info */}
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-2.5 text-slate-600">
              <div className="w-7 h-7 rounded-lg bg-[#00548B]/10 flex items-center justify-center shrink-0">
                <FaCalendarDays className="text-[#00548B] text-xs" />
              </div>
              <span className="line-clamp-1">{formatDate(batch.startDate)}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600">
              <div className="w-7 h-7 rounded-lg bg-[#00548B]/10 flex items-center justify-center shrink-0">
                <FaClock className="text-[#00548B] text-xs" />
              </div>
              <span>{batch.time}</span>
            </div>

            <div className="flex items-center gap-2.5 text-slate-600">
              <div className="w-7 h-7 rounded-lg bg-[#00548B]/10 flex items-center justify-center shrink-0">
                <FaUserGroup className="text-[#00548B] text-xs" />
              </div>
              <span className={lowSeats ? "text-orange-600 font-bold" : ""}>
                {batch.seatsLeft} seats left
                {lowSeats && <span className="ml-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-orange-500"><FaBolt className="text-[8px]" />Filling fast</span>}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${batch.status === 'Enrolling' ? 'text-emerald-600' : 'text-slate-400'}`}>
                {batch.status}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00548B] group-hover:gap-2.5 transition-all duration-300">
                Enroll Now <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
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
    <section id="upcoming-batches" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#f8fbff] via-gray-50 to-white">
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
            <FaCalendarCheck className="text-xs" />
            Live Cohorts
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            New Batch Starting Soon
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-lg mx-auto">
            Join Our classes and secure your seat. Limited capacity per batch for personalized mentorship.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-52 bg-white rounded-xl border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : batches.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-[#00548B]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FaCalendarCheck className="text-2xl text-[#00548B]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Upcoming Batches</h3>
            <p className="text-slate-500 text-sm">Stay tuned for new batch announcements. Pre-register for priority updates.</p>
          </div>
        ) : (
          <>
            {/* Mobile */}
            <div className="lg:hidden">
              <Swiper
                modules={[Autoplay, Pagination, A11y, Keyboard]}
                slidesPerView={1}
                spaceBetween={20}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="!pb-14"
              >
                {batches.map((batch) => (
                  <SwiperSlide key={batch.id || (batch as any)._id} className="h-auto">
                    <BatchCard batch={batch} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-5">
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
