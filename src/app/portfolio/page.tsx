"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight, FaExternalLinkAlt, FaRocket, FaFilter,
  FaLaptopCode, FaGlobe, FaMobileAlt, FaShoppingCart,
  FaPaintBrush, FaNewspaper, FaGraduationCap, FaHandshake,
  FaCogs, FaMapMarkerAlt, FaBriefcase
} from "react-icons/fa";

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  category?: string;
  tags?: string[];
}

const CATEGORY_ICONS: Record<string, any> = {
  "Consultancy": FaHandshake,
  "Construction": FaCogs,
  "Education": FaGraduationCap,
  "News Portal": FaNewspaper,
  "Finance": FaBriefcase,
  "Organization": FaGlobe,
  "Sports": FaRocket,
  "Recruitment": FaHandshake,
  "Travel": FaMapMarkerAlt,
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProjects(data.map((p: any) => ({
              ...p,
              tags: Array.isArray(p.tags) ? p.tags : (p.tags?.split(',') || [])
            })));
          }
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ["all", ...new Set(projects.map(p => p.category).filter(Boolean) as string[])];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-28 md:py-36 px-6 overflow-hidden" style={{ backgroundColor: '#00548B' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/15 mb-8">
            <FaRocket className="text-xs animate-pulse" />
            Our Portfolio
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] max-w-5xl mx-auto">
            Featured
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-200">
              Projects
            </span>
          </h1>
          <p className="mt-8 text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore our latest digital transformations and high-impact solutions for global clients
          </p>
          <div className="mt-10 flex justify-center gap-8 text-white/60 text-sm font-medium">
            <span>{projects.length} Projects</span>
            <span>{categories.length - 1} Categories</span>
            <span>100% Client Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => {
              const Icon = cat === "all" ? FaFilter : (CATEGORY_ICONS[cat] || FaCogs);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                    activeFilter === cat
                      ? "bg-[#00548B] text-white shadow-lg shadow-[#00548B]/20"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-[#00548B]/20 hover:text-[#00548B]"
                  }`}
                >
                  <Icon className="text-xs" />
                  {cat === "all" ? "All Projects" : cat}
                </button>
              );
            })}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 gap-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg animate-pulse">
                  <div className="aspect-[16/11] bg-slate-100 m-3 rounded-2xl" />
                  <div className="px-6 pb-6 pt-4 space-y-4">
                    <div className="h-6 bg-slate-100 rounded-xl w-3/4" />
                    <div className="h-4 bg-slate-100 rounded-xl w-full" />
                    <div className="h-4 bg-slate-100 rounded-xl w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <FaBriefcase className="text-5xl text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-3">No Projects Found</h3>
              <p className="text-slate-500">No projects in this category yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {filteredProjects.map((project, index) => (
                <div
                  key={project._id}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#00548B]/10 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/11] overflow-hidden m-3 rounded-2xl">
                    <img
                      src={project.image || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&sig=${index}`}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&sig=${index}`;
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    {/* Top Right: External Link */}
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-[#00548B] hover:bg-[#00548B] hover:text-white transition-all shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 z-10"
                      >
                        <FaExternalLinkAlt className="text-sm" />
                      </a>
                    )}

                    {/* Bottom: Tags */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 z-10">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags?.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[9px] font-bold text-[#00548B] uppercase tracking-wider shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-4 py-2 bg-[#00548B] text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-[#00548B]/30">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-6 pt-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-black text-slate-900 group-hover:text-[#00548B] transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <div className="w-10 h-10 rounded-xl bg-[#00548B]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00548B] group-hover:text-white transition-all text-[#00548B]">
                        <FaArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] font-bold text-[#00548B] uppercase tracking-widest hover:gap-3 transition-all"
                      >
                        View Live Project <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: '#00548B' }}>
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[0.9] mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Let&apos;s build something extraordinary together. Tell us about your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#00548B] px-10 py-5 rounded-2xl font-bold text-sm hover:shadow-2xl hover:-translate-y-1 transition-all no-underline">
              Start a Project <FaArrowRight />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all no-underline">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
