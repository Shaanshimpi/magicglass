'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import styles from './CategorySwitcher.module.css'

interface CategoryData {
  id: string
  number: string
  label: string
  title: string
  items: string[]
  image: string
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'structural',
    number: '01',
    label: 'Structural & Exterior Glazing',
    title: 'Structural & Exterior Glazing Systems',
    items: [
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
    label: 'Interior & Partitions',
    title: 'Interior Partitions & Decorative Systems',
    items: [
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
    label: 'Safety & Processing',
    title: 'Safety, Toughened & Curved Glass Processing',
    items: [
      'Heat Soaked Toughened Glass (HS) for Spontaneous Breakage Prevention',
      '3D Curved Architectural Glass Facades & Staircases',
      'Fire-Rated EW60 / EI90 Clear Safety Barriers',
      'Bullet-Resistant & High-Impact Laminated Security Panels',
    ],
    image: '/images/prod-additional.jpg',
  },
]

export const CategorySwitcher: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('01')

  const activeCategory = CATEGORIES.find((cat) => cat.number === activeTab) || CATEGORIES[0]

  return (
    <section className={styles.switcherSection}>
      <div className={styles.container}>
        <div className={`base-title ${styles.headerTag}`}>
          CATEGORIES / PRODUCT RANGE
        </div>

        <div className={styles.pillsRow}>
          {CATEGORIES.map((cat) => (
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
            <h3 className={styles.title}>{activeCategory.title}</h3>
            <ul className={styles.specsList}>
              {activeCategory.items.map((item, idx) => (
                <li key={idx} className={styles.specItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.imageFrame}>
            <Image
              src={activeCategory.image}
              alt={activeCategory.title}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
