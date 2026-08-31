'use client'

import React, { useRef } from 'react'
import styles from './PdpImageSlider.module.css'
import { PdpScrubbedImage } from './PdpScrubbedImage'
import { IndustryItem } from './pdpData'

export interface SliderItem {
  image: string
  title?: string
  description?: string
}

interface PdpImageSliderProps {
  images?: string[]
  industryItems?: IndustryItem[] | SliderItem[]
  title?: string
}

const DEFAULT_OFFICIAL_INDUSTRIES: IndustryItem[] = [
  {
    title: 'AIRPORT',
    image: 'https://magicglass.co.in/wp-content/uploads/2023/12/industry-banner-1.jpg',
    description:
      'The airport industry seeks glass solutions to enhance passenger experience in premium terminals. Façades, partitions and panels elevate visual appeal with luxurious and durable aesthetics.',
  },
  {
    title: 'ARCHITECTURE',
    image: 'https://magicglass.co.in/wp-content/uploads/2023/12/Architecture.jpg',
    description:
      'Demanding premium glass delivering strength, clarity and energy efficiency. Facades, windows and partitions withstand climatic conditions while maintaining structural integrity.',
  },
  {
    title: 'AUTOMOBILE',
    image: 'https://magicglass.co.in/wp-content/uploads/2023/12/Automobile-industry.jpg',
    description:
      'Lightweight safety glazing engineered for varying climatic conditions. Windows, windshields and sunroofs tested under extreme temperatures and vibrations.',
  },
  {
    title: 'HOSPITALITY',
    image: 'https://magicglass.co.in/wp-content/uploads/2023/12/Hospitality.jpg',
    description:
      'Elevating guest experience through luxurious aesthetics in hotel lobbies and interiors offering clarity, shine and high durability under daily use.',
  },
  {
    title: 'TRANSPORT',
    image: 'https://magicglass.co.in/wp-content/uploads/2023/12/Automobile.jpg',
    description:
      'Strong, heat-resistant and energy efficient glass for transit hubs, airports, and train stations providing safety, heat insulation, and natural daylight.',
  },
]

export const PdpImageSlider: React.FC<PdpImageSliderProps> = ({
  images,
  industryItems,
  title,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)

  // Derive active items: use passed industryItems, or default official live industries if empty
  const activeIndustryItems =
    industryItems && industryItems.length > 0
      ? industryItems
      : DEFAULT_OFFICIAL_INDUSTRIES

  const items: SliderItem[] = activeIndustryItems.map((item) => ({
    image: item.image,
    title: item.title,
    description: item.description,
  }))

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
        <div>
          <span className={styles.sectionBadge}>SECTOR FOCUS</span>
          <h2 className={styles.sectionTitle} data-cms-field="industryTitle">
            <span className={styles.redHeading}>Our</span>{' '}
            {title ? title.replace(/^Our\s+/i, '') : 'Industry'}
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

      <div ref={trackRef} className={styles.slideTrack} data-cms-field="industries">
        {items.map((item, index) => (
          <div key={index} className={styles.slideCard}>
            <div className={styles.imageFrame}>
              <PdpScrubbedImage
                src={item.image}
                alt={item.title || `Industry Item ${index + 1}`}
                width="100%"
                height="100%"
              />

              {item.description && (
                <div className={styles.hoverOverlay}>
                  {item.title && (
                    <div className={styles.hoverTitle}>{item.title}</div>
                  )}
                  <p className={styles.hoverDescription}>{item.description}</p>
                </div>
              )}
            </div>

            {item.title && (
              <div className={styles.itemCaption}>
                <span className={styles.captionTag}>{item.title}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
