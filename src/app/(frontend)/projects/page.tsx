import React from 'react'
import { getProjectsPageCmsData, getHomePageCmsData } from '@/lib/cms'
import { ProjectsClientContent } from '@/components/Projects/ProjectsClientContent'
import { ProjectItem } from '@/types/projects.types'

export const metadata = {
  title: 'Architectural Projects Portfolio | Magic Glass',
  description:
    'Explore our landmark architectural projects portfolio spanning airports, commercial towers, luxury residences, and public infrastructure.',
}

export default async function ProjectsPage() {
  const [projectsPageData, homeCmsData] = await Promise.all([
    getProjectsPageCmsData(),
    getHomePageCmsData(),
  ])

  return (
    <ProjectsClientContent
      initialProjects={projectsPageData.allProjects as ProjectItem[]}
      heroProjects={projectsPageData.heroProjects as ProjectItem[]}
      trustBannerData={homeCmsData?.trustBanner}
    />
  )
}
