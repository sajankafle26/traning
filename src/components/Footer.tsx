"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaFacebookF, FaYoutube, FaLinkedinIn, FaInstagram, FaLocationDot,
  FaFileInvoice, FaCertificate, FaPhoneVolume, FaWhatsapp, FaEnvelope,
  FaBuildingColumns, FaTiktok, FaGraduationCap, FaScrewdriverWrench,
  FaBoxOpen, FaPaperPlane
} from "react-icons/fa6";

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [siteSettings, setSiteSettings] = React.useState<any>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await import("@/services/apiService").then(m => m.apiService.getSiteSettings());
      if (data) setSiteSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer ref={sectionRef} className="relative bg-[#00548B] text-white pt-24 pb-10 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(0,0,0,0.06))" }} />

      {/* Google Maps */}
      <div className="relative z-10 max-w-[1200px] mx-auto mb-16">
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.2!2d85.3667338!3d27.6798088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1bbe687777ed%3A0x1594f891af9bd6ae!2sSangalo%20Tech%20Pvt%20Ltd!5e0!3m2!1sen!2snp!4v1"
            width="100%"
            height="300"
            style={{ border: 0, filter: "saturate(0.8) brightness(0.95)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sangalo Tech Location - Lokenthali, Bhaktapur, Nepal"
          />
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="relative z-10 max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        {/* Company Info */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <img src="/logo.png" alt="Sangalo Tech" className="h-12 w-auto brightness-0 invert" />
          </Link>
          <p className="text-blue-100/70 leading-relaxed text-sm">
            Leading the digital revolution in Nepal with high-quality IT training and software solutions since 2022.
          </p>
          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <FaLocationDot className="text-blue-200/90 mt-1 shrink-0" />
              <span>{siteSettings?.address || "Lokenthali, Bhaktapur, Nepal"}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaFileInvoice className="text-blue-200/90 shrink-0" />
              <span>Pan No: 602345817</span>
            </p>
          </div>
          {/* Social */}
          <div className="flex gap-3 pt-2">
            {[
              { href: siteSettings?.facebook || "#", icon: FaFacebookF, label: "Facebook", color: "hover:bg-blue-600" },
              { href: siteSettings?.youtube || "#", icon: FaYoutube, label: "YouTube", color: "hover:bg-red-600" },
              { href: siteSettings?.linkedin || "#", icon: FaLinkedinIn, label: "LinkedIn", color: "hover:bg-blue-400" },
              { href: siteSettings?.instagram || "#", icon: FaInstagram, label: "Instagram", color: "hover:bg-pink-600" },
              { href: siteSettings?.tiktok || "#", icon: FaTiktok, label: "TikTok", color: "hover:bg-slate-900" },
            ].filter(s => s.href !== "#").map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center ${s.color} transition`} aria-label={s.label}>
                <s.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-l-4 border-blue-300/80 pl-3">Company</h3>
          <ul className="space-y-3 text-sm text-blue-100/75">
            <li><Link href="/about" className="hover:text-white transition">About Sangalo Tech</Link></li>
            <li><Link href="/internships" className="hover:text-white transition">Internship Hub</Link></li>
            <li><Link href="/video-courses" className="hover:text-white transition">Video Marketplace</Link></li>
            <li><Link href="/portfolio" className="hover:text-white transition">Our Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Popular Courses */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-l-4 border-blue-300/80 pl-3">Popular Courses</h3>
          <ul className="space-y-3 text-sm text-blue-100/75">
            <li><Link href="/courses/mern-stack-mastery" className="hover:text-white transition">MERN Stack Mastery</Link></li>
            <li><Link href="/courses/react-and-nextjs-mastery" className="hover:text-white transition">React & Next.js</Link></li>
            <li><Link href="/courses/web-development-with-python-and-django" className="hover:text-white transition">Python & Django</Link></li>
            <li><Link href="/courses/ui-ux-design-training" className="hover:text-white transition">UI/UX Design</Link></li>
            <li><Link href="/courses/digital-marketing-pro" className="hover:text-white transition">Digital Marketing</Link></li>
          </ul>
        </div>

        {/* Newsletter + WhatsApp */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-l-4 border-blue-300/80 pl-3">Stay Connected</h3>
          {/* Newsletter */}
          <div className="space-y-3">
            <p className="text-sm text-blue-100/70">Get updates on new courses and offers.</p>
            {subscribed ? (
              <div className="bg-green-500/20 text-green-200 px-4 py-3 rounded-xl text-sm font-bold">
                ✓ Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  required
                />
                <button type="submit" className="bg-white text-[#00548B] px-4 rounded-xl font-bold hover:bg-blue-100 transition shrink-0">
                  <FaPaperPlane />
                </button>
              </form>
            )}
          </div>
          {/* WhatsApp */}
          <a
            href={`https://wa.me/977${siteSettings?.whatsapp || '9851228383'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all no-underline"
          >
            <FaWhatsapp className="text-lg" />
            Chat on WhatsApp
          </a>
          {/* Contact */}
          <div className="space-y-3 text-sm">
            <a href={`tel:${siteSettings?.phone?.split('/')[0]?.trim() || '+9779851228383'}`} className="flex items-center gap-2 text-blue-100/75 hover:text-white transition no-underline">
              <FaPhoneVolume className="text-blue-200/90" />
              {siteSettings?.phone || "9851228383"}
            </a>
            <a href={`mailto:${siteSettings?.email || 'studio@sangalotech.com'}`} className="flex items-center gap-2 text-blue-100/75 hover:text-white transition no-underline">
              <FaEnvelope className="text-red-300" />
              {siteSettings?.email || "studio@sangalotech.com"}
            </a>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="relative z-10 max-w-[1200px] mx-auto py-10 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-sm font-black uppercase tracking-widest text-blue-200">Secure Payments</h4>
            <p className="text-xs text-blue-100/60 font-medium">We accept the following methods for enrollments & video purchases.</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {[
              { name: "eSewa", color: "#60bb46" },
              { name: "Khalti", color: "#5c2d91" },
              { name: "fonepay", color: "#e31e24" },
              { name: "Bank Transfer", icon: FaBuildingColumns, color: "#ffffff" },
            ].map((p, i) => (
              <div key={i} className="bg-white px-4 py-2 rounded-lg flex items-center gap-2 group hover:scale-105 transition-transform cursor-default">
                {p.icon ? (
                  <p.icon className="text-[#5c2d91]" />
                ) : (
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: p.color }} />
                )}
                <span className="font-black text-[12px]" style={{ color: p.color === "#ffffff" ? "#5c2d91" : p.color }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer tail */}
      <div className="relative z-10 max-w-[1200px] mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-100/60">
        <p>© {new Date().getFullYear()} Sangalo Tech Pvt. Ltd. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>

      {/* Mobile Spacer */}
      <div className="h-20 md:hidden" aria-hidden />

      {/* Mobile Bottom Fixed Menu */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[70]" aria-label="Mobile navigation">
        <div className="mx-auto max-w-[1200px] px-3 pb-[env(safe-area-inset-bottom)]">
          <div className="m-3 rounded-2xl bg-white/90 text-[#00548B] shadow-2xl shadow-black/20 border border-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/90">
            <ul className="grid grid-cols-3">
              <li>
                <Link href="/courses" className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl" aria-label="Training">
                  <FaGraduationCap className="text-lg" />
                  <span className="text-[11px] font-extrabold tracking-wider uppercase">Training</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl" aria-label="Services">
                  <FaScrewdriverWrench className="text-lg" />
                  <span className="text-[11px] font-extrabold tracking-wider uppercase">Services</span>
                </Link>
              </li>
              <li>
                <a href={`https://wa.me/977${siteSettings?.whatsapp || '9851228383'}`} className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl text-green-600" aria-label="WhatsApp">
                  <FaWhatsapp className="text-lg" />
                  <span className="text-[11px] font-extrabold tracking-wider uppercase">WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
