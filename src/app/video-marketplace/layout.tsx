import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Marketplace',
  description: 'Access professional IT training video courses on web development, programming, and digital skills at Sangalo Tech marketplace.',
  alternates: { canonical: 'https://sangalotech.com/video-marketplace' },
};

export default function VideoMarketplaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
