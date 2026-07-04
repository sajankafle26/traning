"use client";
import React, { useState, useEffect } from "react";
import { FaComments, FaXmark, FaPaperPlane, FaPhone } from "react-icons/fa6";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-5 md:bottom-6 md:left-6 z-50">
      {/* Popup Card */}
      {open && (
        <div className="mb-3 bg-white rounded-xl shadow-2xl border border-slate-200 w-72 overflow-hidden">
          <div className="bg-[#00548B] text-white px-5 py-4">
            <h3 className="font-bold text-sm">Book Free Consultation</h3>
            <p className="text-white/70 text-xs mt-0.5">Talk to our expert for free</p>
          </div>
          <div className="p-5 space-y-3">
            <a
              href="tel:+9779851228383"
              aria-label="Call us"
              className="flex items-center gap-3 w-full bg-[#00548B] text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-[#004381] transition no-underline"
            >
              <FaPhone className="text-sm" />
              Call Now
            </a>
            <a
              href="https://wa.me/9779851228383"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center gap-3 w-full bg-green-500 text-white px-4 py-3 rounded-lg font-bold text-sm hover:bg-green-600 transition no-underline"
            >
              <FaComments className="text-sm" />
              WhatsApp Chat
            </a>
            <a
              href="/contact"
              aria-label="Send message"
              className="flex items-center gap-3 w-full border border-slate-200 text-slate-700 px-4 py-3 rounded-lg font-bold text-sm hover:bg-slate-50 transition no-underline"
            >
              <FaPaperPlane className="text-sm" />
              Send Message
            </a>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 hover:bg-amber-600 hover:shadow-xl transition-all"
        aria-label={open ? "Close contact options" : "Open contact options"}
      >
        {open ? <FaXmark className="text-lg" /> : <FaComments className="text-lg" />}
      </button>
    </div>
  );
}
