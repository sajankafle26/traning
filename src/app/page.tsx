import Hero from '@/components/Hero'
import TrustedCompanies from '@/components/TrustedCompanies'
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
    question: "What courses does Sangalo Tech offer?",
    answer: "Sangalo Tech offers 9+ professional IT training courses including MERN Stack, React & Next.js, Python Django, UI/UX Design, Digital Marketing, WordPress, PHP Laravel, Robotics & IoT, and Data Science with ML & AI.",
  },
  {
    question: "How much do the courses cost?",
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
  {
    question: "Are the courses suitable for beginners?",
    answer: "Absolutely! Our courses are designed from beginner to advanced level. You don't need any prior coding experience — just basic computer knowledge and a willingness to learn.",
  },
];

function page() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <Programs />
      <WhyChoose />
      <UpcomingBatches />
      <TrustStats />
      <Portfolio />
      <Gallery />
      <Testimonials />
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our courses and training programs"
        faqs={HOMEPAGE_FAQS}
      />
      <Blog />
      <ContactForm />
    </>
  )
}

export default page
