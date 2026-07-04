import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions of using Sangalo Tech Pvt. Ltd. services - IT training institute and software company in Nepal.',
  openGraph: {
    title: 'Terms & Conditions | Sangalo Tech',
    description: 'Terms and conditions of using Sangalo Tech Pvt. Ltd. services.',
    url: 'https://sangalotech.com/terms',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'Sangalo Tech Terms & Conditions' }],
  },
  twitter: { card: 'summary_large_image', title: 'Terms & Conditions | Sangalo Tech', description: 'Terms and conditions of using Sangalo Tech services.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: { canonical: 'https://sangalotech.com/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
