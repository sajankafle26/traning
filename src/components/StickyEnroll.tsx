"use client";
import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaPhone } from "react-icons/fa6";

interface StickyEnrollProps {
  courseTitle: string;
  price?: number;
  onEnrollClick: () => void;
}

export default function StickyEnroll({ courseTitle, price, onEnrollClick }: StickyEnrollProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const formEl = document.querySelector('[data-enroll-form]');
      if (!formEl) {
        setVisible(window.scrollY > 600);
        return;
      }
      const rect = formEl.getBoundingClientRect();
      setVisible(rect.top > window.innerHeight || rect.bottom < 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 md:hidden">
      <div className="max-w-lg mx-auto flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-900 truncate">{courseTitle}</p>
          {price && (
            <p className="text-sm font-black text-[#00548B]">Rs. {price.toLocaleString("en-NP")}</p>
          )}
        </div>
        <button
          onClick={onEnrollClick}
          className="shrink-0 inline-flex items-center gap-2 bg-[#00548B] text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-[#004381] transition-all"
        >
          <FaPaperPlane className="text-xs" />
          Enroll Now
        </button>
        <a
          href="tel:+9779702345678"
          className="shrink-0 w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all"
          aria-label="Call us"
        >
          <FaPhone className="text-sm" />
        </a>
      </div>
    </div>
  );
}
