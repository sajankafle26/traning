"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaExternalLinkAlt, FaCode } from "react-icons/fa";

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  category?: string;
  tags?: string[];
  industry?: string;
}

const PLACEHOLDER_BG = [
  "from-[#004381] to-[#00548B]",
  "from-slate-800 to-slate-900",
  "from-[#00548B] to-[#006fa0]",
  "from-indigo-800 to-indigo-900",
];

const Portfolio = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/portfolio");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProjects(data.map((p: any) => ({
              ...p,
              tags: Array.isArray(p.tags) ? p.tags : (p.tags?.split(',') || []),
              industry: p.industry || p.category,
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

  const categories = ["all", ...new Set(projects.map(p => p.category).filter(Boolean))];
  const filteredProjects = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B]">Our Work</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              Selected Projects
            </h2>
            <p className="text-slate-500 text-lg max-w-lg">
              Digital solutions we've built for businesses across Nepal and beyond
            </p>
          </div>
          {!loading && projects.length > 0 && (
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#00548B] hover:gap-3 transition-all group"
            >
              View All Projects
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Filters */}
        {!loading && projects.length > 0 && (
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {categories.slice(0, 7).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat || "")}
                className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-[#00548B] text-white shadow-md shadow-[#00548B]/20"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                }`}
              >
                {cat === "all" ? "All Projects" : cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-slate-100 rounded-2xl mb-4" />
                <div className="h-5 bg-slate-100 rounded-lg w-3/4 mb-2" />
                <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FaCode className="text-2xl text-slate-300" />
            </div>
            <p className="font-bold text-slate-400">Portfolio projects coming soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Link
                key={project._id}
                href={project.link && project.link !== '#' ? project.link : `/portfolio#${project._id}`}
                target={project.link && project.link !== '#' ? "_blank" : undefined}
                rel={project.link && project.link !== '#' ? "noopener noreferrer" : undefined}
                className="group block"
                onMouseEnter={() => setHoveredId(project._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4">
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
                      <span className="text-4xl font-black text-white/10">{project.title?.charAt(0)}</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#00548B]/0 group-hover:bg-[#00548B]/80 transition-all duration-300 flex items-center justify-center">
                    {project.link && project.link !== '#' && (
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        <FaExternalLinkAlt className="text-[#00548B] text-sm" />
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  {project.category && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[10px] font-bold text-slate-700 rounded-full shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00548B] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium line-clamp-1">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
