'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ProjectItem } from '@/types/projects.types'
import { getProjectFallbackImage } from '@/lib/projectImages'
import styles from './ProjectsGrid.module.css'

interface ProjectsGridProps {
  projects: ProjectItem[]
  onSelectProject: (project: ProjectItem) => void
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onSelectProject }) => {
  const [imageErrorCounts, setImageErrorCounts] = useState<Record<string, number>>({})

  const handleImageError = (id: string) => {
    setImageErrorCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  return (
    <section className={styles.gridSection}>
      <div className={styles.gridContainer}>
        {projects.map((project) => {
          const errorCount = imageErrorCounts[project.id] || 0
          // If 0 errors: try primary image
          // If 1 error: fall back to this project's authentic local image
          // If >1 errors: fall back to safe local hero image
          let imgSrc = project.image
          if (errorCount === 1) {
            imgSrc = getProjectFallbackImage(project)
          } else if (errorCount > 1) {
            imgSrc = '/images/projects/the-oberoi-nariman-point.jpg'
          }

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
                  quality={85}
                  className={styles.cardImage}
                  onError={() => handleImageError(project.id)}
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

