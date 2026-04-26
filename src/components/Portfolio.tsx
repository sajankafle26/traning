"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
                    if (data && data.length > 0) {
                        setProjects(data);
                    } else {
                        // Fallback to default projects based on user data
                        setProjects([
                            {
                                _id: '1',
                                title: 'Global Touch India',
                                description: 'A comprehensive educational and visa consultancy website for students aiming to study in Australia.',
                                image: '/portfolio/global-touch-india.png',
                                category: 'Consultancy',
                                tags: 'Web Design, React, Next.js',
                                link: 'https://myglobaltouch.in'
                            },
                            {
                                _id: '2',
                                title: 'Ramro Sathi',
                                description: 'Construction and architectural firm website showcasing their services, projects, and offering a platform to contact for dream home construction.',
                                image: '/portfolio/ramro-sathi.png',
                                category: 'Construction',
                                tags: 'Web Development, UI/UX',
                                link: '#'
                            },
                            {
                                _id: '3',
                                title: 'Global Touch Education & Visas',
                                description: 'Educational consultancy website focusing on information technology study abroad programs and visa services.',
                                image: '/portfolio/global-touch-education.png',
                                category: 'Education',
                                tags: 'Web Design, Consultation',
                                link: 'https://myglobaltouch.com.au'
                            },
                            {
                                _id: '4',
                                title: 'Micro TV HD',
                                description: 'A dynamic news portal and video streaming website offering the latest updates, live TV, and video highlights.',
                                image: '/portfolio/micro-tv-hd.png',
                                category: 'News Portal',
                                tags: 'Media, Streaming, Web App',
                                link: '#'
                            },
                            {
                                _id: '5',
                                title: 'Mahila Laghubitta Bittiya Sanstha Ltd.',
                                description: 'A microfinance institutional website providing financial services, notices, and reports for women empowerment in rural areas.',
                                image: '/portfolio/mahila-laghubitta.png',
                                category: 'Finance',
                                tags: 'Institution, Web Portal',
                                link: '#'
                            },
                            {
                                _id: '6',
                                title: 'Rupantaran Post',
                                description: 'A prominent Nepali news and media portal delivering the latest updates, features, and national news coverage.',
                                image: '/portfolio/rupantaran-post.png',
                                category: 'News Portal',
                                tags: 'News, Media, Web App',
                                link: '#'
                            },
                            {
                                _id: '7',
                                title: 'NA Fellowship in Nepal',
                                description: 'The official website for the Nepal Regional Committee of Narcotics Anonymous, providing resources, meetings, and regional information.',
                                image: '/portfolio/na-fellowship.png',
                                category: 'Organization',
                                tags: 'Non-profit, Web Portal, Community',
                                link: '#'
                            },
                            {
                                _id: '8',
                                title: 'Sports Performance Services',
                                description: 'A dedicated sports performance website offering athlete development, strength & conditioning, and performance testing services.',
                                image: '/portfolio/sports-performance.png',
                                category: 'Fitness / Sports',
                                tags: 'Sports, Fitness, Web Portal',
                                link: '#'
                            },
                            {
                                _id: '9',
                                title: 'Banking Khabar',
                                description: 'A comprehensive financial and banking news portal delivering the latest updates on the economy, stock market, and banking sector.',
                                image: '/portfolio/banking-khabar.png',
                                category: 'News Portal',
                                tags: 'Finance, News, Media',
                                link: '#'
                            },
                            {
                                _id: '10',
                                title: 'Emerald Isle Nepal',
                                description: 'A professional recruitment agency website showcasing over 10 years of experience in overseas manpower placement and services.',
                                image: '/portfolio/emerald-isle.png',
                                category: 'Recruitment',
                                tags: 'HR, Recruitment, Corporate',
                                link: '#'
                            },
                            {
                                _id: '11',
                                title: 'Career Point',
                                description: 'A human resource and management consultancy platform connecting top talent with global opportunities, primarily based in Dubai.',
                                image: '/portfolio/career-point.png',
                                category: 'Consultancy',
                                tags: 'HR, Consultancy, Global',
                                link: '#'
                            },
                            {
                                _id: '12',
                                title: 'Sun Saving & Credit Cooperative Limited',
                                description: 'The official portal for a leading cooperative providing savings, loans, and financial services to empower local communities.',
                                image: '/portfolio/sun-saving.png',
                                category: 'Finance',
                                tags: 'Cooperative, Finance, Web App',
                                link: '#'
                            },
                            {
                                _id: '13',
                                title: 'Ballavartyn Equestrian Centre',
                                description: 'A premium equestrian centre website featuring events, results, leagues, and livery services for horse enthusiasts.',
                                image: '/portfolio/ballavartyn.png',
                                category: 'Sports / Leisure',
                                tags: 'Equestian, Sports, Web Portal',
                                link: '#'
                            },
                            {
                                _id: '14',
                                title: 'Patron Nepal',
                                description: 'The official website for Patron Nepal, a non-governmental organization focused on volunteerism, peace, and sustainable development.',
                                image: '/portfolio/patron-nepal.png',
                                category: 'NGO / Charity',
                                tags: 'NGO, Charity, Community',
                                link: '#'
                            },
                            {
                                _id: '15',
                                title: 'Franklin\'s Limited',
                                description: 'A specialized automotive dealership website offering pre-owned vehicles, finance options, and vehicle sourcing services.',
                                image: '/portfolio/franklins-limited.png',
                                category: 'Automotive',
                                tags: 'Automotive, Dealership, Web Portal',
                                link: '#'
                            },
                            {
                                _id: '16',
                                title: 'Stonecraft',
                                description: 'A local Manx company website specializing in stonemasonry, stone supplies, hiring services, and consultancy.',
                                image: '/portfolio/stonecraft.png',
                                category: 'Construction / Stonemasonry',
                                tags: 'Construction, Corporate',
                                link: '#'
                            },
                            {
                                _id: '17',
                                title: 'Discern Products',
                                description: 'A modern publishing platform offering an exciting business model and publishing services for Christian authors.',
                                image: '/portfolio/discern-products.png',
                                category: 'Publishing',
                                tags: 'Publishing, Authors, E-commerce',
                                link: '#'
                            },
                            {
                                _id: '18',
                                title: 'LaghuVitta News',
                                description: 'A comprehensive news portal dedicated to microfinance, banking updates, and economic news in Nepal.',
                                image: '/portfolio/laghuvitta-news.png',
                                category: 'News Portal',
                                tags: 'News, Finance, Web Portal',
                                link: '#'
                            },
                            {
                                _id: '19',
                                title: 'Nepal Wanders',
                                description: 'A dedicated travel and tourism platform offering treks, tours, and comprehensive travel guides for exploring Nepal.',
                                image: '/portfolio/nepal-wanders.png',
                                category: 'Travel / Tourism',
                                tags: 'Tourism, Travel, Web Design',
                                link: '#'
                            },
                            {
                                _id: '20',
                                title: 'Himal Hub',
                                description: 'An authoritative news hub covering the latest economic, financial, and political updates, delivering in-depth reports and insights.',
                                image: '/portfolio/himal-hub.png',
                                category: 'News Portal',
                                tags: 'Media, News, Web App',
                                link: '#'
                            },
                            {
                                _id: '21',
                                title: 'Business Sansar',
                                description: 'A dynamic business news platform providing timely updates on markets, banking, and commercial sectors.',
                                image: '/portfolio/business-sansar.png',
                                category: 'News / Business',
                                tags: 'Business, News, Corporate',
                                link: '#'
                            },
                            {
                                _id: '22',
                                title: 'Aaronic International',
                                description: 'A professional educational consultancy website offering study abroad services, preparation classes, and expert consultations.',
                                image: '/portfolio/aaronic-international.png',
                                category: 'Education / Consultancy',
                                tags: 'Education, Consultancy, Web Portal',
                                link: '#'
                            },
                            {
                                _id: '23',
                                title: 'CEDAW',
                                description: 'A non-profit organization dedicated to empowering and supporting survivors of domestic and gender-based violence.',
                                image: '/portfolio/cedaw.png',
                                category: 'NGO / Charity',
                                tags: 'NGO, Charity, Support',
                                link: '#'
                            },
                            {
                                _id: '24',
                                title: 'Industry Mission Nepal',
                                description: 'An industry-focused news and media platform providing updates, interviews, and economic news related to Nepal\'s industrial sector.',
                                image: '/portfolio/industry-mission.png',
                                category: 'News / Industry',
                                tags: 'Industry, News, Media',
                                link: '#'
                            },
                            {
                                _id: '25',
                                title: 'Media International',
                                description: 'An event-driven media organization addressing economic issues, brain drain, and promoting financial literacy and entrepreneurship.',
                                image: '/portfolio/media-international.png',
                                category: 'Media / Event',
                                tags: 'Media, Corporate, Events',
                                link: '#'
                            }
                        ]);
                    }
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
        <section className="py-32 bg-[#05090f] relative overflow-hidden" id="portfolio">
            {/* Premium Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 blur-[150px] pointer-events-none rounded-full" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-600/5 blur-[150px] pointer-events-none rounded-full" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24 max-w-3xl mx-auto">
                    <span className="text-indigo-400 font-semibold tracking-widest uppercase text-sm mb-4 block">Our Work</span>
                    <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-8 tracking-tight">
                        Featured Projects
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
                        Explore our latest digital creations. We combine cutting-edge technology with world-class design to build scalable, premium solutions.
                    </p>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl backdrop-blur-sm max-w-2xl mx-auto">
                        <p className="text-slate-400 text-lg">No projects added yet.</p>
                        <Link href="/adminpanel/portfolio" className="inline-block mt-6 text-indigo-400 hover:text-indigo-300 font-medium px-6 py-3 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors">
                            Add a project in the Admin Panel
                        </Link>
                    </div>
                ) : (
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className="pb-16"
                    >
                    {projects.map((project) => (
                        <SwiperSlide key={project._id} className="pb-4">
                        <div 
                            className="group flex flex-col bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.2)] relative h-full"
                        >
                            <div className="h-64 sm:h-72 w-full relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05090f] via-transparent to-transparent z-10 opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                                <img
                                    src={project.image || `https://i.pravatar.cc/600?u=${project.title}`}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                />
                                {project.category && (
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="bg-black/40 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase border border-white/10 shadow-lg">
                                            {project.category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 flex flex-col flex-1 relative z-20 -mt-10">
                                <div className="bg-[#05090f]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col flex-1 shadow-2xl">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-500 line-clamp-2">
                                        {project.title}
                                    </h3>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/[0.05]">
                                        {project.tags ? (
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                {(() => {
                                                    const tagsArray = typeof project.tags === 'string' 
                                                        ? project.tags.split(',').map(t => t.trim()).filter(Boolean)
                                                        : Array.isArray(project.tags) ? project.tags : [];
                                                    
                                                    return (
                                                        <>
                                                            {tagsArray.slice(0, 2).map((tag, i) => (
                                                                <span key={i} className="text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-medium">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            {tagsArray.length > 2 && (
                                                                <span className="text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full font-medium">
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
                                                className="ml-4 flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
                                                aria-label="View Project"
                                            >
                                                <FaExternalLinkAlt size={13} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                )}
            </div>
        </section>
    );
};

export default Portfolio;
