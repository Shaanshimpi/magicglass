import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magicglass.co.in'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard',
          '/dashboard/*',
          '/mock-dashboard',
          '/mock-dashboard/*',
          '/color-options',
          '/color-options/*',
          '/staff-login',
          '/login',
          '/api/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
