"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaChevronRight, FaChevronLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioItem {
    _id: string;
    title: string;
    description: string;
    image: string;
    link?: string;
    category?: string;
    tags?: string[];
}

const Portfolio = () => {
    const [projects, setProjects] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);

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
                    } else {
                        setProjects([
                            {
                                _id: '1',
                                title: 'Global Touch India',
                                description: 'A comprehensive educational and visa consultancy website for students aiming to study in Australia.',
                                image: '/portfolio/global-touch-india.png',
                                category: 'Consultancy',
                                tags: ['Web Design', 'React', 'Next.js'],
                                link: 'https://myglobaltouch.in'
                            },
                            {
                                _id: '2',
                                title: 'Ramro Sathi',
                                description: 'Construction and architectural firm website showcasing their services, projects, and offering a platform to contact for dream home construction.',
                                image: '/portfolio/ramro-sathi.png',
                                category: 'Construction',
                                tags: ['Web Development', 'UI/UX'],
                                link: '#'
                            },
                            {
                                _id: '3',
                                title: 'Global Touch Education & Visas',
                                description: 'Educational consultancy website focusing on information technology study abroad programs and visa services.',
                                image: '/portfolio/global-touch-education.png',
                                category: 'Education',
                                tags: ['Web Design', 'Consultation'],
                                link: 'https://myglobaltouch.com.au'
                            },
                            {
                                _id: '4',
                                title: 'Micro TV HD',
                                description: 'A dynamic news portal and video streaming website offering the latest updates, live TV, and video highlights.',
                                image: '/portfolio/micro-tv-hd.png',
                                category: 'News Portal',
                                tags: ['Media', 'Streaming', 'Web App'],
                                link: '#'
                            },
                            {
                                _id: '5',
                                title: 'Mahila Laghubitta Bittiya Sanstha Ltd.',
                                description: 'A microfinance institutional website providing financial services, notices, and reports for women empowerment in rural areas.',
                                image: '/portfolio/mahila-laghubitta.png',
                                category: 'Finance',
                                tags: ['Institution', 'Web Portal'],
                                link: '#'
                            },
                            {
                                _id: '6',
                                title: 'Rupantaran Post',
                                description: 'A prominent Nepali news and media portal delivering the latest updates, features, and national news coverage.',
                                image: '/portfolio/rupantaran-post.png',
                                category: 'News Portal',
                                tags: ['News', 'Media', 'Web App'],
                                link: '#'
                            },
                            {
                                _id: '7',
                                title: 'NA Fellowship in Nepal',
                                description: 'The official website for the Nepal Regional Committee of Narcotics Anonymous, providing resources, meetings, and regional information.',
                                image: '/portfolio/na-fellowship.png',
                                category: 'Organization',
                                tags: ['Non-profit', 'Web Portal', 'Community'],
                                link: '#'
                            },
                            {
                                _id: '8',
                                title: 'Sports Performance Services',
                                description: 'A dedicated sports performance website offering athlete development, strength & conditioning, and performance testing services.',
                                image: '/portfolio/sports-performance.png',
                                category: 'Fitness / Sports',
                                tags: ['Sports', 'Fitness', 'Web Portal'],
                                link: '#'
                            },
                            {
                                _id: '9',
                                title: 'Banking Khabar',
                                description: 'A comprehensive financial and banking news portal delivering the latest updates on the economy, stock market, and banking sector.',
                                image: '/portfolio/banking-khabar.png',
                                category: 'News Portal',
                                tags: ['Finance', 'News', 'Media'],
                                link: '#'
                            },
                            {
                                _id: '10',
                                title: 'Emerald Isle Nepal',
                                description: 'A professional recruitment agency website showcasing over 10 years of experience in overseas manpower placement and services.',
                                image: '/portfolio/emerald-isle.png',
                                category: 'Recruitment',
                                tags: ['HR', 'Recruitment', 'Corporate'],
                                link: '#'
                            },
                            {
                                _id: '11',
                                title: 'Career Point',
                                description: 'A human resource and management consultancy platform connecting top talent with global opportunities, primarily based in Dubai.',
                                image: '/portfolio/career-point.png',
                                category: 'Consultancy',
                                tags: ['HR', 'Consultancy', 'Global'],
                                link: '#'
                            },
                            {
                                _id: '12',
                                title: 'Sun Saving & Credit Cooperative Limited',
                                description: 'The official portal for a leading cooperative providing savings, loans, and financial services to empower local communities.',
                                image: '/portfolio/sun-saving.png',
                                category: 'Finance',
                                tags: ['Cooperative', 'Finance', 'Web App'],
                                link: '#'
                            },
                            {
                                _id: '13',
                                title: 'Ballavartyn Equestrian Centre',
                                description: 'A premium equestrian centre website featuring events, results, leagues, and livery services for horse enthusiasts.',
                                image: '/portfolio/ballavartyn.png',
                                category: 'Sports / Leisure',
                                tags: ['Equestian', 'Sports', 'Web Portal'],
                                link: '#'
                            },
                            {
                                _id: '14',
                                title: 'Patron Nepal',
                                description: 'The official website for Patron Nepal, a non-governmental organization focused on volunteerism, peace, and sustainable development.',
                                image: '/portfolio/patron-nepal.png',
                                category: 'NGO / Charity',
                                tags: ['NGO', 'Charity', 'Community'],
                                link: '#'
                            },
                            {
                                _id: '15',
                                title: 'Franklin\'s Limited',
                                description: 'A specialized automotive dealership website offering pre-owned vehicles, finance options, and vehicle sourcing services.',
                                image: '/portfolio/franklins-limited.png',
                                category: 'Automotive',
                                tags: ['Automotive', 'Dealership', 'Web Portal'],
                                link: '#'
                            },
                            {
                                _id: '16',
                                title: 'Stonecraft',
                                description: 'A local Manx company website specializing in stonemasonry, stone supplies, hiring services, and consultancy.',
                                image: '/portfolio/stonecraft.png',
                                category: 'Construction / Stonemasonry',
                                tags: ['Construction', 'Corporate'],
                                link: '#'
                            },
                            {
                                _id: '17',
                                title: 'Discern Products',
                                description: 'A modern publishing platform offering an exciting business model and publishing services for Christian authors.',
                                image: '/portfolio/discern-products.png',
                                category: 'Publishing',
                                tags: ['Publishing', 'Authors', 'E-commerce'],
                                link: '#'
                            },
                            {
                                _id: '18',
                                title: 'LaghuVitta News',
                                description: 'A comprehensive news portal dedicated to microfinance, banking updates, and economic news in Nepal.',
                                image: '/portfolio/laghuvitta-news.png',
                                category: 'News Portal',
                                tags: ['News', 'Finance', 'Web Portal'],
                                link: '#'
                            },
                            {
                                _id: '19',
                                title: 'Nepal Wanders',
                                description: 'A dedicated travel and tourism platform offering treks, tours, and comprehensive travel guides for exploring Nepal.',
                                image: '/portfolio/nepal-wanders.png',
                                category: 'Travel / Tourism',
                                tags: ['Tourism', 'Travel', 'Web Design'],
                                link: '#'
                            },
                            {
                                _id: '20',
                                title: 'Himal Hub',
                                description: 'An authoritative news hub covering the latest economic, financial, and political updates, delivering in-depth reports and insights.',
                                image: '/portfolio/himal-hub.png',
                                category: 'News Portal',
                                tags: ['Media', 'News', 'Web App'],
                                link: '#'
                            },
                            {
                                _id: '21',
                                title: 'Business Sansar',
                                description: 'A dynamic business news platform providing timely updates on markets, banking, and commercial sectors.',
                                image: '/portfolio/business-sansar.png',
                                category: 'News / Business',
                                tags: ['Business', 'News', 'Corporate'],
                                link: '#'
                            },
                            {
                                _id: '22',
                                title: 'Aaronic International',
                                description: 'A professional educational consultancy website offering study abroad services, preparation classes, and expert consultations.',
                                image: '/portfolio/aaronic-international.png',
                                category: 'Education / Consultancy',
                                tags: ['Education', 'Consultancy', 'Web Portal'],
                                link: '#'
                            },
                            {
                                _id: '23',
                                title: 'CEDAW',
                                description: 'A non-profit organization dedicated to empowering and supporting survivors of domestic and gender-based violence.',
                                image: '/portfolio/cedaw.png',
                                category: 'NGO / Charity',
                                tags: ['NGO', 'Charity', 'Support'],
                                link: '#'
                            },
                            {
                                _id: '24',
                                title: 'Industry Mission Nepal',
                                description: 'An industry-focused news and media platform providing updates, interviews, and economic news related to Nepal\'s industrial sector.',
                                image: '/portfolio/industry-mission.png',
                                category: 'News / Industry',
                                tags: ['Industry', 'News', 'Media'],
                                link: '#'
                            },
                            {
                                _id: '25',
                                title: 'Media International',
                                description: 'An event-driven media organization addressing economic issues, brain drain, and promoting financial literacy and entrepreneurship.',
                                image: '/portfolio/media-international.png',
                                category: 'Media / Event',
                                tags: ['Media', 'Corporate', 'Events'],
                                link: '#'
                            }
                        ]);
                    }
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleSkipUp = () => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSkipDown = () => {
        document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
    };

    const [showSkip, setShowSkip] = useState(false);


    useEffect(() => {
        if (!loading && projects.length > 0 && horizontalRef.current) {
            let mm = gsap.matchMedia();

            mm.add("(max-width: 767px)", () => {
                const st = ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    onToggle: (self) => setShowSkip(self.isActive),
                });
                return () => st.kill();
            });

            mm.add("(min-width: 768px)", () => {
                const totalWidth = horizontalRef.current!.scrollWidth;
                const viewportWidth = window.innerWidth;
                const scrollDist = totalWidth - viewportWidth;

                const pin = gsap.to(horizontalRef.current, {
                    x: -scrollDist,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        pin: true,
                        start: "top top",
                        end: () => `+=${scrollDist}`,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        onToggle: (self) => setShowSkip(self.isActive),
                        onUpdate: (self) => {
                            gsap.to(".portfolio-progress", {
                                width: `${self.progress * 100}%`,
                                duration: 0.1,
                                ease: "none",
                            });
                        },
                    },
                });

                // Parallax on card images
                const images = horizontalRef.current!.querySelectorAll(".project-image");
                images.forEach((img) => {
                    gsap.to(img, {
                        x: 50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: img,
                            containerAnimation: pin,
                            start: "left right",
                            end: "right left",
                            scrub: true,
                        },
                    });
                });

                return () => {
                    pin.kill();
                };
            });

            return () => {
                mm.revert();
            };
        }
    }, [loading, projects]);

    if (loading) return null;

    return (
        <>
            <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 md:bottom-10 z-[100] transition-all duration-500 ${showSkip ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="flex gap-4">
                    <button
                        onClick={handleSkipUp}
                        className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/60 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md group cursor-pointer"
                    >
                        <FaChevronUp className="animate-bounce group-hover:-translate-y-0.5 transition-transform" />
                        <span>Skip Up</span>
                    </button>
                    <button
                        onClick={handleSkipDown}
                        className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/60 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-lg backdrop-blur-md group cursor-pointer"
                    >
                        <span>Skip Down</span>
                        <FaChevronDown className="animate-bounce group-hover:translate-y-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        <section 
            ref={sectionRef} 
            className="bg-[#050505] overflow-hidden" 
            id="portfolio"
        >
            <div ref={triggerRef} className="min-h-screen md:h-screen relative flex flex-col md:flex-row items-center py-20 md:py-0">
                {/* Background Large Text */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full flex justify-center pointer-events-none opacity-[0.02] hidden md:flex">
                    <h2 className="text-[35vw] font-black uppercase tracking-tighter whitespace-nowrap text-white">
                        PORTFOLIO
                    </h2>
                </div>

                {/* Horizontal Scroll Container */}
                <div 
                    ref={horizontalRef} 
                    className="flex flex-col md:flex-row flex-nowrap w-full md:w-auto h-auto md:h-full items-center px-6 md:px-[10vw] gap-16 md:gap-[5vw] py-10 md:py-0"
                >
                    {/* Header Card */}
                    <div className="flex-shrink-0 w-full md:w-[40vw] h-auto md:h-[60vh] flex flex-col justify-center space-y-6 md:space-y-8">
                        <span className="text-indigo-500 font-black uppercase tracking-[0.4em] text-xs">Featured Projects</span>
                        <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.95] md:leading-tight tracking-tighter">
                            Engineering <br className="hidden md:block" />
                            <span className="text-transparent" style={{ WebkitTextStroke: "1px white" }}>Solutions.</span>
                        </h2>
                        <p className="text-slate-400 font-medium text-lg md:text-xl font-light max-w-sm">
                            Scroll to explore our latest digital transformations and high-impact case studies.
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
                            <div className="flex items-center gap-4 text-white/40 text-xs font-bold uppercase tracking-widest">
                                <span>Scroll Down</span>
                                <div className="w-12 h-[1px] bg-white/20" />
                                <FaChevronRight className="animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Project Cards */}
                    {projects.map((project, index) => (
                        <div 
                            key={project._id}
                            className="flex-shrink-0 w-full md:w-[65vw] h-[55vh] md:h-[70vh] group relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#111] border border-white/5"
                        >
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                            
                            {/* Project Info */}
                            <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
                                <div className="space-y-4 md:space-y-6 max-w-2xl">
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl md:text-4xl font-black text-white/10 italic">
                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </span>
                                        <div className="h-[2px] w-8 md:w-12 bg-indigo-500" />
                                        <span className="text-indigo-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">{project.category}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-7xl font-black text-white tracking-tighter leading-none">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm md:text-xl font-light leading-relaxed line-clamp-3 md:line-clamp-none">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {project.tags?.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/60">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                
                                <Link 
                                    href={project.link || "#"}
                                    className="group/btn relative w-14 h-14 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center text-xl md:text-3xl text-black hover:scale-110 transition-transform duration-500 shadow-2xl shrink-0 self-end md:self-auto"
                                >
                                    <FaArrowRight className="group-hover:rotate-[-45deg] transition-transform duration-500" />
                                </Link>
                            </div>

                            {/* Background Image */}
                            <img 
                                src={project.image || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600&sig=${index}`}
                                alt={project.title}
                                className="project-image absolute inset-0 w-[120%] h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000 ease-out"
                            />
                        </div>
                    ))}

                    {/* Footer Card */}
                    <div className="flex-shrink-0 w-full md:w-[50vw] h-auto md:h-[60vh] flex flex-col justify-center items-center text-center space-y-6 md:space-y-10 py-10 md:py-0">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/10 flex items-center justify-center text-2xl md:text-3xl text-white hover:bg-white hover:text-black transition-all cursor-pointer">
                            <FaArrowRight className="rotate-[-45deg]" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            Ready to build <br />
                            <span className="text-indigo-500">Something New?</span>
                        </h2>
                        <button className="px-8 py-4 md:px-10 md:py-5 bg-white text-black font-black uppercase tracking-widest text-xs md:text-sm rounded-2xl hover:scale-105 transition-transform">
                            Start a Project
                        </button>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80vw] h-[2px] bg-white/5 overflow-hidden rounded-full hidden md:block">
                    <div className="portfolio-progress h-full bg-indigo-500 w-0" />
                </div>
            </div>
        </section>
        </>
    );
};

export default Portfolio;
