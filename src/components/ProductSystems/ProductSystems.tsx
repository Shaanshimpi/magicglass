'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { ApplicationCard, ApplicationCardItem } from '@/components/Common/ApplicationCard'
import { useParallaxGridAnimation } from '@/hooks/useParallaxGridAnimation'
import styles from './ProductSystems.module.css'

interface GlassApplicationsData {
  eyebrow?: string
  heading?: string
  topDescription?: string
  ctaLabel?: string
  ctaHref?: string
  cards?: {
    title: string
    subtitle?: string
    specs?: string
    image?: string
    hoverCategory?: string
    hoverLink?: string
  }[]
}

const DEFAULT_CARDS: ApplicationCardItem[] = [
  { id: 'railings', title: 'RAILINGS, STAIRCASES AND DOORS', subtitle: 'Frameless Glass Entrances & Structural Balustrades', specs: 'Toughened Laminated Glass Panels, Patch-Fitting Door Glass, Glass Balustrades & Custom Staircase Assemblies.', image: '/images/apps/railings.png' },
  { id: 'windows', title: 'WINDOWS', subtitle: 'High Performance DGU & Low-E Solar Control', specs: 'Insulated Double Glazed Units (DGU) & High-Performance Low-E Solar Control Glass Panels.', image: '/images/apps/windows.png' },
  { id: 'roof', title: 'ROOF', subtitle: 'Structural Overhead Skylight Glass', specs: 'Heat Soaked SentryGlas® & PVB Structural Laminated Glass engineered for overhead safety.', image: '/images/apps/roof.png' },
  { id: 'overhead-spaces', title: 'OVERHEAD SPACES', subtitle: 'Spider-Supported Overhead Glass', specs: 'Point-Supported Spider Glass Canopies, Atrium Glazing Panels & Heavy Wind Load Safety Systems.', image: '/images/apps/overhead-spaces.png' },
  { id: 'glass-lifts', title: 'GLASS LIFTS', subtitle: 'Curved & Toughened Shaft Enclosures', specs: 'Architectural Curved & Toughened Structural Glass for Panoramic Elevator Enclosures.', image: '/images/apps/glass-lifts.png' },
  { id: 'partitions', title: 'PARTITIONS', subtitle: 'Soundproof & Privacy Interior Walls', specs: 'Acoustic 42dB Soundproof Laminated Glass, Acid-Frosted Privacy & Smart Switchable Glass Panels.', image: '/images/apps/partition.png' },
]

interface ProductSystemsProps {
  cmsData?: GlassApplicationsData
}

export const ProductSystems: React.FC<ProductSystemsProps> = ({ cmsData }) => {
  const eyebrow = cmsData?.eyebrow || '◆ GLASS APPLICATIONS'
  const heading = cmsData?.heading || 'GET EVERY GLASS APPLICATION UNDER ONE ROOF'
  const topDescription = cmsData?.topDescription || 'Our glazing collection is defined by exceptional craftsmanship, refined design, and enduring quality. Get every glass application under one roof for bold architecture and uncompromising vision.'
  const ctaLabel = cmsData?.ctaLabel || '↳ PRODUCT OVERVIEW'
  const ctaHref = cmsData?.ctaHref || '/products'

  const rawCards = cmsData?.cards?.length ? cmsData.cards : DEFAULT_CARDS
  const allCards: ApplicationCardItem[] = rawCards.map((c, i) => ({
    id: `card-${i}`,
    title: c.title,
    subtitle: c.subtitle || '',
    specs: c.specs || '',
    image: c.image || '/images/apps/railings.png',
  }))

  const ROW1_ITEM = allCards[0]
  const ROW2_ITEMS = allCards.slice(1, 4)
  const ROW3_ITEMS = allCards.slice(4, 6)

  const sectionRef = useRef<HTMLElement>(null)
  const mobileSectionRef = useRef<HTMLElement>(null)
  const mobilePinRef = useRef<HTMLDivElement>(null)

  const row1CardRef = useRef<HTMLDivElement>(null)
  const row1TextRef = useRef<HTMLDivElement>(null)
  const row2Card1Ref = useRef<HTMLDivElement>(null)
  const row2Card2Ref = useRef<HTMLDivElement>(null)
  const row2Card3Ref = useRef<HTMLDivElement>(null)
  const row3Card1Ref = useRef<HTMLDivElement>(null)
  const row3Card2Ref = useRef<HTMLDivElement>(null)

  const [activeTapId, setActiveTapId] = useState<string | null>(null)

  const { setMobileTileRef } = useParallaxGridAnimation({
    desktopRef: sectionRef,
    mobileSectionRef,
    mobilePinRef,
    row1CardRef,
    row1TextRef,
    row2Card1Ref,
    row2Card2Ref,
    row2Card3Ref,
    row3Card1Ref,
    row3Card2Ref,
    mobileCardCount: allCards.length,
  })

  const handleTileTap = (id: string) => {
    setActiveTapId((prev) => (prev === id ? null : id))
  }

  return (
    <>
      <section id="products" ref={sectionRef} className={styles.desktopProductSection}>
        <div className={styles.container}>
          <div className={styles.headerBlock}>
            <div className={styles.eyebrow} data-cms-field="glassApplications_eyebrow">
              {eyebrow}
            </div>
            <h2 className={styles.subheading} data-cms-field="glassApplications_heading">
              {heading}
            </h2>
          </div>

          {/* ROW 1 */}
          <div className={styles.row1Wrapper}>
            {ROW1_ITEM && (
              <ApplicationCard
                item={ROW1_ITEM}
                cardRef={row1CardRef}
                cardClassName={styles.row1Card}
                sizes="(max-width: 900px) 100vw, 380px"
                priority
                stylesObj={styles}
              />
            )}

            <div ref={row1TextRef} className={styles.row1TextContent}>
              <p className={styles.topDescription}>{topDescription}</p>
              <div className={styles.ctaWrapper}>
                <a href={ctaHref} className="btn-black">
                  {ctaLabel}
                </a>
              </div>
            </div>
          </div>

          {/* ROW 2 */}
          <div className={styles.row2Grid}>
            {ROW2_ITEMS[0] && <ApplicationCard item={ROW2_ITEMS[0]} cardRef={row2Card1Ref} cardClassName={styles.row2Card1} sizes="(max-width: 900px) 100vw, 320px" stylesObj={styles} />}
            {ROW2_ITEMS[1] && <ApplicationCard item={ROW2_ITEMS[1]} cardRef={row2Card2Ref} cardClassName={styles.row2Card2} sizes="(max-width: 900px) 100vw, 360px" stylesObj={styles} />}
            {ROW2_ITEMS[2] && <ApplicationCard item={ROW2_ITEMS[2]} cardRef={row2Card3Ref} cardClassName={styles.row2Card3} sizes="(max-width: 900px) 100vw, 340px" stylesObj={styles} />}
          </div>

          {/* ROW 3 */}
          <div className={styles.row3Grid}>
            {ROW3_ITEMS[0] && <ApplicationCard item={ROW3_ITEMS[0]} cardRef={row3Card1Ref} cardClassName={styles.row3Card1} sizes="(max-width: 900px) 100vw, 440px" stylesObj={styles} />}
            {ROW3_ITEMS[1] && <ApplicationCard item={ROW3_ITEMS[1]} cardRef={row3Card2Ref} cardClassName={styles.row3Card2} sizes="(max-width: 900px) 100vw, 410px" stylesObj={styles} />}
          </div>
        </div>
      </section>

      {/* MOBILE VIEW */}
      <section ref={mobileSectionRef} className={styles.mobileProductSection}>
        <div ref={mobilePinRef} className={styles.mobileContainer}>
          <div className={styles.mobileHeaderBlock}>
            <div className={styles.eyebrow}>{eyebrow}</div>
            <h2 className={styles.mobileSubheading}>{heading}</h2>
          </div>

          <div className={styles.mobileStageArea}>
            {allCards.map((prod, i) => {
              const isTapped = activeTapId === prod.id
              return (
                <div
                  key={`mob-${prod.id}`}
                  ref={setMobileTileRef(i)}
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

                    <h3 className={styles.mobileCardMainTitle}>{prod.title}</h3>
                    <div className={styles.mobileTapBadge}>TAP FOR DETAILS</div>

                    <div className={`${styles.mobileHoverDetailsOverlay} ${isTapped ? styles.overlayActive : ''}`}>
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
