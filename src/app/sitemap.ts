import { MetadataRoute } from 'next'
import dbConnect from '@/lib/dbConnect'
import LiveCourse from '@/models/LiveCourse'
import Service from '@/models/Service'
import { Blog } from '@/models/BlogProduct'

const baseUrl = 'https://sangalotech.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date()

    // Static routes
    const routes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
        { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/courses`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/training`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/upcoming`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/products`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/video-marketplace`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    ]

    // Dynamic routes from database
    let dynamicRoutes: MetadataRoute.Sitemap = []

    try {
        await dbConnect()

        // Fetch courses
        const courses = await LiveCourse.find({}, 'slug updatedAt').lean()
        const courseRoutes: MetadataRoute.Sitemap = courses.map((c: any) => ({
            url: `${baseUrl}/courses/${c.slug}`,
            lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))

        // Fetch services
        const services = await Service.find({}, 'slug updatedAt').lean()
        const serviceRoutes: MetadataRoute.Sitemap = services.map((s: any) => ({
            url: `${baseUrl}/services/${s.slug}`,
            lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))

        // Fetch blog posts
        const blogs = await Blog.find({ published: true }, 'slug updatedAt').lean()
        const blogRoutes: MetadataRoute.Sitemap = blogs.map((b: any) => ({
            url: `${baseUrl}/blog/${b.slug}`,
            lastModified: b.updatedAt ? new Date(b.updatedAt) : now,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))

        dynamicRoutes = [...courseRoutes, ...serviceRoutes, ...blogRoutes]
    } catch (e) {
        // If DB fails, return only static routes
        console.error('[sitemap] Failed to fetch dynamic routes:', e)
    }

    return [...routes, ...dynamicRoutes]
}
