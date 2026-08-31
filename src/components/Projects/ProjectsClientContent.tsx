'use client'

import React, { useState } from 'react'
import { ProjectsHero } from '@/components/Projects/ProjectsHero'
import { ProjectsFilterNav } from '@/components/Projects/ProjectsFilterNav'
import { ProjectsGrid } from '@/components/Projects/ProjectsGrid'
import { ProjectSpecModal } from '@/components/Projects/ProjectSpecModal'
import { ProjectItem, ProjectCategory } from '@/types/projects.types'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'

interface ProjectsClientContentProps {
  initialProjects: ProjectItem[]
}

export function ProjectsClientContent({ initialProjects }: ProjectsClientContentProps) {
  const { openQuoteDrawer } = useLayoutContext()
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const projects = initialProjects

  const filteredProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())

  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))
  const categories: { name: ProjectCategory; count: number }[] = [
    { name: 'ALL' as ProjectCategory, count: projects.length },
    ...uniqueCategories.map((cat) => ({
      name: cat as ProjectCategory,
      count: projects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length,
    })),
  ]

  return (
    <div style={{ backgroundColor: 'var(--color-black)', minHeight: '100vh' }}>
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
