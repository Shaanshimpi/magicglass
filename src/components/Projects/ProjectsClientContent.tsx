'use client'

import React, { useState, useEffect } from 'react'
import { ProjectsHero } from '@/components/Projects/ProjectsHero'
import { ProjectsFilterNav } from '@/components/Projects/ProjectsFilterNav'
import { ProjectsGrid } from '@/components/Projects/ProjectsGrid'
import { ProjectSpecModal } from '@/components/Projects/ProjectSpecModal'
import { TrustBanner } from '@/components/TrustBanner/TrustBanner'
import { ProjectItem, ProjectCategory } from '@/types/projects.types'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'

interface ProjectsClientContentProps {
  initialProjects: ProjectItem[]
  heroProjects?: ProjectItem[]
  trustBannerData?: any
}

export function ProjectsClientContent({
  initialProjects,
  heroProjects,
  trustBannerData,
}: ProjectsClientContentProps) {
  const { openQuoteDrawer, isLoaded } = useLayoutContext()
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | null>(null)

  const projects = initialProjects

  // Hash Navigation Handler: Smooth scroll & highlight project when URL has a hash (e.g. #pune-airport)
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let highlightTimeout: NodeJS.Timeout

    const handleHashNavigation = () => {
      if (typeof window === 'undefined') return
      const rawHash = window.location.hash ? window.location.hash.replace(/^#/, '').trim() : ''
      if (!rawHash) return

      // Look up target project by id, slug, or kebab-case title
      const target = projects.find(
        (p: any) =>
          (p.id && p.id.toLowerCase() === rawHash.toLowerCase()) ||
          (p.slug && p.slug.toLowerCase() === rawHash.toLowerCase()) ||
          (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === rawHash.toLowerCase())
      )

      if (target) {
        // Ensure category filter does not hide the target project
        setActiveCategory((currentCategory) => {
          if (
            currentCategory !== 'ALL' &&
            target.category.toLowerCase() !== currentCategory.toLowerCase()
          ) {
            return 'ALL'
          }
          return currentCategory
        })

        setHighlightedProjectId(target.id)

        // Multiple timed scroll passes to ensure accuracy during page hydration and image loading
        let attempts = 0
        const maxAttempts = 15

        const tryScroll = () => {
          attempts++
          const el =
            document.getElementById(target.id) ||
            document.querySelector(`[data-project-id="${target.id}"]`)

          if (el) {
            const headerOffset = 110 // Fixed navbar height + comfortable padding
            const elementPosition = el.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset

            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: attempts <= 2 ? 'smooth' : 'auto',
            })

            // Refinement pass after 350ms in case hero carousel or layout shifted
            if (attempts <= 2) {
              scrollTimeout = setTimeout(tryScroll, 350)
            }
          } else if (attempts < maxAttempts) {
            scrollTimeout = setTimeout(tryScroll, 100)
          }
        }

        // Run after DOM frame ready
        requestAnimationFrame(() => {
          scrollTimeout = setTimeout(tryScroll, 120)
        })

        // Auto remove highlight aura after 5 seconds
        clearTimeout(highlightTimeout)
        highlightTimeout = setTimeout(() => {
          setHighlightedProjectId(null)
        }, 5000)
      }
    }

    handleHashNavigation()
    window.addEventListener('hashchange', handleHashNavigation)

    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
      clearTimeout(scrollTimeout)
      clearTimeout(highlightTimeout)
    }
  }, [projects, isLoaded])

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
        heroProjects={heroProjects}
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
        highlightedProjectId={highlightedProjectId}
      />

      <TrustBanner cmsData={trustBannerData} />

      <ProjectSpecModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuoteDrawer={openQuoteDrawer}
      />
    </div>
  )
}
