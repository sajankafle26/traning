import About from '@/components/About'
import Blog from '@/components/Blog'
import ContactForm from '@/components/ContactForm'
import Hero from '@/components/Hero'
import InternshipHub from '@/components/InternshipHub'
import Products from '@/components/Products'
import Programs from '@/components/Programs'
import React from 'react'
import SuccessGallery from '@/components/SuccessGallery'
import TechStack from '@/components/TechStack'
import Testimonials from '@/components/Testimonials'
import TrustedBy from '@/components/TrustedBy'
import UpcomingBatches from '@/components/UpcomingBatches'
import VideoMarketplace from '@/components/VideoMarketplace'
import WhyJoin from '@/components/WhyJoin'
import Portfolio from '@/components/Portfolio'

function page() {
  return (
    <>
      <Hero />
      <UpcomingBatches />
      <Programs />
      <About />

      <WhyJoin />
      <VideoMarketplace />
      {/* <InternshipHub /> */}
      <SuccessGallery />
      {/* <TechStack /> */}
      <Products />
      <Portfolio />
      <Testimonials />
      <Blog />
      <ContactForm />
      {/* <TrustedBy /> */}
    </>
  )
}

export default page