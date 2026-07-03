'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

interface Company {
  _id: string;
  title: string;
  image: string;
  category?: string;
}

const COMPANIES: Company[] = [
  { _id: '1', title: 'Banking Khabar', image: '/trusted/banking-logo.jpg', category: 'News Portal' },
  { _id: '2', title: 'BG Khabar', image: '/trusted/bgkhabar.png', category: 'News Portal' },
  { _id: '3', title: 'Business Sansar', image: '/trusted/businesssasakor.png', category: 'News' },
  { _id: '4', title: 'Career Point', image: '/trusted/Career Point.webp', category: 'Consultancy' },
  { _id: '5', title: 'Himal Hub', image: '/trusted/himalhub.png', category: 'News Portal' },
  { _id: '6', title: 'Nepal Honey Hub', image: '/trusted/honeyhub.jpg', category: 'E-Commerce' },
  { _id: '7', title: 'Laghukta News', image: '/trusted/lagubittya.jpg', category: 'Finance' },
  { _id: '8', title: 'Mahila Laghubitta', image: '/trusted/mahila.png', category: 'Finance' },
  { _id: '9', title: 'Micro TV HD', image: '/trusted/microtv.jpg', category: 'News Portal' },
  { _id: '10', title: 'NA Fellowship', image: '/trusted/nanepal.png', category: 'Organization' },
  { _id: '11', title: 'Nepal Wanders', image: '/trusted/nepalwanders.png', category: 'Travel' },
  { _id: '12', title: 'Sports Performance', image: '/trusted/spsiom.gif', category: 'Sports' },
  { _id: '13', title: 'Avion HR Management', image: '/trusted/avionhrm.jpg', category: 'HR' },
  { _id: '14', title: 'Industry News Nepal', image: '/trusted/industrynewsnepal.jpg', category: 'News Portal' },
  { _id: '15', title: 'Media International', image: '/trusted/mediainternational.jpg', category: 'Media' },
];

const TrustedCompanies = () => {
  const swiperRef = useRef<any>(null);

  return (
    <section className="py-20 px-6 bg-white border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B] mb-3 block">Our Partners</span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Trusted by Leading Companies
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto">
            We deliver technology solutions to businesses across Nepal
          </p>
        </div>

        {/* Logo Slider */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode={true}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
            speed={3000}
            loop={true}
            slidesPerView={3}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 5, spaceBetween: 24 },
              1024: { slidesPerView: 6, spaceBetween: 28 },
            }}
          >
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
              <SwiperSlide key={i}>
                <div className="flex items-center justify-center h-16 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-white transition-all duration-200 px-4">
                  <Image
                    src={company.image}
                    alt={company.title}
                    width={120}
                    height={48}
                    loading="lazy"
                    className="max-h-10 w-auto max-w-full object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const span = document.createElement('span');
                        span.className = 'fallback-text text-[10px] font-bold text-slate-300 text-center leading-tight';
                        span.textContent = company.title;
                        parent.appendChild(span);
                      }
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
