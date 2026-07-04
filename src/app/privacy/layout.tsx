import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy of Sangalo Tech Pvt. Ltd. - IT training institute and software company in Nepal.',
  openGraph: {
    title: 'Privacy Policy | Sangalo Tech',
    description: 'Privacy policy of Sangalo Tech Pvt. Ltd. - IT training institute and software company in Nepal.',
    url: 'https://sangalotech.com/privacy',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'Sangalo Tech Privacy Policy' }],
  },
  twitter: { card: 'summary_large_image', title: 'Privacy Policy | Sangalo Tech', description: 'Privacy policy of Sangalo Tech Pvt. Ltd.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: { canonical: 'https://sangalotech.com/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
