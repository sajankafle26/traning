"use client";
import React from "react";

const CASES = [
  {
    client: "Global Touch India",
    industry: "Education",
    metric: "3×",
    metricLabel: "Enrollment Increase",
    result: "Built a custom LMS platform that streamlined course management and doubled student enrollment within 6 months.",
    tags: ["Web App", "LMS", "React"],
  },
  {
    client: "Mahila Laghubitta",
    industry: "Finance",
    metric: "40%",
    metricLabel: "Cost Reduction",
    result: "Developed a micro-finance management system that reduced manual processing time by 40% and eliminated paper-based workflows.",
    tags: ["FinTech", "Laravel", "Cloud"],
  },
  {
    client: "Nepal Honey Hub",
    industry: "E-Commerce",
    metric: "200+",
    metricLabel: "Monthly Orders",
    result: "Launched a full e-commerce platform with payment integration that grew from 0 to 200+ monthly orders in 3 months.",
    tags: ["E-Commerce", "Payment Gateway", "UI/UX"],
  },
];

export default function CaseStudies() {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-[1400px] px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B] block">
            Case Studies
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Stories of <span className="text-[#00548B]">Real Impact</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            How we&apos;ve helped businesses transform with technology
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-100 p-7 hover:shadow-lg hover:border-slate-200 transition-all duration-300"
            >
              {/* Industry Tag */}
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                {c.industry}
              </span>

              {/* Metric */}
              <div className="mt-6 mb-4">
                <span className="text-4xl font-black text-[#00548B] leading-none">{c.metric}</span>
                <span className="text-sm font-semibold text-slate-400 ml-2">{c.metricLabel}</span>
              </div>

              {/* Client & Description */}
              <h3 className="text-lg font-bold text-slate-900 mb-2">{c.client}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">{c.result}</p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-50">
                {c.tags.map((t) => (
                  <span key={t} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
