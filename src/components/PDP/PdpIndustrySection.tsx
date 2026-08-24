'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PdpIndustrySection.module.css'
import { PdpScrubbedImage } from './PdpScrubbedImage'
import { IndustryItem } from './pdpData'

interface PdpIndustrySectionProps {
  industries: IndustryItem[]
  title?: string
}

export const PdpIndustrySection: React.FC<PdpIndustrySectionProps> = ({
  industries,
  title = 'Our Industry Solutions',
}) => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(`.${styles.industryCard}`)
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!industries || industries.length === 0) return null

  return (
    <section ref={sectionRef} className={styles.industrySection}>
      <div className={styles.container}>
        <div className={styles.headerBox}>
          <span className={styles.sectionBadge}>SECTOR FOCUS & APPLICATIONS</span>
          <h2 className={styles.sectionTitle}>{title}</h2>
        </div>

        <div className={styles.industryGrid}>
          {industries.map((item, index) => (
            <div key={index} className={styles.industryCard}>
              <div className={styles.imageCol}>
                <PdpScrubbedImage
                  src={item.image}
                  alt={item.title}
                  width="100%"
                  height="340px"
                />
              </div>
              <div className={styles.textCol}>
                <h3 className={styles.industryTitle}>{item.title}</h3>
                <p className={styles.industryDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
