import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog - IT Training & Web Development Tips Nepal',
  description: 'Read the latest articles on MERN Stack training, WordPress development, web design, PHP Laravel, digital marketing, and IT career tips from Sangalo Tech Nepal.',
  keywords: [
    'IT training blog Nepal',
    'MERN Stack tutorial Nepal',
    'WordPress training tips',
    'web design tips Nepal',
    'digital marketing guide Nepal',
    'Laravel tutorial Nepal',
    'web development tips Nepal',
    'IT career Nepal',
  ],
  openGraph: {
    title: 'Blog - IT Training & Web Development Tips | Sangalo Tech',
    description: 'Latest articles on MERN Stack, WordPress, web design, Laravel, digital marketing, and IT careers.',
    url: 'https://sangalotech.com/blog',
    siteName: 'Sangalo Tech',
    type: 'website',
  },
  alternates: { canonical: 'https://sangalotech.com/blog' },
};

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
  published: boolean;
}

async function getBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/blogs`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.filter((b: BlogPost) => b.published !== false) : [];
  } catch {
    return [];
  }
}

const FALLBACK_POSTS = [
  {
    slug: 'mern-stack-training-nepal-complete-guide',
    title: 'MERN Stack Training in Nepal: Complete Guide for 2026',
    date: '2026-06-15',
    excerpt: 'Learn why MERN Stack is the most in-demand skill in Nepal and how Sangalo Tech training program helps you become job-ready in 3-6 months.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=600',
    tags: ['MERN Stack', 'Nepal', 'Training'],
    category: 'training',
  },
  {
    slug: 'wordpress-training-nepal-2026',
    title: 'WordPress Training in Nepal: Why It Still Matters in 2026',
    date: '2026-06-10',
    excerpt: 'WordPress powers 43% of the web. Find out why WordPress training in Nepal is a smart career move and what you will learn at Sangalo Tech.',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=600',
    tags: ['WordPress', 'Nepal', 'Training'],
    category: 'training',
  },
  {
    slug: 'web-design-training-nepal-ui-ux',
    title: 'Web Design Training in Nepal: Master UI/UX Design Skills',
    date: '2026-06-05',
    excerpt: 'Discover how web design training in Nepal can open doors to high-paying remote jobs. Learn Figma, Adobe XD, and design thinking.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
    tags: ['Web Design', 'UI/UX', 'Nepal'],
    category: 'design',
  },
  {
    slug: 'website-development-training-nepal',
    title: 'Website Development Training in Nepal: Full-Stack Skills',
    date: '2026-05-28',
    excerpt: 'From HTML/CSS to React and Node.js — learn everything about website development training in Nepal at Sangalo Tech.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    tags: ['Website Development', 'Full Stack', 'Nepal'],
    category: 'training',
  },
  {
    slug: 'php-laravel-training-nepal-2026',
    title: 'PHP with Laravel Training in Nepal: Build Powerful Web Apps',
    date: '2026-05-20',
    excerpt: 'Laravel is the #1 PHP framework. Learn PHP with Laravel training in Nepal and build REST APIs, e-commerce platforms, and more.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
    tags: ['PHP', 'Laravel', 'Nepal'],
    category: 'training',
  },
  {
    slug: 'digital-marketing-training-nepal',
    title: 'Digital Marketing Training in Nepal: Master SEO, Ads & Social',
    date: '2026-05-15',
    excerpt: 'Digital marketing is booming in Nepal. Learn SEO, Google Ads, social media marketing, and analytics at Sangalo Tech.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=600',
    tags: ['Digital Marketing', 'SEO', 'Nepal'],
    category: 'marketing',
  },
  {
    slug: 'best-training-institute-nepal-why-sangalo',
    title: 'Best Training Institute in Nepal: Why Students Choose Sangalo Tech',
    date: '2026-05-10',
    excerpt: 'What makes a training institute the best? Learn why 1500+ students chose Sangalo Tech for their IT career in Nepal.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
    tags: ['Best Institute', 'Nepal', 'Career'],
    category: 'general',
  },
  {
    slug: 'web-design-nepal-modern-trends',
    title: 'Web Design in Nepal: Modern Trends Every Developer Should Know',
    date: '2026-05-05',
    excerpt: 'From glassmorphism to AI-powered design — explore the latest web design trends shaping the Nepali digital landscape.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600',
    tags: ['Web Design', 'Trends', 'Nepal'],
    category: 'design',
  },
  {
    slug: 'website-development-nepal-business',
    title: 'Website Development in Nepal: Why Every Business Needs a Website',
    date: '2026-04-28',
    excerpt: 'Is your business visible online? Learn why website development in Nepal is essential for growth and how to get started.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600',
    tags: ['Website Development', 'Business', 'Nepal'],
    category: 'business',
  },
  {
    slug: 'react-nextjs-training-nepal',
    title: 'React & Next.js Training in Nepal: Build Modern Web Apps',
    date: '2026-04-20',
    excerpt: 'React and Next.js are the future of web development. Learn how our React & Next.js training in Nepal prepares you for top jobs.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600',
    tags: ['React', 'Next.js', 'Nepal'],
    category: 'training',
  },
];

export default async function BlogPage() {
  let blogs = await getBlogs();
  if (blogs.length === 0) blogs = FALLBACK_POSTS as any;

  return (
    <div className="py-16 px-6 bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00548B]">Our Blog</span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            IT Training & Web Development <span className="text-[#00548B]">Insights</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Expert articles on MERN Stack, WordPress, web design, PHP Laravel, digital marketing, and IT careers in Nepal.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <Link
              key={blog._id || blog.slug}
              href={`/blog/${blog.slug}`}
              className="group block"
            >
              <article className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-[#00548B]/20 transition-all">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=600'}
                    alt={blog.title}
                    width={600}
                    height={375}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {blog.category && (
                    <span className="absolute top-3 left-3 bg-[#00548B] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {blog.category}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <time className="text-xs text-slate-400 font-medium">
                    {blog.date ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  </time>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#00548B] transition-colors mt-1 mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-slate-400 line-clamp-2">{blog.excerpt}</p>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {blog.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold text-[#00548B] bg-[#00548B]/5 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
