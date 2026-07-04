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
  },
  alternates: { canonical: 'https://sangalotech.com/portfolio' },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
