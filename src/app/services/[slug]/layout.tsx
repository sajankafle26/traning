import { Metadata } from 'next';

const SERVICE_DESCRIPTIONS: Record<string, { title: string; description: string; keywords: string[] }> = {
    'web-app-development': {
        title: 'Custom Web Application Development Nepal | React, Next.js, Node.js',
        description: 'Professional web application development services in Nepal. Sangalo Tech builds scalable web apps with React, Next.js, Node.js, TypeScript, and MongoDB. Get a custom web app for your business.',
        keywords: ['web development Nepal', 'custom web app Nepal', 'React development Nepal', 'Next.js development Nepal', 'Node.js developer Nepal'],
    },
    'mobile-app-development': {
        title: 'Mobile App Development Nepal | React Native, Flutter',
        description: 'Expert mobile app development services in Nepal. We build native and cross-platform iOS & Android apps using React Native and Flutter for seamless user experiences.',
        keywords: ['mobile app development Nepal', 'React Native Nepal', 'Flutter developer Nepal', 'iOS Android app Nepal'],
    },
    'seo-and-marketing': {
        title: 'SEO & Digital Marketing Services Nepal | Boost Your Rankings',
        description: 'Data-driven SEO and digital marketing services in Nepal. Improve your Google rankings, drive organic traffic, and grow your business with our proven marketing strategies.',
        keywords: ['SEO services Nepal', 'digital marketing Nepal', 'SEO expert Nepal', 'Google ranking Nepal'],
    },
    'ui-ux-design': {
        title: 'UI/UX Design & Prototyping Services Nepal',
        description: 'User-centric UI/UX design and prototyping services in Nepal. We create intuitive interfaces and engaging prototypes that convert visitors into customers.',
        keywords: ['UI UX design Nepal', 'UX designer Nepal', 'Figma design Nepal', 'prototyping Nepal'],
    },
    'e-commerce-solutions': {
        title: 'E-Commerce Development Nepal | Online Store Solutions',
        description: 'End-to-end e-commerce development services in Nepal. Secure payment gateways, smooth checkout, inventory management, and custom online store solutions.',
        keywords: ['e-commerce development Nepal', 'online store Nepal', 'Shopify Nepal', 'WooCommerce Nepal'],
    },
    'cloud-and-devops': {
        title: 'Cloud & DevOps Services Nepal | AWS, Docker, CI/CD',
        description: 'Streamline your development with cloud infrastructure and DevOps services in Nepal. Automated deployments, CI/CD pipelines, and reliable cloud hosting with AWS and Docker.',
        keywords: ['cloud services Nepal', 'DevOps Nepal', 'AWS Nepal', 'Docker deployment Nepal'],
    },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const serviceInfo = SERVICE_DESCRIPTIONS[slug];

    if (serviceInfo) {
        return {
            title: serviceInfo.title,
            description: serviceInfo.description,
            keywords: serviceInfo.keywords,
            openGraph: {
                title: serviceInfo.title,
                description: serviceInfo.description,
                url: `https://sangalotech.com/services/${slug}`,
                siteName: 'Sangalo Tech',
                type: 'website',
            },
            alternates: {
                canonical: `https://sangalotech.com/services/${slug}`,
            },
        };
    }

    const title = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

    return {
        title: `${title} Services Nepal | Sangalo Tech`,
        description: `Professional ${title} services by Sangalo Tech Pvt. Ltd. in Nepal. Get a free consultation for your project.`,
        openGraph: {
            title: `${title} Services Nepal | Sangalo Tech`,
            description: `Professional ${title} services by Sangalo Tech Pvt. Ltd. in Nepal.`,
            url: `https://sangalotech.com/services/${slug}`,
            siteName: 'Sangalo Tech',
            type: 'website',
        },
        alternates: {
            canonical: `https://sangalotech.com/services/${slug}`,
        },
    };
}

export default function ServiceSlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
