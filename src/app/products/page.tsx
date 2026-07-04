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
      <section className="bg-gray-100 py-12">
        <Products />
      </section>
    </>
  )
}

export default ProductsPage