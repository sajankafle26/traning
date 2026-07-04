"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiService } from '@/services/apiService';
import { ServiceItem } from '@/types';
import FAQSection from '@/components/FAQSection';
import {
  FaArrowLeft, FaEnvelope, FaPhone, FaRocket, FaCheckCircle,
  FaLaptopCode, FaMobileAlt, FaChartLine, FaPenNib, FaShoppingCart, FaCloud,
  FaCog, FaCode, FaSearch, FaHandshake, FaHome, FaChevronRight
} from 'react-icons/fa';
import Link from 'next/link';

const iconComponents: Record<string, any> = {
  'fa-solid fa-laptop-code': FaLaptopCode,
  'fa-solid fa-mobile-screen-button': FaMobileAlt,
  'fa-solid fa-chart-line': FaChartLine,
  'fa-solid fa-pen-nib': FaPenNib,
  'fa-solid fa-shopping-cart': FaShoppingCart,
  'fa-solid fa-cloud': FaCloud,
};

const SERVICE_IMAGES: Record<string, string> = {
  'web-app-development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  'mobile-app-development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
  'seo-and-performance-optimization': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1200',
  'ui-ux-design-and-prototyping': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
  'e-commerce-development': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
  'cloud-and-devops-services': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
};

const SERVICE_FAQS: Record<string, Array<{ question: string; answer: string }>> = {
  'web-app-development': [
    { question: "How long does it take to build a custom web application?", answer: "Depending on complexity, a custom web application takes 2-4 months from discovery to deployment. We follow agile methodology with 2-week sprints so you can see progress regularly." },
    { question: "What tech stack do you use for web development?", answer: "We primarily use React, Next.js, Node.js, TypeScript, and MongoDB for modern web applications. We also work with Python/Django, Laravel, and WordPress based on project requirements." },
    { question: "Do you provide maintenance after launch?", answer: "Yes, we offer ongoing maintenance packages including bug fixes, security patches, performance optimization, and feature enhancements. We have 24/7 support available." },
  ],
  'mobile-app-development': [
    { question: "Should I choose React Native or Flutter?", answer: "Both are excellent cross-platform frameworks. React Native is better if your team knows React, while Flutter offers superior UI consistency. We'll recommend the best fit during our consultation." },
    { question: "How much does mobile app development cost in Nepal?", answer: "Mobile app development costs in Nepal range from Rs. 150,000 to Rs. 500,000+ depending on features and complexity. Contact us for a free detailed estimate." },
  ],
  'seo-and-marketing': [
    { question: "How long does SEO take to show results?", answer: "SEO is a long-term strategy. You can expect initial improvements in 2-3 months, with significant results in 6-12 months. We focus on sustainable, white-hat techniques." },
    { question: "Do you manage Google Ads and social media?", answer: "Yes, we manage Google Ads (PPC), Facebook/Instagram ads, and social media marketing campaigns. We create data-driven strategies to maximize your ROI." },
  ],
  'brand-strategy': [
    { question: "What is brand strategy and why does my business need it?", answer: "Brand strategy is a long-term plan for developing a successful brand to achieve specific goals. It includes your brand's purpose, values, messaging, visual identity, and positioning. A strong brand strategy helps you stand out from competitors, build trust with customers, and command premium pricing." },
    { question: "What services are included in brand strategy?", answer: "Our brand strategy service covers brand research, competitive analysis, brand positioning, logo design, brand guidelines, color palette, typography, brand voice and messaging, visual identity system, and brand collateral design." },
    { question: "How long does brand strategy take?", answer: "A complete brand strategy project typically takes 2-4 weeks. This includes research, strategy development, creative concepts, design, and final brand guidelines delivery." },
    { question: "Do you work with startups in Nepal?", answer: "Yes! We work with startups, small businesses, and established companies across Nepal. Our brand strategy is tailored to your budget and goals, whether you're launching a new brand or refreshing an existing one." },
  ],
};

const ALL_SERVICE_FAQS = [
  {
    question: "What web development services does Sangalo Tech offer?",
    answer: "Sangalo Tech offers custom web application development, mobile app development, SEO & digital marketing, UI/UX design, e-commerce solutions, and cloud & DevOps services. We serve businesses in Nepal and internationally.",
  },
  {
    question: "How much do web development services cost in Nepal?",
    answer: "Costs vary by project scope. Basic websites start from Rs. 25,000, custom web apps from Rs. 100,000, and enterprise solutions from Rs. 300,000+. Contact us for a free consultation and custom quote.",
  },
  {
    question: "Does Sangalo Tech provide ongoing support?",
    answer: "Yes, we provide 24/7 technical support, maintenance, security updates, and feature enhancements. We offer flexible monthly and annual support plans.",
  },
];

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [service, setService] = useState<ServiceItem | null>(null);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [data, settings] = await Promise.all([
          apiService.getServiceBySlug(slug),
          apiService.getSiteSettings()
        ]);
        if (data) setService(data);
        if (settings) setSiteSettings(settings);
      } catch (err) {
        console.error("Failed to fetch service details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-[#00548B]/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-[#00548B] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Service Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">
          The service you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 bg-[#00548B] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-[#004381] transition-all no-underline"
        >
          <FaArrowLeft /> Explore All Services
        </Link>
      </div>
    );
  }

  const Icon = iconComponents[service.icon || ''] || FaRocket;
  const image = service.image || SERVICE_IMAGES[service.slug] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200';
  const faqs = SERVICE_FAQS[slug] || ALL_SERVICE_FAQS;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Sangalo Tech Pvt. Ltd.",
      url: "https://sangalotech.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    url: `https://sangalotech.com/services/${slug}`,
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={`${service.title} by Sangalo Tech Nepal`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00548B]/95 via-[#00548B]/85 to-[#00548B]/70" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.1]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-12" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1 text-white/60 hover:text-white transition-colors no-underline">
              <FaHome className="text-xs" /> Home
            </Link>
            <FaChevronRight className="text-[8px] text-white/40" />
            <Link href="/services" className="text-white/60 hover:text-white transition-colors no-underline">
              Services
            </Link>
            <FaChevronRight className="text-[8px] text-white/40" />
            <span className="text-white font-medium">{service.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20 mb-6">
                <FaRocket className="text-xs animate-pulse" />
                Premium Service
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.9] mb-6">
                {service.title}
              </h1>
              <p className="text-lg text-white/80 font-medium leading-relaxed max-w-xl">
                Elevating your digital presence with world-class {service.title.toLowerCase()} tailored to your unique needs in Nepal.
              </p>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="w-64 h-64 rounded-[3rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                {service.icon?.startsWith('fa') ? (
                  <i className={`${service.icon} text-8xl text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]`} />
                ) : (
                  <Icon className="text-8xl text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1400px] mx-auto py-24 px-6">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left: Service Overview */}
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                <span className="w-12 h-1 bg-[#00548B] rounded-full" />
                Service Overview
              </h2>
              <div
                className="text-slate-600 font-medium leading-relaxed text-lg [&_p]:mb-4 [&_p:last-child]:mb-0 [&_h3]:text-slate-900 [&_h3]:font-bold [&_h3]:text-xl [&_h3]:mb-3 [&_ul]:space-y-2 [&_li]:flex [&_li]:items-start [&_li]:gap-2"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-[#f8fbff] to-white p-10 rounded-[2.5rem] border border-slate-100 space-y-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Why Choose Sangalo Tech?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: FaCode, title: "Clean Architecture", desc: "Scalable, maintainable code built for long-term success." },
                  { icon: FaRocket, title: "Fast Delivery", desc: "Rapid development without compromising quality." },
                  { icon: FaHandshake, title: "Direct Communication", desc: "Work directly with senior developers and designers." },
                  { icon: FaCheckCircle, title: "Quality Assured", desc: "Rigorous testing and code review at every stage." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-xl bg-[#00548B]/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-[#00548B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Our Process</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: FaSearch, step: '01', title: 'Discovery', desc: 'Understanding your goals and requirements.' },
                  { icon: FaCode, step: '02', title: 'Develop', desc: 'Building with modern frameworks and best practices.' },
                  { icon: FaCog, step: '03', title: 'Deploy', desc: 'Launch with ongoing support and maintenance.' },
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all">
                    <div className="w-16 h-16 rounded-full bg-[#00548B]/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="text-xl text-[#00548B]" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.step}</span>
                    <h4 className="font-bold text-slate-900 mt-2 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <FAQSection faqs={faqs} />
          </div>

          {/* Right: CTA Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-32">
              {/* Contact Card */}
              <div className="bg-[#00548B] p-8 rounded-[2.5rem] shadow-xl shadow-[#00548B]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-black/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Get Started Today</h3>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed">
                    Ready to elevate your digital presence? Let&apos;s discuss your project.
                  </p>

                  <div className="space-y-3 mb-8">
                    <a
                      href={`mailto:${siteSettings?.email || 'studio@sangalotech.com'}`}
                      className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10 no-underline text-white"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <FaEnvelope className="text-sm" />
                      </div>
                      <div className="text-sm font-medium truncate">{siteSettings?.email || 'studio@sangalotech.com'}</div>
                    </a>

                    <a
                      href={`tel:${siteSettings?.phone?.split('/')[0]?.trim() || '+9779851228383'}`}
                      className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10 no-underline text-white"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                        <FaPhone className="text-sm" />
                      </div>
                      <div className="text-sm font-medium">{siteSettings?.phone || '+977-9851228383'}</div>
                    </a>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full bg-white text-[#00548B] py-4 rounded-2xl font-bold text-center text-sm hover:shadow-xl hover:-translate-y-1 transition-all block no-underline"
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-slate-600 border border-slate-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Other Services */}
              <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Other Services</h4>
                <div className="space-y-2">
                  {['Web App Development', 'Mobile Apps', 'UI/UX & Prototyping', 'SEO & Marketing', 'E-Commerce', 'Cloud & DevOps'].map((s, i) => (
                    <Link key={i} href="/services" className="block text-sm text-slate-600 hover:text-[#00548B] transition-colors no-underline">
                      {s}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
