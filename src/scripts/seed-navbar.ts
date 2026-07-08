/**
 * Seed script: populates LiveCourse, Service, and Product collections
 * so navbar mega menus display real content.
 *
 * Usage: npx tsx src/scripts/seed-navbar.ts
 */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set in .env.local");
  process.exit(1);
}

const liveCourses = [
  {
    title: "Modern React & Next.js Masterclass 2026",
    slug: "modern-react-nextjs-masterclass",
    category: "Development",
    description: "Master React 19, Next.js 15 (App Router), Server Components, Server Actions, and modern full-stack patterns. Build production-ready applications with the latest React ecosystem.",
    price: 8000,
    originalPrice: 12000,
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    module: "Frontend",
    instructor: { name: "Sajan Kafle", title: "Senior Software Engineer", bio: "Full-stack developer with 6+ years of experience in React ecosystem.", avatar: "" },
    curriculum: [
      { title: "React Fundamentals", objectives: ["Build component trees", "Manage state effectively"], keyTopics: ["JSX", "Hooks", "Context"], activities: ["Build a todo app"], deliverables: ["Mini project"], tools: ["React DevTools"], duration: "1 week" },
      { title: "Next.js App Router", objectives: ["Understand routing", "Server vs Client components"], keyTopics: ["Layouts", "Loading UI", "Data fetching"], activities: ["Build multi-page app"], deliverables: ["Portfolio site"], tools: ["Next.js"], duration: "2 weeks" },
    ],
  },
  {
    title: "Advanced UI/UX Design with Figma & Prototyping",
    slug: "advanced-ui-ux-design-figma",
    category: "Design",
    description: "Master UI/UX design from research to high-fidelity prototypes using Figma. Learn design thinking, user research, wireframing, and developer handoff.",
    price: 8000,
    originalPrice: 12000,
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    module: "Design",
    instructor: { name: "Sajan Kafle", title: "UI/UX Lead", bio: "Designer with expertise in user-centered design and Figma workflows.", avatar: "" },
    curriculum: [
      { title: "Design Thinking", objectives: ["Understand design thinking process"], keyTopics: ["Empathize", "Define", "Ideate"], activities: ["User interviews"], deliverables: ["Research report"], tools: ["Figma"], duration: "1 week" },
    ],
  },
  {
    title: "Digital Marketing Mastery: Zero to Pro",
    slug: "digital-marketing-mastery",
    category: "Marketing",
    description: "Complete digital marketing training covering SEO, social media marketing, Google Ads, content marketing, email marketing, and analytics.",
    price: 8000,
    originalPrice: 12000,
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    module: "Marketing",
    instructor: { name: "Sajan Kafle", title: "Digital Marketing Lead", bio: "Marketing specialist with 5+ years driving online growth.", avatar: "" },
    curriculum: [
      { title: "SEO Fundamentals", objectives: ["Understand search engine algorithms"], keyTopics: ["On-page SEO", "Off-page SEO", "Technical SEO"], activities: ["Audit a website"], deliverables: ["SEO report"], tools: ["Google Search Console"], duration: "2 weeks" },
    ],
  },
  {
    title: "Full-Stack PHP Laravel Development",
    slug: "full-stack-php-laravel-development",
    category: "Development",
    description: "Build robust web applications with Laravel. Learn MVC architecture, Eloquent ORM, RESTful APIs, authentication, and deployment.",
    price: 8000,
    originalPrice: 12000,
    duration: "10 weeks",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    module: "Backend",
    instructor: { name: "Sajan Kafle", title: "Backend Lead", bio: "PHP expert specializing in Laravel and scalable backend architecture.", avatar: "" },
    curriculum: [
      { title: "Laravel Basics", objectives: ["Set up Laravel", "Understand MVC"], keyTopics: ["Routing", "Controllers", "Blade"], activities: ["Build CRUD app"], deliverables: ["Blog platform"], tools: ["Laravel"], duration: "2 weeks" },
    ],
  },
  {
    title: "Python Django Web Development",
    slug: "python-django-web-development",
    category: "Development",
    description: "Learn Python web development with Django. Build data-driven web applications with Django ORM, REST framework, and deployment.",
    price: 8000,
    originalPrice: 12000,
    duration: "10 weeks",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
    module: "Backend",
    instructor: { name: "Sajan Kafle", title: "Python Developer", bio: "Django developer with experience building scalable web applications.", avatar: "" },
    curriculum: [
      { title: "Python Review", objectives: ["Review Python fundamentals"], keyTopics: ["Data types", "Functions", "OOP"], activities: ["Python exercises"], deliverables: ["CLI app"], tools: ["Python"], duration: "1 week" },
    ],
  },
  {
    title: "WordPress Theme & Plugin Development",
    slug: "wordpress-theme-plugin-development",
    category: "Development",
    description: "Master WordPress development from custom themes to advanced plugins. Learn block editor, REST API, and headless WordPress.",
    price: 8000,
    originalPrice: 12000,
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    module: "CMS",
    instructor: { name: "Sajan Kafle", title: "WordPress Developer", bio: "WordPress expert with 4+ years building custom themes and plugins.", avatar: "" },
    curriculum: [
      { title: "Theme Development", objectives: ["Build custom WordPress themes"], keyTopics: ["Theme structure", "Template hierarchy", "Hooks"], activities: ["Build a theme"], deliverables: ["Custom theme"], tools: ["WordPress", "ACF"], duration: "2 weeks" },
    ],
  },
  {
    title: "Data Science with ML & AI",
    slug: "data-science-ml-ai",
    category: "Data Science",
    description: "Learn data science, machine learning, and AI fundamentals. Work with Python, pandas, scikit-learn, and build real-world ML models.",
    price: 16000,
    originalPrice: 24000,
    duration: "12 weeks",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    module: "Data Science",
    instructor: { name: "Sajan Kafle", title: "Data Scientist", bio: "Data scientist specializing in ML models and AI solutions.", avatar: "" },
    curriculum: [
      { title: "Python for Data Science", objectives: ["Learn Python for data analysis"], keyTopics: ["NumPy", "Pandas", "Matplotlib"], activities: ["Data analysis project"], deliverables: ["Analysis report"], tools: ["Jupyter"], duration: "2 weeks" },
    ],
  },
  {
    title: "Robotics & IoT with Arduino & Raspberry Pi",
    slug: "robotics-iot-arduino-raspberry-pi",
    category: "IoT",
    description: "Explore robotics and IoT using Arduino and Raspberry Pi. Build sensor systems, automation projects, and smart devices.",
    price: 16000,
    originalPrice: 24000,
    duration: "12 weeks",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b6f?w=800&q=80",
    module: "Hardware",
    instructor: { name: "Sajan Kafle", title: "IoT Engineer", bio: "Embedded systems engineer with expertise in Arduino and Raspberry Pi.", avatar: "" },
    curriculum: [
      { title: "Arduino Basics", objectives: ["Program Arduino microcontrollers"], keyTopics: ["GPIO", "Sensors", "Actuators"], activities: ["LED blink project"], deliverables: ["Sensor dashboard"], tools: ["Arduino IDE"], duration: "2 weeks" },
    ],
  },
  {
    title: "MERN Stack Bootcamp",
    slug: "mern-stack-bootcamp",
    category: "Development",
    description: "Complete full-stack development with MongoDB, Express, React, and Node.js. Build real-world applications from scratch to deployment.",
    price: 8000,
    originalPrice: 12000,
    duration: "12 weeks",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    module: "Full Stack",
    instructor: { name: "Sajan Kafle", title: "Full-Stack Lead", bio: "MERN stack expert building production applications since 2018.", avatar: "" },
    curriculum: [
      { title: "MongoDB & Express", objectives: ["Build REST APIs"], keyTopics: ["CRUD", "Mongoose", "Middleware"], activities: ["API development"], deliverables: ["REST API"], tools: ["MongoDB", "Express"], duration: "3 weeks" },
    ],
  },
];

const services = [
  { title: "Web App Development", slug: "web-app-development", description: "Custom web applications built with modern frameworks — React, Next.js, Laravel, Django, and Node.js. From MVPs to enterprise platforms.", icon: "FaCode", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80" },
  { title: "Mobile App Development", slug: "mobile-apps", description: "Cross-platform and native mobile apps using React Native and Flutter. iOS and Android with clean architecture.", icon: "FaMobileScreenButton", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" },
  { title: "UI/UX Design & Prototyping", slug: "ui-ux-prototyping", description: "User-centered interface design, wireframing, prototyping, and usability testing. Figma expert designs.", icon: "FaPenNib", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
  { title: "SEO & Digital Marketing", slug: "seo-marketing", description: "Search engine optimization, Google Ads, social media marketing, content strategy, and analytics.", icon: "FaChartLine", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
  { title: "E-Commerce Solutions", slug: "ecommerce-solutions", description: "Full e-commerce platforms with payment gateway integration (eSewa, Khalti, Fonepay), inventory management, and analytics.", icon: "FaStore", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
  { title: "Cloud & DevOps", slug: "cloud-devops", description: "AWS, Vercel, Docker, CI/CD pipelines, and cloud infrastructure setup and management.", icon: "FaCloud", image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80" },
  { title: "Brand Strategy & Identity", slug: "brand-strategy", description: "Logo design, brand guidelines, visual identity, and marketing collateral design.", icon: "FaPaintbrush", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
  { title: "AI & Automation Solutions", slug: "ai-automation", description: "Custom AI chatbots, workflow automation, data processing pipelines, and intelligent document processing.", icon: "FaRobot", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80" },
];

const products = [
  { title: "News Portal CMS", slug: "news-portal", description: "Full-featured news portal with category management, breaking news, multimedia support, and SEO optimization.", image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80", link: "https://newsportal-brown.vercel.app/" },
  { title: "School Management System", slug: "school-management-system", description: "Complete school management with student records, attendance, fees, exams, and parent communication portal.", image: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&q=80", link: "https://sms-lake-three.vercel.app/" },
  { title: "Clinic Queue Management", slug: "clinic-queue-management", description: "Digital queue management for clinics with appointment booking, token system, and SMS notifications.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", link: "https://cqms.vercel.app/" },
  { title: "E-Commerce Platform", slug: "ecommerce-platform", description: "Multi-vendor e-commerce platform with Nepal payment gateways, inventory tracking, and order management.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", link: "" },
];

async function seed() {
  await mongoose.connect(MONGODB_URI as string);
  console.log("Connected to MongoDB");

  // Clear existing data and seed
  const LiveCourse = mongoose.models.LiveCourse || mongoose.model("LiveCourse", new mongoose.Schema({}, { strict: false }));
  const Service = mongoose.models.Service || mongoose.model("Service", new mongoose.Schema({}, { strict: false }));
  const Product = mongoose.models.Product || mongoose.model("Product", new mongoose.Schema({}, { strict: false }));

  await LiveCourse.deleteMany({});
  await Service.deleteMany({});
  await Product.deleteMany({});

  await LiveCourse.insertMany(liveCourses);
  console.log(`Inserted ${liveCourses.length} live courses`);

  await Service.insertMany(services);
  console.log(`Inserted ${services.length} services`);

  await Product.insertMany(products);
  console.log(`Inserted ${products.length} products`);

  await mongoose.disconnect();
  console.log("Done — navbar seed complete");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
