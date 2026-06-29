'use client';
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

interface PortfolioItem {
  _id: string;
  title: string;
  image: string;
  category?: string;
}

const fallbackCompanies: PortfolioItem[] = [
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
  const [companies] = useState<PortfolioItem[]>(fallbackCompanies);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#f8fbff] via-white to-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]" />
            Our Partners
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[0.95]">
            Trusted by <span className="text-[#00548B]">Top-Rated Companies</span>
          </h2>
          <p className="mt-5 text-slate-500 font-medium text-lg max-w-xl mx-auto leading-relaxed">
            We collaborate with industry leaders to deliver world-class IT solutions and training
          </p>
        </div>

        {/* Logo Slider */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#f8fbff] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#f8fbff] to-transparent z-10 pointer-events-none" />

          <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode={true}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            speed={3000}
            loop={true}
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 24 },
              768: { slidesPerView: 4, spaceBetween: 28 },
              1024: { slidesPerView: 5, spaceBetween: 32 },
            }}
            className="trustedSwiper pb-4"
          >
            {[...companies, ...companies].map((company, i) => (
              <SwiperSlide key={i}>
                <div
                  className="relative cursor-pointer group"
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Card */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-[#00548B]/10 hover:border-[#00548B]/20 hover:-translate-y-1 transition-all duration-500 p-4">
                    <div className="flex items-center justify-center h-20 bg-slate-50 rounded-xl border border-slate-100/80">
                      <img
                        src={company.image}
                        alt={company.title}
                        className="max-h-14 w-auto max-w-[80%] object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback-text')) {
                            const span = document.createElement('span');
                            span.className = 'fallback-text text-sm font-black text-slate-300 group-hover:text-[#00548B] transition-colors duration-300 text-center leading-tight';
                            span.textContent = company.title;
                            parent.appendChild(span);
                          }
                        }}
                      />
                    </div>

                    {/* Company Name Below */}
                    <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span className="text-[10px] font-bold text-[#00548B] uppercase tracking-widest">{company.title}</span>
                    </div>
                  </div>
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
