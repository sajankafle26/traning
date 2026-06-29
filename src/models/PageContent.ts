import mongoose from 'mongoose';

const PageContentSchema = new mongoose.Schema({
    // Hero Section
    hero: {
        badge: { type: String, default: 'About Us' },
        title: { type: String, default: 'Software Company' },
        subtitle: { type: String, default: 'And IT Training Institute in Nepal.' },
        description: { type: String, default: 'Sangalo Tech Pvt. Ltd. is a prominent web design, software development, and IT training institute located in Lokenthali, Bhaktapur, Nepal.' },
        image: { type: String, default: '/about/office.jpg' },
        services: [{
            icon: { type: String },
            title: { type: String },
            desc: { type: String },
        }],
        ctaPrimary: { type: String, default: 'Explore Courses' },
        ctaPrimaryLink: { type: String, default: '/courses' },
        ctaSecondary: { type: String, default: 'Learn More' },
        ctaSecondaryLink: { type: String, default: '/about' },
    },

    // About Page
    about: {
        heroBadge: { type: String, default: 'About Sangalo Tech' },
        heroTitle: { type: String, default: 'Software Company' },
        heroSubtitle: { type: String, default: '& IT Training Institute' },
        heroDescription: { type: String, default: 'Sangalo Tech Pvt. Ltd. — Web design, software development, and IT training in Lokenthali, Bhaktapur, Nepal.' },

        stats: [{
            icon: { type: String },
            value: { type: String },
            label: { type: String },
            color: { type: String },
        }],

        storyTitle: { type: String, default: 'Our Story' },
        storyParagraphs: [{ type: String }],
        storyImage: { type: String, default: '/about/office.jpg' },

        trainingTitle: { type: String, default: 'Software Company' },
        trainingDescription: { type: String, default: 'We build scalable web and mobile applications for businesses worldwide.' },
        trainingItems: [{ type: String }],

        instituteTitle: { type: String, default: 'IT Training Institute' },
        instituteDescription: { type: String, default: 'We train the next generation of developers with hands-on, project-based learning.' },
        instituteItems: [{ type: String }],

        trainingProgramsTitle: { type: String, default: 'Our Training Programs' },
        trainingPrograms: [{
            icon: { type: String },
            title: { type: String },
            description: { type: String },
        }],

        teamTitle: { type: String, default: 'Our Team' },
        teamDescription: { type: String, default: 'Meet the passionate leaders driving innovation at Sangalo Tech.' },
        teamMembers: [{
            name: { type: String, required: true },
            role: { type: String, required: true },
            image: { type: String },
            bio: { type: String },
            social: {
                linkedin: { type: String },
                twitter: { type: String },
                github: { type: String },
            },
        }],

        timelineTitle: { type: String, default: 'Our Journey' },
        timeline: [{
            year: { type: String },
            title: { type: String },
            description: { type: String },
        }],

        missionTitle: { type: String, default: 'Mission & Vision' },
        mission: { type: String, default: 'To bridge the gap between academics and industry through practical, job-ready IT training.' },
        vision: { type: String, default: 'To be Nepal\'s leading IT training institute and software development company, producing industry-ready professionals.' },
        values: { type: String, default: 'Excellence, Innovation, Integrity, Student Success, Industry Partnership' },

        ctaTitle: { type: String, default: 'Ready to Start Your Journey?' },
        ctaDescription: { type: String, default: 'Join 600+ students who have transformed their careers with Sangalo Tech.' },
        ctaPrimary: { type: String, default: 'Enroll Now' },
        ctaPrimaryLink: { type: String, default: '/courses' },
        ctaSecondary: { type: String, default: 'Contact Us' },
        ctaSecondaryLink: { type: String, default: '/contact' },
    },
}, { timestamps: true });

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
