'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './PdpHero.module.css'

const DEFAULT_HERO_FALLBACK = '/images/products/heroes/toughened-glass.png'

interface PdpHeroProps {
  indexNumber: string
  title: string
  subheading?: string
  category: string
  heroImage: string
}

export const PdpHero: React.FC<PdpHeroProps> = ({
  indexNumber,
  title,
  subheading,
  category,
  heroImage,
}) => {
  const [src, setSrc] = useState<string>(heroImage || DEFAULT_HERO_FALLBACK)
  const heroInnerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSrc(heroImage || DEFAULT_HERO_FALLBACK)
  }, [heroImage])

  useEffect(() => {
    if (!heroInnerRef.current) return

    const ctx = gsap.context(() => {
      // PDP Hero Text Entrance Animation
      const textElements = heroInnerRef.current?.querySelectorAll(
        `.${styles.indexBadge}, .${styles.heroCategoryBadge}, .${styles.heroTitle}, .${styles.heroSubheading}`
      )
      if (textElements && textElements.length > 0) {
        gsap.from(textElements, {
          y: 35,
          opacity: 0,
          duration: 1.0,
          stagger: 0.14,
          ease: 'power3.out',
          delay: 0.1,
        })
      }

      // Dodi Vetro On-Page-Load Vertical Wipe Reveal
      if (frameRef.current) {
        gsap.fromTo(
          frameRef.current,
          {
            clipPath: 'inset(0% 0% 90% 0%)',
            opacity: 0.8,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1.0,
            duration: 1.25,
            delay: 0.3,
            ease: 'power3.inOut',
          }
        )
      }
    }, heroInnerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.heroSection}>
      <div ref={heroInnerRef} className={styles.heroInner}>
        <div className={styles.indexBadge} data-cms-field="indexNumber">{indexNumber}</div>
        <div className={styles.heroCategoryBadge} data-cms-field="category">{category}</div>
        <h1 className={styles.heroTitle} data-cms-field="title">{title}</h1>
        {subheading && <p className={styles.heroSubheading} data-cms-field="subheading">{subheading}</p>}

        <div ref={frameRef} className={styles.heroImageFrame}>
          <Image
            src={src}
            alt={title}
            fill
            priority
            sizes="100vw"
            quality={90}
            onError={() => setSrc(DEFAULT_HERO_FALLBACK)}
          />
        </div>
      </div>
    </section>
  )
}

