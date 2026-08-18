'use client'

import React from 'react'
import Image from 'next/image'
import styles from './Craftsmanship.module.css'

const CRAFT_ITEMS = [
  {
    id: 'laminated',
    title: 'Precision Lamination Polish',
    desc: 'Extra clear multi-layer PVB & SentryGlas® edge grinding and polish inspection ensuring zero optical distortion.',
    image: '/images/craft-laminated.jpg',
  },
  {
    id: 'dgu',
    title: 'Robotic DGU Spacer Assembly',
    desc: 'Double glazed unit secondary structural silicone sealant application with argon gas fill for thermal insulation.',
    image: '/images/craft-dgu.jpg',
  },
  {
    id: 'fritted',
    title: 'Custom Ceramic Frit Patterns',
    desc: 'High-temperature ceramic enamel screen-printed privacy dot matrix fused permanently into tempered glass.',
    image: '/images/craft-ceramic.jpg',
  },
]

export const Craftsmanship: React.FC = () => {
  return (
    <section className={styles.craftSection}>
      <div className={styles.container}>
        <div className={`base-title ${styles.headerTag}`}>
          MISSION & CRAFTSMANSHIP
        </div>

        <blockquote className={styles.statement}>
          &ldquo;Delivering precision-engineered glass solutions for commercial facades and luxury interiors, crafted with uncompromising quality control from raw cut to final lamination.&rdquo;
        </blockquote>

        <div className={styles.galleryGrid}>
          {CRAFT_ITEMS.map((item) => (
            <div key={item.id} className={styles.craftCard}>
              <div className={styles.imageBox}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
