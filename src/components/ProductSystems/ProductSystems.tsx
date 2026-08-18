'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ProductSystems.module.css'

interface ProductCategory {
  id: string
  title: string
  subtitle: string
  specs: string
  image: string
}

// Row 1: Center Image (RAILINGS, STAIRCASES AND DOORS)
const ROW1_ITEM: ProductCategory = {
  id: 'railings',
  title: 'RAILINGS, STAIRCASES AND DOORS',
  subtitle: 'GLASS APPLICATION 01',
  specs: 'Frameless Glass Doors, Patch Fitting Entrances, Glass Balustrades & Custom Staircase Systems.',
  image: '/images/apps/railings.png',
}

// Row 2: 3 Small Images (WINDOWS, ROOF, OVERHEAD SPACES)
const ROW2_ITEMS: ProductCategory[] = [
  {
    id: 'windows',
    title: 'WINDOWS',
    subtitle: 'GLASS APPLICATION 02',
    specs: 'Insulated Double Glazed DGU 28mm & SKN Ultra Low-E Solar Control High-Efficiency Windows.',
    image: '/images/apps/windows.png',
  },
  {
    id: 'roof',
    title: 'ROOF',
    subtitle: 'GLASS APPLICATION 03',
    specs: 'Heat Soaked SentryGlas® Structural Laminated Glass for Weatherproof Overhead Roof Glazing.',
    image: '/images/apps/roof.png',
  },
  {
    id: 'overhead-spaces',
    title: 'OVERHEAD SPACES',
    subtitle: 'GLASS APPLICATION 04',
    specs: 'Point-Supported Spider Glass Canopies, Atrium Glazing & Heavy Wind Load Systems.',
    image: '/images/apps/overhead-spaces.png',
  },
]

// Row 3: 2 Large Images (GLASS LIFTS, PARTITIONS)
const ROW3_ITEMS: ProductCategory[] = [
  {
    id: 'glass-lifts',
    title: 'GLASS LIFTS',
    subtitle: 'GLASS APPLICATION 05',
    specs: 'Architectural Curved & Toughened Structural Glass for Panoramic Elevator Shafts & Lifts.',
    image: '/images/apps/glass-lifts.png',
  },
  {
    id: 'partitions',
    title: 'PARTITIONS',
    subtitle: 'GLASS APPLICATION 06',
    specs: 'Acoustic 42dB Soundproof Glass Walls, Satin Frosted Privacy & Smart Switchable Glass.',
    image: '/images/apps/partition.png',
  },
]

export const ProductSystems: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Row 1 Refs
  const row1CardRef = useRef<HTMLDivElement>(null)
  const row1TextRef = useRef<HTMLDivElement>(null)

  // Row 2 Refs (3 Small Images with 3 different speeds)
  const row2Card1Ref = useRef<HTMLDivElement>(null)
  const row2Card2Ref = useRef<HTMLDivElement>(null)
  const row2Card3Ref = useRef<HTMLDivElement>(null)

  // Row 3 Refs (2 Large Images with different speeds)
  const row3Card1Ref = useRef<HTMLDivElement>(null)
  const row3Card2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        // Row 1 Parallax
        if (row1CardRef.current) {
          gsap.to(row1CardRef.current, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }
        if (row1TextRef.current) {
          gsap.to(row1TextRef.current, {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
        }

        // Row 2 Parallax (3 Small Images - 3 Different Speeds)
        if (row2Card1Ref.current) {
          gsap.to(row2Card1Ref.current, {
            y: -75,
            ease: 'none',
            scrollTrigger: {
              trigger: row2Card1Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          })
        }
        if (row2Card2Ref.current) {
          gsap.to(row2Card2Ref.current, {
            y: 35,
            ease: 'none',
            scrollTrigger: {
              trigger: row2Card2Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          })
        }
        if (row2Card3Ref.current) {
          gsap.to(row2Card3Ref.current, {
            y: -105,
            ease: 'none',
            scrollTrigger: {
              trigger: row2Card3Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2.1,
            },
          })
        }

        // Row 3 Parallax (2 Large Images - 2 Different Speeds)
        if (row3Card1Ref.current) {
          gsap.to(row3Card1Ref.current, {
            y: -85,
            ease: 'none',
            scrollTrigger: {
              trigger: row3Card1Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.3,
            },
          })
        }
        if (row3Card2Ref.current) {
          gsap.to(row3Card2Ref.current, {
            y: 45,
            ease: 'none',
            scrollTrigger: {
              trigger: row3Card2Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.7,
            },
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="products" ref={sectionRef} className={styles.productSection}>
      <div className={styles.container}>
        {/* Header matching magicglass.co.in */}
        <div className={styles.headerBlock}>
          <div className={styles.eyebrow}>
            ◆ GLASS APPLICATIONS
          </div>
          <h2 className={styles.subheading}>
            GET EVERY GLASS APPLICATION UNDER ONE ROOF
          </h2>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* ROW 1: Center Image + Text on Right                               */}
        {/* ------------------------------------------------------------------ */}
        <div className={styles.row1Wrapper}>
          {/* First Image in Center */}
          <div ref={row1CardRef} className={`${styles.collectionCard} ${styles.row1Card}`}>
            <div className={styles.imageWrapper}>
              <Image src={ROW1_ITEM.image} alt={ROW1_ITEM.title} fill sizes="380px" priority />
              <div className={styles.cardOverlay} />
              <h3 className={styles.cardMainTitle}>{ROW1_ITEM.title}</h3>
              <div className={styles.viewBadge}>VIEW</div>

              {/* Hover Details Overlay */}
              <div className={styles.hoverDetailsOverlay}>
                <div className={styles.hoverContent}>
                  <span className={styles.hoverCategory}>{ROW1_ITEM.subtitle}</span>
                  <h4 className={styles.hoverTitle}>{ROW1_ITEM.title}</h4>
                  <p className={styles.hoverSpecs}>{ROW1_ITEM.specs}</p>
                  <span className={styles.hoverLink}>EXPLORE SYSTEM →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Block Right of First Image */}
          <div ref={row1TextRef} className={styles.row1TextContent}>
            <p className={styles.topDescription}>
              Our <strong>glazing collection</strong> is defined by exceptional craftsmanship, refined design, and enduring quality. Get every glass application under one roof for bold architecture and uncompromising vision.
            </p>
            <div className={styles.ctaWrapper}>
              <a href="#quote" className="btn-black">
                ↳ PRODUCT OVERVIEW
              </a>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* ROW 2: 3 Small Images (WINDOWS, ROOF, OVERHEAD SPACES)            */}
        {/* ------------------------------------------------------------------ */}
        <div className={styles.row2Grid}>
          {/* Card 1 (Left, Speed 1) */}
          <div ref={row2Card1Ref} className={`${styles.collectionCard} ${styles.row2Card1}`}>
            <div className={styles.imageWrapper}>
              <Image src={ROW2_ITEMS[0].image} alt={ROW2_ITEMS[0].title} fill sizes="320px" />
              <div className={styles.cardOverlay} />
              <h3 className={styles.cardMainTitle}>{ROW2_ITEMS[0].title}</h3>
              <div className={styles.viewBadge}>VIEW</div>

              <div className={styles.hoverDetailsOverlay}>
                <div className={styles.hoverContent}>
                  <span className={styles.hoverCategory}>{ROW2_ITEMS[0].subtitle}</span>
                  <h4 className={styles.hoverTitle}>{ROW2_ITEMS[0].title}</h4>
                  <p className={styles.hoverSpecs}>{ROW2_ITEMS[0].specs}</p>
                  <span className={styles.hoverLink}>EXPLORE SYSTEM →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 (Center, Speed 2) */}
          <div ref={row2Card2Ref} className={`${styles.collectionCard} ${styles.row2Card2}`}>
            <div className={styles.imageWrapper}>
              <Image src={ROW2_ITEMS[1].image} alt={ROW2_ITEMS[1].title} fill sizes="360px" />
              <div className={styles.cardOverlay} />
              <h3 className={styles.cardMainTitle}>{ROW2_ITEMS[1].title}</h3>
              <div className={styles.viewBadge}>VIEW</div>

              <div className={styles.hoverDetailsOverlay}>
                <div className={styles.hoverContent}>
                  <span className={styles.hoverCategory}>{ROW2_ITEMS[1].subtitle}</span>
                  <h4 className={styles.hoverTitle}>{ROW2_ITEMS[1].title}</h4>
                  <p className={styles.hoverSpecs}>{ROW2_ITEMS[1].specs}</p>
                  <span className={styles.hoverLink}>EXPLORE SYSTEM →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 (Right, Speed 3) */}
          <div ref={row2Card3Ref} className={`${styles.collectionCard} ${styles.row2Card3}`}>
            <div className={styles.imageWrapper}>
              <Image src={ROW2_ITEMS[2].image} alt={ROW2_ITEMS[2].title} fill sizes="340px" />
              <div className={styles.cardOverlay} />
              <h3 className={styles.cardMainTitle}>{ROW2_ITEMS[2].title}</h3>
              <div className={styles.viewBadge}>VIEW</div>

              <div className={styles.hoverDetailsOverlay}>
                <div className={styles.hoverContent}>
                  <span className={styles.hoverCategory}>{ROW2_ITEMS[2].subtitle}</span>
                  <h4 className={styles.hoverTitle}>{ROW2_ITEMS[2].title}</h4>
                  <p className={styles.hoverSpecs}>{ROW2_ITEMS[2].specs}</p>
                  <span className={styles.hoverLink}>EXPLORE SYSTEM →</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* ROW 3: 2 Large Images (GLASS LIFTS, PARTITIONS)                   */}
        {/* ------------------------------------------------------------------ */}
        <div className={styles.row3Grid}>
          {/* Large Card 1 (Left-Center, Speed 4) */}
          <div ref={row3Card1Ref} className={`${styles.collectionCard} ${styles.row3Card1}`}>
            <div className={styles.imageWrapper}>
              <Image src={ROW3_ITEMS[0].image} alt={ROW3_ITEMS[0].title} fill sizes="440px" />
              <div className={styles.cardOverlay} />
              <h3 className={styles.cardMainTitle}>{ROW3_ITEMS[0].title}</h3>
              <div className={styles.viewBadge}>VIEW</div>

              <div className={styles.hoverDetailsOverlay}>
                <div className={styles.hoverContent}>
                  <span className={styles.hoverCategory}>{ROW3_ITEMS[0].subtitle}</span>
                  <h4 className={styles.hoverTitle}>{ROW3_ITEMS[0].title}</h4>
                  <p className={styles.hoverSpecs}>{ROW3_ITEMS[0].specs}</p>
                  <span className={styles.hoverLink}>EXPLORE SYSTEM →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Large Card 2 (Right-Center, Speed 5) */}
          <div ref={row3Card2Ref} className={`${styles.collectionCard} ${styles.row3Card2}`}>
            <div className={styles.imageWrapper}>
              <Image src={ROW3_ITEMS[1].image} alt={ROW3_ITEMS[1].title} fill sizes="410px" />
              <div className={styles.cardOverlay} />
              <h3 className={styles.cardMainTitle}>{ROW3_ITEMS[1].title}</h3>
              <div className={styles.viewBadge}>VIEW</div>

              <div className={styles.hoverDetailsOverlay}>
                <div className={styles.hoverContent}>
                  <span className={styles.hoverCategory}>{ROW3_ITEMS[1].subtitle}</span>
                  <h4 className={styles.hoverTitle}>{ROW3_ITEMS[1].title}</h4>
                  <p className={styles.hoverSpecs}>{ROW3_ITEMS[1].specs}</p>
                  <span className={styles.hoverLink}>EXPLORE SYSTEM →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
