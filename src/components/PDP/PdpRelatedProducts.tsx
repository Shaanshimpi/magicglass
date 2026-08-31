'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PdpRelatedProducts.module.css'
import { PDP_MOCK_DATA, PdpProductDetail } from './pdpData'
import { PdpScrubbedImage } from './PdpScrubbedImage'

interface PdpRelatedProductsProps {
  relatedIds: [string, string]
}

export const PdpRelatedProducts: React.FC<PdpRelatedProductsProps> = ({
  relatedIds,
}) => {
  const sectionRef = useRef<HTMLElement>(null)

  const relatedProducts = relatedIds
    .map((id) => {
      if (PDP_MOCK_DATA[id]) return PDP_MOCK_DATA[id]
      return {
        id,
        title: id
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(' '),
        heroImage: '/images/prod-structural.jpg',
      }
    })
    .filter(Boolean)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from(sectionRef.current.querySelector('.' + styles.eyebrow), {
          y: 25,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        })

        gsap.from(
          sectionRef.current.querySelectorAll('.' + styles.relatedCard),
          {
            y: 35,
            opacity: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!relatedProducts.length) return null

  return (
    <section ref={sectionRef} className={styles.relatedSection}>
      <div className={styles.container}>
        <div className={styles.eyebrow}>
          DISCOVER OTHER BESPOKE GLASS SOLUTIONS
        </div>

        <div className={styles.cardsGrid}>
          {relatedProducts.map((prod) => (
            <Link
              key={prod.id}
              href={`/products/${prod.id}`}
              className={styles.relatedCard}
            >
              <div className={styles.imageWrapper}>
                <PdpScrubbedImage
                  src={prod.heroImage}
                  alt={prod.title}
                  width="100%"
                  height="260px"
                />
              </div>
              <h3 className={styles.cardTitle}>{prod.title}</h3>
              <div className={styles.exploreBtn}>
                <button type="button" className="button--red">
                  EXPLORE →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

