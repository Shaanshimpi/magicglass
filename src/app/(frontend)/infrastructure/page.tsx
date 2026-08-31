import React from 'react'
import { InfrastructureContent } from '@/components/Infrastructure/InfrastructureContent'
import { getInfrastructureCmsData } from '@/lib/cms'

export const metadata = {
  title: 'Infrastructure | Magic Glass',
  description: 'State-of-the-art glass manufacturing facilities, cutting-edge machinery, and quality infrastructure by Magic Glass.',
}

export default async function InfrastructurePage() {
  const cmsData = await getInfrastructureCmsData()
  return <InfrastructureContent cmsData={cmsData} />
}
