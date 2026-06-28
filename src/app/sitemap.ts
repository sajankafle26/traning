import { MetadataRoute } from 'next'

const baseUrl = 'https://sangalotech.com.np'

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date()

    // Public routes
    const routes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/courses`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/upcoming`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/internships`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/video-courses`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/products`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/onlineform`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ]

    // Dynamic service detail pages
    const serviceSlugs = [
        'web-app-development',
        'mobile-app-development',
        'seo-and-marketing',
        'ui-ux-design',
        'e-commerce-solutions',
        'cloud-and-devops',
    ]
    const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
        url: `${baseUrl}/services/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Dynamic course pages
    const courseSlugs = [
        'mern-stack-mastery',
        'react-and-nextjs-mastery',
        'php-laravel-development',
        'wordpress-customization',
        'ui-ux-design-training',
        'digital-marketing-pro',
        'robotics-and-iot-mastery',
        'web-development-with-python-and-django',
        'python-with-data-science-ml-ai-training',
    ]
    const courseRoutes: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
        url: `${baseUrl}/courses/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...serviceRoutes, ...courseRoutes]
}
