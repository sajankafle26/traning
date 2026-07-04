import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import dbConnect from '@/lib/dbConnect';
import { Blog } from '@/models/BlogProduct';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  category: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
}

const FALLBACK_POSTS: Record<string, any> = {
  'mern-stack-training-nepal-complete-guide': {
    title: 'MERN Stack Training in Nepal: Complete Guide for 2026',
    date: '2026-06-15',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1200',
    tags: ['MERN Stack', 'Nepal', 'Training'],
    category: 'training',
    metaTitle: 'MERN Stack Training in Nepal: Complete Guide for 2026 | Sangalo Tech',
    metaDescription: 'Learn why MERN Stack is the most in-demand skill in Nepal and how Sangalo Tech training helps you become job-ready in 3-6 months.',
    content: `
      <h2>Why MERN Stack is the Most In-Demand Skill in Nepal</h2>
      <p>The MERN Stack (MongoDB, Express.js, React, Node.js) has become the go-to technology stack for web development worldwide, and Nepal is no exception. With companies like Leapfrog Technology, Yomari, and hundreds of startups in Kathmandu and Bhaktapur actively hiring MERN Stack developers, the demand has never been higher.</p>
      <p>At Sangalo Tech Pvt. Ltd., we have trained over 500 MERN Stack developers since 2022, with a 95% placement rate. Our students work at top companies across Nepal and remotely for international clients.</p>

      <h2>What You Will Learn in Our MERN Stack Course</h2>
      <p>Our MERN Stack training in Nepal covers everything from fundamentals to advanced concepts:</p>
      <ul>
        <li><strong>MongoDB:</strong> Database design, CRUD operations, aggregation, indexing, and Mongoose ODM</li>
        <li><strong>Express.js:</strong> RESTful API development, middleware, authentication, and error handling</li>
        <li><strong>React:</strong> Components, hooks, state management, React Router, and Next.js SSR/SSG</li>
        <li><strong>Node.js:</strong> Server-side JavaScript, file system, streams, child processes, and deployment</li>
      </ul>

      <h2>Course Structure and Duration</h2>
      <p>The complete MERN Stack course runs for 3-6 months, depending on the batch. The curriculum includes:</p>
      <ul>
        <li>40+ hours of instructor-led training</li>
        <li>5+ hands-on projects</li>
        <li>1-month internship at our software company</li>
        <li>100% placement assistance</li>
        <li>Certificate of completion</li>
      </ul>

      <h2>Prerequisites</h2>
      <p>Our MERN Stack training is designed for beginners. You only need:</p>
      <ul>
        <li>Basic knowledge of HTML, CSS, and JavaScript</li>
        <li>A laptop or computer</li>
        <li>Willingness to learn and practice</li>
      </ul>
      <p>No prior programming experience is required. We start from the basics and build up to advanced concepts.</p>

      <h2>Career Opportunities After MERN Stack Training</h2>
      <p>After completing our MERN Stack training in Nepal, you can pursue roles such as:</p>
      <ul>
        <li>Frontend Developer (React/Next.js)</li>
        <li>Backend Developer (Node.js/Express)</li>
        <li>Full-Stack Developer</li>
        <li>Freelance Web Developer</li>
        <li>MERN Stack Engineer</li>
      </ul>
      <p>Average starting salary for MERN Stack developers in Nepal ranges from NPR 30,000 to NPR 60,000 per month, with experienced developers earning significantly more.</p>

      <h2>Why Choose Sangalo Tech for MERN Stack Training?</h2>
      <ul>
        <li><strong>Real Projects:</strong> Work on live client projects during your training</li>
        <li><strong>Internship:</strong> 1-month internship at our software company</li>
        <li><strong>Small Batches:</strong> Maximum 15 students per batch for personalized attention</li>
        <li><strong>Placement Support:</strong> Resume preparation, mock interviews, and job placement assistance</li>
        <li><strong>Flexible Schedule:</strong> Morning, evening, and weekend batches available</li>
      </ul>

      <h2>Enroll Now</h2>
      <p>Ready to start your MERN Stack journey? Contact us at +977-9851228383 or visit our office at Lokenthali, Bhaktapur. Limited seats available for the next batch.</p>
    `,
  },
  'wordpress-training-nepal-2026': {
    title: 'WordPress Training in Nepal: Why It Still Matters in 2026',
    date: '2026-06-10',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1200',
    tags: ['WordPress', 'Nepal', 'Training'],
    category: 'training',
    metaTitle: 'WordPress Training in Nepal: Complete Course 2026 | Sangalo Tech',
    metaDescription: 'WordPress powers 43% of the web. Learn WordPress development in Nepal at Sangalo Tech — theme customization, plugin development, WooCommerce.',
    content: `
      <h2>WordPress Powers 43% of the Web</h2>
      <p>WordPress is not just a blogging platform — it powers 43% of all websites on the internet. From small business blogs to major news outlets like BBC America and TechCrunch, WordPress is the backbone of the web.</p>
      <p>In Nepal, WordPress is especially popular for business websites, e-commerce stores, and portfolio sites. Learning WordPress development opens doors to thousands of freelance and full-time opportunities.</p>

      <h2>What You Will Learn in Our WordPress Course</h2>
      <ul>
        <li><strong>WordPress Fundamentals:</strong> Installation, configuration, dashboard navigation</li>
        <li><strong>Theme Development:</strong> Custom themes, child themes, theme hooks and filters</li>
        <li><strong>Plugin Development:</strong> Building custom plugins, shortcodes, widgets</li>
        <li><strong>WooCommerce:</strong> E-commerce setup, product management, payment gateways</li>
        <li><strong>SEO for WordPress:</strong> Yoast SEO, site speed optimization, schema markup</li>
        <li><strong>Security:</strong> Best practices for WordPress security</li>
      </ul>

      <h2>WordPress Developers Are in High Demand</h2>
      <p>Nepali businesses are increasingly moving online. A WordPress developer can charge NPR 30,000-100,000 for a business website and NPR 50,000-200,000 for an e-commerce store. Freelance WordPress developers on platforms like Upwork and Fiverr earn $15-50/hour.</p>

      <h2>Why Choose Sangalo Tech for WordPress Training?</h2>
      <p>Our WordPress training in Nepal goes beyond just using the WordPress dashboard. You will learn to build custom themes and plugins from scratch, giving you a competitive edge in the job market.</p>
      <ul>
        <li>Hands-on project: Build a complete business website</li>
        <li>E-commerce project: Set up a WooCommerce store with payment integration</li>
        <li>Freelancing tips: How to find WordPress clients online</li>
        <li>Certificate of completion</li>
      </ul>
    `,
  },
  'web-design-training-nepal-ui-ux': {
    title: 'Web Design Training in Nepal: Master UI/UX Design Skills',
    date: '2026-06-05',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
    tags: ['Web Design', 'UI/UX', 'Nepal'],
    category: 'design',
    metaTitle: 'Web Design Training in Nepal: UI/UX Course | Sangalo Tech',
    metaDescription: 'Learn web design and UI/UX in Nepal at Sangalo Tech. Master Figma, Adobe XD, prototyping, wireframing, and design systems.',
    content: `
      <h2>Why Web Design Skills Matter</h2>
      <p>Great design is not just about aesthetics — it is about creating experiences that users love. Companies that invest in UI/UX design see 400% higher conversion rates. This is why web designers are among the most sought-after professionals in Nepal and globally.</p>

      <h2>What You Will Learn</h2>
      <ul>
        <li><strong>Figma:</strong> Industry-standard design tool for UI/UX professionals</li>
        <li><strong>Adobe XD:</strong> Prototyping and design collaboration</li>
        <li><strong>Wireframing:</strong> Low-fidelity and high-fidelity wireframes</li>
        <li><strong>Prototyping:</strong> Interactive prototypes for user testing</li>
        <li><strong>Design Systems:</strong> Creating consistent, scalable design systems</li>
        <li><strong>Responsive Design:</strong> Mobile-first design principles</li>
        <li><strong>User Research:</strong> Understanding user needs through research</li>
      </ul>

      <h2>Career Opportunities</h2>
      <p>UI/UX designers in Nepal earn NPR 40,000-80,000 per month. Remote UI/UX designers working for international companies can earn $3,000-8,000/month. Freelance rates range from $25-100/hour.</p>

      <h2>Why Sangalo Tech?</h2>
      <p>Our web design training in Nepal is project-based. You will build a complete design portfolio with 5+ projects by the end of the course, ready to impress employers and clients.</p>
    `,
  },
  'website-development-training-nepal': {
    title: 'Website Development Training in Nepal: Full-Stack Skills',
    date: '2026-05-28',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    tags: ['Website Development', 'Full Stack', 'Nepal'],
    category: 'training',
    metaTitle: 'Website Development Training in Nepal: Full-Stack Course | Sangalo Tech',
    metaDescription: 'Learn website development from HTML/CSS to React and Node.js at Sangalo Tech Nepal. Full-stack training with placement support.',
    content: `
      <h2>Learn Website Development from Scratch</h2>
      <p>Website development is one of the most valuable skills in 2026. Whether you want to work at a tech company, start a freelance career, or build your own business, learning website development gives you the foundation.</p>

      <h2>Our Website Development Curriculum</h2>
      <ul>
        <li><strong>HTML5 & CSS3:</strong> Semantic HTML, Flexbox, Grid, responsive design</li>
        <li><strong>JavaScript:</strong> ES6+, DOM manipulation, async/await, fetch API</li>
        <li><strong>React:</strong> Components, hooks, state management, routing</li>
        <li><strong>Node.js & Express:</strong> Backend APIs, databases, authentication</li>
        <li><strong>MongoDB:</strong> NoSQL database design and operations</li>
        <li><strong>Deployment:</strong> Vercel, Netlify, AWS basics</li>
      </ul>

      <h2>Why Website Development Training in Nepal?</h2>
      <p>Nepal IT industry is growing rapidly. Companies need website developers who can build modern, responsive, and fast websites. Our training prepares you for exactly that — real-world skills that employers want.</p>

      <h2>Start Your Career Today</h2>
      <p>No prior experience required. We start from the very basics and take you to building full-stack web applications in 3-6 months.</p>
    `,
  },
  'php-laravel-training-nepal-2026': {
    title: 'PHP with Laravel Training in Nepal: Build Powerful Web Apps',
    date: '2026-05-20',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    tags: ['PHP', 'Laravel', 'Nepal'],
    category: 'training',
    metaTitle: 'PHP with Laravel Training in Nepal 2026 | Sangalo Tech',
    metaDescription: 'Learn PHP with Laravel framework in Nepal at Sangalo Tech. Build REST APIs, MVC apps, e-commerce platforms with Laravel.',
    content: `
      <h2>Why Laravel is the Best PHP Framework</h2>
      <p>Laravel is the most popular PHP framework in the world. It is used by companies like Netflix, Toyota, and Apple. In Nepal, Laravel is widely used for enterprise applications, e-commerce platforms, and government projects.</p>

      <h2>What You Will Learn</h2>
      <ul>
        <li><strong>PHP Fundamentals:</strong> Variables, loops, functions, OOP concepts</li>
        <li><strong>Laravel MVC:</strong> Routes, controllers, views, Blade templating</li>
        <li><strong>Eloquent ORM:</strong> Database relationships, queries, migrations</li>
        <li><strong>RESTful APIs:</strong> Building and consuming APIs</li>
        <li><strong>Authentication:</strong> Login, registration, JWT tokens, social login</li>
        <li><strong>Laravel Livewire:</strong> Dynamic interfaces without JavaScript</li>
        <li><strong>Testing:</strong> Unit tests and feature tests</li>
      </ul>

      <h2>PHP Laravel Developer Salary in Nepal</h2>
      <p>PHP Laravel developers in Nepal earn NPR 35,000-70,000 per month. Senior Laravel developers can earn NPR 80,000-150,000. Freelance Laravel projects typically pay $500-5,000 per project.</p>

      <h2>Why Choose Sangalo Tech?</h2>
      <p>Our PHP with Laravel training in Nepal includes real project work, code reviews from experienced developers, and placement assistance. You will build 3+ Laravel projects during the course.</p>
    `,
  },
  'digital-marketing-training-nepal': {
    title: 'Digital Marketing Training in Nepal: Master SEO, Ads & Social',
    date: '2026-05-15',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1200',
    tags: ['Digital Marketing', 'SEO', 'Nepal'],
    category: 'marketing',
    metaTitle: 'Digital Marketing Training in Nepal: SEO, Ads & Social Media | Sangalo Tech',
    metaDescription: 'Learn digital marketing in Nepal at Sangalo Tech. Master SEO, Google Ads, social media marketing, content marketing, and analytics.',
    content: `
      <h2>Why Digital Marketing Skills Matter in Nepal</h2>
      <p>Every business in Nepal needs a digital presence. From restaurants in Kathmandu to tour operators in Pokhara, businesses are looking for digital marketing professionals who can help them grow online.</p>

      <h2>What You Will Learn</h2>
      <ul>
        <li><strong>SEO:</strong> On-page, off-page, technical SEO, keyword research</li>
        <li><strong>Google Ads:</strong> Search, display, shopping, and video campaigns</li>
        <li><strong>Social Media Marketing:</strong> Facebook, Instagram, LinkedIn, TikTok</li>
        <li><strong>Content Marketing:</strong> Blog writing, content strategy, video marketing</li>
        <li><strong>Email Marketing:</strong> Automation, newsletters, drip campaigns</li>
        <li><strong>Analytics:</strong> Google Analytics, conversion tracking, data-driven decisions</li>
      </ul>

      <h2>Career Opportunities</h2>
      <p>Digital marketing professionals in Nepal earn NPR 30,000-80,000 per month. Freelance digital marketers earn $500-3,000/month from international clients. Many start their own agencies.</p>

      <h2>Why Sangalo Tech?</h2>
      <p>Our digital marketing training in Nepal is hands-on. You will run real Google Ads campaigns, manage social media accounts, and optimize actual websites for SEO during the course.</p>
    `,
  },
  'best-training-institute-nepal-why-sangalo': {
    title: 'Best Training Institute in Nepal: Why Students Choose Sangalo Tech',
    date: '2026-05-10',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    tags: ['Best Institute', 'Nepal', 'Career'],
    category: 'general',
    metaTitle: 'Best Training Institute in Nepal | Sangalo Tech Pvt. Ltd.',
    metaDescription: 'Why 1500+ students chose Sangalo Tech as the best training institute in Nepal. 95% placement rate, real projects, internship guaranteed.',
    content: `
      <h2>What Makes a Training Institute the Best?</h2>
      <p>Choosing the right IT training institute in Nepal can make or break your career. The best institute is not just about fancy classrooms — it is about real skills, real projects, and real job placement.</p>

      <h2>Why 1500+ Students Chose Sangalo Tech</h2>
      <ul>
        <li><strong>95% Placement Rate:</strong> Our students get hired within 3 months of completing their training</li>
        <li><strong>Real Projects:</strong> Work on live client projects, not just exercises</li>
        <li><strong>Internship:</strong> 1-month internship at our software company</li>
        <li><strong>Industry Mentors:</strong> Learn from developers who build real products</li>
        <li><strong>Small Batches:</strong> Maximum 15 students per batch</li>
        <li><strong>Flexible Schedule:</strong> Morning, evening, and weekend batches</li>
      </ul>

      <h2>Our Track Record</h2>
      <p>Since 2022, we have trained 1500+ students, delivered 100+ software projects, and partnered with 50+ hiring companies. Our graduates work at top IT companies in Nepal and remotely for international clients.</p>

      <h2>Visit Us</h2>
      <p>Our office is located at Lokenthali, Bhaktapur, Nepal. Visit us for a free career counseling session. Call +977-9851228383 to schedule your visit.</p>
    `,
  },
  'web-design-nepal-modern-trends': {
    title: 'Web Design in Nepal: Modern Trends Every Developer Should Know',
    date: '2026-05-05',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200',
    tags: ['Web Design', 'Trends', 'Nepal'],
    category: 'design',
    metaTitle: 'Web Design in Nepal: Modern Trends 2026 | Sangalo Tech',
    metaDescription: 'Explore the latest web design trends in Nepal — glassmorphism, AI-powered design, micro-interactions, and more. Learn at Sangalo Tech.',
    content: `
      <h2>Web Design Trends Shaping Nepal in 2026</h2>
      <p>The web design landscape in Nepal is evolving rapidly. From glassmorphism to AI-powered design tools, staying updated with trends is essential for any web designer.</p>

      <h2>Top Web Design Trends in Nepal</h2>
      <ul>
        <li><strong>Glassmorphism:</strong> Frosted glass effects with transparency and blur</li>
        <li><strong>AI-Powered Design:</strong> Using AI tools for rapid prototyping</li>
        <li><strong>Micro-Interactions:</strong> Subtle animations that enhance user experience</li>
        <li><strong>Dark Mode:</strong>越来越 popular for reduced eye strain</li>
        <li><strong>3D Elements:</strong> WebGL and Three.js for immersive experiences</li>
        <li><strong>Voice User Interface:</strong> Designing for voice interactions</li>
      </ul>

      <h2>Learn Web Design at Sangalo Tech</h2>
      <p>Our web design training in Nepal covers all modern trends and tools. You will learn Figma, Adobe XD, and how to implement designs using HTML, CSS, and JavaScript.</p>
    `,
  },
  'website-development-nepal-business': {
    title: 'Website Development in Nepal: Why Every Business Needs a Website',
    date: '2026-04-28',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200',
    tags: ['Website Development', 'Business', 'Nepal'],
    category: 'business',
    metaTitle: 'Website Development in Nepal: Why Your Business Needs a Website | Sangalo Tech',
    metaDescription: 'Is your business visible online? Learn why website development in Nepal is essential and how to get started with Sangalo Tech.',
    content: `
      <h2>Nepal Digital Economy is Growing</h2>
      <p>Nepal has over 15 million internet users. If your business does not have a website, you are invisible to a huge portion of your potential customers. Website development in Nepal has become essential for business growth.</p>

      <h2>Benefits of Having a Website</h2>
      <ul>
        <li><strong>24/7 Online Presence:</strong> Your business is accessible anytime, anywhere</li>
        <li><strong>Credibility:</strong> A professional website builds trust with customers</li>
        <li><strong>Marketing:</strong> Digital marketing drives traffic and sales</li>
        <li><strong>Competitive Edge:</strong> Stay ahead of competitors without websites</li>
        <li><strong>Cost-Effective:</strong> Cheaper than traditional advertising</li>
      </ul>

      <h2>How Sangalo Tech Can Help</h2>
      <p>As a leading website development company in Nepal, we build custom websites for businesses of all sizes. From simple business websites to complex e-commerce platforms, we deliver solutions that drive results.</p>
      <p>Contact us for a free consultation: +977-9851228383</p>
    `,
  },
  'react-nextjs-training-nepal': {
    title: 'React & Next.js Training in Nepal: Build Modern Web Apps',
    date: '2026-04-20',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
    tags: ['React', 'Next.js', 'Nepal'],
    category: 'training',
    metaTitle: 'React & Next.js Training in Nepal | Sangalo Tech',
    metaDescription: 'Learn React and Next.js in Nepal at Sangalo Tech. Build modern, SEO-friendly web apps with server-side rendering and deployment.',
    content: `
      <h2>Why React and Next.js?</h2>
      <p>React is the most popular frontend library in the world, and Next.js is the most popular React framework. Together, they power millions of websites including Netflix, TikTok, and Nike.</p>

      <h2>What You Will Learn</h2>
      <ul>
        <li><strong>React Fundamentals:</strong> JSX, components, props, state, hooks</li>
        <li><strong>React Router:</strong> Client-side routing and navigation</li>
        <li><strong>Next.js Pages Router:</strong> File-based routing, SSR, SSG, ISR</li>
        <li><strong>Next.js App Router:</strong> Server components, layouts, loading states</li>
        <li><strong>API Routes:</strong> Building backend APIs with Next.js</li>
        <li><strong>Deployment:</strong> Deploy to Vercel, Netlify, or AWS</li>
      </ul>

      <h2>Career Opportunities</h2>
      <p>React and Next.js developers are in high demand in Nepal and globally. Average salary: NPR 40,000-80,000/month in Nepal, $3,000-10,000/month for remote positions.</p>

      <h2>Start Learning Today</h2>
      <p>Enroll in our React & Next.js training in Nepal and start building modern web applications. Call +977-9851228383 for details.</p>
    `,
  },
};

async function getBlog(slug: string): Promise<BlogPost | null> {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug, published: { $ne: false } }).lean();
    if (!blog) return null;
    return {
      _id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      date: blog.date || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      image: blog.image || '',
      tags: blog.tags || [],
      category: blog.category || 'general',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      published: blog.published !== false,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let blog = await getBlog(slug);
  if (!blog) blog = FALLBACK_POSTS[slug] || null;
  if (!blog) return { title: 'Blog Post Not Found' };

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.tags || [],
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      url: `https://sangalotech.com/blog/${slug}`,
      siteName: 'Sangalo Tech',
      type: 'article',
      publishedTime: blog.date,
      images: blog.image ? [{ url: blog.image, width: 1200, height: 630, alt: blog.title }] : [],
    },
    alternates: { canonical: `https://sangalotech.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let blog = await getBlog(slug);
  if (!blog) blog = FALLBACK_POSTS[slug] || null;
  if (!blog) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.metaDescription || blog.excerpt,
    image: blog.image,
    datePublished: blog.date,
    author: {
      "@type": "Organization",
      name: "Sangalo Tech Pvt. Ltd.",
      url: "https://sangalotech.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Sangalo Tech Pvt. Ltd.",
      logo: {
        "@type": "ImageObject",
        url: "https://sangalotech.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sangalotech.com/blog/${slug}`,
    },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <article className="py-16 px-6 bg-white min-h-screen">
        <div className="max-w-[800px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-[#00548B] transition no-underline">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#00548B] transition no-underline">Blog</Link>
            <span>/</span>
            <span className="text-slate-600">{blog.category || 'Article'}</span>
          </nav>

          {/* Header */}
          <header className="mb-10 space-y-4">
            {blog.category && (
              <span className="inline-block bg-[#00548B]/10 text-[#00548B] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {blog.category}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <time>{blog.date ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</time>
              <span>|</span>
              <span>Sangalo Tech</span>
            </div>
          </header>

          {/* Featured Image */}
          {blog.image && (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
              <Image
                src={blog.image}
                alt={blog.title}
                width={1200}
                height={675}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          {blog.content ? (
            <div
              className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900 prose-a:text-[#00548B]"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <p className="text-slate-500 text-lg">{blog.excerpt}</p>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100">
              {blog.tags.map((tag: string) => (
                <span key={tag} className="bg-slate-50 border border-slate-100 text-slate-500 px-3 py-1.5 rounded-full text-xs font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 bg-[#00548B]/5 rounded-xl border border-[#00548B]/10 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Start Your IT Career?</h3>
            <p className="text-slate-500 mb-4">Join our training programs and become job-ready in 3-6 months.</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-[#00548B] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#004381] transition no-underline"
            >
              Explore Courses
            </Link>
          </div>

          {/* Related */}
          <div className="mt-12 text-center">
            <Link href="/blog" className="text-sm font-bold text-[#00548B] hover:underline no-underline">
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
