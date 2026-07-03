"use client";

import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export default function FAQSection({ title, subtitle, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          {(title || subtitle) && (
            <div className="text-center mb-12 space-y-3">
              {title && (
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-slate-500 max-w-xl mx-auto">{subtitle}</p>
              )}
            </div>
          )}

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? "bg-white border-[#00548B]/20 shadow-lg shadow-[#00548B]/5"
                    : "bg-white border-slate-100 hover:border-slate-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      openIndex === i
                        ? "bg-[#00548B] text-white"
                        : "bg-[#00548B]/10 text-[#00548B]"
                    }`}
                  >
                    <FaQuestionCircle className="text-sm" />
                  </div>
                  <span
                    className={`flex-1 font-bold transition-colors ${
                      openIndex === i ? "text-[#00548B]" : "text-slate-800"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <FaChevronDown
                    className={`text-slate-400 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180 text-[#00548B]" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-5 pl-19 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 ml-14">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
