import Products from '@/components/Products'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Explore the high-quality digital products and software curated by Sangalo Tech.',
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