'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ProductSystems.module.css'

interface ProductCategory {
  id: string
  num: string
  title: string
  subtitle: string
  specs: string
  image: string
}

// Row 1: Center Image (RAILINGS, STAIRCASES AND DOORS)
const ROW1_ITEM: ProductCategory = {
  id: 'railings',
  num: '01',
  title: 'RAILINGS, STAIRCASES AND DOORS',
  subtitle: 'Frameless Glass Entrances & Balustrades',
  specs: 'Frameless Glass Doors, Patch Fitting Entrances, Glass Balustrades & Custom Glass Staircase Systems.',
  image: '/images/apps/railings.png',
}

// Row 2: 3 Small Images (WINDOWS, ROOF, OVERHEAD SPACES)
const ROW2_ITEMS: ProductCategory[] = [
  {
    id: 'windows',
    num: '02',
    title: 'WINDOWS',
    subtitle: 'High Performance DGU & Low-E Solar Control',
    specs: 'Insulated Double Glazed DGU 28mm & SKN Ultra Low-E Solar Control High-Efficiency Windows.',
    image: '/images/apps/windows.png',
  },
  {
    id: 'roof',
    num: '03',
    title: 'ROOF',
    subtitle: 'Structural Overhead Skylights',
    specs: 'Heat Soaked SentryGlas® Structural Laminated Glass engineered for extreme weather resistance.',
    image: '/images/apps/roof.png',
  },
  {
    id: 'overhead-spaces',
    num: '04',
    title: 'OVERHEAD SPACES',
    subtitle: 'Glass Canopies & Atriums',
    specs: 'Point-Supported Spider Glass Canopies, Atrium Glazing & Heavy Wind Load Systems.',
    image: '/images/apps/overhead-spaces.png',
  },
]

// Row 3: 2 Large Images (GLASS LIFTS, PARTITIONS)
const ROW3_ITEMS: ProductCategory[] = [
  {
    id: 'glass-lifts',
    num: '05',
    title: 'GLASS LIFTS',
    subtitle: 'Panoramic Elevator Enclosures',
    specs: 'Architectural Curved & Toughened Structural Glass for Panoramic Elevator Shafts & Lifts.',
    image: '/images/apps/glass-lifts.png',
  },
  {
    id: 'partitions',
    num: '06',
    title: 'PARTITIONS',
    subtitle: 'Acoustic Soundproof & Privacy Walls',
    specs: 'Acoustic 42dB Soundproof Glass Walls, Satin Frosted Privacy & Smart Switchable Glass.',
    image: '/images/apps/partition.png',
  },
]

const ALL_MOBILE_PRODUCTS: ProductCategory[] = [
  ROW1_ITEM,
  ...ROW2_ITEMS,
  ...ROW3_ITEMS,
]

export const ProductSystems: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const mobilePinRef = useRef<HTMLElement>(null)
  
  // Desktop Refs
  const row1CardRef = useRef<HTMLDivElement>(null)
  const row1TextRef = useRef<HTMLDivElement>(null)
  const row2Card1Ref = useRef<HTMLDivElement>(null)
  const row2Card2Ref = useRef<HTMLDivElement>(null)
  const row2Card3Ref = useRef<HTMLDivElement>(null)
  const row3Card1Ref = useRef<HTMLDivElement>(null)
  const row3Card2Ref = useRef<HTMLDivElement>(null)

  // Mobile Tile Refs
  const mobileTileRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeTapId, setActiveTapId] = useState<string | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    // -------------------------------------------------------------------------
    // DESKTOP ANIMATION (> 900px): 3-Row Parallax Grid with Hover Overlays
    // -------------------------------------------------------------------------
    mm.add('(min-width: 901px)', () => {
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

        // Row 2 Parallax (3 Small Images - 3 Speeds & 40% Size/Offset Variance)
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

        // Row 3 Parallax (2 Large Images - 2 Speeds & 40% Size/Offset Variance)
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
    })

    // -------------------------------------------------------------------------
    // MOBILE ANIMATION (<= 900px): Pinned Bottom-Right Diagonal Scale Storytelling
    // -------------------------------------------------------------------------
    mm.add('(max-width: 900px)', () => {
      if (mobilePinRef.current) {
        const totalCards = ALL_MOBILE_PRODUCTS.length

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobilePinRef.current,
            start: 'top top',
            end: `+=${totalCards * 90}%`,
            pin: true,
            scrub: 1,
          },
        })

        // Initial setup for mobile cards
        mobileTileRefs.current.forEach((card, i) => {
          if (!card) return
          if (i === 0) {
            gsap.set(card, {
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              opacity: 1,
              transformOrigin: 'bottom right',
            })
          } else {
            gsap.set(card, {
              xPercent: 75,
              yPercent: 75,
              scale: 0.2,
              opacity: 0,
              transformOrigin: 'bottom right',
            })
          }
        })

        // Sequential Diagonal Entrance for each card on Mobile (exit opacity = 0 to prevent stacking)
        for (let i = 0; i < totalCards - 1; i++) {
          const currentCard = mobileTileRefs.current[i]
          const nextCard = mobileTileRefs.current[i + 1]

          if (currentCard && nextCard) {
            tl.to(
              currentCard,
              {
                xPercent: -40,
                yPercent: -40,
                scale: 0.75,
                opacity: 0, // Clean exit: zero opacity prevents card stacking & overlapping text
                duration: 1,
                ease: 'power2.inOut',
              },
              `step-${i}`
            ).to(
              nextCard,
              {
                xPercent: 0,
                yPercent: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut',
              },
              `step-${i}`
            )
          }
        }
      }
    })

    return () => mm.revert()
  }, [])

  const handleTileTap = (id: string) => {
    setActiveTapId((prev) => (prev === id ? null : id))
  }

  return (
    <>
      {/* ==================================================================== */}
      {/* DESKTOP VIEW (> 900px): 3-Row Parallax Grid                          */}
      {/* ==================================================================== */}
      <section id="products" ref={sectionRef} className={styles.desktopProductSection}>
        <div className={styles.container}>
          {/* Eyebrow Header & Subheading */}
          <div className={styles.headerBlock}>
            <div className={styles.eyebrow}>
              ◆ GLASS APPLICATIONS
            </div>
            <h2 className={styles.subheading}>
              GET EVERY GLASS APPLICATION UNDER ONE ROOF
            </h2>
          </div>

          {/* ROW 1: Center Image + Text Right */}
          <div className={styles.row1Wrapper}>
            <div ref={row1CardRef} className={`${styles.collectionCard} ${styles.row1Card}`}>
              <div className={styles.imageWrapper}>
                <Image src={ROW1_ITEM.image} alt={ROW1_ITEM.title} fill sizes="380px" priority />
                <div className={styles.cardOverlay} />
                <h3 className={styles.cardMainTitle}>{ROW1_ITEM.title}</h3>
                <div className={styles.viewBadge}>VIEW</div>

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

          {/* ROW 2: 3 Small Images */}
          <div className={styles.row2Grid}>
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

          {/* ROW 3: 2 Large Images */}
          <div className={styles.row3Grid}>
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

      {/* ==================================================================== */}
      {/* MOBILE VIEW (<= 900px): Pinned Bottom-Right Diagonal Scale Scene     */}
      {/* ==================================================================== */}
      <section ref={mobilePinRef} className={styles.mobileProductSection}>
        <div className={styles.mobileContainer}>
          <div className={styles.mobileHeaderBlock}>
            <div className={styles.eyebrow}>
              ◆ GLASS APPLICATIONS
            </div>
            <h2 className={styles.mobileSubheading}>
              GET EVERY GLASS APPLICATION UNDER ONE ROOF
            </h2>
          </div>

          <div className={styles.mobileStageArea}>
            {ALL_MOBILE_PRODUCTS.map((prod, i) => {
              const isTapped = activeTapId === prod.id
              return (
                <div
                  key={`mob-${prod.id}`}
                  ref={(el) => { mobileTileRefs.current[i] = el }}
                  className={`${styles.mobileTileCard} ${isTapped ? styles.tapped : ''}`}
                  onClick={() => handleTileTap(prod.id)}
                >
                  <div className={styles.mobileImageWrapper}>
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      sizes="92vw"
                      priority={i === 0}
                      className={styles.mobileTileImage}
                    />
                    <div className={styles.cardOverlay} />
                    
                    {/* Title directly ON the Image Card */}
                    <h3 className={styles.mobileCardMainTitle}>
                      {prod.title}
                    </h3>
                    <div className={styles.mobileTapBadge}>TAP FOR DETAILS</div>

                    {/* Interactive Full Text Details Overlay (Toggles on Tap) */}
                    <div
                      className={`${styles.mobileHoverDetailsOverlay} ${
                        isTapped ? styles.overlayActive : ''
                      }`}
                    >
                      <div className={styles.hoverContent}>
                        <span className={styles.hoverCategory}>{prod.subtitle}</span>
                        <h4 className={styles.hoverTitle}>{prod.title}</h4>
                        <p className={styles.hoverSpecs}>{prod.specs}</p>
                        <span className={styles.hoverLink}>EXPLORE SYSTEM →</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
