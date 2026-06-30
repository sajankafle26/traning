'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

// Icons (Font Awesome 6 via react-icons/fa6)
import * as FaIcons6 from 'react-icons/fa6';

import {
  FaBars,
  FaXmark,
  FaPhone,
  FaUser,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaChevronDown,
  FaLaptopCode,
  FaScrewdriverWrench,
  FaBoxOpen,
  FaReact,
  FaCubes,
  FaServer,
  FaWordpress,
  FaPenNib,
  FaObjectGroup,
  FaBullhorn,
  FaCode,
  FaMobileScreenButton,
  FaCartShopping,
  FaChartLine,
  FaCloud,
  FaUsersGear,
  FaGraduationCap,
  FaStore,
  FaEnvelope,
  FaCircle,
} from 'react-icons/fa6';
import { apiService } from '@/services/apiService';
import { Course, UpcomingBatch, ServiceItem, Product } from '@/types';
import type { IconType } from 'react-icons';

interface NavbarProps {
  onNavigate?: (target: string) => void;
}

interface LogoProps {
  dark?: boolean;
}

type DropdownKey = 'training' | 'services' | 'products' | null;

type DropdownItem = {
  label: string;
  href: string;
  icon: any;
};

const Navbar = ({ onNavigate }: NavbarProps) => {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [liveCourses, setLiveCourses] = useState<Course[]>([]);
  const [upcomingBatches, setUpcomingBatches] = useState<UpcomingBatch[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Desktop dropdown state
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);

  // Mobile collapsibles
  const [mobileOpen, setMobileOpen] = useState<Partial<Record<Exclude<DropdownKey, null>, boolean>>>({
    training: false,
    services: false,
    products: false,
  });

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------------- Site Settings ----------------
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courses, batches, fetchedServices, fetchedProducts, settings] = await Promise.all([
          apiService.getCourses(),
          apiService.getBatches(),
          apiService.getServices(),
          apiService.getProducts(),
          apiService.getSiteSettings()
        ]);
        setLiveCourses(courses);
        setUpcomingBatches(batches);
        setServices(fetchedServices);
        setProducts(fetchedProducts);
        if (settings) setSiteSettings(settings);
      } catch (err) {
        console.error('Navbar data fetch error:', err);
      }
    };
    fetchData();
  }, []);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // ESC to close menus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const getIcon = (iconName: string, fallback: IconType = FaCubes) => {
    if (!iconName) return fallback;

    // If it's a FontAwesome class like "fa-solid fa-laptop-code"
    if (iconName.startsWith('fa-')) {
      const parts = iconName.split(' ');
      const actualIcon = parts[parts.length - 1]; // "fa-laptop-code"
      const iconKey = actualIcon
        .replace('fa-', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

      const Key = `Fa${iconKey}`;
      return (FaIcons6 as any)[Key] || fallback;
    }

    return fallback;
  };

  const getCourseIcon = (category: string) => {
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

  const handleLinkClick = (href: string) => {
    onNavigate?.(href);
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const Logo = ({ dark = false }: LogoProps) => (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => handleLinkClick('/')}
      aria-label="Go to home"
    >
      <img
        src="/logo.png"
        alt="Sangalo Tech"
        width={56}
        height={56}
        loading="eager"
        className={`h-12 md:h-14 w-auto object-contain ${dark ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );

  // Desktop dropdown togglers (click to open)
  const toggleMenu = (key: Exclude<DropdownKey, null>) =>
    setOpenDropdown((prev) => (prev === key ? null : key));

  /* ---------------------------------- Data ---------------------------------- */

  const trainingDev: DropdownItem[] = [
    { label: 'React & Next.js', href: '/courses/react-next-js', icon: FaReact },
    { label: 'MERN Stack', href: '/courses/mern-stack', icon: FaCubes },
    { label: 'Laravel', href: '/courses/laravel-mastery', icon: FaServer },
    { label: 'WordPress', href: '/courses/wordpress-theme-dev', icon: FaWordpress },
  ];

  const trainingDesign: DropdownItem[] = [
    { label: 'UI/UX Design', href: '/courses/ui-ux-design', icon: FaPenNib },
    { label: 'Web Design', href: '/courses/web-design', icon: FaObjectGroup },
    { label: 'Digital Marketing', href: '/courses/digital-marketing', icon: FaBullhorn },
  ];

  const servicesCol1: DropdownItem[] = [
    { label: 'Web App Development', href: '/services/web-app-development', icon: FaCode },
    { label: 'Mobile Apps', href: '/services/mobile-app-development', icon: FaMobileScreenButton },
    { label: 'UI/UX & Prototyping', href: '/services/ui-ux-design-and-prototyping', icon: FaObjectGroup },
  ];

  const servicesCol2: DropdownItem[] = [
    { label: 'E‑Commerce', href: '/services/e-commerce-development', icon: FaCartShopping },
    { label: 'SEO & Performance', href: '/services/seo-and-performance-optimization', icon: FaChartLine },
    { label: 'Cloud & DevOps', href: '/services/cloud-and-devops-services', icon: FaCloud },
  ];

  const productsMenu: DropdownItem[] = [
    { label: 'School Management System', href: '/products/', icon: FaGraduationCap },
    { label: 'News Portal with Mobile App', href: '/products/', icon: FaUsersGear },
    { label: 'Clinic Management System', href: '/products/', icon: FaStore },
  ];

  /* ------------------------------ Desktop Menus ----------------------------- */

  const ParentBtn = ({
    label,
    icon: Icon,
    open,
    onClick,
  }: {
    label: string;
    icon: IconType;
    open: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-2 hover:text-[#00548B] transition font-bold text-slate-600"
      aria-haspopup="menu"
      aria-expanded={open}
    >
      <Icon className={`text-sm ${open ? 'text-[#00548B]' : 'text-slate-500'}`} />
      <span>{label}</span>
      <FaChevronDown
        className={`text-[10px] transition-transform duration-300 ${open ? 'rotate-180 text-[#00548B]' : 'rotate-0 text-slate-500'}`}
        aria-hidden
      />
    </button>
  );

  const DesktopDropdownShell: React.FC<{
    open: boolean;
    widthClass?: string;
    children: React.ReactNode;
  }> = ({ open, widthClass = 'w-[560px]', children }) => {
    if (!open) return null;
    return (
      <div
        role="menu"
        className={`absolute left-0 mt-3 ${widthClass} bg-white border border-slate-200 rounded-2xl shadow-2xl p-6
        origin-top transition-transform duration-200 ease-out
        animate-in fade-in slide-in-from-top-2
        `}
      >
        {children}
      </div>
    );
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white backdrop-blur-md shadow-lg py-2' : 'bg-white'}`}
    >
      {/* Top Bar */}
      <div
        className={`bg-[#00548B] text-white text-[11px] font-medium transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0' : 'h-10'
          }`}
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center h-full px-6">
          <div className="flex gap-6 items-center text-[14px]">
            <a
              href={`tel:${siteSettings?.phone?.split('/')[0]?.trim() || '9851228383'}`}
              className="flex items-center text-[14px] gap-1.5 hover:text-blue-200 transition no-underline"
            >
              <FaPhone /> {siteSettings?.phone?.split('/')[0]?.trim() || '9851228383'}
            </a>

            <a
              href={`mailto:${siteSettings?.email || 'info@sangalotech.com'}`}
              className="hidden sm:flex items-center gap-1.5 text-[14px] hover:text-blue-200 transition no-underline"
            >
              <FaEnvelope />
              {siteSettings?.email || 'info@sangalotech.com'}
            </a>

          </div>

          <div className="flex items-center">
            <a href={siteSettings?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center hover:scale-110 transition rounded-lg" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href={siteSettings?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center hover:scale-110 transition rounded-lg" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href={siteSettings?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center hover:scale-110 transition rounded-lg" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav aria-label="Main navigation" className="max-w-[1400px] mx-auto px-6 flex items-center justify-between py-3">
        <Link href="/" className="no-underline">
          <Logo />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link href="/" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">
            Home
          </Link>
          <Link href="/courses" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">
            Courses
          </Link>
          <Link href="/services" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">
            Services
          </Link>
          <Link href="/products" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">
            Products
          </Link>
          <Link href="/portfolio" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">
            Portfolio
          </Link>
          <Link href="/about" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">
            Contact
          </Link>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Apply Now Button */}
          <Link
            href="/courses"
            className="hidden lg:flex items-center gap-2 bg-[#00548B] text-white px-6 py-2.5 rounded-full font-extrabold text-sm hover:bg-[#004381] hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-900/20 no-underline"
          >
            Apply Now
          </Link>
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2.5 bg-slate-100 hover:bg-[#00548B] text-slate-600 hover:text-white rounded-full transition-all group no-underline"
            aria-label="View Cart"
          >
            <FaCartShopping className="text-lg group-hover:scale-110 transition-transform" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-white animate-in zoom-in duration-300">
                {itemCount}
              </span>
            )}
          </Link>

          {session ? (
            <div className="flex items-center gap-4">
              <Link
                href={(session.user as any).role === 'admin' ? '/adminpanel' : '/student-dashboard'}
                className="hidden md:flex items-center gap-2 bg-[#00548B] text-white px-5 py-2 rounded-full font-bold text-sm hover:shadow-xl hover:-translate-y-0.5 transition shadow-lg shadow-blue-900/20 no-underline"
              >
                <FaUser /> {session.user?.name?.split(' ')[0]}
              </Link>
              <button
                onClick={() => signOut()}
                className="hidden md:flex text-slate-600 font-bold hover:text-red-500 transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/studentlogin"
              className="hidden md:flex items-center gap-2 bg-[#00548B] text-white px-6 py-2.5 rounded-full font-bold hover:shadow-xl hover:-translate-y-0.5 transition shadow-lg shadow-blue-900/20 no-underline"
            >
              <FaUser /> Login
            </Link>
          )}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center bg-[#00548B] text-white rounded-full shadow-lg shadow-blue-900/20 hover:shadow-xl hover:scale-105 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-6 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="space-y-4">
            <Link
              href="/about"
              onClick={() => handleLinkClick('/about')}
              className="block text-xl font-bold text-slate-800 no-underline"
            >
              About Us
            </Link>

            {/* Training collapsible */}
            <div className="border rounded-2xl">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left text-xl font-bold text-slate-800"
                onClick={() => setMobileOpen((s) => ({ ...s, training: !s.training }))}
                aria-expanded={!!mobileOpen.training}
              >
                <span className="flex items-center gap-3">
                  <FaLaptopCode className="text-[#00548B]" /> Training
                </span>
                <span className={`transition ${mobileOpen.training ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {mobileOpen.training && (
                <div className="px-2 pb-3 space-y-1.5">
                  {liveCourses.length > 0 ? (
                    liveCourses.map((course) => {
                      const Icon = getCourseIcon(course.category);
                      return (
                        <Link
                          key={course.id}
                          href={`/courses/${course.slug}`}
                          onClick={() => handleLinkClick(`/courses/${course.slug}`)}
                          className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                        >
                          <Icon className="text-[#00548B]" />
                          {course.title}
                        </Link>
                      );
                    })
                  ) : (
                    [...trainingDev, ...trainingDesign].map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => handleLinkClick(l.href)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                      >
                        <l.icon className="text-[#00548B]" />
                        {l.label}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Services collapsible */}
            <div className="border rounded-2xl">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left text-xl font-bold text-slate-800"
                onClick={() => setMobileOpen((s) => ({ ...s, services: !s.services }))}
                aria-expanded={!!mobileOpen.services}
              >
                <span className="flex items-center gap-3">
                  <FaScrewdriverWrench className="text-[#00548B]" /> Services
                </span>
                <span className={`transition ${mobileOpen.services ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {mobileOpen.services && (
                <div className="px-2 pb-3 space-y-1.5">
                  {services.map((l) => {
                    const Icon = getIcon(l.icon, FaScrewdriverWrench);
                    return (
                      <Link
                        key={l.id}
                        href={`/services/${l.slug}`}
                        onClick={() => handleLinkClick(`/services/${l.slug}`)}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                      >
                        <Icon className="text-[#00548B]" />
                        {l.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Products collapsible */}
            <div className="border rounded-2xl">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left text-xl font-bold text-slate-800"
                onClick={() => setMobileOpen((s) => ({ ...s, products: !s.products }))}
                aria-expanded={!!mobileOpen.products}
              >
                <span className="flex items-center gap-3">
                  <FaBoxOpen className="text-[#00548B]" /> Products
                </span>
                <span className={`transition ${mobileOpen.products ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {mobileOpen.products && (
                <div className="px-2 pb-3 space-y-1.5">
                  {products.map((l) => {
                    const Icon = l.image && l.image.startsWith('fa-') ? getIcon(l.image, FaBoxOpen) : FaBoxOpen;
                    return (
                      <Link
                        key={l.id || (l as any)._id}
                        href={l.link || '#'}
                        onClick={() => handleLinkClick(l.link || '#')}
                        className="flex items-center gap-3 px-4 py-2 text-slate-700 rounded-xl hover:bg-slate-50 no-underline"
                      >
                        <Icon className="text-[#00548B]" />
                        {l.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/upcoming"
              onClick={() => handleLinkClick('/upcoming')}
              className="flex items-center justify-between text-xl font-bold text-slate-800 no-underline"
            >
              <span className="flex items-center gap-3">
                Upcoming Batches
                <span className="bg-red-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-lg shadow-red-500/30 animate-pulse">
                  HOT
                </span>
              </span>
            </Link>
          </div>

          <div className="pt-6 border-t">
            <Link
              href="/student-dashboard"
              onClick={() => handleLinkClick('/student-dashboard')}
              className="flex items-center justify-center gap-2 bg-[#00548B] text-white py-4 rounded-2xl font-bold no-underline"
            >
              Student Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;