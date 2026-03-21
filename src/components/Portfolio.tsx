"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface PortfolioItem {
    _id: string;
    title: string;
    description: string;
    image: string;
    link?: string;
    category?: string;
    tags?: string | string[];
}

const Portfolio = () => {
    const [projects, setProjects] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/portfolio");
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Error fetching portfolio projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-[#0a1118]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Portfolio</h2>
                    </div>
                    <div className="flex justify-center items-center h-64">
                        <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-[#0a1118] relative overflow-hidden" id="portfolio">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 mb-6 drop-shadow-sm">
                        Featured Projects
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed mix-blend-plus-lighter">
                        Explore some of our recent work and the outstanding digital experiences we've built.
                    </p>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-slate-500 text-lg">No projects added yet.</p>
                        <Link href="/adminpanel/portfolio" className="inline-block mt-4 text-indigo-400 hover:text-indigo-300 font-medium">
                            Add a project in the Admin Panel
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project) => (
                        <div 
                            key={project._id}
                            className="group flex flex-col bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20"
                        >
                            <div className="aspect-[16/10] w-full relative overflow-hidden border-b border-slate-800/50">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                <img
                                    src={project.image || `https://i.pravatar.cc/600?u=${project.title}`}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {project.category && (
                                    <div className="absolute top-5 left-5 z-20">
                                        <span className="bg-indigo-500/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg border border-indigo-400/30">
                                            {project.category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 flex flex-col flex-1 relative z-20">
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-slate-400 text-sm mb-8 line-clamp-3 leading-loose flex-1 font-medium">
                                    {project.description}
                                </p>
                                
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/60">
                                    {project.tags ? (
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            {(() => {
                                                const tagsArray = typeof project.tags === 'string' 
                                                    ? project.tags.split(',').map(t => t.trim()).filter(Boolean)
                                                    : Array.isArray(project.tags) ? project.tags : [];
                                                
                                                return (
                                                    <>
                                                        {tagsArray.slice(0, 2).map((tag, i) => (
                                                            <span key={i} className="text-slate-300 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg whitespace-nowrap">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {tagsArray.length > 2 && (
                                                            <span className="text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg font-bold">
                                                                +{tagsArray.length - 2}
                                                            </span>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    ) : (
                                        <div />
                                    )}
                                    
                                    {project.link && (
                                        <Link 
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-4 flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 group-hover:scale-110 shadow-lg"
                                            aria-label="View Project"
                                        >
                                            <FaExternalLinkAlt size={16} />
                                        </Link>
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
