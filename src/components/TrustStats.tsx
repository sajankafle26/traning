"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap, FaDiagramProject, FaUserCheck, FaHandshake, FaStar, FaShield, FaBuilding } from "react-icons/fa6";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const STATS = [
  { icon: FaGraduationCap, number: 1500, suffix: "+", label: "Students Trained" },
  { icon: FaDiagramProject, number: 500, suffix: "+", label: "Projects Delivered" },
  { icon: FaUserCheck, number: 95, suffix: "%", label: "Placement Rate" },
  { icon: FaHandshake, number: 100, suffix: "+", label: "Hiring Partners" },
];

const TRUST_BADGES = [
  { icon: FaShield, label: "PAN: 602345817" },
  { icon: FaBuilding, label: "Registered Company" },
  { icon: FaStar, label: "4.8 Google Rating" },
];

export default function TrustStats() {
  return (
    <section className="py-16 px-6 bg-white border-b border-slate-50">
      <div className="max-w-[1200px] mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 md:p-8 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#00548B]/20 hover:bg-white transition-all"
            >
              <stat.icon className="text-xl text-[#00548B] mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1">
                <Counter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-slate-100">
          {TRUST_BADGES.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
              <badge.icon className="text-[#00548B]" />
              <span className="font-semibold">{badge.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <FaStar key={s} className="text-amber-400 text-sm" />
            ))}
            <span className="text-sm font-semibold text-slate-500 ml-1">4.8/5</span>
          </div>
        </div>
      </div>
    </section>
  );
}
