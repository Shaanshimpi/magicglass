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

export const HeroOption4FramedConsole: React.FC<HeroOptionProps> = ({
  data,
  onCtaClick,
  isCompact = false,
}) => {
  const [imgSrc, setImgSrc] = useState(data.heroImage)

  return (
    <section className={`${styles.opt4Wrapper} ${isCompact ? styles.compactMode : ''}`}>
      {/* Background Frame: Architectural Window */}
      <div className={styles.opt4WindowFrame}>
        <Image
          src={imgSrc}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className={styles.opt4WindowImage}
          onError={() => setImgSrc('/images/hero-bg.jpg')}
        />
        <div className={styles.opt4TintOverlay} />

        {/* Architectural Glass Grid Crosshairs */}
        <div className={styles.crosshairTL} />
        <div className={styles.crosshairBR} />
      </div>

      {/* Foreground Inset Console Pod */}
      <div className={styles.opt4ConsoleContainer}>
        <div className={styles.opt4ConsoleCard}>
          <div className={styles.consoleHeader}>
            <div className={styles.consoleMetaTag}>
              <span className={styles.consoleDot} />
              {data.badge}
            </div>
            <div className={styles.consoleRef}>SPEC-SHEET 2026.4</div>
          </div>

          <h1 className={styles.opt4Title}>{data.title}</h1>
          <p className={styles.opt4Lead}>{data.tagline}</p>

          <p className={styles.opt4Body}>{data.description}</p>

          {/* Quick Specification Chips */}
          <div className={styles.consoleChipsRow}>
            {data.metrics.slice(0, 3).map((metric, i) => (
              <div key={i} className={styles.consoleChip}>
                <span className={styles.chipLbl}>{metric.label}</span>
                <span className={styles.chipVal}>{metric.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.consoleActionRow}>
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

            <span className={styles.secondaryTextAction}>
              {data.secondaryCta}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
