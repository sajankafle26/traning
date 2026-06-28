import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Sangalo Tech',
  description: 'Get in touch with Sangalo Tech - Web development company and IT training institute in Lokenthali, Bhaktapur, Nepal.',
};

function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactForm />
    </main>
  );
}

export default ContactPage;
