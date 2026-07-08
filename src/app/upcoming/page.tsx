import { Metadata } from 'next';
import UpcomingBatches from '@/components/UpcomingBatches'

export const metadata: Metadata = {
  title: 'Upcoming IT Training Batches in Nepal',
  description: 'View upcoming batch schedules for MERN Stack, React, PHP Laravel, Python Django, UI/UX Design, and Digital Marketing training courses at Sangalo Tech Nepal.',
  keywords: [
    'upcoming batches Nepal',
    'IT training schedule Nepal',
    'MERN Stack batch Nepal',
    'course starting date Nepal',
    'enroll IT course Nepal',
  ],
  openGraph: {
    title: 'Upcoming IT Training Batches | Sangalo Tech',
    description: 'Check upcoming batch schedules for IT training courses at Sangalo Tech Nepal.',
    url: 'https://sangalotech.com/upcoming',
    siteName: 'Sangalo Tech',
    type: 'website',
    images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'Upcoming IT Training Batches at Sangalo Tech Nepal' }],
  },
  twitter: { card: 'summary_large_image', title: 'Upcoming IT Training Batches | Sangalo Tech', description: 'Check upcoming batch schedules for IT training courses.', images: ['https://sangalotech.com/og-image.png'] },
  alternates: { canonical: 'https://sangalotech.com/upcoming' },
};

function UpcomingPage() {
  return (
    <div>
      <section className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ backgroundColor: '#00548B' }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_5%_10%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(800px_480px_at_95%_120%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.9] max-w-4xl mx-auto">
            Upcoming <span className="text-cyan-300">Batches</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
            Check our upcoming training schedules and enroll today.
          </p>
        </div>
      </section>
      <UpcomingBatches />
    </div>
  );
}

export default UpcomingPage;
