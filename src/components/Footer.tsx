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
    <footer aria-label="Site footer" ref={sectionRef} className="relative bg-[#00548B] text-white pt-16 md:pt-24 pb-28 md:pb-10 px-5 md:px-6 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Google Maps */}
      <div className="relative z-10 max-w-[1400px] px-4 mx-auto mb-12 md:mb-16">
        <div className="rounded-xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.2!2d85.3667338!3d27.6798088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1bbe687777ed%3A0x1594f891af9bd6ae!2sSangalo%20Tech%20Pvt%20Ltd!5e0!3m2!1sen!2snp!4v1"
            width="100%"
            height="220"
            style={{ border: 0, filter: "saturate(0.8) brightness(0.95)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sangalo Tech Location"
            className="md:h-[300px]"
          />
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="relative z-10 max-w-[1400px] px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 border-b border-white/10 pb-12 md:pb-16">
        {/* Company Info */}
        <div className="space-y-5">
          <Link href="/" className="inline-block">
            <img src="/logo.png" alt="Sangalo Tech" className="h-11 w-auto brightness-0 invert" loading="eager" width={180} height={48} />
          </Link>
          <p className="text-blue-100/60 leading-relaxed text-sm">
            Leading the digital revolution in Nepal with high-quality IT training and software solutions since 2022.
          </p>
          <div className="space-y-2.5 text-sm">
            <p className="flex items-start gap-2.5">
              <FaLocationDot className="text-blue-200/80 mt-1 shrink-0" />
              <span className="text-blue-100/70">{siteSettings?.address || "Lokenthali, Bhaktapur, Nepal"}</span>
            </p>
            <p className="flex items-center gap-2.5">
              <FaFileInvoice className="text-blue-200/80 shrink-0" />
              <span className="text-blue-100/70">Pan No: 602345817</span>
            </p>
          </div>
          <div className="flex gap-2.5 pt-1">
            {[
              { href: siteSettings?.facebook || "#", icon: FaFacebookF, label: "Facebook", color: "hover:bg-blue-600" },
              { href: siteSettings?.youtube || "#", icon: FaYoutube, label: "YouTube", color: "hover:bg-red-600" },
              { href: siteSettings?.linkedin || "#", icon: FaLinkedinIn, label: "LinkedIn", color: "hover:bg-blue-400" },
              { href: siteSettings?.instagram || "#", icon: FaInstagram, label: "Instagram", color: "hover:bg-pink-600" },
              { href: siteSettings?.tiktok || "#", icon: FaTiktok, label: "TikTok", color: "hover:bg-slate-900" },
            ].filter(s => s.href !== "#").map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center ${s.color} transition`} aria-label={s.label}>
                <s.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-5">
          <h3 className="text-base font-bold border-l-4 border-white/30 pl-3">Company</h3>
          <ul className="space-y-1">
            {[
              { href: "/about", label: "About Sangalo Tech" },
              { href: "/services", label: "Our Services" },
              { href: "/video-marketplace", label: "Video Marketplace" },
              { href: "/portfolio", label: "Our Portfolio" },
              { href: "/contact", label: "Contact Us" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block py-2 text-sm text-blue-100/60 hover:text-white transition no-underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Courses */}
        <div className="space-y-5">
          <h3 className="text-base font-bold border-l-4 border-white/30 pl-3">Popular Courses</h3>
          <ul className="space-y-1">
            {[
              { href: "/courses/mern-stack", label: "MERN Stack" },
              { href: "/courses/react-next-js", label: "React & Next.js" },
              { href: "/courses/web-development-with-python-and-django", label: "Python & Django" },
              { href: "/courses/ui-ux-design", label: "UI/UX Design" },
              { href: "/courses/digital-marketing", label: "Digital Marketing" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block py-2 text-sm text-blue-100/60 hover:text-white transition no-underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter + WhatsApp */}
        <div className="space-y-5">
          <h3 className="text-base font-bold border-l-4 border-white/30 pl-3">Stay Connected</h3>
          <p className="text-sm text-blue-100/50">Get updates on new courses and offers.</p>
          {subscribed ? (
            <div className="bg-green-500/20 text-green-200 px-4 py-3 rounded-lg text-sm font-bold">
              Thanks for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 min-w-0"
                required
              />
              <button type="submit" aria-label="Subscribe to newsletter" className="bg-white text-[#00548B] px-4 py-3 rounded-lg font-bold hover:bg-blue-100 transition shrink-0">
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          )}
          <a
            href={`https://wa.me/977${siteSettings?.whatsapp || '9851228383'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-5 py-3.5 rounded-lg font-bold text-sm transition-all no-underline"
          >
            <FaWhatsapp className="text-lg" />
            Chat on WhatsApp
          </a>
          <div className="space-y-2.5 text-sm">
            <a href={`tel:${siteSettings?.phone?.split('/')[0]?.trim() || '+9779851228383'}`} className="flex items-center gap-2.5 py-1 text-blue-100/60 hover:text-white transition no-underline">
              <FaPhoneVolume className="text-blue-200/80" />
              {siteSettings?.phone || "9851228383"}
            </a>
            <a href={`mailto:${siteSettings?.email || 'studio@sangalotech.com'}`} className="flex items-center gap-2.5 py-1 text-blue-100/60 hover:text-white transition no-underline">
              <FaEnvelope className="text-red-300" />
              {siteSettings?.email || "studio@sangalotech.com"}
            </a>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="relative z-10 max-w-[1200px] mx-auto py-8 md:py-10 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-200">Secure Payments</h4>
            <p className="text-[11px] text-blue-100/50">We accept the following methods for enrollments & video purchases.</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2.5">
            {[
              { name: "eSewa", color: "#60bb46" },
              { name: "Khalti", color: "#5c2d91" },
              { name: "fonepay", color: "#e31e24" },
              { name: "Bank Transfer", icon: FaBuildingColumns, color: "#ffffff" },
            ].map((p, i) => (
              <div key={i} className="bg-white px-4 py-2 rounded-lg flex items-center gap-2">
                {p.icon ? (
                  <p.icon className="text-[#5c2d91] text-sm" />
                ) : (
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.color }} />
                )}
                <span className="font-bold text-[11px]" style={{ color: p.color === "#ffffff" ? "#5c2d91" : p.color }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer tail */}
      <div className="relative z-10 max-w-[1200px] mx-auto pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-blue-100/50">
        <p>&copy; {new Date().getFullYear()} Sangalo Tech Pvt. Ltd. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>

      {/* Mobile Bottom Fixed Menu */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[60]" aria-label="Mobile navigation">
        <div className="px-2.5 pb-[env(safe-area-inset-bottom)]">
          <div className="bg-white rounded-xl shadow-[0_-2px_20px_rgba(0,0,0,0.1)] border border-slate-100">
            <ul className="grid grid-cols-3">
              <li>
                <Link href="/courses" className="flex flex-col items-center justify-center gap-0.5 py-3 text-[#00548B]" aria-label="Training">
                  <FaGraduationCap className="text-lg" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">Training</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="flex flex-col items-center justify-center gap-0.5 py-3 text-[#00548B]" aria-label="Services">
                  <FaScrewdriverWrench className="text-lg" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">Services</span>
                </Link>
              </li>
              <li>
                <a href={`https://wa.me/977${siteSettings?.whatsapp || '9851228383'}`} className="flex flex-col items-center justify-center gap-0.5 py-3 text-green-600" aria-label="WhatsApp">
                  <FaWhatsapp className="text-lg" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">WhatsApp</span>
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
