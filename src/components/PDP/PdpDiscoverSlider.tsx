'use client'

import React, { useRef } from 'react'
import styles from './PdpDiscoverSlider.module.css'
import { PdpScrubbedImage } from './PdpScrubbedImage'

interface PdpDiscoverSliderProps {
  images?: string[]
  title?: string
}

const DEFAULT_DISCOVER_IMAGES = [
  'https://magicglass.co.in/wp-content/uploads/2023/12/Balmoral-by-riverside.jpg',
  'https://magicglass.co.in/wp-content/uploads/2023/12/the-ark-Tribeca-devlopers.jpg',
  'https://magicglass.co.in/wp-content/uploads/2023/12/VARDE-ABIL.jpg',
  'https://magicglass.co.in/wp-content/uploads/2023/12/Ganga-Platino-.jpg',
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
        {activeImages.map((imgSrc, index) => (
          <div key={index} className={styles.slideCard}>
            <div className={styles.imageFrame}>
              <PdpScrubbedImage
                src={imgSrc}
                alt={`Architectural Installation ${index + 1}`}
                width="100%"
                height="100%"
              />
            </div>
            <div className={styles.cardFooter}>
              <span className={styles.cardNumber}>FEATURED // 0{index + 1}</span>
              <span className={styles.cardTag}>MAGIC GLASS INSTALLATION</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
