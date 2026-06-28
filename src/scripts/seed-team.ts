import fs from 'fs';
import path from 'path';

// Manually parse .env.local
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
import Team from "@/models/Team";

const seedTeam = [
    {
        name: 'Er Sajan Kafle',
        role: 'CEO & Founder',
        image: '/team/sajan-kafle.jpg',
        bio: 'Founder of Sangalo Tech with a passion for bridging the gap between academics and industry through practical IT training and innovative software solutions.',
        linkedin: 'https://linkedin.com/in/sajankafle',
        twitter: 'https://twitter.com/sajankafle',
        github: 'https://github.com/sajankafle',
        order: 1,
        active: true,
    },
    {
        name: 'Archana Dhungana',
        role: 'Project Manager',
        image: '/team/archana-dhungana.jpg',
        bio: 'Experienced project manager overseeing client projects and training programs, ensuring seamless delivery and student success.',
        linkedin: 'https://linkedin.com/in/archanadhungana',
        twitter: 'https://twitter.com/archanadhungana',
        order: 2,
        active: true,
    },
];

async function seed() {
    await dbConnect();
    const count = await Team.countDocuments();
    if (count === 0) {
        await Team.insertMany(seedTeam);
        console.log(`Seeded ${seedTeam.length} team members.`);
    } else {
        console.log(`Team collection already has ${count} members. Skipping.`);
    }
    process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
