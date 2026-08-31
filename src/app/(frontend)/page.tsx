import React from 'react'
import { Hero } from '@/components/Hero/Hero'
import { Heritage } from '@/components/Heritage/Heritage'
import { ProductSystems } from '@/components/ProductSystems/ProductSystems'
import { Craftsmanship } from '@/components/Craftsmanship/Craftsmanship'
import { TrustBanner } from '@/components/TrustBanner/TrustBanner'
import { Testimonials } from '@/components/Testimonials/Testimonials'
import { CategorySwitcher } from '@/components/CategorySwitcher/CategorySwitcher'
import { getHomePageCmsData } from '@/lib/cms'

export default async function HomePage() {
  const cmsData = await getHomePageCmsData()

  return (
    <>
      <Hero cmsData={cmsData?.hero as any} />
      <Heritage cmsData={cmsData?.heritage as any} />
      <ProductSystems cmsData={cmsData?.glassApplications as any} />
      <Craftsmanship cmsData={cmsData?.craftsmanship as any} />
      <TrustBanner cmsData={cmsData?.trustBanner as any} />
      <Testimonials cmsData={cmsData?.testimonials as any} />
      <CategorySwitcher cmsData={cmsData?.categorySwitcher as any} />
    </>
  )
}
