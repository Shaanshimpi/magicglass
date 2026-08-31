'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PdpHero } from '@/components/PDP/PdpHero'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'
import mockData from '@/data/industry_solutions_mock.json'
import styles from './IndustrySolution.module.css'


interface IndustryItem {
  id: string
  title: string
  subtitle: string
  image: string
  specs: string
  description: string
}

interface IndustrySolutionContentProps {
  cmsData?: {
    page: any
    industries: IndustryItem[]
  }
}

export const IndustrySolutionContent: React.FC<IndustrySolutionContentProps> = ({ cmsData }) => {
  const { openQuoteDrawer } = useLayoutContext()
  const data = cmsData || (mockData as { page: any; industries: IndustryItem[] })
  const { page, industries } = data

  // GSAP Parallax Section & Card Refs
  const sectionRef = useRef<HTMLElement>(null)
  const mobileSectionRef = useRef<HTMLElement>(null)
  const mobilePinRef = useRef<HTMLDivElement>(null)

  // Desktop Card & Text Refs
  const row1CardRef = useRef<HTMLDivElement>(null)
  const row1TextRef = useRef<HTMLDivElement>(null)
  const row2Card1Ref = useRef<HTMLDivElement>(null)
  const row2Card2Ref = useRef<HTMLDivElement>(null)
  const row3Card1Ref = useRef<HTMLDivElement>(null)
  const row3Card2Ref = useRef<HTMLDivElement>(null)

  // Mobile Tile Refs & Tap State
  const mobileTileRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeTapId, setActiveTapId] = useState<string | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    // -------------------------------------------------------------------------
    // DESKTOP ANIMATION (> 900px): 3-Row Parallax Grid (2 Cards per row for Row 2 & 3)
    // -------------------------------------------------------------------------
    mm.add('(min-width: 901px)', () => {
      if (sectionRef.current) {
        // Row 1 Parallax (Airport)
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

        // Row 2 Parallax (2 Cards - Architecture, Automobile)
        if (row2Card1Ref.current) {
          gsap.to(row2Card1Ref.current, {
            y: -85,
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
            y: 45,
            ease: 'none',
            scrollTrigger: {
              trigger: row2Card2Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          })
        }

        // Row 3 Parallax (2 Cards - Hospitality, Transport)
        if (row3Card1Ref.current) {
          gsap.to(row3Card1Ref.current, {
            y: -95,
            ease: 'none',
            scrollTrigger: {
              trigger: row3Card1Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          })
        }
        if (row3Card2Ref.current) {
          gsap.to(row3Card2Ref.current, {
            y: 55,
            ease: 'none',
            scrollTrigger: {
              trigger: row3Card2Ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.8,
            },
          })
        }
      }
    })

    // -------------------------------------------------------------------------
    // MOBILE ANIMATION (<= 900px): Pinned Bottom-Right Diagonal Scale Scene
    // -------------------------------------------------------------------------
    mm.add('(max-width: 900px)', () => {
      if (mobileSectionRef.current && mobilePinRef.current) {
        const totalCards = industries.length

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileSectionRef.current,
            start: 'top top',
            end: `+=${totalCards * 100}%`,
            pin: mobilePinRef.current,
            pinSpacing: true,
            anticipatePin: 1,
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

        // Sequential Diagonal Entrance for each card on Mobile
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
                opacity: 0,
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
  }, [industries])

  const handleTileTap = (id: string) => {
    setActiveTapId((prev) => (prev === id ? null : id))
  }

  // Row 1 item (Airport)
  const row1Item = industries[0]
  // Row 2 items (Architecture, Automobile)
  const row2Items = industries.slice(1, 3)
  // Row 3 items (Hospitality, Transport)
  const row3Items = industries.slice(3, 5)

  return (
    <div style={{ paddingTop: '70px', backgroundColor: 'var(--color-black)', color: 'var(--color-taupe)' }}>
        {/* 1. PDP Hero Section */}
        <PdpHero
          indexNumber={page.indexNumber}
          title={page.title}
          subheading={page.introDescription}
          category={page.category}
          heroImage={page.heroImage}
        />

        {/* 2. Homepage GLASS APPLICATIONS Section (Desktop View - Parallax 2x2 Grid) */}
        <section ref={sectionRef} className={styles.desktopProductSection}>
          <div className={styles.container}>
            {/* Header Block */}
            <div className={styles.headerBlock}>
              <div className={styles.eyebrow}>{page.eyebrow}</div>
              <h2 className={styles.subheading}>{page.subheading}</h2>
            </div>

            {/* ROW 1: Airport Card + Intro Text */}
            <div className={styles.row1Wrapper}>
              {row1Item && (
                <div ref={row1CardRef} className={`${styles.collectionCard} ${styles.row1Card}`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={row1Item.image}
                      alt={row1Item.title}
                      fill
                      sizes="460px"
                      priority
                      unoptimized={row1Item.image.startsWith('http://')}
                    />
                    <div className={styles.cardOverlay} />
                    <h3 className={styles.cardMainTitle}>{row1Item.title}</h3>
                    <div className={styles.viewBadge}>VIEW</div>

                    {/* Hover Details Overlay with Scraped Text */}
                    <div className={styles.hoverDetailsOverlay}>
                      <div className={styles.hoverContent}>
                        <div>
                          <span className={styles.hoverCategory}>{row1Item.subtitle}</span>
                          <h4 className={styles.hoverTitle}>{row1Item.title}</h4>
                          <p className={styles.hoverSpecs}>{row1Item.specs}</p>
                        </div>
                        <p className={styles.hoverDescription}>{row1Item.description}</p>
                        <span className={styles.hoverLink}>EXPLORE SOLUTION →</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={row1TextRef} className={styles.row1TextContent}>
                <p className={styles.topDescription}>
                  Our <strong>industry solution collection</strong> is defined by exceptional engineering, refined aesthetics, and enduring quality. Get every architectural and industrial glass application under one roof.
                </p>
                <div className={styles.ctaWrapper}>
                  <button type="button" className="btn-black" onClick={openQuoteDrawer}>
                    ↳ REQUEST ENQUIRY
                  </button>
                </div>
              </div>
            </div>

            {/* ROW 2: 2 Cards (Architecture & Automobile - Asymmetrical Heights & Parallax) */}
            <div className={styles.row2Grid}>
              {row2Items[0] && (
                <div ref={row2Card1Ref} className={`${styles.collectionCard} ${styles.row2Card1}`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={row2Items[0].image}
                      alt={row2Items[0].title}
                      fill
                      sizes="440px"
                      unoptimized={row2Items[0].image.startsWith('http://')}
                    />
                    <div className={styles.cardOverlay} />
                    <h3 className={styles.cardMainTitle}>{row2Items[0].title}</h3>
                    <div className={styles.viewBadge}>VIEW</div>

                    <div className={styles.hoverDetailsOverlay}>
                      <div className={styles.hoverContent}>
                        <div>
                          <span className={styles.hoverCategory}>{row2Items[0].subtitle}</span>
                          <h4 className={styles.hoverTitle}>{row2Items[0].title}</h4>
                          <p className={styles.hoverSpecs}>{row2Items[0].specs}</p>
                        </div>
                        <p className={styles.hoverDescription}>{row2Items[0].description}</p>
                        <span className={styles.hoverLink}>EXPLORE SOLUTION →</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {row2Items[1] && (
                <div ref={row2Card2Ref} className={`${styles.collectionCard} ${styles.row2Card2}`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={row2Items[1].image}
                      alt={row2Items[1].title}
                      fill
                      sizes="520px"
                      unoptimized={row2Items[1].image.startsWith('http://')}
                    />
                    <div className={styles.cardOverlay} />
                    <h3 className={styles.cardMainTitle}>{row2Items[1].title}</h3>
                    <div className={styles.viewBadge}>VIEW</div>

                    <div className={styles.hoverDetailsOverlay}>
                      <div className={styles.hoverContent}>
                        <div>
                          <span className={styles.hoverCategory}>{row2Items[1].subtitle}</span>
                          <h4 className={styles.hoverTitle}>{row2Items[1].title}</h4>
                          <p className={styles.hoverSpecs}>{row2Items[1].specs}</p>
                        </div>
                        <p className={styles.hoverDescription}>{row2Items[1].description}</p>
                        <span className={styles.hoverLink}>EXPLORE SOLUTION →</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 3: 2 Cards (Hospitality & Transport - Asymmetrical Heights & Parallax) */}
            <div className={styles.row3Grid}>
              {row3Items[0] && (
                <div ref={row3Card1Ref} className={`${styles.collectionCard} ${styles.row3Card1}`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={row3Items[0].image}
                      alt={row3Items[0].title}
                      fill
                      sizes="540px"
                      unoptimized={row3Items[0].image.startsWith('http://')}
                    />
                    <div className={styles.cardOverlay} />
                    <h3 className={styles.cardMainTitle}>{row3Items[0].title}</h3>
                    <div className={styles.viewBadge}>VIEW</div>

                    <div className={styles.hoverDetailsOverlay}>
                      <div className={styles.hoverContent}>
                        <div>
                          <span className={styles.hoverCategory}>{row3Items[0].subtitle}</span>
                          <h4 className={styles.hoverTitle}>{row3Items[0].title}</h4>
                          <p className={styles.hoverSpecs}>{row3Items[0].specs}</p>
                        </div>
                        <p className={styles.hoverDescription}>{row3Items[0].description}</p>
                        <span className={styles.hoverLink}>EXPLORE SOLUTION →</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {row3Items[1] && (
                <div ref={row3Card2Ref} className={`${styles.collectionCard} ${styles.row3Card2}`}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={row3Items[1].image}
                      alt={row3Items[1].title}
                      fill
                      sizes="460px"
                      unoptimized={row3Items[1].image.startsWith('http://')}
                    />
                    <div className={styles.cardOverlay} />
                    <h3 className={styles.cardMainTitle}>{row3Items[1].title}</h3>
                    <div className={styles.viewBadge}>VIEW</div>

                    <div className={styles.hoverDetailsOverlay}>
                      <div className={styles.hoverContent}>
                        <div>
                          <span className={styles.hoverCategory}>{row3Items[1].subtitle}</span>
                          <h4 className={styles.hoverTitle}>{row3Items[1].title}</h4>
                          <p className={styles.hoverSpecs}>{row3Items[1].specs}</p>
                        </div>
                        <p className={styles.hoverDescription}>{row3Items[1].description}</p>
                        <span className={styles.hoverLink}>EXPLORE SOLUTION →</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Mobile Pinned Diagonal Scale Scene (Mobile View) */}
        <section ref={mobileSectionRef} className={styles.mobileProductSection}>
          <div ref={mobilePinRef} className={styles.mobileContainer}>
            <div className={styles.mobileHeaderBlock}>
              <div className={styles.eyebrow}>{page.eyebrow}</div>
              <h2 className={styles.mobileSubheading}>{page.subheading}</h2>
            </div>

            <div className={styles.mobileStageArea}>
              {industries.map((ind, i) => {
                const isTapped = activeTapId === ind.id
                return (
                  <div
                    key={`mob-${ind.id}`}
                    ref={(el) => {
                      mobileTileRefs.current[i] = el
                    }}
                    className={`${styles.mobileTileCard} ${isTapped ? styles.tapped : ''}`}
                    onClick={() => handleTileTap(ind.id)}
                  >
                    <div className={styles.mobileImageWrapper}>
                      <Image
                        src={ind.image}
                        alt={ind.title}
                        fill
                        sizes="92vw"
                        priority={i === 0}
                        className={styles.mobileTileImage}
                        unoptimized={ind.image.startsWith('http://')}
                      />
                      <div className={styles.cardOverlay} />

                      {!isTapped && (
                        <>
                          <h3 className={styles.mobileCardMainTitle}>{ind.title}</h3>
                          <div className={styles.mobileTapBadge}>TAP FOR INFO</div>
                        </>
                      )}

                      <div
                        className={`${styles.mobileHoverDetailsOverlay} ${
                          isTapped ? styles.overlayActive : ''
                        }`}
                      >
                        <div className={styles.hoverContent}>
                          <span className={styles.hoverCategory}>{ind.subtitle}</span>
                          <h4 className={styles.hoverTitle}>{ind.title}</h4>
                          <p className={styles.hoverSpecs}>{ind.specs}</p>
                          <p className={styles.hoverDescription}>{ind.description}</p>
                          <span className={styles.hoverLink}>TAP TO CLOSE ✕</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
    </div>
  )
}

