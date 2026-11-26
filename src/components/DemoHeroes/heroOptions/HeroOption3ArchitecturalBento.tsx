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

export const HeroOption3ArchitecturalBento: React.FC<HeroOptionProps> = ({
  data,
  onCtaClick,
  isCompact = false,
}) => {
  const [imgSrc, setImgSrc] = useState(data.heroImage)

  return (
    <section className={`${styles.opt3Wrapper} ${isCompact ? styles.compactMode : ''}`}>
      <div className={styles.opt3Container}>
        {/* Bento Grid Layout */}
        <div className={styles.bentoGrid}>
          {/* Tile A: Main Narrative & Action */}
          <div className={`${styles.bentoTile} ${styles.bentoTileMain}`}>
            <div className={styles.bentoBadgeRow}>
              <span className={styles.kickerBadge}>{data.badge}</span>
              <span className={styles.bentoTagNum}>SPEC // 03</span>
            </div>

            <h1 className={styles.bentoTitle}>{data.title}</h1>
            <h2 className={styles.bentoSubhead}>{data.tagline}</h2>
            <p className={styles.bentoDesc}>{data.description}</p>

            <div className={styles.bentoTagsRow}>
              {data.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className={styles.techChip}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.bentoAction}>
              <button
                type="button"
                className={styles.primaryPillBtn}
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

          {/* Tile B: High-Aspect Architectural Visual Showcase */}
          <div className={`${styles.bentoTile} ${styles.bentoTileMedia}`}>
            <div className={styles.bentoMediaFrame}>
              <Image
                src={imgSrc}
                alt={data.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
                className={styles.heroImgCover}
                onError={() => setImgSrc('/images/hero-bg.jpg')}
              />
              <div className={styles.bentoMediaOverlay}>
                <span className={styles.mediaCaption}>FACADE INSTALLATION & PROCESSING</span>
                <span className={styles.mediaDimensions}>MAX: 4000 × 2500 MM</span>
              </div>
            </div>
          </div>

          {/* Tile C: Live Industrial Metrics Bar */}
          <div className={`${styles.bentoTile} ${styles.bentoTileTelemetry}`}>
            <div className={styles.telemetryHeader}>
              <span className={styles.telemetryDot} />
              <span>FACILITY TELEMETRY</span>
            </div>

            <div className={styles.telemetryItems}>
              {data.metrics.map((m, idx) => (
                <div key={idx} className={styles.telemetryCard}>
                  <div className={styles.telemetryValue}>{m.value}</div>
                  <div className={styles.telemetryLabel}>{m.label}</div>
                  {m.sub && <div className={styles.telemetrySub}>{m.sub}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
