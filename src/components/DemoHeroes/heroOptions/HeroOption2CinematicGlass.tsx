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

export const HeroOption2CinematicGlass: React.FC<HeroOptionProps> = ({
  data,
  onCtaClick,
  isCompact = false,
}) => {
  const [imgSrc, setImgSrc] = useState(data.heroImage)

  return (
    <section className={`${styles.opt2Wrapper} ${isCompact ? styles.compactMode : ''}`}>
      {/* Background Cinematic Panoramic Image */}
      <div className={styles.opt2BackgroundPlane}>
        <Image
          src={imgSrc}
          alt={data.title}
          fill
          priority
          sizes="100vw"
          className={styles.opt2HeroImage}
          onError={() => setImgSrc('/images/hero-bg.jpg')}
        />
        <div className={styles.opt2DarkVignette} />
        <div className={styles.opt2GridMesh} />
      </div>

      {/* Floating Foreground Content Container */}
      <div className={styles.opt2Container}>
        {/* Top Telemetry Header */}
        <div className={styles.opt2TopBar}>
          <div className={styles.opt2LivePill}>
            <span className={styles.greenPulse} />
            <span>OPERATIONAL // PUNE INTEGRATED PLANT</span>
          </div>
          <div className={styles.opt2SpecTag}>
            {data.badge}
          </div>
        </div>

        {/* Bottom Hero Glass HUD Console */}
        <div className={styles.opt2BottomHUD}>
          {/* Main Glass Narrative Pod */}
          <div className={styles.opt2GlassCard}>
            <div className={styles.opt2Kicker}>ENGINEERED ARCHITECTURAL GLASS</div>
            <h1 className={styles.opt2Title}>{data.title}</h1>
            <p className={styles.opt2Summary}>{data.tagline}</p>
            <p className={styles.opt2MicroDesc}>{data.description}</p>

            <div className={styles.opt2CtaRow}>
              <button
                type="button"
                className={styles.opt2PrimaryBtn}
                onClick={onCtaClick}
              >
                <span>{data.primaryCta}</span>
                <span className={styles.btnIconPod}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <div className={styles.opt2SecondaryLink}>
                <span>{data.secondaryCta}</span>
              </div>
            </div>
          </div>

          {/* Right Floating Telemetry Metrics Pod */}
          <div className={styles.opt2MetricsPod}>
            <div className={styles.opt2PodHeader}>KEY SPECIFICATIONS</div>
            <div className={styles.opt2MetricsList}>
              {data.metrics.map((m, idx) => (
                <div key={idx} className={styles.opt2MetricItem}>
                  <div className={styles.opt2MetricNum}>{m.value}</div>
                  <div className={styles.opt2MetricLbl}>{m.label}</div>
                  {m.sub && <div className={styles.opt2MetricSub}>{m.sub}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
