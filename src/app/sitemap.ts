import type { MetadataRoute } from 'next'
import { PDP_MOCK_DATA } from '@/components/PDP/pdpData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magicglass.co.in'
  const currentDate = new Date()

  // 1. Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/toughened-glass`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/industry-solution`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/infrastructure`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // 2. Dynamic Product Detail Pages
  const productRoutes: MetadataRoute.Sitemap = Object.keys(PDP_MOCK_DATA).map(
    (slug) => ({
      url: `${baseUrl}/products/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })
  )

  return [...staticRoutes, ...productRoutes]
}
