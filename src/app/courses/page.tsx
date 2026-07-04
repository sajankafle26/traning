import { Metadata } from 'next';
import CoursesList from './CoursesList';
import JsonLd, { ORGANIZATION_JSONLD } from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'IT Training Courses in Nepal',
    description: 'Sangalo Tech offers 9+ professional IT training courses in Nepal — MERN Stack, React & Next.js, Laravel, Python Django, UI/UX Design, Digital Marketing, WordPress, and Data Science. 100% job-ready programs with placement support.',
    keywords: [
        'IT training Nepal', 'web development course Nepal', 'MERN Stack course Nepal', 'React Next.js training Nepal',
        'UI UX design course Nepal', 'digital marketing course Nepal', 'Python Django training Nepal', 'Laravel course Nepal',
        'WordPress training Nepal', 'best IT institute Nepal', 'coding bootcamp Nepal', 'IT courses Bhaktapur',
        'job ready IT programs Nepal', 'web development training Kathmandu'
    ],
    openGraph: {
        title: 'IT Training Courses in Nepal | Sangalo Tech',
        description: '9+ professional IT training courses — MERN Stack, React, Laravel, Python, UI/UX, Digital Marketing. Join Nepal\'s job-ready programs.',
        url: 'https://sangalotech.com/courses',
        siteName: 'Sangalo Tech',
        type: 'website',
        images: [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: 'IT Training Courses at Sangalo Tech Nepal' }],
    },
    twitter: { card: 'summary_large_image', title: 'IT Training Courses in Nepal | Sangalo Tech', description: '9+ professional IT training courses with placement support.', images: ['https://sangalotech.com/og-image.png'] },
    alternates: {
        canonical: 'https://sangalotech.com/courses',
    },
};

export default function CoursesPage() {
    return (
        <>
            <JsonLd data={ORGANIZATION_JSONLD} />
            <CoursesList />
        </>
    );
}
