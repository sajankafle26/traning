"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FaGraduationCap, FaUsers, FaBriefcase, FaBuilding, FaLightbulb, FaHandshake,
  FaRocket, FaShieldAlt, FaCode, FaChalkboardTeacher, FaLaptopCode, FaStar,
  FaArrowRight, FaCheckCircle, FaGlobeAsia, FaHeart, FaPenNib, FaChartLine,
  FaLinkedin, FaTwitter, FaGithub
} from 'react-icons/fa';
import axios from 'axios';

const STATS = [
  { icon: FaLaptopCode, value: '200+', label: 'Projects Delivered', color: 'bg-blue-500' },
  { icon: FaGraduationCap, value: '600+', label: 'Students Trained', color: 'bg-emerald-500' },
  { icon: FaBriefcase, value: '500+', label: 'Placed in Jobs', color: 'bg-violet-500' },
  { icon: FaStar, value: '4.9', label: 'Google Rating', color: 'bg-amber-500' },
];

const VALUES = [
  {
    icon: FaLaptopCode,
    title: 'MERN Stack Industrial Training',
    description: 'Focusing on Node.js architecture, system design fundamentals, and scalable RESTful backend services.',
  },
  {
    icon: FaPenNib,
    title: 'UI/UX Design Specialist',
    description: 'Practical interface design modules aimed at training corporate-ready UI/UX asset creators.',
  },
  {
    icon: FaRocket,
    title: 'React & Next.js Mastery',
    description: 'High-level modern React architecture training incorporating component-based UI engineering.',
  },
  {
    icon: FaCode,
    title: 'Laravel Backend Mastery',
    description: 'Backend web development emphasizing live application deployment and extensive documentation standards.',
  },
  {
    icon: FaLaptopCode,
    title: 'WordPress Theme Development',
    description: 'Complete training on deploying custom code, setting up staging environments, and building full-scale business websites.',
  },
  {
    icon: FaChartLine,
    title: 'Digital Marketing Strategy',
    description: 'Campaign planning, brand building, and social media analytics optimization.',
  },
];

const TIMELINE = [
  { year: '2018', title: 'Founded', description: 'Sangalo Tech was founded by Sajan Kafle with a vision to bridge the gap between academics and industry.' },
  { year: '2019', title: 'First Batch', description: 'Launched our first MERN Stack training batch with 15 students in Lokenthali, Bhaktapur.' },
  { year: '2021', title: 'Expanded Services', description: 'Added software development services, digital marketing, and UI/UX design training.' },
  { year: '2023', title: '500+ Placements', description: 'Crossed 500 successful job placements with partner companies across Nepal.' },
  { year: '2024', title: 'Growing Strong', description: 'Now serving 600+ students with expanded course offerings and enterprise solutions.' },
];

const About = () => {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/team').then(res => {
      const data = res.data;
      if (data && data.length > 0) {
        setTeamMembers(data.map((m: any) => ({
          name: m.name,
          role: m.role,
          image: m.image,
          bio: m.bio,
          social: {
            linkedin: m.linkedin || '',
            twitter: m.twitter || '',
            github: m.github || '',
          },
        })));
      }
    }).catch(() => {});
  }, []);
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ backgroundColor: '#00548B' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/15 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            About Sangalo Tech
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] max-w-5xl mx-auto">
            Software Company
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-200">
              & IT Training Institute
            </span>
          </h1>
          <p className="mt-8 text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Sangalo Tech Pvt. Ltd. — Web design, software development, and IT training in Lokenthali, Bhaktapur, Nepal.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-xl" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      {teamMembers.length > 0 && (
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
              <FaUsers className="text-xs" /> Our Team
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Meet the <span className="text-[#00548B]">Leaders</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              The passionate people driving innovation at Sangalo Tech.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <div key={i} className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#00548B]/20 shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all duration-500 text-center">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00548B]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-[#00548B]/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                    <img
                      src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00548B&color=fff&size=256&bold=true`}
                      alt={member.name}
                      className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:shadow-2xl transition-all"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=00548B&color=fff&size=256&bold=true`;
                      }}
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-black text-slate-900 mb-1">{member.name}</h3>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#00548B] bg-[#00548B]/10 px-4 py-1.5 rounded-full mb-4">
                    {member.role}
                  </span>
                  {member.bio && (
                    <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-sm mx-auto">{member.bio}</p>
                  )}

                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    {member.social?.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#00548B] hover:text-white hover:border-[#00548B] transition-all">
                        <FaLinkedin className="text-sm" />
                      </a>
                    )}
                    {member.social?.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter profile" className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#00548B] hover:text-white hover:border-[#00548B] transition-all">
                        <FaTwitter className="text-sm" />
                      </a>
                    )}
                    {member.social?.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#00548B] hover:text-white hover:border-[#00548B] transition-all">
                        <FaGithub className="text-sm" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* About Content */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative group">
              <div className="absolute inset-8 bg-[#00548B]/5 rounded-[3rem] rotate-3 scale-105 transition-transform duration-700 group-hover:rotate-6" />
              <div className="relative rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_48px_96px_-32px_rgba(0,0,0,0.08)]">
                <img
                  src="/about/office.jpg"
                  alt="Sangalo Tech Office"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00548B]/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-[260px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#00548B] rounded-xl flex items-center justify-center">
                    <FaHeart className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900">Since 2018</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bhaktapur, Nepal</div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">Software Development & IT Training in Nepal.</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-500 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00548B] shadow-[0_0_8px_#00548B]" />
                Our Story
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-[0.95] tracking-tight">
                Software Company
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00548B] to-[#00548B]/60"> & IT Training</span>
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed">
                <strong className="text-slate-900">Sangalo Tech Pvt. Ltd.</strong> is a prominent web design, software development, and IT training institute located in Lokenthali, Bhaktapur, Nepal. We specialize in job-ready, career-focused programming and design training alongside creative web design and software solution services.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Web Development */}
                <div className="p-6 rounded-2xl bg-[#00548B]/5 border border-[#00548B]/10">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <FaLaptopCode className="text-[#00548B]" /> Software Company
                  </h3>
                  <ul className="space-y-2">
                    {['Modern web design & development', 'Frontend/backend system architecture', 'Custom business software applications', 'E-commerce solutions'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <FaCheckCircle className="text-[#00548B] text-xs shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* IT Training */}
                <div className="p-6 rounded-2xl bg-[#00548B]/5 border border-[#00548B]/10">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <FaGraduationCap className="text-[#00548B]" /> IT Training Institute
                  </h3>
                  <ul className="space-y-2">
                    {['Practical industrial lab sessions', 'Live project shadowing with seniors', 'Mock interview drill exercises', 'Guaranteed hiring for top 20%'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <FaCheckCircle className="text-[#00548B] text-xs shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/courses" className="inline-flex items-center gap-3 bg-[#00548B] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-[#004381] transition-all shadow-xl shadow-[#00548B]/20 active:scale-95 no-underline">
                  View Courses <FaArrowRight />
                </Link>
                <Link href="/#contact" className="inline-flex items-center gap-3 border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-bold text-sm hover:border-[#00548B] hover:text-[#00548B] transition-all active:scale-95 no-underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Why Choose Us */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#f8fbff] via-white to-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
              Popular Programs
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Training <span className="text-[#00548B]">Programs</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Industry-aligned courses designed to make you job-ready from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-[#00548B]/20 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-[#00548B]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00548B] group-hover:text-white transition-all duration-300">
                  <value.icon className="text-xl text-[#00548B] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Journey */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-500 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100">
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              From a Vision to <span className="text-[#00548B]">Impact</span>
            </h2>
          </div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2" />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#00548B] rounded-full border-4 border-white shadow-lg -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                    <span className="inline-block text-xs font-bold text-[#00548B] bg-[#00548B]/10 px-3 py-1 rounded-full mb-2">{item.year}</span>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>

                  {/* Spacer for alternating */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#f8fbff] via-white to-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#00548B] rounded-2xl flex items-center justify-center mb-6">
                <FaRocket className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed">
                To bridge the gap between traditional academics and modern software engineering through job-ready, career-focused training. The top 20% of performers get directly hired by our software house division.
              </p>
            </div>

            {/* Vision */}
            <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#00548B] rounded-2xl flex items-center justify-center mb-6">
                <FaGlobeAsia className="text-white text-xl" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed">
                To become Nepal&apos;s leading IT training institute and creative tech agency, delivering modern web design, software solutions, and producing industry-ready professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#00548B' }}>
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[0.9] mb-6">
            Ready to Start Your<br />Tech Journey?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Join 600+ students who have transformed their careers with Sangalo Tech.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/courses" className="inline-flex items-center gap-3 bg-white text-[#00548B] px-10 py-5 rounded-2xl font-bold text-sm hover:shadow-2xl hover:-translate-y-1 transition-all no-underline">
              Explore Courses <FaArrowRight />
            </Link>
            <Link href="/#contact" className="inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all no-underline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
