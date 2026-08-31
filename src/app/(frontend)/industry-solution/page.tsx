import React from 'react'
import { IndustrySolutionContent } from '@/components/IndustrySolution/IndustrySolutionContent'
import { getIndustrySolutionCmsData } from '@/lib/cms'

export const metadata = {
  title: 'Industry Solutions | Magic Glass',
  description: 'Tailored architectural, aviation, automotive, hospitality, and transport glass solutions by Magic Glass.',
}

export default async function IndustrySolutionPage() {
  const cmsData = await getIndustrySolutionCmsData()
  return <IndustrySolutionContent cmsData={cmsData} />
}
