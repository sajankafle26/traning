import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/dbConnect';
import { Blog } from '@/models/BlogProduct';

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
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'Sangalo Tech Blog - IT Training & Web Development' }],
  },
  twitter: { card: 'summary_large_image', title: 'Blog | Sangalo Tech', description: 'Latest articles on IT training and web development.', images: ['https://sangalotech.com/og-image.png'] },
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
    await dbConnect();
    const blogs = await Blog.find({ published: { $ne: false } }).sort({ createdAt: -1 }).lean();
    return blogs.map((b: any) => ({
      _id: b._id.toString(),
      title: b.title,
      slug: b.slug,
      date: b.date || '',
      excerpt: b.excerpt || '',
      content: b.content || '',
      image: b.image || '',
      tags: b.tags || [],
      category: b.category || 'general',
      published: b.published !== false,
    }));
  } catch {
    return [];
  }
}

const FALLBACK_POSTS = [
  {
    _id: 'f1',
    slug: 'mern-stack-training-nepal-complete-guide',
    title: 'MERN Stack Training in Nepal: A Practical Roadmap for 2026',
    date: '2026-06-15',
    excerpt: 'The MERN stack is reshaping how Nepali startups build products. Here is an honest look at what the training actually covers and what employers expect.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=600',
    tags: ['MERN Stack', 'Nepal', 'Career'],
    category: 'training',
  },
  {
    _id: 'f2',
    slug: 'wordpress-training-nepal-2026',
    title: 'WordPress Training in Nepal: Why the Platform Still Dominates',
    date: '2026-06-10',
    excerpt: 'WordPress runs 43 percent of the internet. Here is why learning WordPress in 2026 is still a smart career move.',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=600',
    tags: ['WordPress', 'Nepal', 'CMS'],
    category: 'training',
  },
  {
    _id: 'f3',
    slug: 'web-design-training-nepal-ui-ux',
    title: 'Web Design Training in Nepal: Building Skills Clients Pay For',
    date: '2026-06-05',
    excerpt: 'Pretty screenshots do not pay bills. Real web design skill means understanding users and solving problems.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
    tags: ['Web Design', 'UI/UX', 'Nepal'],
    category: 'design',
  },
  {
    _id: 'f4',
    slug: 'website-development-training-nepal',
    title: 'Website Development Training in Nepal: Zero to Deployed',
    date: '2026-05-28',
    excerpt: 'The fastest way to learn website development is to build real things.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    tags: ['Web Development', 'Full Stack', 'Nepal'],
    category: 'training',
  },
  {
    _id: 'f5',
    slug: 'php-laravel-training-nepal-2026',
    title: 'PHP with Laravel Training in Nepal: Enterprise Applications',
    date: '2026-05-20',
    excerpt: 'PHP powers 77 percent of the web. Laravel makes PHP development elegant and productive.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
    tags: ['PHP', 'Laravel', 'Nepal'],
    category: 'training',
  },
  {
    _id: 'f6',
    slug: 'digital-marketing-training-nepal',
    title: 'Digital Marketing Training in Nepal: Beyond Vanity Metrics',
    date: '2026-05-15',
    excerpt: 'Getting 10,000 followers means nothing if none of them buy.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=600',
    tags: ['Digital Marketing', 'SEO', 'Nepal'],
    category: 'marketing',
  },
  {
    _id: 'f7',
    slug: 'best-training-institute-nepal-why-sangalo',
    title: 'Best Training Institute in Nepal: What Actually Matters',
    date: '2026-05-10',
    excerpt: 'Every institute claims to be the best. Here is how to cut through the marketing.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600',
    tags: ['Training Institute', 'Nepal', 'Career'],
    category: 'general',
  },
  {
    _id: 'f8',
    slug: 'web-design-nepal-modern-trends',
    title: 'Web Design in Nepal: The Business Case for Professional Design',
    date: '2026-05-05',
    excerpt: 'Professional web design is not a luxury — it is a business investment.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=600',
    tags: ['Web Design', 'Business', 'Nepal'],
    category: 'design',
  },
  {
    _id: 'f9',
    slug: 'website-development-nepal-business',
    title: 'Website Development in Nepal: Why Every Business Needs One',
    date: '2026-04-28',
    excerpt: 'Nepal has 15 million internet users. If your business is not online, you are invisible.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    tags: ['Website Development', 'Business', 'Nepal'],
    category: 'business',
  },
  {
    _id: 'f10',
    slug: 'react-nextjs-training-nepal',
    title: 'React and Next.js Training in Nepal: The Modern Web Stack',
    date: '2026-04-20',
    excerpt: 'React and Next.js have become the default choice for building modern web applications.',
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
