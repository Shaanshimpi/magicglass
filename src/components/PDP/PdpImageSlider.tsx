'use client'

import React, { useRef, useEffect } from 'react'
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
    image: '/images/products/details/Airports.png',
    description:
      'The airport industry seeks glass solutions to enhance passenger experience in premium terminals. Façades, partitions and panels elevate visual appeal with luxurious and durable aesthetics.',
  },
  {
    title: 'ARCHITECTURE',
    image: '/images/products/details/architecture.png',
    description:
      'Demanding premium glass delivering strength, clarity and energy efficiency. Facades, windows and partitions withstand climatic conditions while maintaining structural integrity.',
  },
  {
    title: 'AUTOMOBILE',
    image: '/images/products/details/automotive.png',
    description:
      'Lightweight safety glazing engineered for varying climatic conditions. Windows, windshields and sunroofs tested under extreme temperatures and vibrations.',
  },
  {
    title: 'HOSPITALITY',
    image: '/images/products/details/hospitality-1.png',
    description:
      'Elevating guest experience through luxurious aesthetics in hotel lobbies and interiors offering clarity, shine and high durability under daily use.',
  },
  {
    title: 'TRANSPORT',
    image: '/images/products/details/Transport.png',
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
  const currentIndexRef = useRef(0)
  const isProgrammaticScroll = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

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

  const handleTrackScroll = () => {
    if (isProgrammaticScroll.current) return
    if (!trackRef.current) return
    const track = trackRef.current
    const cards = Array.from(track.children) as HTMLElement[]
    if (cards.length === 0) return

    const trackLeft = track.getBoundingClientRect().left
    let closestIndex = 0
    let minDiff = Infinity

    cards.forEach((card, idx) => {
      const diff = Math.abs(card.getBoundingClientRect().left - trackLeft)
      if (diff < minDiff) {
        minDiff = diff
        closestIndex = idx
      }
    })
    currentIndexRef.current = closestIndex
  }

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const track = trackRef.current
    const cards = Array.from(track.children) as HTMLElement[]
    if (cards.length === 0) return

    let targetIndex =
      direction === 'left'
        ? currentIndexRef.current - 1
        : currentIndexRef.current + 1

    if (targetIndex < 0) targetIndex = 0
    if (targetIndex >= cards.length) targetIndex = cards.length - 1

    currentIndexRef.current = targetIndex

    const targetCard = cards[targetIndex]
    if (targetCard) {
      isProgrammaticScroll.current = true
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScroll.current = false
      }, 500)

      const targetScroll =
        track.scrollLeft +
        (targetCard.getBoundingClientRect().left - track.getBoundingClientRect().left)

      track.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      })
    }
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

      <div
        ref={trackRef}
        className={styles.slideTrack}
        data-cms-field="industryImages"
        onScroll={handleTrackScroll}
      >
        {items.map((item, index) => (
          <div key={index} className={styles.slideCard}>
            <div className={styles.imageFrame}>
              <PdpScrubbedImage
                src={item.image}
                alt={item.title || `Industry Application ${index + 1}`}
                width="100%"
                height="100%"
              />

              {/* Hover overlay for title + description */}
              {(item.title || item.description) && (
                <div className={styles.hoverOverlay}>
                  {item.title && (
                    <h3 className={styles.hoverTitle}>{item.title}</h3>
                  )}
                  {item.description && (
                    <p className={styles.hoverDescription}>
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Static caption underneath */}
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
