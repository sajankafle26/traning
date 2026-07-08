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
  return (
    <>
      <section className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ backgroundColor: '#00548B' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] max-w-4xl mx-auto">
            IT Training <span className="text-cyan-300">Programs</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
            Job-ready IT training with internship, live projects, and placement assistance.
          </p>
        </div>
      </section>
      <Programs />
    </>
  );
}

export default TrainingPage;
