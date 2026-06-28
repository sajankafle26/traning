import About from '@/components/About'
import Blog from '@/components/Blog'
import ContactForm from '@/components/ContactForm'
import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero'
import InternshipHub from '@/components/InternshipHub'
import Products from '@/components/Products'
import Programs from '@/components/Programs'
import React from 'react'
import SuccessGallery from '@/components/SuccessGallery'
import TechStack from '@/components/TechStack'
import Testimonials from '@/components/Testimonials'
import TrustedBy from '@/components/TrustedBy'
import TrustedCompanies from '@/components/TrustedCompanies'
import UpcomingBatches from '@/components/UpcomingBatches'
import VideoMarketplace from '@/components/VideoMarketplace'
import WhyJoin from '@/components/WhyJoin'
import Portfolio from '@/components/Portfolio'

import GSAPShowcase from '@/components/GSAPShowcase'

function page() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      
      <Programs />
     
      {/* <About /> */}

      {/* <WhyJoin /> */}
       {/* <GSAPShowcase /> */}
      {/* <VideoMarketplace /> */}
      {/* <InternshipHub /> */}
      <UpcomingBatches />
      <SuccessGallery />
      {/* <TechStack /> */}
      {/* <Products /> */}
      <Portfolio />
      <Gallery />
      <Testimonials />
      <Blog />
      <ContactForm />
      {/* <TrustedBy /> */}
    </>
  )
}

export default page