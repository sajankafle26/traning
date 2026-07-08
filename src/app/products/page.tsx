import Products from '@/components/Products'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Explore high-quality digital products, software, and tools curated by Sangalo Tech Pvt. Ltd. Nepal.',
  keywords: ['software products Nepal', 'digital tools Nepal', 'Sangalo Tech products'],
  openGraph: {
    title: 'Our Products | Sangalo Tech',
    description: 'Explore high-quality digital products and software curated by Sangalo Tech.',
    url: 'https://sangalotech.com/products',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'Sangalo Tech Products' }],
  },
  twitter: { card: 'summary_large_image', title: 'Our Products | Sangalo Tech', description: 'Explore high-quality digital products and software curated by Sangalo Tech.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: { canonical: 'https://sangalotech.com/products' },
};

function ProductsPage() {
  return (
    <>
      <section className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ backgroundColor: '#00548B' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] max-w-4xl mx-auto">
            Our <span className="text-cyan-300">Products</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
            High-quality digital products and software solutions by Sangalo Tech.
          </p>
        </div>
      </section>
      <section className="bg-gray-100 py-12">
        <Products />
      </section>
    </>
  )
}

export default ProductsPage