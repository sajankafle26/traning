import Hero from '@/components/Hero'
import TrustedCompanies from '@/components/TrustedCompanies'
import ServicesShowcase from '@/components/ServicesShowcase'
import Programs from '@/components/Programs'
import WhyChoose from '@/components/WhyChoose'
import TrustStats from '@/components/TrustStats'
import Testimonials from '@/components/Testimonials'
import Portfolio from '@/components/Portfolio'
import Gallery from '@/components/Gallery'
import FAQSection from '@/components/FAQSection'
import ContactForm from '@/components/ContactForm'
import UpcomingBatches from '@/components/UpcomingBatches'
import Blog from '@/components/Blog'

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
      <TrustedCompanies />
      <ServicesShowcase />
      <Programs />
      <WhyChoose />
      <UpcomingBatches />
      <TrustStats />
      <Portfolio />
      <Gallery />
      <Testimonials />
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
