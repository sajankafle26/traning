"use client";
import React from "react";
import {
  FaLaptopCode, FaGraduationCap, FaHandshake, FaCertificate,
  FaCode, FaCloud
} from "react-icons/fa";

const REASONS = [
  {
    icon: FaLaptopCode,
    title: "Full-Service Software Company",
    desc: "From custom web apps to mobile apps, we build scalable digital products with React, Next.js, Node.js, and modern frameworks.",
  },
  {
    icon: FaGraduationCap,
    title: "Job-Ready IT Training",
    desc: "9+ professional courses designed with industry input. Learn from senior developers and become employable in months.",
  },
  {
    icon: FaHandshake,
    title: "100% Placement Support",
    desc: "Dedicated career services with 50+ hiring partners. Our graduates get placed at top IT companies in Nepal.",
  },
  {
    icon: FaCode,
    title: "Real Client Projects",
    desc: "Work on live client projects during training. Build production-grade apps, not just toy projects.",
  },
  {
    icon: FaCertificate,
    title: "Industry Certification",
    desc: "Get certified by a recognized IT training institute, valued by employers nationwide and internationally.",
  },
  {
    icon: FaCloud,
    title: "End-to-End Solutions",
    desc: "From ideation to deployment — web development, mobile apps, SEO, cloud, and ongoing support under one roof.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B] block">
            Why Sangalo Tech
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose <span className="text-[#00548B]">Sangalo Tech?</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            We&apos;re not just a training institute — we&apos;re a <strong>full-service software company</strong> that also trains the next generation of IT professionals.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#00548B]/10 flex items-center justify-center mb-5 group-hover:bg-[#00548B] transition-colors duration-300">
                <item.icon className="text-lg text-[#00548B] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Dual CTA */}
        <div className="flex flex-wrap justify-center gap-4 mt-14">
          <a href="/services" className="inline-flex items-center gap-3 bg-[#00548B] text-white px-8 py-4 rounded-lg font-bold text-sm hover:bg-[#004381] transition-all no-underline">
            <FaLaptopCode className="text-sm" /> Explore Our Services
          </a>
          <a href="/courses" className="inline-flex items-center gap-3 text-[#00548B] px-8 py-4 rounded-lg font-bold text-sm border border-[#00548B]/25 hover:bg-[#00548B]/5 transition-all no-underline">
            <FaGraduationCap className="text-sm" /> View All Courses
          </a>
        </div>
      </div>
    </section>
  );
}
