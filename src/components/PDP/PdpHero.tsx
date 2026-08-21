'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './PdpHero.module.css'

const DEFAULT_HERO_FALLBACK =
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80'

interface PdpHeroProps {
  indexNumber: string
  title: string
  category: string
  heroImage: string
}

export const PdpHero: React.FC<PdpHeroProps> = ({
  indexNumber,
  title,
  category,
  heroImage,
}) => {
  const [src, setSrc] = useState<string>(heroImage || DEFAULT_HERO_FALLBACK)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!frameRef.current) return

    const ctx = gsap.context(() => {
      // Dodi Vetro On-Page-Load Vertical Wipe Reveal:
      // Keeps top edge intact in position while un-clipping downwards over 1.2s without squeezing the image!
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
          delay: 0.2,
          ease: 'power3.inOut',
        }
      )
    }, frameRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroInner}>
        <div className={styles.indexBadge}>{indexNumber}</div>
        <div className={styles.heroCategoryBadge}>{category}</div>
        <h1 className={styles.heroTitle}>{title}</h1>

        <div ref={frameRef} className={styles.heroImageFrame}>
          <Image
            src={src}
            alt={title}
            fill
            priority
            sizes="100vw"
            onError={() => setSrc(DEFAULT_HERO_FALLBACK)}
          />
        </div>
      </div>
    </section>
  )
}
