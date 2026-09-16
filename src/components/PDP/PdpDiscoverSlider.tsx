'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import styles from './PdpDiscoverSlider.module.css'
import { PdpScrubbedImage } from './PdpScrubbedImage'
import { resolveProjectInfo, PdpLinkedProject } from './pdpProjectsRegistry'
import { FiArrowUpRight } from 'react-icons/fi'

interface PdpDiscoverSliderProps {
  images?: Array<string | PdpLinkedProject | any>
  title?: string
}

const DEFAULT_DISCOVER_IMAGES = [
  '/images/projects/balmoral-by-riverside.jpg',
  '/images/projects/the-ark.jpg',
  '/images/projects/verde.jpg',
  '/images/projects/ganga-platino.jpg',
]

export const PdpDiscoverSlider: React.FC<PdpDiscoverSliderProps> = ({
  images,
  title = 'Discover Architectural Excellence',
}) => {
  const trackRef = useRef<HTMLDivElement>(null)

  const activeImages =
    Array.isArray(images) && images.length > 0
      ? images
      : DEFAULT_DISCOVER_IMAGES

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const scrollAmount = 420
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className={styles.discoverSection}>
      <div className={styles.discoverHeader}>
        <div>
          <span className={styles.sectionBadge}>DISCOVER</span>
          <h2 className={styles.sectionTitle} data-cms-field="discoverTitle">
            <span className={styles.redHeading}>Featured</span>{' '}
            {title ? title.replace(/^Featured\s+/i, '') : 'Installations'}
          </h2>
        </div>

        <div className={styles.sliderNav}>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => handleScroll('left')}
            aria-label="Previous Slide"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => handleScroll('right')}
            aria-label="Next Slide"
          >
            →
          </button>
        </div>
      </div>

      <div ref={trackRef} className={styles.slideTrack} data-cms-field="sliderImages">
        {activeImages.map((rawItem, index) => {
          const project = resolveProjectInfo(rawItem)
          return (
            <div key={index} className={styles.slideCard}>
              <Link
                href="/projects"
                className={styles.cardLinkWrapper}
                title={`View ${project.title} in Projects Portfolio`}
              >
                <div className={styles.imageFrame}>
                  <PdpScrubbedImage
                    src={project.src}
                    alt={`${project.title} - Magic Glass Installation`}
                    width="100%"
                    height="100%"
                  />
                  {project.category && (
                    <div className={styles.imageOverlayBadge}>
                      <span>{project.category}</span>
                    </div>
                  )}
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.footerTopRow}>
                    <span className={styles.cardNumber}>FEATURED // 0{index + 1}</span>
                    <span className={styles.projectTag} title={project.title}>
                      {project.title}
                    </span>
                  </div>
                  {(project.developer || project.location) && (
                    <div className={styles.footerDetailsRow}>
                      <span className={styles.projectSubtitle}>
                        {[project.developer, project.location].filter(Boolean).join(' • ')}
                      </span>
                      <span className={styles.viewProjectArrow}>
                        <FiArrowUpRight size={13} />
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
