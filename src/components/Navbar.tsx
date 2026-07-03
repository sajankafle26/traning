'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

import {
  FaBars, FaXmark, FaPhone, FaUser, FaFacebookF, FaLinkedinIn, FaInstagram,
  FaChevronDown, FaLaptopCode, FaScrewdriverWrench, FaBoxOpen, FaReact, FaCubes,
  FaServer, FaWordpress, FaPenNib, FaObjectGroup, FaBullhorn, FaCode,
  FaMobileScreenButton, FaCartShopping, FaChartLine, FaCloud, FaUsersGear,
  FaGraduationCap, FaStore, FaEnvelope, FaCircle, FaC, FaDatabase, FaRobot,
  FaBrain, FaPaintbrush, FaMagnifyingGlass, FaMobile, FaPalette, FaBolt,
  FaRocket, FaGlobe, FaHandshake, FaChartBar, FaMicrochip, FaFileCode,
  FaShield, FaLinux,
} from 'react-icons/fa6';
import { apiService } from '@/services/apiService';
import { Course, UpcomingBatch, ServiceItem, Product } from '@/types';
import type { IconType } from 'react-icons';

type DropdownKey = 'training' | 'services' | 'products' | null;

type DropdownItem = {
  label: string;
  href: string;
  icon: any;
};

const Navbar = () => {
  const { data: session } = useSession();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [liveCourses, setLiveCourses] = useState<Course[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);

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

  const [siteSettings, setSiteSettings] = useState<any>(null);

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

  // Lock body scroll when mobile menu is open
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
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
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
      if (!navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

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

  const ICON_MAP: Record<string, IconType> = {
    'FaLaptopCode': FaLaptopCode, 'FaScrewdriverWrench': FaScrewdriverWrench, 'FaBoxOpen': FaBoxOpen,
    'FaReact': FaReact, 'FaCubes': FaCubes, 'FaServer': FaServer, 'FaWordpress': FaWordpress,
    'FaPenNib': FaPenNib, 'FaObjectGroup': FaObjectGroup, 'FaBullhorn': FaBullhorn, 'FaCode': FaCode,
    'FaMobileScreenButton': FaMobileScreenButton, 'FaMobileScreen': FaMobileScreenButton, 'FaCartShopping': FaCartShopping,
    'FaChartLine': FaChartLine, 'FaCloud': FaCloud, 'FaUsersGear': FaUsersGear, 'FaGraduationCap': FaGraduationCap,
    'FaStore': FaStore, 'FaEnvelope': FaEnvelope, 'FaCircle': FaCircle, 'FaC': FaC,
    'FaDatabase': FaDatabase, 'FaRobot': FaRobot, 'FaBrain': FaBrain, 'FaPaintbrush': FaPaintbrush,
    'FaSearch': FaMagnifyingGlass, 'FaMobile': FaMobile, 'FaPalette': FaPalette, 'FaBolt': FaBolt,
    'FaRocket': FaRocket, 'FaGlobe': FaGlobe, 'FaHandshake': FaHandshake, 'FaChartBar': FaChartBar,
    'FaMicrochip': FaMicrochip, 'FaFileCode': FaFileCode, 'FaShield': FaShield, 'FaLinux': FaLinux,
  };

  const getIcon = (iconName: string, fallback: IconType = FaCubes) => {
    if (!iconName) return fallback;
    if (iconName.startsWith('fa-')) {
      const parts = iconName.split(' ');
      const actualIcon = parts[parts.length - 1];
      const iconKey = actualIcon
        .replace('fa-', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      const Key = `Fa${iconKey}`;
      return ICON_MAP[Key] || fallback;
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

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

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

  const ParentBtn = ({
    label, icon: Icon, open, onClick,
  }: {
    label: string; icon: IconType; open: boolean; onClick: () => void;
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
      />
    </button>
  );

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white py-3'}`}
    >
      {/* Top Bar */}
      <div
        className={`bg-[#00548B] text-white text-[11px] font-medium transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0' : 'h-10'}`}
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
              <FaEnvelope /> {siteSettings?.email || 'info@sangalotech.com'}
            </a>
          </div>
          <div className="flex items-center">
            <a href={siteSettings?.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href={siteSettings?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href={siteSettings?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav aria-label="Main navigation" className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="no-underline shrink-0">
          <img src="/logo.png" alt="Sangalo Tech" width={56} height={56} loading="eager" className="h-11 md:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link href="/" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">Home</Link>
          <Link href="/courses" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">Courses</Link>
          <Link href="/services" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">Services</Link>
          <Link href="/products" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">Products</Link>
          <Link href="/portfolio" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">Portfolio</Link>
          <Link href="/about" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">About</Link>
          <Link href="/contact" className="hover:text-[#00548B] transition font-bold text-slate-600 no-underline text-base">Contact</Link>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="hidden lg:flex items-center gap-2 bg-[#00548B] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#004381] transition-all no-underline"
          >
            Apply Now
          </Link>
          <Link
            href="/cart"
            className="relative p-2.5 rounded-lg hover:bg-slate-100 transition no-underline"
            aria-label="View Cart"
          >
            <FaCartShopping className="text-lg text-slate-600" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white">
                {itemCount}
              </span>
            )}
          </Link>

          {session ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                href={(session.user as any).role === 'admin' ? '/adminpanel' : '/student-dashboard'}
                className="flex items-center gap-2 bg-[#00548B] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#004381] transition no-underline"
              >
                <FaUser className="text-sm" /> {session.user?.name?.split(' ')[0]}
              </Link>
              <button onClick={() => signOut()} className="text-slate-400 font-bold hover:text-red-500 transition text-sm">
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/studentlogin"
              className="hidden md:flex items-center gap-2 bg-[#00548B] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#004381] transition no-underline"
            >
              <FaUser className="text-sm" /> Login
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden w-11 h-11 flex items-center justify-center bg-[#00548B] text-white rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FaXmark className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-0 bg-black/30 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[85vw] max-w-[360px] bg-white z-50 shadow-2xl transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <img src="/logo.png" alt="Sangalo Tech" className="h-10 w-auto object-contain" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-slate-100 transition"
            aria-label="Close menu"
          >
            <FaXmark className="text-lg text-slate-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100%-72px)] pb-24 px-5 py-4 space-y-1">
          {/* Main Links */}
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={handleLinkClick}
            className="flex items-center gap-3 py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline"
          >
            About Us
          </Link>

          {/* Training collapsible */}
          <div>
            <button
              className="w-full flex items-center justify-between py-3.5 text-left text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition px-0"
              onClick={() => setMobileOpen((s) => ({ ...s, training: !s.training }))}
              aria-expanded={!!mobileOpen.training}
            >
              <span className="flex items-center gap-3">
                <FaGraduationCap className="text-[#00548B]" /> Training
              </span>
              <FaChevronDown className={`text-xs text-slate-400 transition-transform ${mobileOpen.training ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpen.training && (
              <div className="pl-4 pb-2 space-y-0.5">
                {liveCourses.length > 0 ? (
                  liveCourses.map((course) => {
                    const Icon = getCourseIcon(course.category);
                    return (
                      <Link
                        key={course.id}
                        href={`/courses/${course.slug}`}
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition no-underline"
                      >
                        <Icon className="text-[#00548B] text-sm" />
                        {course.title}
                      </Link>
                    );
                  })
                ) : (
                  [...trainingDev, ...trainingDesign].map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition no-underline"
                    >
                      <l.icon className="text-[#00548B] text-sm" />
                      {l.label}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Services collapsible */}
          <div>
            <button
              className="w-full flex items-center justify-between py-3.5 text-left text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition px-0"
              onClick={() => setMobileOpen((s) => ({ ...s, services: !s.services }))}
              aria-expanded={!!mobileOpen.services}
            >
              <span className="flex items-center gap-3">
                <FaScrewdriverWrench className="text-[#00548B]" /> Services
              </span>
              <FaChevronDown className={`text-xs text-slate-400 transition-transform ${mobileOpen.services ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpen.services && (
              <div className="pl-4 pb-2 space-y-0.5">
                {services.map((l) => {
                  const Icon = getIcon(l.icon, FaScrewdriverWrench);
                  return (
                    <Link
                      key={l.id}
                      href={`/services/${l.slug}`}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition no-underline"
                    >
                      <Icon className="text-[#00548B] text-sm" />
                      {l.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Products collapsible */}
          <div>
            <button
              className="w-full flex items-center justify-between py-3.5 text-left text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition px-0"
              onClick={() => setMobileOpen((s) => ({ ...s, products: !s.products }))}
              aria-expanded={!!mobileOpen.products}
            >
              <span className="flex items-center gap-3">
                <FaBoxOpen className="text-[#00548B]" /> Products
              </span>
              <FaChevronDown className={`text-xs text-slate-400 transition-transform ${mobileOpen.products ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpen.products && (
              <div className="pl-4 pb-2 space-y-0.5">
                {products.map((l) => {
                  const Icon = l.image && l.image.startsWith('fa-') ? getIcon(l.image, FaBoxOpen) : FaBoxOpen;
                  return (
                    <Link
                      key={l.id || (l as any)._id}
                      href={l.link || '#'}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition no-underline"
                    >
                      <Icon className="text-[#00548B] text-sm" />
                      {l.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/upcoming"
            onClick={handleLinkClick}
            className="flex items-center justify-between py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline"
          >
            <span className="flex items-center gap-3">
              Upcoming Batches
              <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">HOT</span>
            </span>
          </Link>

          <Link
            href="/portfolio"
            onClick={handleLinkClick}
            className="flex items-center gap-3 py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline"
          >
            Portfolio
          </Link>

          <Link
            href="/contact"
            onClick={handleLinkClick}
            className="flex items-center gap-3 py-3.5 text-base font-bold text-slate-800 rounded-lg hover:bg-slate-50 transition no-underline"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-5 py-4 space-y-3">
          {session ? (
            <div className="flex gap-3">
              <Link
                href={(session.user as any).role === 'admin' ? '/adminpanel' : '/student-dashboard'}
                onClick={handleLinkClick}
                className="flex-1 flex items-center justify-center gap-2 bg-[#00548B] text-white py-3.5 rounded-lg font-bold text-sm no-underline"
              >
                <FaUser className="text-sm" /> Dashboard
              </Link>
              <button
                onClick={() => { signOut(); handleLinkClick(); }}
                className="px-4 py-3.5 rounded-lg border border-slate-200 font-bold text-sm text-slate-600 hover:bg-slate-50 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/studentlogin"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 bg-[#00548B] text-white py-3.5 rounded-lg font-bold text-sm no-underline"
            >
              <FaUser className="text-sm" /> Student Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
