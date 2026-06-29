"use client";
import React from "react";
import { FaRocket, FaLaptopCode, FaHandshake, FaCertificate, FaUsers, FaGraduationCap } from "react-icons/fa";

const REASONS = [
  {
    icon: FaLaptopCode,
    title: "Project-Based Learning",
    desc: "Build real-world apps from day one — not just theory. Every course includes live projects.",
  },
  {
    icon: FaHandshake,
    title: "100% Placement Support",
    desc: "Dedicated career services with 50+ hiring partners across Nepal and internationally.",
  },
  {
    icon: FaCertificate,
    title: "Industry Certification",
    desc: "Get certified by a recognized IT training institute, valued by employers nationwide.",
  },
  {
    icon: FaUsers,
    title: "Expert Mentors",
    desc: "Learn from senior developers actively building products in the industry.",
  },
  {
    icon: FaRocket,
    title: "Internship Included",
    desc: "Every course includes hands-on internship experience with real client projects.",
  },
  {
    icon: FaGraduationCap,
    title: "Job-Ready Curriculum",
    desc: "Courses designed with industry input to ensure maximum employability after completion.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-[#f8fbff] to-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
            Why Sangalo Tech
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose <span className="text-[#00548B]">Sangalo Tech?</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            We don&apos;t just teach — we transform beginners into industry-ready professionals with hands-on experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((item, i) => (
            <div
              key={i}
              className="group bg-white p-8 md:p-10 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-[#00548B]/10 hover:border-[#00548B]/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#00548B]/10 flex items-center justify-center mb-6 group-hover:bg-[#00548B] group-hover:scale-110 transition-all duration-300">
                <item.icon className="text-2xl text-[#00548B] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-[#00548B] transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
