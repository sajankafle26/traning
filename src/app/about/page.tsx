import About from '@/components/About'
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Sangalo Tech Pvt. Ltd. - Best IT training institute and software company in Lokenthali, Bhaktapur, Nepal. Founded by Sajan Kafle. MERN Stack, WordPress, PHP Laravel, Digital Marketing training with 95% placement rate.',
  keywords: [
    'about Sangalo Tech',
    'best IT institute Nepal',
    'software company Bhaktapur',
    'IT training institute Bhaktapur',
  ],
  openGraph: {
    title: 'About Us | Sangalo Tech',
    description: 'Sangalo Tech Pvt. Ltd. - Best IT training institute and software company in Nepal.',
    url: 'https://sangalotech.com/about',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'About Sangalo Tech - IT Training & Software Company Nepal' }],
  },
  twitter: { card: 'summary_large_image', title: 'About Us | Sangalo Tech', description: 'Sangalo Tech Pvt. Ltd. - Best IT training institute and software company in Nepal.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: {
    canonical: 'https://sangalotech.com/about',
  },
};

function AboutPage() {
  return (
    <main className="min-h-screen">
      <About />
    </main>
  )
}

export default AboutPage
