"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/constants';
import { apiService } from '@/services/apiService';
import { ServiceItem } from '@/types';
import FAQSection from '@/components/FAQSection';
import {
  FaArrowRight, FaRocket, FaLaptopCode, FaMobileAlt, FaChartLine, FaPenNib,
  FaShoppingCart, FaCloud, FaCode, FaSearch, FaCog, FaCheckCircle, FaHandshake, FaCogs
} from 'react-icons/fa';

const iconComponents: Record<string, any> = {
  'fa-solid fa-laptop-code': FaLaptopCode,
  'fa-solid fa-mobile-screen-button': FaMobileAlt,
  'fa-solid fa-chart-line': FaChartLine,
  'fa-solid fa-pen-nib': FaPenNib,
  'fa-solid fa-shopping-cart': FaShoppingCart,
  'fa-solid fa-cloud': FaCloud,
};

const SERVICE_IMAGES: Record<string, string> = {
  'web-app-development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  'mobile-app-development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
  'seo-and-performance-optimization': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800',
  'ui-ux-design-and-prototyping': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800',
  'e-commerce-development': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
  'cloud-and-devops-services': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
};

const PROCESS_STEPS = [
  { icon: FaSearch, number: '01', title: 'Discovery', description: 'We analyze your requirements, target audience, and business goals to create a strategic roadmap.' },
  { icon: FaCode, number: '02', title: 'Design & Develop', description: 'Our team builds your solution with clean code, modern frameworks, and rigorous testing.' },
  { icon: FaCog, number: '03', title: 'Deploy & Support', description: 'Seamless deployment with ongoing maintenance, updates, and 24/7 technical support.' },
];

const SERVICE_FAQS = [
  {
    question: "What web development services does Sangalo Tech offer?",
    answer: "Sangalo Tech offers comprehensive web development services including custom web application development (React, Next.js, Node.js), mobile app development (React Native, Flutter), e-commerce solutions, UI/UX design, SEO & digital marketing, and cloud & DevOps services. We serve businesses across Nepal and internationally.",
  },
  {
    question: "How much does web development cost in Nepal?",
    answer: "Web development costs in Nepal vary based on project complexity. At Sangalo Tech, basic websites start from Rs. 25,000, while custom web applications range from Rs. 100,000 to Rs. 500,000+. E-commerce platforms and enterprise solutions are quoted based on specific requirements. Contact us for a free consultation and custom quote.",
  },
  {
    question: "Does Sangalo Tech provide ongoing support after project delivery?",
    answer: "Yes, we provide 24/7 technical support and maintenance after project delivery. Our support packages include bug fixes, security updates, performance optimization, feature enhancements, and server monitoring. We offer flexible monthly and annual support plans.",
  },
  {
    question: "What technologies does Sangalo Tech use for web development?",
    answer: "We use modern, industry-standard technologies including React, Next.js, Node.js, TypeScript, MongoDB, Python, Django, Laravel, WordPress, React Native, Flutter, AWS, Docker, and Tailwind CSS. We choose the best technology stack based on your project requirements.",
  },
  {
    question: "How long does it take to develop a website?",
    answer: "Project timelines depend on complexity. A basic business website takes 2-4 weeks, a custom web application takes 2-4 months, and an enterprise solution takes 4-8 months. We follow agile methodology with regular milestone updates so you always know the progress.",
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiService.getServices();
        setServices(data.length > 0 ? data : SERVICES);
      } catch (err) {
        setServices(SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const serviceListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web Development & IT Solutions by Sangalo Tech Nepal",
    description: "Professional web development, mobile app, UI/UX, SEO, e-commerce, and cloud DevOps services by Sangalo Tech Pvt. Ltd. in Nepal.",
    numberOfItems: services.length,
    itemListElement: services.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://sangalotech.com/services/${service.slug}`,
      name: service.title,
    })),
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ backgroundColor: '#00548B' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="max-w-[1400px] px-4 mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-white/15 mb-8">
            <FaRocket className="text-xs" />
            Software & IT Solutions
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] max-w-5xl mx-auto">
            Professional
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-200">
              Software & Development Services
            </span>
          </h1>
          <p className="mt-8 text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From concept to deployment, we provide end-to-end digital solutions
            tailored to your business needs in Nepal and beyond.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: FaCheckCircle, text: "100+ Projects Delivered" },
              { icon: FaHandshake, text: "50+ Happy Clients" },
              { icon: FaCogs, text: "6+ Core Services" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <item.icon className="text-white/60" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#00548B] transition-colors no-underline text-slate-500">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Services</span>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
              What We Offer
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Our <span className="text-[#00548B]">Services</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We blend cutting-edge technology with visionary design to build digital products that inspire and deliver results for businesses in Nepal.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-slate-50 rounded-3xl border border-slate-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComp = iconComponents[service.icon || ''] || FaLaptopCode;
                const image = service.image || SERVICE_IMAGES[service.slug] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group block"
                  >
                    <article className="relative h-full rounded-3xl bg-white border border-slate-100 overflow-hidden hover:shadow-2xl hover:border-[#00548B]/20 transition-all duration-500">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={image}
                          alt={`${service.title} by Sangalo Tech Nepal`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                        {/* Icon overlay */}
                        <div className="absolute bottom-4 left-4">
                          <div className="w-14 h-14 rounded-2xl bg-[#00548B] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                            {service.icon?.startsWith('fa') ? (
                              <i className={`${service.icon} text-xl text-white`} />
                            ) : (
                              <IconComp className="text-xl text-white" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#00548B] transition-colors">
                          {service.title}
                        </h3>

                        <div
                          className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2 [&_p]:mb-2 [&_p:last-child]:mb-0"
                          dangerouslySetInnerHTML={{ __html: service.description }}
                        />

                        <div className="flex items-center gap-2 text-[#00548B] font-bold text-sm group-hover:gap-3 transition-all duration-300">
                          <span>Learn More</span>
                          <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#f8fbff] via-white to-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-500 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100">
              How We Work
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Our <span className="text-[#00548B]">Process</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A streamlined approach to deliver exceptional results, every time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="relative text-center group">
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-slate-100" />
                )}
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-[#00548B]/20 flex items-center justify-center mx-auto mb-6 group-hover:border-[#00548B] group-hover:shadow-xl group-hover:shadow-[#00548B]/10 transition-all duration-300">
                    <div className="text-center">
                      <step.icon className="text-2xl text-[#00548B] mx-auto mb-1" />
                      <span className="text-[10px] font-bold text-slate-400">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#00548B]/10 text-[#00548B] px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#00548B]/20">
              Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Technologies We <span className="text-[#00548B]">Use</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'React Native', 'Flutter', 'Python', 'WordPress', 'AWS', 'Docker', 'Tailwind CSS'].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-700 hover:border-[#00548B]/30 hover:text-[#00548B] transition-all cursor-default">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our web development services"
        faqs={SERVICE_FAQS}
      />

      {/* CTA Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#00548B' }}>
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[0.9] mb-6">
            Ready to Build<br />Something Great?
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Let&apos;s turn your ambitious ideas into reality with our premium digital solutions.
            Get a free consultation today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-[#00548B] px-10 py-5 rounded-2xl font-bold text-sm hover:shadow-2xl hover:-translate-y-1 transition-all no-underline">
              Start Your Project <FaArrowRight />
            </Link>
            <Link href="/courses" className="inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all no-underline">
              View Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
