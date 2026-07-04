import About from '@/components/About'
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Sangalo Tech Pvt. Ltd. - Web development company and IT training institute in Lokenthali, Bhaktapur, Nepal. MERN Stack, React, Laravel, WordPress training with guaranteed hiring.',
  openGraph: {
    title: 'About Us | Sangalo Tech',
    description: 'Sangalo Tech Pvt. Ltd. - Web development company and IT training institute in Nepal.',
    url: 'https://sangalotech.com/about',
    siteName: 'Sangalo Tech',
    type: 'website',
  },
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
