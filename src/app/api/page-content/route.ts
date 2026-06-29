import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PageContent from "@/models/PageContent";
import { auth } from "@/auth";

const DEFAULT_CONTENT = {
    hero: {
        badge: 'About Us',
        title: 'Software Company',
        subtitle: 'And IT Training Institute in Nepal.',
        description: 'Sangalo Tech Pvt. Ltd. is a prominent web design, software development, and IT training institute located in Lokenthali, Bhaktapur, Nepal.',
        image: '/about/office.jpg',
        services: [
            { icon: '💻', title: 'Software Development', desc: 'Custom Solutions' },
            { icon: '🎓', title: 'IT Academy', desc: 'Real-World Skills' },
            { icon: '💼', title: 'Job Placement', desc: '100% Bridge' },
            { icon: '🚀', title: 'Industrial Learning', desc: 'Active Mentors' },
        ],
        ctaPrimary: 'Explore Courses',
        ctaPrimaryLink: '/courses',
        ctaSecondary: 'Learn More',
        ctaSecondaryLink: '/about',
    },
    about: {
        heroBadge: 'About Sangalo Tech',
        heroTitle: 'Software Company',
        heroSubtitle: '& IT Training Institute',
        heroDescription: 'Sangalo Tech Pvt. Ltd. — Web design, software development, and IT training in Lokenthali, Bhaktapur, Nepal.',
        stats: [
            { icon: 'FaLaptopCode', value: '200+', label: 'Projects Delivered', color: 'bg-blue-500' },
            { icon: 'FaGraduationCap', value: '600+', label: 'Students Trained', color: 'bg-emerald-500' },
            { icon: 'FaBriefcase', value: '500+', label: 'Placed in Jobs', color: 'bg-violet-500' },
            { icon: 'FaStar', value: '4.9', label: 'Google Rating', color: 'bg-amber-500' },
        ],
        storyTitle: 'Our Story',
        storyParagraphs: [
            'Founded by Sajan Kafle, Sangalo Tech Pvt. Ltd. started with a simple vision — to bridge the gap between academic learning and real-world industry requirements.',
            'Located in Lokenthali, Bhaktapur, we combine a software development company with an IT training institute, giving students hands-on experience with real client projects.',
        ],
        storyImage: '/about/office.jpg',
        trainingTitle: 'Software Company',
        trainingDescription: 'We build scalable web and mobile applications for businesses worldwide using modern technologies like MERN Stack, React, Next.js, and Laravel.',
        trainingItems: [
            'Custom Web Application Development',
            'Mobile App Development (React Native)',
            'E-Commerce Solutions',
            'Cloud & DevOps Services',
        ],
        instituteTitle: 'IT Training Institute',
        instituteDescription: 'We train the next generation of developers with hands-on, project-based learning that prepares students for real industry challenges.',
        instituteItems: [
            'MERN Stack Industrial Training',
            'React & Next.js Mastery',
            'UI/UX Design Training',
            'Digital Marketing Strategy',
        ],
        trainingProgramsTitle: 'Our Training Programs',
        trainingPrograms: [
            { icon: 'FaCode', title: 'MERN Stack Industrial Training', description: 'Focusing on Node.js architecture, system design fundamentals, and scalable RESTful backend services.' },
            { icon: 'FaPenNib', title: 'UI/UX Design Specialist', description: 'Practical interface design modules aimed at training corporate-ready UI/UX asset creators.' },
            { icon: 'FaRocket', title: 'React & Next.js Mastery', description: 'High-level modern React architecture training incorporating component-based UI engineering.' },
            { icon: 'FaCode', title: 'Laravel Backend Mastery', description: 'Backend web development emphasizing live application deployment and extensive documentation standards.' },
            { icon: 'FaLaptopCode', title: 'WordPress Theme Development', description: 'Complete training on deploying custom code, setting up staging environments, and building full-scale business websites.' },
            { icon: 'FaChartLine', title: 'Digital Marketing Strategy', description: 'Campaign planning, brand building, and social media analytics optimization.' },
        ],
        teamTitle: 'Our Team',
        teamDescription: 'Meet the passionate leaders driving innovation at Sangalo Tech.',
        teamMembers: [
            {
                name: 'Er Sajan Kafle',
                role: 'CEO & Founder',
                image: '/team/sajan-kafle.jpg',
                bio: 'Founder of Sangalo Tech with a passion for bridging the gap between academics and industry through practical IT training and innovative software solutions.',
                social: {
                    linkedin: 'https://linkedin.com/in/sajankafle',
                    twitter: 'https://twitter.com/sajankafle',
                    github: 'https://github.com/sajankafle',
                },
            },
            {
                name: 'Archana Dhungana',
                role: 'Project Manager',
                image: '/team/archana-dhungana.jpg',
                bio: 'Experienced project manager overseeing client projects and training programs, ensuring seamless delivery and student success.',
                social: {
                    linkedin: 'https://linkedin.com/in/archanadhungana',
                    twitter: 'https://twitter.com/archanadhungana',
                },
            },
        ],
        timelineTitle: 'Our Journey',
        timeline: [
            { year: '2018', title: 'Founded', description: 'Sangalo Tech was founded by Sajan Kafle with a vision to bridge the gap between academics and industry.' },
            { year: '2019', title: 'First Batch', description: 'Launched our first MERN Stack training batch with 15 students in Lokenthali, Bhaktapur.' },
            { year: '2021', title: 'Expanded Services', description: 'Added software development services, digital marketing, and UI/UX design training.' },
            { year: '2023', title: '500+ Placements', description: 'Crossed 500 successful job placements with partner companies across Nepal.' },
            { year: '2024', title: 'Growing Strong', description: 'Now serving 600+ students with expanded course offerings and enterprise solutions.' },
        ],
        missionTitle: 'Mission & Vision',
        mission: 'To bridge the gap between academics and industry through practical, job-ready IT training.',
        vision: 'To be Nepal\'s leading IT training institute and software development company, producing industry-ready professionals.',
        values: 'Excellence, Innovation, Integrity, Student Success, Industry Partnership',
        ctaTitle: 'Ready to Start Your Journey?',
        ctaDescription: 'Join 600+ students who have transformed their careers with Sangalo Tech.',
        ctaPrimary: 'Enroll Now',
        ctaPrimaryLink: '/courses',
        ctaSecondary: 'Contact Us',
        ctaSecondaryLink: '/contact',
    },
};

export async function GET() {
    try {
        await dbConnect();
        let content = await PageContent.findOne();
        if (!content) {
            content = await PageContent.create(DEFAULT_CONTENT);
        }
        return NextResponse.json(content);
    } catch (error: any) {
        return NextResponse.json(DEFAULT_CONTENT);
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        await dbConnect();

        const content = await PageContent.findOneAndUpdate({}, data, { upsert: true, new: true });
        return NextResponse.json(content);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
