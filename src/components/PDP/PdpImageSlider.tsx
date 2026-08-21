'use client'

import React, { useRef } from 'react'
import styles from './PdpImageSlider.module.css'
import { PdpScrubbedImage } from './PdpScrubbedImage'

interface PdpImageSliderProps {
  images: string[]
}

export const PdpImageSlider: React.FC<PdpImageSliderProps> = ({ images }) => {
  const trackRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const scrollAmount = 400
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderHeader}>
        <div className={styles.eyebrow}>PROJECT INSTALLATION SHOWCASE</div>
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

      <div ref={trackRef} className={styles.slideTrack}>
        {images.map((img, index) => (
          <div key={index} className={styles.slideItem}>
            <PdpScrubbedImage
              src={img}
              alt={`Project Installation ${index + 1}`}
              width="100%"
              height="100%"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
