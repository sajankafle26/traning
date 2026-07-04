'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaGraduationCap, FaLaptopCode, FaUsers, FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_HERO = {
  badge: "NEPAL'S TRUSTED TECH PARTNER",
  title: 'Web Development Company.',
  subtitle: 'And IT Training Institute in Nepal.',
  description: 'Sangalo Tech Pvt. Ltd. is a prominent web design, software development, and IT training institute located in Lokenthali, Bhaktapur, Nepal.',
  image: '/about/office.jpg',
};

const Hero = () => {
  const [hero, setHero] = useState<any>(DEFAULT_HERO);

  useEffect(() => {
    fetch('/api/page-content')
      .then(r => r.json())
      .then(data => {
        if (data?.hero) setHero(data.hero);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative pt-28 pb-24 md:pt-32 md:pb-28 px-6" style={{ backgroundColor: '#004381' }}>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-[1400px] px-4 mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 relative items-center">
        {/* LEFT */}
        <div className="space-y-8 text-center lg:text-left pt-8 lg:pt-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-md border border-white/15 mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">
              {hero.badge}
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-4xl lg:text-[3.0rem] font-black text-white leading-[1.1] tracking-tight">
              {hero.title}
            </h1>
            <h1 className="text-4xl md:text-4xl lg:text-[3.0rem] font-black text-cyan-300 leading-[1.1] tracking-tight">
              {hero.subtitle}
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/70 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {hero.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 bg-white text-[#004381] px-8 py-4 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all"
            >
              <FaLaptopCode className="text-sm" />
              Our Services
              <FaArrowRight className="text-xs" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-lg font-bold text-sm border border-white/25 hover:bg-white/10 transition-all"
            >
              <FaGraduationCap className="text-sm" />
              Explore Courses
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#f59e0b] text-white px-8 py-4 rounded-lg font-bold text-sm hover:bg-[#d97706] transition-all"
            >
              Get Free Consultation
            </Link>
          </div>

          {/* Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            {[
              { number: '600+', label: 'Students Trained' },
              { number: '100+', label: 'Projects Delivered' },
              { number: '50+', label: 'Hiring Partners' },
              { number: '95%', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-2xl font-black text-white">{stat.number}</div>
                <div className="text-[11px] font-medium text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="relative hidden lg:block">
          <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/30">
            <Image
              src={hero.image}
              alt="Sangalo Tech — Software Company & IT Training Institute in Nepal"
              width={600}
              height={520}
              priority
              className="w-full h-[520px] object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#004381]/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Now Enrolling & Taking Projects</span>
              </div>
              <h2 className="text-white text-xl font-bold">Your Digital Partner & Career Catalyst</h2>
              <p className="text-white/60 text-sm mt-1">Custom software development + job-ready IT training</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
