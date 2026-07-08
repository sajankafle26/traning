import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Sangalo Tech - Best IT training institute and software company in Lokenthali, Bhaktapur, Nepal. Call +977-9851228383 for MERN Stack, WordPress, web design, digital marketing training and web development services.',
  keywords: [
    'contact Sangalo Tech',
    'IT training institute Bhaktapur',
    'software company Bhaktapur',
    'web development company contact Nepal',
  ],
  openGraph: {
    title: 'Contact Us | Sangalo Tech',
    description: 'Get in touch with Sangalo Tech - IT training institute and software company in Bhaktapur, Nepal.',
    url: 'https://sangalotech.com/contact',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'Contact Sangalo Tech Nepal' }],
  },
  twitter: { card: 'summary_large_image', title: 'Contact Us | Sangalo Tech', description: 'Get in touch with Sangalo Tech - IT training institute and software company in Nepal.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: { canonical: 'https://sangalotech.com/contact' },
};

function ContactPage() {
  return (
    <>
      <section className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ backgroundColor: '#00548B' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] max-w-4xl mx-auto">
            Contact <span className="text-cyan-300">Sangalo Tech</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
            Have a project or want to join a course? We&apos;re here to help.
          </p>
        </div>
      </section>
      <ContactForm />
    </>
  );
}

export default ContactPage;
