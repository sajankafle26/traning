import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import TrustedCompanies from '@/components/TrustedCompanies'
import WhyChoose from '@/components/WhyChoose'
import TrustStats from '@/components/TrustStats'
import FAQSection from '@/components/FAQSection'

const ServicesShowcase = dynamic(() => import('@/components/ServicesShowcase'), { loading: () => <div className="h-64 bg-white" /> })
const Programs = dynamic(() => import('@/components/Programs'), { loading: () => <div className="h-96 bg-slate-50" /> })
const UpcomingBatches = dynamic(() => import('@/components/UpcomingBatches'), { loading: () => <div className="h-64 bg-white" /> })
const Portfolio = dynamic(() => import('@/components/Portfolio'), { loading: () => <div className="h-64 bg-slate-50" /> })
const Gallery = dynamic(() => import('@/components/Gallery'), { loading: () => <div className="h-64 bg-white" /> })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { loading: () => <div className="h-64 bg-slate-50" /> })
const VideoTestimonials = dynamic(() => import('@/components/VideoTestimonials'), { loading: () => <div className="h-64 bg-white" /> })
const Blog = dynamic(() => import('@/components/Blog'), { loading: () => <div className="h-64 bg-[#00548B]" /> })
const ContactForm = dynamic(() => import('@/components/ContactForm'), { loading: () => <div className="h-64 bg-white" /> })
const CaseStudies = dynamic(() => import('@/components/CaseStudies'), { loading: () => <div className="h-64 bg-slate-50" /> })

const HOMEPAGE_FAQS = [
  {
    question: "What services does Sangalo Tech provide?",
    answer: "Sangalo Tech is a full-service web development company offering custom web application development, mobile app development, UI/UX design, SEO & digital marketing, e-commerce solutions, and cloud & DevOps services.",
  },
  {
    question: "What courses does Sangalo Tech offer?",
    answer: "We offer 9+ professional IT training courses including MERN Stack, React & Next.js, Python Django, UI/UX Design, Digital Marketing, WordPress, PHP Laravel, Robotics & IoT, and Data Science with ML & AI.",
  },
  {
    question: "How much do web development services cost?",
    answer: "Project costs vary by scope. Basic websites start from Rs. 25,000, custom web apps from Rs. 100,000, and enterprise solutions from Rs. 300,000+. Contact us for a free consultation and custom quote.",
  },
  {
    question: "How much do courses cost?",
    answer: "Course fees range from Rs. 8,000 to Rs. 24,000 depending on the program. Most development courses start at Rs. 8,000, while advanced full-stack programs range from Rs. 16,000 to Rs. 24,000.",
  },
  {
    question: "Does Sangalo Tech provide job placement?",
    answer: "Yes, we provide 100% placement assistance with 50+ hiring partners. Our graduates have been placed at F1Soft, Leapfrog, Fusemachine, CloudFactory, and other top IT companies in Nepal.",
  },
  {
    question: "Where is Sangalo Tech located?",
    answer: "Sangalo Tech Pvt. Ltd. is located in Lokenthali, Bhaktapur, Nepal. We are easily accessible from Kathmandu and Lalitpur. We also offer hybrid learning options for select courses.",
  },
];

function page() {
  return (
    <>
      <h1 className="sr-only">Sangalo Tech — Software Company & IT Training Institute in Nepal</h1>
      <Hero />
      <TrustStats />
      <TrustedCompanies />
      <ServicesShowcase />
      <WhyChoose />
      <CaseStudies />
      <Programs />
      <UpcomingBatches />
      <Portfolio />
      <Testimonials />
      <VideoTestimonials />
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers about our web development services and IT training programs"
        faqs={HOMEPAGE_FAQS}
      />
      <Blog />
      <ContactForm />
    </>
  )
}

export default page
