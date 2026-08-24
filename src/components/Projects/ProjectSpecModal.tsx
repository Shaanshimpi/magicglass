'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ProjectItem } from '@/types/projects.types'
import styles from './ProjectSpecModal.module.css'

interface ProjectSpecModalProps {
  project: ProjectItem | null
  onClose: () => void
  onOpenQuoteDrawer?: () => void
}

export const ProjectSpecModal: React.FC<ProjectSpecModalProps> = ({
  project,
  onClose,
  onOpenQuoteDrawer,
}) => {
  const [imgSrc, setImgSrc] = useState<string>('')

  useEffect(() => {
    if (project) {
      setImgSrc(project.image)
    }
  }, [project])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.modalCard}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close Project Specs"
        >
          &times;
        </button>

        <div className={styles.modalImageCol}>
          <Image
            src={imgSrc || project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.modalImage}
            onError={() => setImgSrc('/images/projects/balmoral-by-riverside.jpg')}
            quality={90}
          />
        </div>

        <div className={styles.modalDetailsCol}>
          <div>
            <div className={styles.categoryTag}>{project.category} PROJECT</div>
            <h2 className={styles.projectTitle}>{project.title}</h2>

            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Developer / Client</span>
                <span className={styles.specValue}>{project.developer}</span>
              </div>

              <div className={styles.specItem}>
                <span className={styles.specLabel}>Location</span>
                <span className={styles.specValue}>{project.location}</span>
              </div>

              <div className={styles.specItem}>
                <span className={styles.specLabel}>Application</span>
                <span className={styles.specValue}>{project.application}</span>
              </div>

              <div className={styles.specItem}>
                <span className={styles.specLabel}>Glass Specification</span>
                <span className={styles.specValue}>{project.glassDescription}</span>
              </div>

              {project.areaSqMtr && (
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>Glazing Volume</span>
                  <span className={styles.specValue}>{project.areaSqMtr.toLocaleString()} Sq. Mtr</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.footerAction}>
            <button
              type="button"
              className="button--red"
              onClick={() => {
                onClose()
                onOpenQuoteDrawer?.()
              }}
              style={{ width: '100%', padding: '0.85rem' }}
            >
              INQUIRE ABOUT THIS SPECIFICATION
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
