'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GlassApplications.module.css'

export interface ApplicationCardItem {
  id?: string
  title: string
  subtitle?: string
  specs?: string
  image: string
}

interface GlassApplicationsData {
  eyebrow?: string
  heading?: string
  cards?: ApplicationCardItem[]
}

const DEFAULT_CARDS: ApplicationCardItem[] = [
  {
    id: 'railings',
    title: 'RAILINGS, STAIRCASES AND DOORS',
    subtitle: 'Frameless Glass Entrances & Structural Balustrades',
    specs:
      'Toughened Laminated Glass Panels, Patch-Fitting Door Glass, Glass Balustrades & Custom Staircase Assemblies.',
    image: '/images/apps/railings.png',
  },
  {
    id: 'windows',
    title: 'WINDOWS',
    subtitle: 'High Performance DGU & Low-E Solar Control',
    specs:
      'Insulated Double Glazed Units (DGU) & High-Performance Low-E Solar Control Glass Panels.',
    image: '/images/apps/windows.png',
  },
  {
    id: 'roof',
    title: 'ROOF',
    subtitle: 'Structural Overhead Skylight Glass',
    specs:
      'Heat Soaked SentryGlas® & PVB Structural Laminated Glass engineered for overhead safety.',
    image: '/images/apps/roof.png',
  },
  {
    id: 'overhead-spaces',
    title: 'OVERHEAD SPACES',
    subtitle: 'Spider-Supported Overhead Glass',
    specs:
      'Point-Supported Spider Glass Canopies, Atrium Glazing Panels & Heavy Wind Load Safety Systems.',
    image: '/images/apps/overhead-spaces.png',
  },
  {
    id: 'glass-lifts',
    title: 'GLASS LIFTS',
    subtitle: 'Curved & Toughened Shaft Enclosures',
    specs:
      'Architectural Curved & Toughened Structural Glass for Panoramic Elevator Enclosures.',
    image: '/images/apps/glass-lifts.png',
  },
  {
    id: 'partitions',
    title: 'PARTITIONS',
    subtitle: 'Soundproof & Privacy Interior Walls',
    specs:
      'Acoustic 42dB Soundproof Laminated Glass, Acid-Frosted Privacy & Smart Switchable Glass Panels.',
    image: '/images/apps/partition.png',
  },
]

interface GlassApplicationsProps {
  cmsData?: GlassApplicationsData
}

export const GlassApplications: React.FC<GlassApplicationsProps> = ({ cmsData }) => {
  const eyebrowRaw = cmsData?.eyebrow || 'GLASS APPLICATIONS'
  const eyebrow = eyebrowRaw.trim()
  const heading = cmsData?.heading || 'GET EVERY GLASS APPLICATION UNDER ONE ROOF'

  const rawCards = cmsData?.cards?.length ? cmsData.cards : DEFAULT_CARDS
  const cards: ApplicationCardItem[] = rawCards.map((c, i) => ({
    id: c.id || `app-card-${i}`,
    title: c.title,
    subtitle: c.subtitle || 'Architectural Glazing Solution',
    specs: c.specs || '',
    image: c.image || '/images/apps/railings.png',
  }))

  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const handleCardClick = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="applications" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Center-Aligned Header Block */}
        <div className={styles.headerBlock}>
          <div className={styles.eyebrow} data-cms-field="glassApplications_eyebrow">
            {eyebrow}
          </div>
          <h2 className={styles.heading} data-cms-field="glassApplications_heading">
            {heading}
          </h2>
        </div>

        {/* 6-Card High-Craft Architectural Grid */}
        <div ref={gridRef} className={styles.cardsGrid}>
          {cards.map((item, index) => {
            const cardId = item.id || `card-${index}`
            const isActive = activeCardId === cardId
            const isRemote = item.image.startsWith('http')
            const paddedIndex = String(index + 1).padStart(2, '0')

            return (
              <div
                key={cardId}
                className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                onClick={() => handleCardClick(cardId)}
              >
                {/* Background Image Container */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1040px) 50vw, 420px"
                    priority={index < 2}
                    unoptimized={isRemote}
                    className={styles.cardImage}
                  />
                  <div className={styles.imageOverlay} />
                </div>

                {/* Top Bar (01 Index) */}
                <div className={styles.cardTopBar}>
                  <span className={styles.indexBadge}>{paddedIndex}</span>
                </div>

                {/* Default Visible Bottom Content */}
                <div className={styles.cardBottomContent}>
                  {item.subtitle && (
                    <span className={styles.cardSubtitle}>{item.subtitle}</span>
                  )}
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>

                {/* Interactive Detail Reveal Overlay (Hover & Tap) */}
                <div className={styles.detailOverlay}>
                  {item.subtitle && (
                    <span className={styles.detailCategory}>{item.subtitle}</span>
                  )}
                  <h4 className={styles.detailTitle}>{item.title}</h4>
                  {item.specs && <p className={styles.detailSpecs}>{item.specs}</p>}
                  <Link href="/products" className={styles.detailAction}>
                    EXPLORE SPECIFICATION →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
