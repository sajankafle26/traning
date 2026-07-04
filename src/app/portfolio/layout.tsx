import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'View our portfolio of web design, website development, and software projects. See our work in React, Next.js, PHP Laravel, and WordPress.',
  keywords: [
    'web design portfolio Nepal',
    'website development portfolio',
    'software projects Nepal',
  ],
  openGraph: {
    title: 'Portfolio | Sangalo Tech',
    description: 'View our web design, website development, and software projects.',
    url: 'https://sangalotech.com/portfolio',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'Sangalo Tech Portfolio' }],
  },
  twitter: { card: 'summary_large_image', title: 'Portfolio | Sangalo Tech', description: 'View our web design, website development, and software projects.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: { canonical: 'https://sangalotech.com/portfolio' },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
