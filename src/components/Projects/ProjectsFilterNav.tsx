'use client'

import React from 'react'
import { ProjectCategory } from '@/types/projects.types'
import styles from './ProjectsFilterNav.module.css'

interface ProjectsFilterNavProps {
  categories: { name: ProjectCategory; count: number }[]
  activeCategory: ProjectCategory
  onSelectCategory: (category: ProjectCategory) => void
}

export const ProjectsFilterNav: React.FC<ProjectsFilterNavProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <nav className={styles.stickyNavContainer}>
      <div className={styles.headerLabel}>PROJECTS ARCHIVE</div>

      <div className={styles.filterGroup}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name
          return (
            <button
              key={cat.name}
              type="button"
              className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
              onClick={() => onSelectCategory(cat.name)}
            >
              {cat.name} <span className={styles.countBadge}>({cat.count})</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
