import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('.env.local') });

import dbConnect from '@/lib/dbConnect';
import Service from '@/models/Service';

async function seed() {
  await dbConnect();

  const existing = await Service.findOne({ slug: 'brand-strategy' });
  if (existing) {
    console.log('Brand Strategy service already exists.');
    process.exit(0);
  }

  const service = await Service.create({
    title: 'Brand Strategy',
    slug: 'brand-strategy',
    description: 'Build a powerful brand identity that resonates with your audience. From logo design and brand guidelines to positioning strategy and visual identity systems — we craft brands that stand out in the Nepali and global market.',
    icon: 'fa-solid fa-bullseye',
    image: '',
  });

  console.log('Brand Strategy service created:', service._id);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
