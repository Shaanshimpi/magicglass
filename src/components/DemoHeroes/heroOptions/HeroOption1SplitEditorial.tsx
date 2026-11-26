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

export const HeroOption1SplitEditorial: React.FC<HeroOptionProps> = ({
  data,
  onCtaClick,
  isCompact = false,
}) => {
  const [imgSrc, setImgSrc] = useState(data.heroImage)

  return (
    <section className={`${styles.opt1Wrapper} ${isCompact ? styles.compactMode : ''}`}>
      <div className={styles.opt1Container}>
        {/* Left Column: Editorial Content & Telemetry */}
        <div className={styles.opt1ColText}>
          <div className={styles.kickerRow}>
            <span className={styles.kickerBadge}>{data.badge}</span>
            <span className={styles.codeIndex}>REF // MG-SYS</span>
          </div>

          <h1 className={styles.opt1Heading}>
            {data.title}
          </h1>

          <p className={styles.opt1Tagline}>{data.tagline}</p>
          <p className={styles.opt1Desc}>{data.description}</p>

          {/* Quick Metrics Bar */}
          <div className={styles.opt1MetricsGrid}>
            {data.metrics.slice(0, 3).map((m, idx) => (
              <div key={idx} className={styles.opt1MetricCard}>
                <div className={styles.metricValue}>{m.value}</div>
                <div className={styles.metricLabel}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className={styles.opt1ActionRow}>
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

        {/* Right Column: Architectural Visual Double-Bezel Frame */}
        <div className={styles.opt1ColMedia}>
          <div className={styles.outerMachinedBezel}>
            <div className={styles.innerGlassFrame}>
              <Image
                src={imgSrc}
                alt={data.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.heroImgCover}
                onError={() => setImgSrc('/images/hero-bg.jpg')}
              />
              <div className={styles.glassReflectionSheen} />

              {/* Floating Architectural Badge */}
              <div className={styles.floatingGlassBadge}>
                <span className={styles.badgePulseDot} />
                <span className={styles.badgeText}>
                  {data.metrics[0]?.label}: <strong>{data.metrics[0]?.value}</strong>
                </span>
              </div>

              {/* Corner Watermark */}
              <div className={styles.cornerWatermark}>
                MAGIC GLASS FACILITY ARCHITECTURE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
