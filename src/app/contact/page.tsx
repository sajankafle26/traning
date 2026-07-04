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
  },
  alternates: { canonical: 'https://sangalotech.com/contact' },
};

function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactForm />
    </main>
  );
}

export default ContactPage;
