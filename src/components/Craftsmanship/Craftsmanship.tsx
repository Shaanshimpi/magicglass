'use client'

import React from 'react'
import Image from 'next/image'
import styles from './Craftsmanship.module.css'

interface CraftCard {
  title: string
  description?: string
  image?: string
}

interface CraftsmanshipProps {
  cmsData?: {
    eyebrow?: string
    heading?: string
    cards?: CraftCard[]
  }
}

const DEFAULT_CARDS: CraftCard[] = [
  { title: 'Precision Lamination Polish', description: 'Extra clear multi-layer PVB & SentryGlas® edge grinding and polish inspection ensuring zero optical distortion.', image: '/images/craft-laminated.jpg' },
  { title: 'Robotic DGU Spacer Assembly', description: 'Double glazed unit secondary structural silicone sealant application with argon gas fill for thermal insulation.', image: '/images/craft-dgu.jpg' },
  { title: 'Custom Ceramic Frit Patterns', description: 'High-temperature ceramic enamel screen-printed privacy dot matrix fused permanently into tempered glass.', image: '/images/craft-ceramic.jpg' },
]

export const Craftsmanship: React.FC<CraftsmanshipProps> = ({ cmsData }) => {
  const eyebrow = cmsData?.eyebrow || 'MISSION & CRAFTSMANSHIP'
  const heading = cmsData?.heading || '"Delivering precision-engineered glass solutions for commercial facades and luxury interiors, crafted with uncompromising quality control from raw cut to final lamination."'
  const cards = cmsData?.cards?.length ? cmsData.cards : DEFAULT_CARDS

  return (
    <section className={styles.craftSection}>
      <div className={styles.container}>
        <div className={`base-title ${styles.headerTag}`} data-cms-field="craftsmanship_eyebrow">
          {eyebrow}
        </div>

        <blockquote className={styles.statement} data-cms-field="craftsmanship_heading">
          {heading}
        </blockquote>

        <div className={styles.galleryGrid}>
          {cards.map((item, idx) => (
            <div key={idx} className={styles.craftCard}>
              <div className={styles.imageBox}>
                <Image
                  src={item.image || '/images/craft-laminated.jpg'}
                  alt={item.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
