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
  },
  alternates: { canonical: 'https://sangalotech.com/upcoming' },
};

function UpcomingPage() {
  return (
    <div>
      <UpcomingBatches />
    </div>
  );
}

export default UpcomingPage;
