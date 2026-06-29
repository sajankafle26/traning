'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaPlay, FaUsers, FaRocket, FaGraduationCap, FaStar, FaLaptopCode, FaCode, FaMobileScreen, FaChartLine } from 'react-icons/fa6';
import Link from 'next/link';

const DEFAULT_HERO = {
  badge: 'Nepal\'s Leading Web Dev Company & IT Training Institute',
  title: 'Web Development Company & IT Training Institute',
  subtitle: 'Building Digital Products & Future-Ready Professionals.',
  description: 'Sangalo Tech Pvt. Ltd. is a full-service web development company and IT training institute in Lokenthali, Bhaktapur, Nepal. We build world-class digital products and train the next generation of IT professionals.',
  image: '/about/office.jpg',
};

const SERVICES_PREVIEW = [
  { icon: FaLaptopCode, title: 'Web App Development', desc: 'React, Next.js, Node.js' },
  { icon: FaMobileScreen, title: 'Mobile App Development', desc: 'React Native, Flutter' },
  { icon: FaChartLine, title: 'SEO & Digital Marketing', desc: 'Google Ads, Social Media' },
  { icon: FaCode, title: 'Custom Software', desc: 'Enterprise Solutions' },
];

const Hero = () => {
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
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
      className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-6 border-b border-white/10 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: '#004381' }} />
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 opacity-[0.25]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(420px 260px at var(--mx,50%) var(--my,30%), rgba(255,255,255,0.12), transparent 60%)' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 relative items-center">
        {/* LEFT */}
        <div className="space-y-8 lg:space-y-10 text-center lg:text-left pt-10 lg:pt-0">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white shadow-lg mx-auto lg:mx-0 hover:shadow-xl transition-shadow duration-300">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sangalo-900 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sangalo-900" />
              </span>
              <span className="text-xs font-extrabold tracking-widest uppercase text-sangalo-900">
                {hero.badge}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-white">
              {hero.title}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-300 mt-3">
                {hero.subtitle}
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {hero.description}
            </p>
          </div>

          {/* Two CTA rows — one for each side */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/services"
                className="group inline-flex items-center gap-3 bg-white text-sangalo-900 px-8 py-5 rounded-2xl font-extrabold text-sm hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                <FaLaptopCode className="text-[#004381]" />
                Our Services
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/courses"
                className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-5 rounded-2xl font-extrabold text-sm border border-white/20 hover:bg-white/20 transition-all"
              >
                <FaGraduationCap />
                Explore Courses
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#f59e0b] text-white px-8 py-4 rounded-2xl font-extrabold text-sm hover:bg-[#d97706] transition-all shadow-xl shadow-amber-500/20"
              >
                Get Free Consultation
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 bg-white/5 text-white/80 px-8 py-4 rounded-2xl font-extrabold text-sm border border-white/10 hover:bg-white/10 transition-all"
              >
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4">
            {[
              { number: '600+', label: 'Students Trained', icon: FaGraduationCap },
              { number: '100+', label: 'Projects Delivered', icon: FaLaptopCode },
              { number: '50+', label: 'Hiring Partners', icon: FaUsers },
              { number: '95%', label: 'Satisfaction', icon: FaStar },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <stat.icon className="text-white/50 text-sm" />
                <span className="text-white font-bold text-sm">{stat.number}</span>
                <span className="text-white/50 text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image + Services Grid */}
        <div className="relative hidden lg:block mt-8 lg:mt-0">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="relative group">
            <div className="absolute inset-6 bg-white/10 rounded-[3rem] rotate-3 group-hover:rotate-6 transition-transform duration-700" />
            <div className="absolute inset-6 bg-white/5 rounded-[3rem] -rotate-2 group-hover:-rotate-4 transition-transform duration-700" />

            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]">
              <img
                src={hero.image}
                alt="Sangalo Tech - Web Development Company & IT Training Institute in Nepal"
                className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004381]/80 via-[#004381]/20 to-transparent" />

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Now Enrolling & Taking Projects</span>
                </div>
                <h3 className="text-white text-2xl font-extrabold mb-2">Your Digital Partner & Career Catalyst</h3>
                <p className="text-white/70 text-sm font-medium">Custom software development + job-ready IT training</p>
              </div>

              {/* Top Badges */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <FaLaptopCode className="text-[#004381] text-sm" />
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Web Dev Company</span>
              </div>
              <div className="absolute top-6 left-6 bg-green-500/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <FaGraduationCap className="text-white text-sm" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">IT Institute</span>
              </div>
            </div>
          </div>

          {/* Floating Services Card */}
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
