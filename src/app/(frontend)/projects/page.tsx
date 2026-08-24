'use client'

import React, { useState } from 'react'
import { ProjectsHero } from '@/components/Projects/ProjectsHero'
import { ProjectsFilterNav } from '@/components/Projects/ProjectsFilterNav'
import { ProjectsGrid } from '@/components/Projects/ProjectsGrid'
import { ProjectSpecModal } from '@/components/Projects/ProjectSpecModal'
import { ProjectItem, ProjectCategory } from '@/types/projects.types'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'
import mockProjectsData from '@/data/projects_mock.json'

export default function ProjectsPage() {
  const { openQuoteDrawer } = useLayoutContext()
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const projects = mockProjectsData as ProjectItem[]

  const filteredProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())

  const categories: { name: ProjectCategory; count: number }[] = [
    { name: 'ALL', count: projects.length },
    { name: 'Residential', count: projects.filter((p) => p.category === 'Residential').length },
    { name: 'Commercial', count: projects.filter((p) => p.category === 'Commercial').length },
    { name: 'Airports', count: projects.filter((p) => p.category === 'Airports').length },
  ]

  return (
    <div style={{ backgroundColor: 'var(--color-black)', minHeight: '100vh', paddingTop: '70px' }}>
      <ProjectsHero
        projects={projects}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <ProjectsFilterNav
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />

      <ProjectsGrid
        projects={filteredProjects}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <ProjectSpecModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuoteDrawer={openQuoteDrawer}
      />
    </div>
  )
}

