"use client";
import React from "react";
import {
  FaRocket, FaLaptopCode, FaHandshake, FaCertificate, FaUsers,
  FaGraduationCap, FaCode, FaMobileAlt, FaChartLine, FaCloud
} from "react-icons/fa";

const REASONS = [
  {
    icon: FaLaptopCode,
    title: "Full-Service Software Company",
    desc: "From custom web apps to mobile apps, we build scalable digital products with React, Next.js, Node.js, and more.",
    type: "company",
  },
  {
    icon: FaGraduationCap,
    title: "Job-Ready IT Training",
    desc: "9+ professional courses designed with industry input. Learn from senior developers and become employable in months.",
    type: "training",
  },
  {
    icon: FaHandshake,
    title: "100% Placement Support",
    desc: "Dedicated career services with 50+ hiring partners. Our graduates get placed at top IT companies in Nepal.",
    type: "training",
  },
  {
    icon: FaCode,
    title: "Real Client Projects",
    desc: "Work on live client projects during training. Our students build production-grade apps, not just toy projects.",
    type: "both",
  },
  {
    icon: FaCertificate,
    title: "Industry Certification",
    desc: "Get certified by a recognized IT training institute, valued by employers nationwide and internationally.",
    type: "training",
  },
  {
    icon: FaCloud,
    title: "End-to-End Solutions",
    desc: "From ideation to deployment — web development, mobile apps, SEO, cloud, and ongoing support under one roof.",
    type: "company",
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
          <p className="text-slate-500 max-w-3xl mx-auto text-lg leading-relaxed">
            We&apos;re not just a training institute — we&apos;re a <strong>full-service software company</strong> that also trains the next generation of IT professionals. This dual expertise means you learn from developers who build real products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((item, i) => (
            <div
              key={i}
              className="group bg-white p-8 md:p-10 rounded-3xl border border-slate-100 hover:shadow-2xl hover:shadow-[#00548B]/10 hover:border-[#00548B]/20 transition-all duration-500 hover:-translate-y-2 relative"
            >
              {/* Type Badge */}
              <div className="absolute top-6 right-6">
                <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  item.type === 'company' ? 'bg-blue-50 text-blue-600' :
                  item.type === 'training' ? 'bg-emerald-50 text-emerald-600' :
                  'bg-violet-50 text-violet-600'
                }`}>
                  {item.type === 'both' ? 'Company + Institute' : item.type === 'company' ? 'Software Company' : 'IT Training'}
                </span>
              </div>

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

        {/* Dual CTA */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          <a href="/services" className="inline-flex items-center gap-3 bg-[#00548B] text-white px-10 py-5 rounded-2xl font-bold text-sm hover:bg-[#004381] transition-all shadow-xl shadow-[#00548B]/20 no-underline">
            <FaLaptopCode /> Explore Our Services
          </a>
          <a href="/courses" className="inline-flex items-center gap-3 bg-white text-[#00548B] px-10 py-5 rounded-2xl font-bold text-sm border-2 border-[#00548B]/20 hover:border-[#00548B] hover:shadow-xl transition-all no-underline">
            <FaGraduationCap /> View All Courses
          </a>
        </div>
      </div>
    </section>
  );
}
