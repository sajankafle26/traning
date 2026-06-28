import { Metadata } from 'next';
import CoursesList from './CoursesList';

export const metadata: Metadata = {
    title: 'Our Courses | Sangalo Tech',
    description: 'Explore professional IT training courses at Sangalo Tech — MERN Stack, React, Laravel, UI/UX, Digital Marketing, and more.',
};

export default function CoursesPage() {
    return <CoursesList />;
}
