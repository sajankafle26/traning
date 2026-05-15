"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUserTie, FaBriefcase, FaTerminal, FaLaptopCode } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const GSAPShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-300vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  const features = [
    {
      title: "Industry-Active Mentors",
      desc: "Our curriculum is architected by seniors actively working in global startups—no fluff, just pure engineering skills.",
      icon: <FaUserTie />,
      color: "from-[#00548B] to-blue-900",
    },
    {
      title: "Guaranteed Internship",
      desc: "We bridge the gap between academics and industry with 100% placement support and internal internship programs.",
      icon: <FaBriefcase />,
      color: "from-slate-800 to-black",
    },
    {
      title: "Live Enterprise Projects",
      desc: "Get your hands dirty with real-world enterprise software. We follow a rigorous software-house approach.",
      icon: <FaTerminal />,
      color: "from-indigo-600 to-purple-800",
    },
    {
      title: "24/7 Professional Lab",
      desc: "Our home-lab architecture redirects 100% of commercial overhead into your elite tech mentorship and 24/7 access.",
      icon: <FaLaptopCode />,
      color: "from-cyan-600 to-blue-800",
    },
  ];

  return (
    <section className="overflow-hidden bg-[#004381]">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="h-screen w-[400vw] flex flex-row relative items-center"
        >
          {/* Background Text Reveal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <h2 className="text-[30vw] font-black uppercase tracking-tighter whitespace-nowrap text-white">
              ELITE TALENTS
            </h2>
          </div>

          {/* Intro Slide */}
          <div className="h-screen w-[100vw] flex flex-col items-center justify-center flex-shrink-0 px-10 text-center space-y-8">
            <span className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-[0.3em]">
              The Sangalo Advantage
            </span>
            <h2 className="text-6xl md:text-[8vw] font-black text-white tracking-tighter leading-none">
              Why EliteTalents <br />
              <span className="text-white/50">Choose Us.</span>
            </h2>
            <div className="w-20 h-[2px] bg-white/20" />
            <p className="text-xl text-white/60 font-light max-w-2xl">
              Scroll to discover how we transform students into world-class engineers through a software-house approach.
            </p>
          </div>

          {features.map((feature, index) => (
            <div
              key={index}
              className="h-screen w-[100vw] flex items-center justify-center flex-shrink-0 px-10 md:px-20"
            >
              <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                <div className="space-y-8 order-2 md:order-1">
                  <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-4xl text-white shadow-2xl border border-white/10`}>
                    {feature.icon}
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                      {feature.title}
                    </h3>
                    <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                  <button className="group flex items-center gap-4 px-8 py-4 bg-white text-[#004381] rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                    Learn More
                    <FaTerminal className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="relative group order-1 md:order-2">
                  <div className={`absolute -inset-4 bg-gradient-to-br ${feature.color} rounded-[3rem] opacity-30 blur-3xl group-hover:opacity-50 transition-opacity duration-700`} />
                  <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden shadow-2xl">
                    <img
                      src={[
                        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
                        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
                      ][index]}
                      alt={feature.title}
                      className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#004381] to-transparent opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GSAPShowcase;
