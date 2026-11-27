import React from 'react'
import { AboutContent } from '@/components/About/AboutContent'
import { getAboutPageCmsData } from '@/lib/cms'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'About Us | Magic Glass',
  description:
    'Discover Magic Glass: bespoke architectural glazing, technical craftsmanship, culture, values, team, and client stories.',
}

export default async function AboutPage() {
  const cmsData = await getAboutPageCmsData()
  return <AboutContent cmsData={cmsData} />
}
