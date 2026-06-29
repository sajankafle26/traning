import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) return;
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = value;
    });
}

import dbConnect from "@/lib/dbConnect";
import Portfolio from "@/models/Portfolio";

const seedPortfolio = [
    {
        title: 'Global Touch India',
        description: 'A comprehensive educational and visa consultancy website for students aiming to study in Australia.',
        image: '/portfolio/global-touch-india.png',
        link: 'https://myglobaltouch.in',
        category: 'Consultancy',
        tags: ['React', 'Next.js', 'Tailwind'],
    },
    {
        title: 'Ramro Sathi',
        description: 'Construction and architectural firm website showcasing their services and projects.',
        image: '/portfolio/ramro-sathi.png',
        category: 'Construction',
        tags: ['WordPress', 'UI/UX'],
    },
    {
        title: 'Global Touch Education',
        description: 'Educational consultancy website focusing on IT study abroad programs.',
        image: '/portfolio/global-touch-education.png',
        link: 'https://myglobaltouch.com.au',
        category: 'Education',
        tags: ['React', 'Node.js'],
    },
    {
        title: 'Micro TV HD',
        description: 'Dynamic news portal and video streaming website.',
        image: '/portfolio/micro-tv-hd.png',
        category: 'News Portal',
        tags: ['Next.js', 'Video'],
    },
    {
        title: 'Mahila Laghubitta',
        description: 'Microfinance institutional website providing financial services.',
        image: '/portfolio/mahila-laghubitta.png',
        category: 'Finance',
        tags: ['React', 'Laravel'],
    },
    {
        title: 'Rupantaran Post',
        description: 'Prominent Nepali news and media portal.',
        image: '/portfolio/rupantaran-post.png',
        category: 'News Portal',
        tags: ['WordPress', 'PHP'],
    },
    {
        title: 'NA Fellowship',
        description: 'The official website for Nepal Regional Committee of Narcotics Anonymous.',
        image: '/portfolio/na-fellowship.png',
        category: 'Organization',
        tags: ['Non-profit', 'Web Portal'],
    },
    {
        title: 'Sports Performance',
        description: 'A dedicated sports performance website offering athlete development services.',
        image: '/portfolio/sports-performance.png',
        category: 'Sports',
        tags: ['Sports', 'Fitness', 'Web Portal'],
    },
    {
        title: 'Banking Khabar',
        description: 'A comprehensive financial and banking news portal for economy updates.',
        image: '/portfolio/banking-khabar.png',
        category: 'News Portal',
        tags: ['Finance', 'News', 'Media'],
    },
    {
        title: 'Emerald Isle Nepal',
        description: 'A professional recruitment agency website with overseas manpower placement.',
        image: '/portfolio/emerald-isle.png',
        category: 'Recruitment',
        tags: ['HR', 'Recruitment', 'Corporate'],
    },
    {
        title: 'Career Point',
        description: 'A human resource consultancy platform connecting talent with global opportunities.',
        image: '/portfolio/career-point.png',
        link: 'https://careerpoint.com.np',
        category: 'Consultancy',
        tags: ['HR', 'Consultancy', 'Global'],
    },
    {
        title: 'Nepal Wanders',
        description: 'A travel and tourism platform offering treks and travel guides for Nepal.',
        image: '/portfolio/nepal-wanders.png',
        category: 'Travel',
        tags: ['Tourism', 'Travel', 'Web Design'],
    },
    {
        title: 'Nepal Honey Hub',
        description: 'E-commerce platform for organic Nepali honey products.',
        image: '/portfolio/honeyhub.png',
        link: 'https://nepalhoneyhub.com',
        category: 'E-Commerce',
        tags: ['E-Commerce', 'WordPress', 'WooCommerce'],
    },
    {
        title: 'Avion HR Management',
        description: 'HR management software for workforce and payroll management.',
        image: '/portfolio/avionhrm.png',
        category: 'Software',
        tags: ['React', 'Node.js', 'HR'],
    },
    {
        title: 'Industry News Nepal',
        description: 'Industrial and manufacturing news portal for Nepal.',
        image: '/portfolio/industrynewsnepal.png',
        category: 'News Portal',
        tags: ['News', 'Media', 'WordPress'],
    },
    {
        title: 'Media International',
        description: 'Media production and broadcasting company website.',
        image: '/portfolio/mediainternational.png',
        category: 'Media',
        tags: ['Media', 'Web Design'],
    },
];

async function seed() {
    await dbConnect();
    await Portfolio.deleteMany({});
    await Portfolio.insertMany(seedPortfolio);
    console.log(`Seeded ${seedPortfolio.length} portfolio items.`);
    process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
