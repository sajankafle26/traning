import About from '@/components/About'
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us | Sangalo Tech - Web Development & IT Training',
  description: 'Sangalo Tech Pvt. Ltd. - Web development company and IT training institute in Lokenthali, Bhaktapur, Nepal. MERN Stack, React, Laravel, WordPress training with guaranteed hiring.',
};

function AboutPage() {
  return (
    <main className="min-h-screen">
      <About />
    </main>
  )
}

export default AboutPage
