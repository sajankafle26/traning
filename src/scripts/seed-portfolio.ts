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
];

async function seed() {
    await dbConnect();
    const count = await Portfolio.countDocuments();
    if (count === 0) {
        await Portfolio.insertMany(seedPortfolio);
        console.log(`Seeded ${seedPortfolio.length} portfolio items.`);
    } else {
        console.log(`Portfolio collection already has ${count} items. Skipping.`);
    }
    process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
