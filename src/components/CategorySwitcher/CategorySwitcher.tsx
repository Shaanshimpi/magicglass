'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './CategorySwitcher.module.css'

interface CategoryData {
  id: string
  badge?: string
  number?: string
  label?: string
  subtitle?: string
  title: string
  specs?: string[]
  items?: string[]
  image: string
}

interface CategorySwitcherProps {
  cmsData?: CategoryData[]
}

const DEFAULT_CATEGORIES: CategoryData[] = [
  {
    id: 'structural',
    number: '01',
    badge: '01',
    label: 'Structural & Exterior Glazing',
    subtitle: 'Structural & Exterior Glazing',
    title: 'Structural & Exterior Glazing Systems',
    specs: [
      'SentryGlas® Laminated Extra Clear Structural Glass Fins',
      'Double Glazed DGU 28mm Insulated Facade Panels',
      'Low-E & SKN Ultra Solar Control High-Performance Glass',
      'Spider Fitting Glass Curtains & Canopy Systems',
    ],
    image: '/images/prod-structural.jpg',
  },
  {
    id: 'interior',
    number: '02',
    badge: '02',
    label: 'Interior & Partitions',
    subtitle: 'Interior & Partitions',
    title: 'Interior Partitions & Decorative Systems',
    specs: [
      'Acoustic PVB 42dB Soundproof Conference Partitions',
      'Ceramic Fritted Screen-Printed Privacy Dot Matrix Glass',
      'Acid-Etched Frosted Satin Non-Fingerprint Glass',
      'High-Clarity Silver & Tinted Architectural Mirrors',
    ],
    image: '/images/prod-partitions.jpg',
  },
  {
    id: 'safety',
    number: '03',
    badge: '03',
    label: 'Safety & Processing',
    subtitle: 'Safety & Processing',
    title: 'Safety, Toughened & Curved Glass Processing',
    specs: [
      'Heat Soaked Toughened Glass (HS) for Spontaneous Breakage Prevention',
      '3D Curved Architectural Glass Facades & Staircases',
      'Fire-Rated EW60 / EI90 Clear Safety Barriers',
      'Bullet-Resistant & High-Impact Laminated Security Panels',
    ],
    image: '/images/prod-additional.jpg',
  },
]

export const CategorySwitcher: React.FC<CategorySwitcherProps> = ({ cmsData }) => {
  const categories = cmsData?.length ? cmsData : DEFAULT_CATEGORIES

  // Normalise: CMS sends badge/subtitle, legacy used number/label
  const normalised = categories.map((cat, i) => ({
    ...cat,
    number: cat.badge || cat.number || String(i + 1).padStart(2, '0'),
    label: cat.subtitle || cat.label || cat.title,
    items: cat.specs || cat.items || [],
  }))

  const [activeTab, setActiveTab] = useState<string>(normalised[0]?.number || '01')
  const activeCategory = normalised.find((cat) => cat.number === activeTab) || normalised[0]

  return (
    <section className={styles.switcherSection}>
      <div className={styles.container}>
        <div className={`base-title ${styles.headerTag}`}>
          CATEGORIES / PRODUCT RANGE
        </div>

        <div className={styles.pillsRow}>
          {normalised.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.pillBtn} ${activeTab === cat.number ? styles.pillActive : ''}`}
              onClick={() => setActiveTab(cat.number)}
            >
              <span>{cat.number}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.displayCard}>
          <div>
            <h3 className={styles.title}>{activeCategory?.title}</h3>
            <ul className={styles.specsList}>
              {activeCategory?.items?.map((item, idx) => (
                <li key={idx} className={styles.specItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.imageFrame}>
            <Image
              src={activeCategory?.image || '/images/prod-structural.jpg'}
              alt={activeCategory?.title || ''}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
