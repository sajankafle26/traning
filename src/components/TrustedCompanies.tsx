'use client';
import React, { useState, useEffect, useRef } from 'react';
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
  { _id: '1', title: 'Global Touch India', image: '/portfolio/global-touch-india.png', category: 'Consultancy' },
  { _id: '2', title: 'Ramro Sathi', image: '/portfolio/ramro-sathi.png', category: 'Construction' },
  { _id: '3', title: 'Micro TV HD', image: '/portfolio/micro-tv-hd.png', category: 'News Portal' },
  { _id: '4', title: 'Mahila Laghubitta', image: '/portfolio/mahila-laghubitta.png', category: 'Finance' },
  { _id: '5', title: 'Rupantaran Post', image: '/portfolio/rupantaran-post.png', category: 'News Portal' },
  { _id: '6', title: 'NA Fellowship', image: '/portfolio/na-fellowship.png', category: 'Organization' },
  { _id: '7', title: 'Banking Khabar', image: '/portfolio/banking-khabar.png', category: 'News Portal' },
  { _id: '8', title: 'Emerald Isle Nepal', image: '/portfolio/emerald-isle.png', category: 'Recruitment' },
  { _id: '9', title: 'Career Point', image: '/portfolio/career-point.png', category: 'Consultancy' },
  { _id: '10', title: 'Nepal Wanders', image: '/portfolio/nepal-wanders.png', category: 'Travel' },
  { _id: '11', title: 'Business Sansar', image: '/portfolio/business-sansar.png', category: 'News' },
  { _id: '12', title: 'Himal Hub', image: '/portfolio/himal-hub.png', category: 'News Portal' },
];

const TrustedCompanies = () => {
  const [companies, setCompanies] = useState<PortfolioItem[]>(fallbackCompanies);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setCompanies(data.slice(0, 12).map((p: any) => ({
              _id: p._id,
              title: p.title,
              image: p.image,
              category: p.category,
            })));
          }
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

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
    <section className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-sangalo-50 px-4 py-2 rounded-full border border-sangalo-100 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sangalo-900"></span>
            <span className="text-[10px] font-black text-sangalo-700 uppercase tracking-[0.2em]">Our Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by <span className="text-[#004381]">Top-Rated Companies</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium max-w-xl mx-auto">
            We collaborate with industry leaders to deliver world-class IT solutions and training
          </p>
        </div>

        {/* Logo Slider */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

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
            spaceBetween={30}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 40 },
              768: { slidesPerView: 4, spaceBetween: 50 },
              1024: { slidesPerView: 5, spaceBetween: 60 },
            }}
            className="trustedSwiper"
          >
            {[...companies, ...companies].map((company, i) => (
              <SwiperSlide key={i}>
                <div
                  className="relative flex items-center justify-center h-24 px-6 cursor-pointer group"
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Company Image/Logo */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={company.image}
                      alt={company.title}
                      className="max-h-16 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                          const span = document.createElement('span');
                          span.className = 'fallback-text text-lg font-black text-sangalo-300 group-hover:text-sangalo-900 transition-colors duration-300';
                          span.textContent = company.title;
                          parent.appendChild(span);
                        }
                      }}
                    />
                    
                    {/* Hover Tooltip */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none z-20">
                      <div className="bg-sangalo-900 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
                        <span className="text-xs font-bold">{company.title}</span>
                        {company.category && (
                          <span className="block text-[9px] text-sangalo-300 font-medium">{company.category}</span>
                        )}
                      </div>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-sangalo-900 rotate-45"></div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '100+', label: 'Projects Delivered', icon: '🎯' },
            { value: '50+', label: 'Happy Clients', icon: '😊' },
            { value: '15+', label: 'Years Experience', icon: '📅' },
            { value: '24/7', label: 'Support Available', icon: '🛟' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-sangalo-50 border border-sangalo-100 hover:bg-sangalo-900 hover:text-white group transition-all duration-300 cursor-default">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-sangalo-900 group-hover:text-white transition-colors duration-300">{stat.value}</div>
              <div className="text-xs font-bold text-sangalo-600 group-hover:text-white/70 uppercase tracking-widest mt-2 transition-colors duration-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
