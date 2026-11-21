import React from 'react'
import type { Metadata } from 'next'
import { Hero } from '@/components/Hero/Hero'
import { Heritage } from '@/components/Heritage/Heritage'
import { ProductSystems } from '@/components/ProductSystems/ProductSystems'
import { GlassApplications } from '@/components/GlassApplications/GlassApplications'
import { Craftsmanship } from '@/components/Craftsmanship/Craftsmanship'
import { TrustBanner } from '@/components/TrustBanner/TrustBanner'
import { Testimonials } from '@/components/Testimonials/Testimonials'
import { CategorySwitcher } from '@/components/CategorySwitcher/CategorySwitcher'
import { getHomePageCmsData } from '@/lib/cms'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Magic Glass — Architectural Glass Engineering & Processing Pune',
  description:
    'Leading architectural glass processor in Pune, India. Premium tempered, DGU Insulated, Sentry Laminated, Low-E, and Ceramic Fritted Glass for high-rise facades and luxury residences.',
  alternates: {
    canonical: 'https://magicglass.co.in',
  },
  openGraph: {
    title: 'Magic Glass — Architectural Glass Engineering & Processing',
    description:
      'Precision architectural glass processing in Pune, India. Tempered, DGU Insulated, Sentry Laminated, Low-E, and Ceramic Fritted Glass.',
    url: 'https://magicglass.co.in',
    images: ['/images/hero-bg.jpg'],
  },
}

export default async function HomePage() {
  const cmsData = await getHomePageCmsData()

  return (
    <>
      <Hero cmsData={cmsData?.hero as any} />
      <Heritage cmsData={cmsData?.heritage as any} />
      <GlassApplications cmsData={cmsData?.glassApplications as any} />
      <Craftsmanship cmsData={cmsData?.craftsmanship as any} />
      <TrustBanner cmsData={cmsData?.trustBanner as any} />
      <Testimonials cmsData={cmsData?.testimonials as any} />
      <CategorySwitcher cmsData={cmsData?.categorySwitcher as any} />
    </>
  )
}
