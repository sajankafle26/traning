'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';

const DEFAULT_HERO = {
  badge: 'About Us',
  title: 'Web Development Company',
  subtitle: 'And IT Training Institute in Nepal.',
  description: 'Sangalo Tech Pvt. Ltd. is a prominent web design, software development, and IT training institute located in Lokenthali, Bhaktapur, Nepal.',
  image: '/about/office.jpg',
  services: [
    { icon: '💻', title: 'Software Development', desc: 'Custom Solutions' },
    { icon: '🎓', title: 'IT Academy', desc: 'Real-World Skills' },
    { icon: '💼', title: 'Job Placement', desc: '100% Bridge' },
    { icon: '🚀', title: 'Industrial Learning', desc: 'Active Mentors' },
  ],
  ctaPrimary: 'Explore Courses',
  ctaPrimaryLink: '/courses',
  ctaSecondary: 'Learn More',
  ctaSecondaryLink: '/about',
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hero, setHero] = useState(DEFAULT_HERO);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch('/api/page-content')
      .then(r => r.json())
      .then(data => {
        if (data?.hero) setHero({ ...DEFAULT_HERO, ...data.hero });
      })
      .catch(() => {});
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{ '--mx': `${mousePos.x}%`, '--my': `${mousePos.y}%` } as React.CSSProperties}
      className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-6 border-b border-white/10">
      {/* Premium Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#004381' }}></div>
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.25]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(420px 260px at var(--mx,50%) var(--my,30%), rgba(255,255,255,0.12), transparent 60%)'
          }}
        ></div>
      </div>

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 relative items-center">
        {/* LEFT: TEXT */}
        <div className="space-y-8 lg:space-y-10 text-center lg:text-left pt-10 lg:pt-0">
          {/* Top badge + Title + Subhead */}
          <div className="space-y-6">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white shadow-lg mx-auto lg:mx-0 hover:shadow-xl transition-shadow duration-300">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sangalo-900 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sangalo-900" />
              </span>
              <span className="text-xs font-extrabold tracking-widest uppercase text-sangalo-900">
                {hero.badge}
              </span>
              <svg className="w-4 h-4 text-sangalo-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-3xl lg:text-4xl font-extrabold leading-[1.1] lg:leading-[1.25] tracking-tight text-white">
                {hero.title}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-300">
              {hero.subtitle}
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {hero.description}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-3">
            {hero.services.map((service, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all duration-300 cursor-default group">
                <div className="text-2xl mb-2">{service.icon}</div>
                <div className="text-sm font-extrabold text-white">{service.title}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{service.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href={hero.ctaPrimaryLink}
              className="inline-flex items-center gap-2 bg-white text-sangalo-900 px-8 py-4 rounded-2xl font-extrabold hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              {hero.ctaPrimary}
              <FaArrowRight className="text-sm" />
            </Link>
            <Link
              href={hero.ctaSecondaryLink}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-extrabold border border-white/20 hover:bg-white/20 transition-all"
            >
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* RIGHT: SINGLE IMAGE */}
        <div className="relative hidden lg:block mt-8 lg:mt-0">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <div className="relative group">
            <div className="absolute inset-6 bg-white/10 rounded-[3rem] rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>
            <div className="absolute inset-6 bg-white/5 rounded-[3rem] -rotate-2 group-hover:-rotate-4 transition-transform duration-700"></div>

            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">
              <img
                src={hero.image}
                alt="Sangalo Tech Office"
                className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004381]/80 via-[#004381]/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Working Now</span>
                </div>
                <h3 className="text-white text-2xl font-extrabold mb-2">Our Development Hub</h3>
                <p className="text-white/70 text-sm font-medium">Where ideas turn into reality</p>
              </div>

              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Training Lab</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
