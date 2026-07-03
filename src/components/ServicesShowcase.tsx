"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiService } from "@/services/apiService";
import { ServiceItem } from "@/types";
import {
  FaArrowRight, FaLaptopCode, FaMobileAlt, FaChartLine,
  FaPenNib, FaShoppingCart, FaCloud, FaCode, FaSearch, FaCog
} from "react-icons/fa";

const iconComponents: Record<string, any> = {
  'fa-solid fa-laptop-code': FaLaptopCode,
  'fa-solid fa-mobile-screen-button': FaMobileAlt,
  'fa-solid fa-chart-line': FaChartLine,
  'fa-solid fa-pen-nib': FaPenNib,
  'fa-solid fa-shopping-cart': FaShoppingCart,
  'fa-solid fa-cloud': FaCloud,
};

const SERVICE_IMAGES: Record<string, string> = {
  'web-app-development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'mobile-app-development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
  'seo-and-performance-optimization': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800',
  'ui-ux-design-and-prototyping': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
  'e-commerce-development': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
  'cloud-and-devops-services': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
};

export default function ServicesShowcase() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiService.getServices();
        setServices(data);
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (services.length === 0 && !loading) return null;

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-3 bg-[#00548B]/10 text-[#00548B] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[#00548B]/20">
              <FaLaptopCode className="text-xs" />
              Software Company
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[0.95]">
              Our <span className="text-[#00548B]">Services</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed">
              From concept to deployment — we build scalable web apps, mobile apps, and digital solutions for businesses in Nepal and beyond.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-[#00548B] text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#004381] transition-all shadow-xl shadow-[#00548B]/20 no-underline"
          >
            View All Services
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-50 rounded-3xl border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComp = iconComponents[service.icon || ''] || FaLaptopCode;
              const image = service.image || SERVICE_IMAGES[service.slug] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
              return (
                <Link key={service.id} href={`/services/${service.slug}`} className="group block">
                  <article className="relative h-full rounded-3xl bg-white border border-slate-100 overflow-hidden hover:shadow-2xl hover:border-[#00548B]/20 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={image}
                        alt={`${service.title} - Sangalo Tech Nepal`}
                        width={800}
                        height={500}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="w-10 h-10 rounded-xl bg-[#00548B] flex items-center justify-center shadow-lg">
                          {service.icon?.startsWith('fa') ? (
                            <i className={`${service.icon} text-base text-white`} />
                          ) : (
                            <IconComp className="text-base text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#00548B] transition-colors">
                        {service.title}
                      </h3>
                      <div
                        className="text-sm text-slate-500 leading-relaxed line-clamp-2 [&_p]:mb-1 [&_p:last-child]:mb-0"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                      />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* Tech Stack Bar */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Technologies We Work With</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'React Native', 'Flutter', 'Python', 'Laravel', 'WordPress', 'AWS', 'Docker'].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600 hover:border-[#00548B]/30 hover:text-[#00548B] transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
