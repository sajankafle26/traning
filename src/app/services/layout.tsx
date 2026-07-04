import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Services in Nepal',
  description: 'Sangalo Tech offers professional web design, website development, mobile app development, SEO, and software services in Nepal. Custom web apps with React, Next.js, PHP, Laravel, WordPress.',
  keywords: [
    'web design in Nepal',
    'website development in Nepal',
    'web development services Nepal',
    'software company Nepal',
    'mobile app development Nepal',
    'SEO services Nepal',
    'React development Nepal',
    'WordPress development Nepal',
    'Laravel development Nepal',
    'custom software Nepal',
  ],
  openGraph: {
    title: 'Software Services in Nepal | Sangalo Tech',
    description: 'Professional web design, website development, mobile app development, and SEO services in Nepal.',
    url: 'https://sangalotech.com/services',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'Sangalo Tech Software Services Nepal' }],
  },
  twitter: { card: 'summary_large_image', title: 'Software Services in Nepal | Sangalo Tech', description: 'Professional web design, website development, mobile app development, and SEO services in Nepal.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: { canonical: 'https://sangalotech.com/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
