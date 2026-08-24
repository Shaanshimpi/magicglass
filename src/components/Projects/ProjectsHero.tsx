'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ProjectItem } from '@/types/projects.types'
import styles from './ProjectsHero.module.css'

interface ProjectsHeroProps {
  projects: ProjectItem[]
  onSelectProject: (project: ProjectItem) => void
}

export const ProjectsHero: React.FC<ProjectsHeroProps> = ({ projects, onSelectProject }) => {
  const heroProjects = projects.filter((p) => p.heroFeatured)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const activeProject = heroProjects[currentIndex] || projects[0]

  const handleNext = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heroProjects.length)
      setIsTransitioning(false)
    }, 150)
  }, [heroProjects.length])

  const handlePrev = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + heroProjects.length) % heroProjects.length)
      setIsTransitioning(false)
    }, 150)
  }, [heroProjects.length])

  useEffect(() => {
    const timer = setInterval(handleNext, 6000)
    return () => clearInterval(timer)
  }, [handleNext])

  if (!activeProject) return null

  return (
    <section className={styles.heroSection}>
      <div
        className={styles.slideBackground}
        style={{ opacity: isTransitioning ? 0.4 : 1 }}
      >
        <Image
          src={activeProject.image}
          alt={activeProject.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          quality={90}
        />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.metaBadge}>
          PROJECT [{String(currentIndex + 1).padStart(2, '0')} / {String(heroProjects.length).padStart(2, '0')}] &bull; {activeProject.category}
        </div>
        <h1 className={styles.heroTitle}>{activeProject.title}</h1>
        <p className={styles.heroTagline}>
          {activeProject.developer} &bull; {activeProject.location} &mdash; {activeProject.tagline}
        </p>
      </div>

      <div className={styles.controlsBar}>
        <button
          type="button"
          className={styles.navButton}
          onClick={handlePrev}
          aria-label="Previous Slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          className={styles.navButton}
          onClick={handleNext}
          aria-label="Next Slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${((currentIndex + 1) / heroProjects.length) * 100}%` }}
        />
      </div>
    </section>
  )
}
