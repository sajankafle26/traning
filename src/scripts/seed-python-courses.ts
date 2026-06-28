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
import LiveCourse from "@/models/LiveCourse";

const newCourses = [
    {
        title: "Web Development with Python & Django",
        slug: "web-development-with-python-and-django",
        category: "js",
        description: "Master backend web development with Python and Django. Build scalable web applications, REST APIs, authentication systems, and deploy to production.",
        price: 15000,
        originalPrice: 20000,
        duration: "2 Hours per day",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=800",
        module: "Module I",
        curriculum: [
            {
                title: "Python Fundamentals",
                objectives: ["Master Python basics and OOP", "Understand virtual environments and pip"],
                keyTopics: ["Variables, Data Types, Control Flow", "Functions, Classes, Modules", "File Handling & Error Handling"],
                activities: ["Build a CLI application"],
                deliverables: ["Python fundamentals project"],
                tools: ["VS Code", "Python 3.x"],
                duration: "2 weeks",
            },
            {
                title: "Django Framework Basics",
                objectives: ["Build web apps with Django", "Understand MVC/MVT architecture"],
                keyTopics: ["Django Installation & Project Setup", "Models, Views, Templates (MVT)", "URL Routing & Forms"],
                activities: ["Build a blog application"],
                deliverables: ["Working Django blog"],
                tools: ["Django", "SQLite", "HTML/CSS"],
                duration: "3 weeks",
            },
            {
                title: "Advanced Django & REST APIs",
                objectives: ["Build RESTful APIs", "Implement authentication and permissions"],
                keyTopics: ["Django REST Framework", "Authentication (JWT, Token)", "Serializers, ViewSets, Routers"],
                activities: ["Build a REST API for a mobile app"],
                deliverables: ["Full REST API with documentation"],
                tools: ["DRF", "Postman", "JWT"],
                duration: "3 weeks",
            },
            {
                title: "Deployment & Production",
                objectives: ["Deploy Django apps to production", "Set up CI/CD pipelines"],
                keyTopics: ["Gunicorn & Nginx", "Docker Basics", "AWS/DigitalOcean Deployment"],
                activities: ["Deploy a complete project"],
                deliverables: ["Live production application"],
                tools: ["Docker", "Nginx", "AWS"],
                duration: "2 weeks",
            },
        ],
        instructor: {
            name: "Er Sajan Kafle",
            title: "Senior Python Developer",
            avatar: "https://i.pravatar.cc/150?u=sajandj",
            bio: "Full-stack developer with extensive experience in Python/Django ecosystem.",
        },
    },
    {
        title: "Python with Data Science, ML & AI Training",
        slug: "python-with-data-science-ml-ai-training",
        category: "js",
        description: "Comprehensive training in Data Science, Machine Learning, and Artificial Intelligence using Python. Master pandas, NumPy, scikit-learn, TensorFlow, and build real-world AI projects.",
        price: 18000,
        originalPrice: 25000,
        duration: "2.5 Hours per day",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
        module: "Module I",
        curriculum: [
            {
                title: "Python for Data Science",
                objectives: ["Master Python libraries for data analysis", "Handle and manipulate datasets"],
                keyTopics: ["NumPy Arrays & Operations", "Pandas DataFrames", "Data Cleaning & Transformation"],
                activities: ["Analyze a real-world dataset"],
                deliverables: ["Data analysis report"],
                tools: ["Jupyter Notebook", "NumPy", "Pandas"],
                duration: "3 weeks",
            },
            {
                title: "Data Visualization & EDA",
                objectives: ["Create compelling visualizations", "Perform Exploratory Data Analysis"],
                keyTopics: ["Matplotlib & Seaborn", "Plotly Interactive Charts", "Statistical EDA Techniques"],
                activities: ["Build an EDA dashboard"],
                deliverables: ["Interactive visualization report"],
                tools: ["Matplotlib", "Seaborn", "Plotly"],
                duration: "2 weeks",
            },
            {
                title: "Machine Learning Fundamentals",
                objectives: ["Understand ML algorithms", "Build and evaluate ML models"],
                keyTopics: ["Supervised Learning (Regression, Classification)", "Unsupervised Learning (Clustering, PCA)", "Model Evaluation & Hyperparameter Tuning"],
                activities: ["Build a prediction model"],
                deliverables: ["Trained ML model with evaluation metrics"],
                tools: ["scikit-learn", "XGBoost", "Google Colab"],
                duration: "4 weeks",
            },
            {
                title: "Deep Learning & AI Applications",
                objectives: ["Build neural networks", "Deploy AI models"],
                keyTopics: ["Neural Networks & TensorFlow", "CNNs for Image Recognition", "NLP Basics & Transformers", "ChatGPT & LLM Concepts"],
                activities: ["Build an image classifier and chatbot"],
                deliverables: ["Deep learning project portfolio"],
                tools: ["TensorFlow", "Keras", "Hugging Face"],
                duration: "4 weeks",
            },
        ],
        instructor: {
            name: "Er Sajan Kafle",
            title: "AI & Data Science Instructor",
            avatar: "https://i.pravatar.cc/150?u=sajandata",
            bio: "Passionate about making AI and Data Science accessible to everyone through hands-on training.",
        },
    },
];

async function seed() {
    await dbConnect();
    for (const course of newCourses) {
        const exists = await LiveCourse.findOne({ slug: course.slug });
        if (!exists) {
            await LiveCourse.create(course);
            console.log(`Created: ${course.title}`);
        } else {
            console.log(`Exists: ${course.title}`);
        }
    }
    process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
