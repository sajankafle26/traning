import { Metadata } from 'next';
import Programs from '@/components/Programs'

export const metadata: Metadata = {
  title: 'IT Training Programs in Nepal',
  description: 'Join Nepal job-ready IT training programs at Sangalo Tech. MERN Stack, React, Next.js, PHP Laravel, Python Django, UI/UX Design, Digital Marketing courses with internship and placement support.',
  keywords: [
    'IT training programs Nepal',
    'MERN Stack training Nepal',
    'React training Nepal',
    'PHP Laravel training Nepal',
    'Python Django training Nepal',
    'UI UX design course Nepal',
    'digital marketing training Nepal',
    'best IT training institute Nepal',
    'coding bootcamp Nepal',
  ],
  openGraph: {
    title: 'IT Training Programs in Nepal | Sangalo Tech',
    description: 'Nepal job-ready IT training programs — MERN Stack, React, Laravel, Python Django, UI/UX, Digital Marketing. Internship + placement support.',
    url: 'https://sangalotech.com/training',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'IT Training Programs at Sangalo Tech Nepal' }],
  },
  twitter: { card: 'summary_large_image', title: 'IT Training Programs in Nepal | Sangalo Tech', description: 'Job-ready IT training programs with internship and placement support.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: { canonical: 'https://sangalotech.com/training' },
};

function TrainingPage() {
  return <Programs />;
}

export default TrainingPage;
