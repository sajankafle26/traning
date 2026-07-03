"use client";
import React from "react";
import { FaArrowRight, FaTrophy, FaChartLine, FaUsers } from "react-icons/fa";

const CASES = [
  {
    client: "Global Touch India",
    industry: "Education",
    metric: "3x",
    metricLabel: "enrollment increase",
    result: "Built a custom LMS platform that streamlined course management and doubled student enrollment within 6 months.",
    tags: ["Web App", "LMS", "React"],
  },
  {
    client: "Mahila Laghubitta",
    industry: "Finance",
    metric: "40%",
    metricLabel: "cost reduction",
    result: "Developed a micro-finance management system that reduced manual processing time by 40% and eliminated paper-based workflows.",
    tags: ["FinTech", "Laravel", "Cloud"],
  },
  {
    client: "Nepal Honey Hub",
    industry: "E-Commerce",
    metric: "200+",
    metricLabel: "monthly orders",
    result: "Launched a full e-commerce platform with payment integration that grew from 0 to 200+ monthly orders in 3 months.",
    tags: ["E-Commerce", "Payment Gateway", "UI/UX"],
  },
];

export default function CaseStudies() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20 mb-6">
            <FaTrophy className="text-xs" />
            Proven Results
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Stories of <span className="text-[#00548B]">Real Impact</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium text-lg max-w-xl mx-auto">
            How we've helped businesses transform with technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-[#00548B]/20 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00548B] bg-[#00548B]/10 px-3 py-1 rounded-full">{c.industry}</span>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-black text-[#00548B]">{c.metric}</span>
                <span className="text-sm font-bold text-slate-500 ml-2">{c.metricLabel}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{c.client}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{c.result}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span key={t} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
