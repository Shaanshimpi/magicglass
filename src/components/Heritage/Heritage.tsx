'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Heritage.module.css'

interface HeritageProps {
  onOpenQuoteDrawer?: () => void
}

const STATEMENT_TEXT =
  'Welcome to the world of Magic Glass. Since our inception in 2006, we have proudly upheld the promise of delivering uncompromising quality, earning the trust of countless happy customers.'
const WORDS = STATEMENT_TEXT.split(' ')

const STATS = [
  { value: '600+', label: 'Projects Finished' },
  { value: '17+', label: 'Years of Experience' },
  { value: '80,000', label: 'Sq ft Factory Area' },
  { value: '500+', label: 'Customers' },
]

export const Heritage: React.FC<HeritageProps> = ({ onOpenQuoteDrawer }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (sectionRef.current && wordRefs.current.length > 0 && containerRef.current) {
        // Pinned ScrollTrigger Timeline: All words scrub from 0.5 to 1.0 opacity
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: containerRef.current,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })

        // Step 1: Scrub words opacity from 0.5 to 1.0 sequentially
        tl.to(wordRefs.current, {
          opacity: 1,
          color: 'var(--color-cream)',
          stagger: 0.08,
          ease: 'none',
        })

        // Step 2: Reveal CTA and Verified Stats Grid as narrative finishes
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
  }, [])

  return (
    <section id="heritage" ref={sectionRef} className={styles.heritageSection}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.eyebrow}>
          ◆ ABOUT MAGIC GLASS
        </div>

        <h2 className={styles.statementHeadline}>
          {WORDS.map((word, index) => (
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
          <a href="#products" className="btn-black">
            ↳ WHO WE ARE
          </a>
        </div>

        {/* Verified Stats Grid matching magicglass.co.in */}
        <div ref={statsRef} className={styles.statsGrid}>
          {STATS.map((stat, idx) => (
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
