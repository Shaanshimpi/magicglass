import React from 'react'
import { getProjectsCmsData } from '@/lib/cms'
import { ProjectsClientContent } from '@/components/Projects/ProjectsClientContent'
import { ProjectItem } from '@/types/projects.types'

export default async function ProjectsPage() {
  const projectsData = await getProjectsCmsData()
  return <ProjectsClientContent initialProjects={projectsData as ProjectItem[]} />
}
