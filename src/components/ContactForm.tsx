'use client';
import React, { useState } from 'react';
import { apiService } from '@/services/apiService';
import { FaEnvelope, FaLocationDot, FaPaperPlane, FaPhone, FaClock, FaBolt } from 'react-icons/fa6';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ type: 'idle' });
  const [siteSettings, setSiteSettings] = useState<any>(null);

  React.useEffect(() => {
    const fetchSettings = async () => {
      const data = await apiService.getSiteSettings();
      if (data) setSiteSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });
    const response = await apiService.submitContact(formData);
    if (response) {
      setStatus({ type: 'success', message: 'Thank you! We will get back to you within 24 hours.' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ type: 'idle' }), 5000);
    } else {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section id="contact" className="py-16 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16">
        {/* Left - Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
              <FaPhone className="text-xs" />
              Get In Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Let&apos;s Start a <span className="text-[#00548B]">Conversation</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-lg">
              Have a project in mind or want to learn about our courses? Reach out and our team will respond within 24 hours.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-[#00548B]/10 flex items-center justify-center shrink-0">
                <FaEnvelope className="text-[#00548B] text-sm" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                <p className="text-slate-700 font-semibold text-sm">{siteSettings?.email || "support@sangalotech.com"}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-[#00548B]/10 flex items-center justify-center shrink-0">
                <FaPhone className="text-[#00548B] text-sm" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                <p className="text-slate-700 font-semibold text-sm">{siteSettings?.phone || "+977-9851228383"}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-[#00548B]/10 flex items-center justify-center shrink-0">
                <FaLocationDot className="text-[#00548B] text-sm" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Office</p>
                <p className="text-slate-700 font-semibold text-sm">{siteSettings?.address || "Lokenthali, Bhaktapur, Nepal"}</p>
              </div>
            </div>
          </div>

          {/* Business Hours + Response Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-[#00548B]/20 bg-[#00548B]/5">
              <FaClock className="text-[#00548B] text-lg mb-2" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Business Hours</p>
              <p className="text-slate-700 font-bold text-sm">Sun-Fri: 9AM - 5PM</p>
              <p className="text-slate-400 text-xs">Saturday: Closed</p>
            </div>
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50">
              <FaBolt className="text-emerald-600 text-lg mb-2" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Response Time</p>
              <p className="text-slate-700 font-bold text-sm">Within 24 Hours</p>
              <p className="text-slate-400 text-xs">Monday - Friday</p>
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 md:p-10">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg px-5 py-4 outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] transition text-sm text-slate-900 placeholder:text-slate-300"
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg px-5 py-4 outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] transition text-sm text-slate-900 placeholder:text-slate-300"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-lg px-5 py-4 outline-none focus:ring-2 focus:ring-[#00548B]/20 focus:border-[#00548B] transition text-sm text-slate-900 placeholder:text-slate-300 resize-none"
                placeholder="Tell us about your project or question..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="w-full bg-[#00548B] text-white font-bold py-4 rounded-lg hover:bg-[#004381] transition-all shadow-lg shadow-[#00548B]/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 text-sm"
            >
              {status.type === 'loading' ? 'Sending...' : (
                <>Send Message <FaPaperPlane className="text-xs" /></>
              )}
            </button>
            {status.type === 'success' && (
              <div className="text-center p-4 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-sm border border-emerald-100">
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
