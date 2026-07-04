import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Marketplace',
  description: 'Access professional IT training video courses on web development, programming, and digital skills at Sangalo Tech marketplace.',
  openGraph: {
    title: 'Video Marketplace | Sangalo Tech',
    description: 'Access professional IT training video courses on web development, programming, and digital skills.',
    url: 'https://sangalotech.com/video-marketplace',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'Sangalo Tech Video Marketplace' }],
  },
  twitter: { card: 'summary_large_image', title: 'Video Marketplace | Sangalo Tech', description: 'Access professional IT training video courses.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: { canonical: 'https://sangalotech.com/video-marketplace' },
};

export default function VideoMarketplaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
