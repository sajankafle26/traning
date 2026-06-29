"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaGraduationCap, FaProjectDiagram, FaUserCheck, FaHandshake } from "react-icons/fa";

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
  { icon: FaGraduationCap, number: 1500, suffix: "+", label: "Students Trained", color: "bg-blue-500" },
  { icon: FaProjectDiagram, number: 500, suffix: "+", label: "Projects Completed", color: "bg-emerald-500" },
  { icon: FaUserCheck, number: 95, suffix: "%", label: "Student Satisfaction", color: "bg-violet-500" },
  { icon: FaHandshake, number: 100, suffix: "+", label: "Hiring Partners", color: "bg-amber-500" },
];

export default function TrustStats() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
            Our Track Record
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Numbers That <span className="text-[#00548B]">Speak</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Trusted by hundreds of students and businesses across Nepal
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="group text-center p-8 md:p-10 rounded-3xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 hover:shadow-2xl hover:shadow-[#00548B]/10 hover:border-[#00548B]/20 hover:-translate-y-2 transition-all duration-500 cursor-default"
            >
              <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <stat.icon className="text-2xl text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-slate-900 group-hover:text-[#00548B] transition-colors mb-2">
                <Counter end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
