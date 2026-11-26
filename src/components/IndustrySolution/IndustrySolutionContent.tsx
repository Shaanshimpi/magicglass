'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { PdpHero } from '@/components/PDP/PdpHero'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'
import mockData from '@/data/industry_solutions_mock.json'
import styles from './IndustrySolution.module.css'

interface IndustryItem {
  id: string
  title: string
  subtitle: string
  image: string
  images?: string[]
  specs: string
  description: string
}

interface IndustrySolutionContentProps {
  cmsData?: {
    page: any
    industries: IndustryItem[]
  }
}

interface CardProps {
  item: IndustryItem
  isTapped: boolean
  onToggleTap: () => void
}

const IndustryGridCard: React.FC<CardProps> = ({ item, isTapped, onToggleTap }) => {
  const rawImages = (item.images && item.images.length > 0 ? item.images : [item.image]).filter(Boolean)
  const images = Array.from(new Set(rawImages))
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (images.length > 1) {
      setActiveImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    } else {
      onToggleTap()
    }
  }

  return (
    <div className={styles.orderedCardWrapper}>
      <div
        className={`${styles.orderedCard} ${isTapped ? styles.cardActive : ''}`}
        onClick={handleCardClick}
      >
        <div className={styles.imageWrapper}>
          <div
            className={styles.carouselSlideTrack}
            style={{
              transform: `translateX(-${activeImgIndex * 100}%)`,
            }}
          >
            {images.map((imgSrc, idx) => (
              <div key={idx} className={styles.carouselSlideItem}>
                <Image
                  src={imgSrc}
                  alt={`${item.title} - ${idx + 1}`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  unoptimized={imgSrc.startsWith('http')}
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
          <div className={styles.cardOverlay} />
          <h3 className={styles.cardMainTitle}>{item.title}</h3>

          {/* Hover / Tap Details Overlay */}
          <div className={styles.hoverDetailsOverlay}>
            <div className={styles.hoverContent}>
              <div>
                <span className={styles.hoverCategory}>{item.subtitle}</span>
                <h4 className={styles.hoverTitle}>{item.title}</h4>
                <p className={styles.hoverSpecs}>{item.specs}</p>
              </div>
              <p className={styles.hoverDescription}>{item.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-image Navigation Controls (Only shown if more than one image is selected, positioned below the image) */}
      {images.length > 1 && (
        <div className={styles.carouselNavBelow}>
          <button
            type="button"
            className={styles.carouselArrowBtn}
            onClick={handlePrev}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <span className={styles.carouselCounter}>
            {activeImgIndex + 1} / {images.length}
          </span>
          <button
            type="button"
            className={styles.carouselArrowBtn}
            onClick={handleNext}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

export const IndustrySolutionContent: React.FC<IndustrySolutionContentProps> = ({ cmsData }) => {
  const { openQuoteDrawer } = useLayoutContext()
  const data = cmsData || (mockData as { page: any; industries: IndustryItem[] })
  const { page, industries } = data

  const [activeTapId, setActiveTapId] = useState<string | null>(null)

  const handleToggleTap = (id: string) => {
    setActiveTapId((prev) => (prev === id ? null : id))
  }

  return (
    <div style={{ paddingTop: '70px', backgroundColor: 'var(--color-black)', color: 'var(--color-taupe)' }}>
      {/* 1. PDP Hero Section */}
      <PdpHero
        indexNumber={page.indexNumber}
        title={page.title}
        subheading={page.introDescription}
        category={page.category}
        heroImage={page.heroImage}
      />

      {/* 2. Conventional Ordered Grid Section */}
      <section className={styles.orderedSection}>
        <div className={styles.container}>
          {/* Header Block */}
          <div className={styles.headerBlock}>
            <div className={styles.eyebrow}>{page.eyebrow}</div>
            <h2 className={styles.subheading}>{page.subheading}</h2>
          </div>

          {/* Intro Narrative Row with CTA */}
          <div className={styles.introRow}>
            <p className={styles.introParagraph}>
              Our <strong>industry solution collection</strong> is defined by exceptional engineering, refined aesthetics, and enduring quality. Get every architectural and industrial glass application under one roof.
            </p>
            <div className={styles.ctaWrapper}>
              <button type="button" className="btn-black" onClick={openQuoteDrawer}>
                ↳ REQUEST ENQUIRY
              </button>
            </div>
          </div>

          {/* Conventional 2-Column Responsive Grid */}
          <div className={styles.orderedGrid}>
            {industries.map((ind) => (
              <IndustryGridCard
                key={ind.id}
                item={ind}
                isTapped={activeTapId === ind.id}
                onToggleTap={() => handleToggleTap(ind.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
