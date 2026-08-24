'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ProjectItem } from '@/types/projects.types'
import styles from './ProjectsGrid.module.css'

interface ProjectsGridProps {
  projects: ProjectItem[]
  onSelectProject: (project: ProjectItem) => void
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onSelectProject }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <section className={styles.gridSection}>
      <div className={styles.gridContainer}>
        {projects.map((project) => {
          const hasError = imageErrors[project.id]
          const imgSrc = hasError
            ? '/images/projects/balmoral-by-riverside.jpg'
            : project.image

          return (
            <div
              key={project.id}
              className={styles.gridItem}
              onClick={() => onSelectProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectProject(project)
                }
              }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={imgSrc}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImage}
                  onError={() => handleImageError(project.id)}
                  quality={85}
                />
                <div className={styles.hoverOverlay}>
                  <span className={styles.viewBadge}>VIEW SPECS</span>
                </div>
              </div>

              <div className={styles.cardMeta}>
                <div className={styles.cardCategory}>{project.category}</div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardLocation}>
                  {project.developer} &bull; {project.location}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
