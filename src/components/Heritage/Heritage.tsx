'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Heritage.module.css'

interface HeritageProps {
  onOpenQuoteDrawer?: () => void
}

const STATS = [
  { value: '600+', label: 'Projects Finished' },
  { value: '17+', label: 'Years Experience' },
  { value: '80,000', label: 'Sq Ft Factory Area' },
  { value: '500+', label: 'Happy Customers' },
]

export const Heritage: React.FC<HeritageProps> = ({ onOpenQuoteDrawer }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          y: 45,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="heritage" ref={sectionRef} className={styles.heritageSection}>
      <div ref={contentRef} className={styles.container}>
        <div className={styles.eyebrow}>
          ◆ ABOUT MAGIC GLASS
        </div>

        <h2 className={styles.statementHeadline}>
          Welcome to the world of Magic Glass. Since our inception in 2006, we have proudly delivered uncompromising quality to over 500 customers across India.
        </h2>

        <div className={styles.ctaContainer}>
          <a href="#products" className="btn-black">
            ↳ WHO WE ARE
          </a>
        </div>

        {/* Verified Stats Grid matching magicglass.co.in */}
        <div className={styles.statsGrid}>
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
