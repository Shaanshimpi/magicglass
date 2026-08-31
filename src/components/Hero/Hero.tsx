'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'
import styles from './Hero.module.css'

interface HeroProps {
  onOpenQuoteDrawer?: () => void
  cmsData?: any
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteDrawer, cmsData }) => {
  const { openQuoteDrawer } = useLayoutContext()
  const handleQuoteClick = onOpenQuoteDrawer || openQuoteDrawer

  const tagline = cmsData?.tagline || 'PRECISION GLASS MANUFACTURING • YAVAT, PUNE, MAHARASHTRA'
  const heading = cmsData?.heading || 'Crafting Exceptional Glass Solutions for a Brighter World.'
  const primaryCtaLabel = cmsData?.primaryCtaLabel || 'REQUEST TECHNICAL QUOTE'
  const secondaryCtaLabel = cmsData?.secondaryCtaLabel || 'DISCOVER FACTORY'
  const secondaryCtaHref = cmsData?.secondaryCtaHref || '#heritage'
  const bgImage = cmsData?.bgImage || '/images/hero-bg.jpg'

  const heroRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Entrance Animation
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.18,
          ease: 'power3.out',
          delay: 0.2,
        })
      }

      // Parallax scroll effect on background glass architecture
      if (bgRef.current && heroRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className={styles.heroSection}>
      <div ref={bgRef} className={styles.bgWrapper}>
        <Image
          src={bgImage}
          alt="Architectural Glass Processing Factory"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
      </div>
      <div className={styles.vignetteOverlay} />

      <div ref={contentRef} className={styles.contentContainer}>
        <div
          className={`base-title ${styles.tagline}`}
          data-cms-field="hero_tagline"
        >
          {tagline}
        </div>

        <h1
          className={styles.heading}
          data-cms-field="hero_heading"
        >
          {heading}
        </h1>

        <div className={styles.ctaGroup}>
          <button type="button" className="button--red" onClick={handleQuoteClick}>
            <span style={{ color: 'var(--color-crimson)', marginRight: '0.2rem' }}>↳</span>{' '}
            {primaryCtaLabel}
          </button>

          <a href={secondaryCtaHref} className={styles.secondaryCta}>
            <span className={styles.ctaDiamond}>◆</span> {secondaryCtaLabel}{' '}
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </div>

      <div className={styles.indicatorContainer}>
        <span className={styles.scrollText}>SCROLL</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
