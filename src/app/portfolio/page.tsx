"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowRight, FaExternalLinkAlt, FaCode,
  FaLaptopCode, FaGlobe, FaMobileAlt, FaShoppingCart,
  FaPaintBrush, FaNewspaper, FaGraduationCap, FaHandshake,
  FaCogs, FaMapMarkerAlt, FaBriefcase, FaRocket
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
  "E-Commerce": FaShoppingCart,
  "HR": FaBriefcase,
  "Media": FaNewspaper,
};

const PLACEHOLDER_BG = [
  "from-[#004381] to-[#00548B]",
  "from-slate-800 to-slate-900",
  "from-[#00548B] to-[#006fa0]",
  "from-indigo-800 to-indigo-900",
];

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
  const filteredProjects = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6" style={{ backgroundColor: '#00548B' }}>
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 mb-4 block">Our Work</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Selected Projects
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-8">
            Digital solutions we&apos;ve built for businesses across Nepal and beyond
          </p>
          <div className="flex gap-6 text-white/60 text-sm font-medium border-t border-white/10 pt-6">
            <div>
              <span className="text-2xl font-black text-white block">{projects.length}</span>
              <span className="text-[10px] uppercase tracking-wider">Projects</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white block">{categories.length - 1}</span>
              <span className="text-[10px] uppercase tracking-wider">Categories</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white block">100%</span>
              <span className="text-[10px] uppercase tracking-wider">Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Filters */}
          {!loading && projects.length > 0 && (
            <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2 -mx-1 px-1">
              {categories.map((cat) => {
                const Icon = cat === "all" ? FaCode : (CATEGORY_ICONS[cat] || FaCogs);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                      activeFilter === cat
                        ? "bg-[#00548B] text-white"
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 border border-slate-100"
                    }`}
                  >
                    <Icon className="text-xs" />
                    {cat === "all" ? "All Projects" : cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/3] bg-slate-100 rounded-xl mb-4" />
                  <div className="h-5 bg-slate-100 rounded-lg w-3/4 mb-2" />
                  <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <FaBriefcase className="text-2xl text-slate-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-400">No projects in this category yet.</h3>
              <p className="text-slate-300 text-sm mt-1">Check back soon for new case studies.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <a
                  key={project._id}
                  href={project.link && project.link !== '#' ? project.link : '#'}
                  target={project.link && project.link !== '#' ? "_blank" : undefined}
                  rel={project.link && project.link !== '#' ? "noopener noreferrer" : undefined}
                  className="group block"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-4">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={800}
                        height={600}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${PLACEHOLDER_BG[index % PLACEHOLDER_BG.length]} flex items-center justify-center`}>
                        <span className="text-5xl font-black text-white/10">{project.title?.charAt(0)}</span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#00548B]/0 group-hover:bg-[#00548B]/80 transition-all duration-300 flex items-center justify-center">
                      {project.link && project.link !== '#' && (
                        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <FaExternalLinkAlt className="text-[#00548B] text-sm" />
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    {project.category && (
                      <div className="absolute bottom-3 left-3">
                        <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[10px] font-bold text-slate-700 rounded-md shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00548B] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium line-clamp-1">
                      {project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: '#00548B' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Let&apos;s build something extraordinary together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#00548B] px-8 py-4 rounded-lg font-bold text-sm hover:bg-slate-50 transition-all no-underline">
              Start a Project <FaArrowRight className="text-sm" />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 border border-white/25 text-white px-8 py-4 rounded-lg font-bold text-sm hover:bg-white/10 transition-all no-underline">
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
