import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/adminpanel/', '/api/', '/_next/', '/student-dashboard/', '/dashboard/'],
            },
        ],
        sitemap: 'https://sangalotech.com/sitemap.xml',
    }
}
