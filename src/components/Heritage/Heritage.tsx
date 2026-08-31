'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Heritage.module.css'

interface HeritageStat {
  value: string
  label: string
}

interface HeritageProps {
  onOpenQuoteDrawer?: () => void
  cmsData?: {
    eyebrow?: string
    statementText?: string
    ctaLabel?: string
    ctaHref?: string
    stats?: HeritageStat[]
  }
}

const DEFAULT_STATEMENT =
  'Welcome to the world of Magic Glass. Since our inception in 2006, we have proudly upheld the promise of delivering uncompromising quality, earning the trust of countless happy customers.'

const DEFAULT_STATS: HeritageStat[] = [
  { value: '600+', label: 'Projects Finished' },
  { value: '17+', label: 'Years of Experience' },
  { value: '80,000', label: 'Sq ft Factory Area' },
  { value: '500+', label: 'Customers' },
]

export const Heritage: React.FC<HeritageProps> = ({ onOpenQuoteDrawer, cmsData }) => {
  const eyebrow = cmsData?.eyebrow || '◆ ABOUT MAGIC GLASS'
  const statementText = cmsData?.statementText || DEFAULT_STATEMENT
  const ctaLabel = cmsData?.ctaLabel || '↳ WHO WE ARE'
  const ctaHref = cmsData?.ctaHref || '/about'
  const stats = cmsData?.stats?.length ? cmsData.stats : DEFAULT_STATS

  const words = statementText.split(' ')

  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (sectionRef.current && wordRefs.current.length > 0 && containerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=110%',
            pin: containerRef.current,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })

        tl.to(wordRefs.current, {
          opacity: 1,
          color: 'var(--color-cream)',
          stagger: 0.08,
          ease: 'none',
        })

        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.2'
          )
        }
        if (statsRef.current) {
          tl.fromTo(
            statsRef.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          )
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [statementText])

  return (
    <section id="heritage" ref={sectionRef} className={styles.heritageSection}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.eyebrow} data-cms-field="heritage_eyebrow">
          {eyebrow}
        </div>

        <h2 className={styles.statementHeadline} data-cms-field="heritage_statementText">
          {words.map((word, index) => (
            <span
              key={index}
              ref={(el) => { wordRefs.current[index] = el }}
              className={styles.word}
            >
              {word}{' '}
            </span>
          ))}
        </h2>

        <div ref={ctaRef} className={styles.ctaContainer}>
          <a href={ctaHref} className="btn-black" data-cms-field="heritage_ctaLabel">
            {ctaLabel}
          </a>
        </div>

        {/* Verified Stats Grid */}
        <div ref={statsRef} className={styles.statsGrid}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
