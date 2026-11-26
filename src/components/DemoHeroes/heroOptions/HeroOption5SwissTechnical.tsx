'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { HeroDataset } from '../demoData'
import styles from './HeroOptions.module.css'

interface HeroOptionProps {
  data: HeroDataset
  onCtaClick?: () => void
  isCompact?: boolean
}

export const HeroOption5SwissTechnical: React.FC<HeroOptionProps> = ({
  data,
  onCtaClick,
  isCompact = false,
}) => {
  const [imgSrc, setImgSrc] = useState(data.heroImage)

  return (
    <section className={`${styles.opt5Wrapper} ${isCompact ? styles.compactMode : ''}`}>
      <div className={styles.opt5Container}>
        {/* Top Swiss Index Bar with Hairline Dividers */}
        <div className={styles.swissIndexBar}>
          <div className={styles.swissLeftIndex}>
            <span className={styles.swissRefTag}>SPEC.MG // 05</span>
            <span className={styles.swissCategory}>{data.badge}</span>
          </div>
          <div className={styles.swissRightLocation}>
            <span>FACILITY PUNE // EN-12150 STANDARD</span>
          </div>
        </div>

        {/* Massive Typographic Architecture */}
        <div className={styles.swissHeaderBlock}>
          <div className={styles.swissTitleCol}>
            <h1 className={styles.swissTitle}>{data.title}</h1>
            <p className={styles.swissTagline}>{data.tagline}</p>
          </div>
          <div className={styles.swissDescCol}>
            <p className={styles.swissDesc}>{data.description}</p>
            <div className={styles.swissCtaWrap}>
              <button
                type="button"
                className={styles.swissButton}
                onClick={onCtaClick}
              >
                <span>{data.primaryCta}</span>
                <span className={styles.btnIconPod}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Technical Data Strip */}
        <div className={styles.swissDataStrip}>
          {data.metrics.map((m, idx) => (
            <div key={idx} className={styles.swissDataCell}>
              <div className={styles.swissCellVal}>{m.value}</div>
              <div className={styles.swissCellLbl}>{m.label}</div>
              {m.sub && <div className={styles.swissCellSub}>{m.sub}</div>}
            </div>
          ))}
        </div>

        {/* Expansive Architectural Blueprint Image Frame */}
        <div className={styles.swissImageFrame}>
          <Image
            src={imgSrc}
            alt={data.title}
            fill
            priority
            sizes="100vw"
            className={styles.swissImage}
            onError={() => setImgSrc('/images/hero-bg.jpg')}
          />
          <div className={styles.swissImageCoords}>
            <span>FACILITY COORDINATES: 18.5204° N, 73.8567° E</span>
            <span>MAGIC GLASS FABRICATION MATRIX</span>
          </div>
        </div>
      </div>
    </section>
  )
}
