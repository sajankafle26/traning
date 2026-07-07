'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

import {
  FaBars, FaXmark, FaPhone, FaUser, FaFacebookF, FaLinkedinIn, FaInstagram,
  FaChevronDown, FaLaptopCode, FaScrewdriverWrench, FaBoxOpen, FaReact, FaCubes,
  FaServer, FaWordpress, FaPenNib, FaObjectGroup, FaBullhorn, FaCode,
  FaMobileScreenButton, FaCartShopping, FaChartLine, FaCloud, FaUsersGear,
  FaXTwitter,
  FaGraduationCap, FaStore, FaEnvelope, FaRobot, FaBrain, FaPaintbrush,
  FaMagnifyingGlass, FaMobile, FaBolt, FaRocket, FaGlobe, FaHandshake,
  FaChartBar, FaMicrochip, FaShield,
} from 'react-icons/fa6';
import { apiService } from '@/services/apiService';
import { Course, ServiceItem, Product } from '@/types';
import type { IconType } from 'react-icons';

type MegaKey = 'courses' | 'services' | 'products' | 'about' | null;

const Navbar = () => {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [liveCourses, setLiveCourses] = useState<Course[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeMega, setActiveMega] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({});
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const navRef = useRef<HTMLElement>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courses, fetchedServices, fetchedProducts, settings] = await Promise.all([
          apiService.getCourses(),
          apiService.getServices(),
          apiService.getProducts(),
          apiService.getSiteSettings()
        ]);
        setLiveCourses(courses);
        setServices(fetchedServices);
        setProducts(fetchedProducts);
        if (settings) setSiteSettings(settings);
      } catch (err) {
        console.error('Navbar data fetch error:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setActiveMega(null);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMega(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const ICON_MAP: Record<string, IconType> = {
    'FaLaptopCode': FaLaptopCode, 'FaScrewdriverWrench': FaScrewdriverWrench, 'FaBoxOpen': FaBoxOpen,
    'FaReact': FaReact, 'FaCubes': FaCubes, 'FaServer': FaServer, 'FaWordpress': FaWordpress,
    'FaPenNib': FaPenNib, 'FaObjectGroup': FaObjectGroup, 'FaBullhorn': FaBullhorn, 'FaCode': FaCode,
    'FaMobileScreenButton': FaMobileScreenButton, 'FaCartShopping': FaCartShopping,
    'FaChartLine': FaChartLine, 'FaCloud': FaCloud, 'FaUsersGear': FaUsersGear, 'FaGraduationCap': FaGraduationCap,
    'FaStore': FaStore, 'FaEnvelope': FaEnvelope, 'FaRobot': FaRobot, 'FaBrain': FaBrain,
    'FaPaintbrush': FaPaintbrush, 'FaSearch': FaMagnifyingGlass, 'FaMobile': FaMobile, 'FaBolt': FaBolt,
    'FaRocket': FaRocket, 'FaGlobe': FaGlobe, 'FaHandshake': FaHandshake, 'FaChartBar': FaChartBar,
    'FaMicrochip': FaMicrochip, 'FaShield': FaShield,
  };

  const getIcon = (iconName: string, fallback: IconType = FaCubes): IconType => {
    if (!iconName) return fallback;
    if (iconName.startsWith('fa-')) {
      const parts = iconName.split(' ');
      const actualIcon = parts[parts.length - 1];
      const iconKey = actualIcon.replace('fa-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
      return ICON_MAP[`Fa${iconKey}`] || fallback;
    }
    return fallback;
  };

  const getCourseIcon = (category: string): IconType => {
    switch (category?.toLowerCase()) {
      case 'frontend': return FaReact;
      case 'backend': return FaServer;
      case 'js': return FaCode;
      case 'wp': return FaWordpress;
      case 'design': return FaPenNib;
      case 'dm': return FaBullhorn;
      case 'robotics': return FaCubes;
      default: return FaLaptopCode;
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setActiveMega(null);
  };

  const handleMegaEnter = useCallback((key: MegaKey) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(key);
  }, []);

  const handleMegaLeave = useCallback(() => {
    megaTimeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  /* ====================== DYNAMIC MEGA DATA ====================== */

  const courseCategories = (() => {
    if (liveCourses.length === 0) return [];
    const half = Math.ceil(liveCourses.length / 2);
    return [
      {
        title: '',
        items: liveCourses.slice(0, half).map(c => ({
          label: c.title,
          href: `/courses/${c.slug}`,
          icon: getCourseIcon(c.category),
          desc: c.description?.replace(/<[^>]*>/g, '').slice(0, 60) || '',
        })),
      },
      {
        title: '',
        items: liveCourses.slice(half).map(c => ({
          label: c.title,
          href: `/courses/${c.slug}`,
          icon: getCourseIcon(c.category),
          desc: c.description?.replace(/<[^>]*>/g, '').slice(0, 60) || '',
        })),
      },
    ];
  })();

  const serviceCategories = (() => {
    if (services.length === 0) return [];
    const half = Math.ceil(services.length / 2);
    return [
      {
        title: '',
        items: services.slice(0, half).map(s => ({
          label: s.title,
          href: `/services/${s.slug}`,
          icon: getIcon(s.icon, FaCode),
          desc: s.description?.replace(/<[^>]*>/g, '').slice(0, 60) || '',
        })),
      },
      {
        title: 'Growth',
        items: services.slice(half).map(s => ({
          label: s.title,
          href: `/services/${s.slug}`,
          icon: getIcon(s.icon, FaChartLine),
          desc: s.description?.replace(/<[^>]*>/g, '').slice(0, 60) || '',
        })),
      },
    ];
  })();

  const productItems = products.map(p => ({
    label: p.title,
    href: p.link || '/products/',
    icon: FaBoxOpen,
    desc: p.description?.replace(/<[^>]*>/g, '').slice(0, 60) || '',
  }));

  const aboutLinks = [
    { label: 'About Sangalo Tech', href: '/about', icon: FaGlobe, desc: 'Our story, mission & team' },
    { label: 'Our Portfolio', href: '/portfolio', icon: FaLaptopCode, desc: 'Client projects & case studies' },
    { label: 'Contact Us', href: '/contact', icon: FaEnvelope, desc: 'Get in touch with our team' },
    { label: 'Upcoming Batches', href: '/upcoming', icon: FaRocket, desc: 'Next enrollment dates' },
  ];

  /* ====================== MEGA MENU PANELS ====================== */

  const MegaPanel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div
      className={`absolute left-0 right-0 top-full bg-white border-t border-slate-100 shadow-xl shadow-slate-200/50 z-50 ${className}`}
      onMouseEnter={() => handleMegaEnter(activeMega)}
      onMouseLeave={handleMegaLeave}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );

  const MegaItem = ({ label, href, icon: Icon, desc }: { label: string; href: string; icon: IconType; desc: string }) => (
    <Link
      href={href}
      onClick={handleLinkClick}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition group"
    >
      <div className="w-10 h-10 rounded-lg bg-[#00548B]/8 flex items-center justify-center shrink-0 group-hover:bg-[#00548B] transition-colors">
        <Icon className="text-sm text-[#00548B] group-hover:text-white transition-colors" />
      </div>
      <div>
        <div className="text-sm font-bold text-slate-800 group-hover:text-[#00548B] transition-colors">{label}</div>
        <div className="text-[11px] text-slate-400 mt-0.5">{desc}</div>
      </div>
    </Link>
  );

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 bg-white ${isScrolled ? 'backdrop-blur-md shadow-sm' : ''}`}
    >
      {/* Top Bar */}
      <div className={`bg-[#00548B] text-white text-[11px] font-medium transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0' : 'h-10'}`}>
        <div className="max-w-[1400px] mx-auto flex justify-between items-center h-full px-6">
          <div className="flex gap-6 items-center text-[14px]">
            <a href={`tel:${siteSettings?.phone?.split('/')[0]?.trim() || '9851228383'}`} className="flex items-center text-[14px] gap-1.5 hover:text-blue-200 transition no-underline">
              <FaPhone /> {siteSettings?.phone?.split('/')[0]?.trim() || '9851228383'}
            </a>
            <a href={`mailto:${siteSettings?.email || 'sangalotech@gmail.com'}`} className="hidden sm:flex items-center gap-1.5 text-[14px] hover:text-blue-200 transition no-underline">
              <FaEnvelope /> {siteSettings?.email || 'sangalotech@gmail.com'}
            </a>
          </div>
          <div className="flex items-center">
            <a href={siteSettings?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-lg transition" aria-label="Facebook"><FaFacebookF /></a>
            <a href={siteSettings?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-lg transition" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href={siteSettings?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-lg transition" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav aria-label="Main navigation" className="max-w-[1400px] mx-auto px-5 md:px-6 flex items-center justify-between h-14 md:h-auto">
        <Link href="/" className="no-underline shrink-0">
          <img src="/logo.png" alt="Sangalo Tech" width={56} height={56} loading="eager" className="h-10 md:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop mega menu triggers */}
        <div className="hidden lg:flex items-center gap-1">
          <Link href="/" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-[#00548B] transition rounded-lg no-underline">Home</Link>

          {/* Courses */}
          {courseCategories.length > 0 && courseCategories.some(c => c.items.length > 0) && (
            <div
              onMouseEnter={() => handleMegaEnter('courses')}
              onMouseLeave={handleMegaLeave}
            >
              <button
                onClick={() => setActiveMega(activeMega === 'courses' ? null : 'courses')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition rounded-lg ${activeMega === 'courses' ? 'text-[#00548B] bg-[#00548B]/5' : 'text-slate-600 hover:text-[#00548B] hover:bg-slate-50'}`}
              >
                Courses
                <FaChevronDown className={`text-[9px] transition-transform ${activeMega === 'courses' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}

          {/* Services */}
          {serviceCategories.length > 0 && serviceCategories.some(c => c.items.length > 0) && (
            <div
              onMouseEnter={() => handleMegaEnter('services')}
              onMouseLeave={handleMegaLeave}
            >
              <button
                onClick={() => setActiveMega(activeMega === 'services' ? null : 'services')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition rounded-lg ${activeMega === 'services' ? 'text-[#00548B] bg-[#00548B]/5' : 'text-slate-600 hover:text-[#00548B] hover:bg-slate-50'}`}
              >
                Services
                <FaChevronDown className={`text-[9px] transition-transform ${activeMega === 'services' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}

          {/* Products */}
          {productItems.length > 0 && (
            <div
              onMouseEnter={() => handleMegaEnter('products')}
              onMouseLeave={handleMegaLeave}
            >
              <button
                onClick={() => setActiveMega(activeMega === 'products' ? null : 'products')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition rounded-lg ${activeMega === 'products' ? 'text-[#00548B] bg-[#00548B]/5' : 'text-slate-600 hover:text-[#00548B] hover:bg-slate-50'}`}
              >
                Products
                <FaChevronDown className={`text-[9px] transition-transform ${activeMega === 'products' ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}

          <Link href="/portfolio" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-[#00548B] transition rounded-lg no-underline">Portfolio</Link>

          {/* About */}
          <div
            onMouseEnter={() => handleMegaEnter('about')}
            onMouseLeave={handleMegaLeave}
          >
            <button
              onClick={() => setActiveMega(activeMega === 'about' ? null : 'about')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition rounded-lg ${activeMega === 'about' ? 'text-[#00548B] bg-[#00548B]/5' : 'text-slate-600 hover:text-[#00548B] hover:bg-slate-50'}`}
            >
              About
              <FaChevronDown className={`text-[9px] transition-transform ${activeMega === 'about' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <Link href="/contact" className="px-3 py-2 text-sm font-bold text-slate-600 hover:text-[#00548B] transition rounded-lg no-underline">Contact</Link>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/courses" className="hidden lg:flex items-center gap-2 bg-[#00548B] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#004381] transition-all no-underline">
            Apply Now
          </Link>
          <Link href="/cart" className="relative w-12 h-12 flex items-center justify-center rounded-lg hover:bg-slate-100 transition no-underline" aria-label="View Cart">
            <FaCartShopping className="text-lg text-slate-600" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white">{itemCount}</span>
            )}
          </Link>

          {session ? (
            <div className="hidden md:flex items-center gap-3">
              <Link href={(session.user as any).role === 'admin' ? '/adminpanel' : '/student-dashboard'} className="flex items-center gap-2 bg-[#00548B] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#004381] transition no-underline">
                <FaUser className="text-sm" /> {session.user?.name?.split(' ')[0]}
              </Link>
              <button onClick={() => signOut()} className="text-slate-400 font-bold hover:text-red-500 transition text-sm">Logout</button>
            </div>
          ) : (
            <Link href="/studentlogin" className="hidden md:flex items-center gap-2 bg-[#00548B] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#004381] transition no-underline">
              <FaUser className="text-sm" /> Login
            </Link>
          )}

          <button
            className="lg:hidden w-11 h-11 flex items-center justify-center bg-[#00548B] text-white rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaXmark className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </nav>

      {/* =================== MEGA: COURSES =================== */}
      {activeMega === 'courses' && (
        <MegaPanel>
          <div className="grid grid-cols-2 gap-8">
            {courseCategories.map((cat, idx) => (
              <div key={idx}>
                {cat.title && <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 px-3">{cat.title}</h4>}
                <div className="space-y-0.5">
                  {cat.items.map((item) => (
                    <MegaItem key={item.href} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <Link href="/courses" onClick={handleLinkClick} className="text-sm font-bold text-[#00548B] hover:underline no-underline">
              View All Courses &rarr;
            </Link>
            <Link href="/upcoming" onClick={handleLinkClick} className="text-xs font-bold text-slate-400 hover:text-[#00548B] transition no-underline">
              Upcoming Batches &rarr;
            </Link>
          </div>
        </MegaPanel>
      )}

      {/* =================== MEGA: SERVICES =================== */}
      {activeMega === 'services' && (
        <MegaPanel>
          <div className="grid grid-cols-2 gap-8">
            {serviceCategories.map((cat, idx) => (
              <div key={idx}>
                {cat.title && <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 px-3">{cat.title}</h4>}
                <div className="space-y-0.5">
                  {cat.items.map((item) => (
                    <MegaItem key={item.href} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100">
            <Link href="/services" onClick={handleLinkClick} className="text-sm font-bold text-[#00548B] hover:underline no-underline">
              View All Services &rarr;
            </Link>
          </div>
        </MegaPanel>
      )}

      {/* =================== MEGA: PRODUCTS =================== */}
      {activeMega === 'products' && (
        <MegaPanel>
          <div className="max-w-2xl">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 px-3">Ready-Made Solutions</h4>
            <div className="space-y-0.5">
              {productItems.map((item) => (
                <MegaItem key={item.href} {...item} />
              ))}
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-slate-100">
            <Link href="/products" onClick={handleLinkClick} className="text-sm font-bold text-[#00548B] hover:underline no-underline">
              View All Products &rarr;
            </Link>
          </div>
        </MegaPanel>
      )}

      {/* =================== MEGA: ABOUT =================== */}
      {activeMega === 'about' && (
        <MegaPanel>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 px-3">Company</h4>
              <div className="space-y-0.5">
                {aboutLinks.map((item) => (
                  <MegaItem key={item.href} {...item} />
                ))}
              </div>
            </div>
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 mb-2">Sangalo Tech Pvt. Ltd.</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Nepal&apos;s trusted software company and IT training institute since 2018. We build custom web apps and train job-ready developers.
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span><strong className="text-slate-700">1500+</strong> Students</span>
                <span><strong className="text-slate-700">100+</strong> Projects</span>
                <span><strong className="text-slate-700">95%</strong> Placement</span>
              </div>
            </div>
          </div>
        </MegaPanel>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-black/30 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-[85vw] max-w-[360px] bg-white z-50 shadow-2xl transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <img src="/logo.png" alt="Sangalo Tech" className="h-9 w-auto object-contain" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-slate-100 transition" aria-label="Close menu">
            <FaXmark className="text-lg text-slate-600" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-72px)] pb-24 px-5 py-4 space-y-1">
          <Link href="/" onClick={handleLinkClick} className="flex items-center gap-3 py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline">Home</Link>
          <Link href="/about" onClick={handleLinkClick} className="flex items-center gap-3 py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline">About Us</Link>

          {/* Training */}
          <div>
            <button className="w-full flex items-center justify-between py-3.5 text-left text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition px-0" onClick={() => setMobileOpen((s) => ({ ...s, training: !s.training }))}>
              <span className="flex items-center gap-3"><FaGraduationCap className="text-[#00548B]" /> Training</span>
              <FaChevronDown className={`text-xs text-slate-400 transition-transform ${mobileOpen.training ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpen.training && (
              <div className="pl-4 pb-2 space-y-0.5">
                {liveCourses.length > 0 ? liveCourses.map((course) => {
                  const Icon = getCourseIcon(course.category);
                  return (
                    <Link key={course.id} href={`/courses/${course.slug}`} onClick={handleLinkClick} className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition no-underline">
                      <Icon className="text-[#00548B] text-sm" /> {course.title}
                    </Link>
                  );
                }) : (
                  <>
                    {courseCategories.flatMap((c) => c.items).map((l) => (
                      <Link key={l.href} href={l.href} onClick={handleLinkClick} className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition no-underline">
                        <l.icon className="text-[#00548B] text-sm" /> {l.label}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <button className="w-full flex items-center justify-between py-3.5 text-left text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition px-0" onClick={() => setMobileOpen((s) => ({ ...s, services: !s.services }))}>
              <span className="flex items-center gap-3"><FaScrewdriverWrench className="text-[#00548B]" /> Services</span>
              <FaChevronDown className={`text-xs text-slate-400 transition-transform ${mobileOpen.services ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpen.services && (
              <div className="pl-4 pb-2 space-y-0.5">
                {services.map((l) => {
                  const Icon = getIcon(l.icon, FaScrewdriverWrench);
                  return (
                    <Link key={l.id} href={`/services/${l.slug}`} onClick={handleLinkClick} className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition no-underline">
                      <Icon className="text-[#00548B] text-sm" /> {l.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <button className="w-full flex items-center justify-between py-3.5 text-left text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition px-0" onClick={() => setMobileOpen((s) => ({ ...s, products: !s.products }))}>
              <span className="flex items-center gap-3"><FaBoxOpen className="text-[#00548B]" /> Products</span>
              <FaChevronDown className={`text-xs text-slate-400 transition-transform ${mobileOpen.products ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpen.products && (
              <div className="pl-4 pb-2 space-y-0.5">
                {products.map((l) => (
                  <Link key={l.id || (l as any)._id} href={l.link || '#'} onClick={handleLinkClick} className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition no-underline">
                    <FaBoxOpen className="text-[#00548B] text-sm" /> {l.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/upcoming" onClick={handleLinkClick} className="flex items-center justify-between py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline">
            <span className="flex items-center gap-3">Upcoming Batches <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">HOT</span></span>
          </Link>
          <Link href="/portfolio" onClick={handleLinkClick} className="flex items-center gap-3 py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline">Portfolio</Link>
          <Link href="/contact" onClick={handleLinkClick} className="flex items-center gap-3 py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline">Contact</Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-5 py-4 space-y-3">
          {session ? (
            <div className="flex gap-3">
              <Link href={(session.user as any).role === 'admin' ? '/adminpanel' : '/student-dashboard'} onClick={handleLinkClick} className="flex-1 flex items-center justify-center gap-2 bg-[#00548B] text-white py-3.5 rounded-lg font-bold text-sm no-underline">
                <FaUser className="text-sm" /> Dashboard
              </Link>
              <button onClick={() => { signOut(); handleLinkClick(); }} className="px-4 py-3.5 rounded-lg border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-50 transition">Logout</button>
            </div>
          ) : (
            <Link href="/studentlogin" onClick={handleLinkClick} className="flex items-center justify-center gap-2 bg-[#00548B] text-white py-3.5 rounded-lg font-bold text-sm no-underline">
              <FaUser className="text-sm" /> Student Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
