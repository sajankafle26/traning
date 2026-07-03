"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { apiService } from "@/services/apiService";
import { ServiceItem } from "@/types";
import {
  FaArrowRight, FaLaptopCode, FaMobileAlt, FaChartLine,
  FaPenNib, FaShoppingCart, FaCloud
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
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B]">Software Company</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Our Services
            </h2>
            <p className="text-slate-500 text-lg max-w-lg">
              End-to-end digital solutions for businesses in Nepal and beyond
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#00548B] hover:gap-3 transition-all group shrink-0"
          >
            View All Services
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/10] bg-slate-100 rounded-xl mb-4" />
                <div className="h-5 bg-slate-100 rounded-lg w-3/4 mb-2" />
                <div className="h-4 bg-slate-100 rounded-lg w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComp = iconComponents[service.icon || ''] || FaLaptopCode;
              const image = service.image || SERVICE_IMAGES[service.slug] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
              return (
                <Link key={service.id} href={`/services/${service.slug}`} className="group block">
                  <article className="h-full">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-4">
                      <Image
                        src={image}
                        alt={service.title}
                        width={800}
                        height={500}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <div className="w-9 h-9 rounded-lg bg-[#00548B] flex items-center justify-center shadow-md">
                          {service.icon?.startsWith('fa') ? (
                            <i className={`${service.icon} text-sm text-white`} />
                          ) : (
                            <IconComp className="text-sm text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#00548B] transition-colors mb-1">
                      {service.title}
                    </h3>
                    <div
                      className="text-sm text-slate-400 leading-relaxed line-clamp-2 [&_p]:mb-1 [&_p:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {/* Tech Stack */}
        {!loading && services.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center mb-5">Technologies We Work With</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'React Native', 'Flutter', 'Python', 'Laravel', 'WordPress', 'AWS', 'Docker'].map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-500 hover:border-[#00548B]/30 hover:text-[#00548B] transition-all">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
