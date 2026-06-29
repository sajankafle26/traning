"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

const Portfolio = () => {
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
  const displayedProjects = filteredProjects;

  return (
    <section id="portfolio" className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#f8fbff] via-white to-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sangalo-900/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 space-y-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-3 bg-sangalo-50 text-sangalo-900 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-sangalo-100">
              <span className="w-1.5 h-1.5 rounded-full bg-sangalo-900" />
              Our Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[0.95]">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sangalo-900 to-sangalo-600">Portfolio</span>
            </h2>
            <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed">
              Explore our latest digital transformations and high-impact solutions for global clients
            </p>
          </div>
        </div>

        {/* Filters */}
        {!loading && projects.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {categories.slice(0, 8).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat || "")}
              className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeFilter === cat ? "bg-sangalo-900 text-white shadow-lg shadow-sangalo-900/20" : "bg-white text-slate-500 border border-slate-200 hover:border-sangalo-200 hover:text-sangalo-900"
              }`}
            >
              {cat === "all" ? "All Projects" : cat}
            </button>
          ))}
        </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 animate-pulse">
                <div className="aspect-[16/10] bg-slate-100" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-100 rounded-xl w-3/4" />
                  <div className="h-4 bg-slate-100 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? null : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProjects.map((project, index) => (
              <div key={project._id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&sig=${index}`}
                    alt={`${project.title} - ${project.industry || project.category} project by Sangalo Tech`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover Actions */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags?.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[8px] font-bold text-sangalo-900 uppercase tracking-wider flex items-center gap-1">
                          <FaCode className="text-[6px]" /> {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-sangalo-900 hover:bg-sangalo-900 hover:text-white transition-all shadow-lg shrink-0"
                      >
                        <FaExternalLinkAlt className="text-sm" />
                      </a>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-sangalo-900/90 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Industry Tag */}
                  {project.industry && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-slate-700 text-[8px] font-bold uppercase tracking-widest rounded-full">
                        {project.industry}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-sangalo-900 transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sangalo-900 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] font-black uppercase tracking-widest">View Project</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </div>
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-bold text-[#00548B] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                      >
                        Live Site <FaExternalLinkAlt className="text-[7px]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Portfolio;
