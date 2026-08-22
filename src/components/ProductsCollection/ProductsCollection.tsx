'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ProductsCollection.module.css'
import {
  ALL_PRODUCTS,
  TOP_3_FEATURED,
  CATEGORIES_INFO,
  ProductItem,
} from './products.data'

export const ProductsCollection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const topFeaturedRef = useRef<HTMLElement>(null)
  const splitRef = useRef<HTMLElement>(null)
  const productGridRef = useRef<HTMLDivElement>(null)

  const filteredProducts: ProductItem[] =
    activeCategory === 'all'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === activeCategory)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // 1. Hero Text Entrance (On Mount)
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 35,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.1,
        })
      }

      // 2. Top 3 Featured Section Text & Cards (On Scroll)
      if (topFeaturedRef.current) {
        gsap.from(
          topFeaturedRef.current.querySelectorAll(
            '.base-title, .' + styles.categoryCodeTag
          ),
          {
            y: 25,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: topFeaturedRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        )

        gsap.fromTo(
          topFeaturedRef.current.querySelectorAll(
            '.' + styles.featuredCard
          ),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: topFeaturedRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 3. Split Section Headline Text (On Scroll)
      if (splitRef.current) {
        gsap.from(
          splitRef.current.querySelector('.' + styles.singleLeftHeadline),
          {
            y: 35,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: splitRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 4. Product Cards Scroll Entrance
      if (productGridRef.current) {
        gsap.from(
          productGridRef.current.querySelectorAll('.' + styles.productCard),
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: productGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Animate product grid items when filter category changes
  useEffect(() => {
    if (!productGridRef.current) return
    const cards = productGridRef.current.querySelectorAll(
      '.' + styles.productCard
    )
    gsap.fromTo(
      cards,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
    )
  }, [activeCategory])

  return (
    <div ref={containerRef} className={styles.collectionWrapper}>
      {/* -------------------------------------------------------------------- */}
      {/* SECTION 1: MINIMAL HERO (~50vh Height) - CREAM (#f3f0ec)             */}
      {/* -------------------------------------------------------------------- */}
      <section className={styles.heroSection}>
        <div ref={heroRef} className={styles.heroContainer}>
          <div className={`base-title ${styles.heroTag}`}>
            COLLECTION / ARCHITECTURAL GLASS SYSTEMS
          </div>
          <h1 className={styles.heroTitle}>
            Architectural Glass & Precision Processing
          </h1>
          <p className={styles.heroSubtitle}>
            Engineered for high-rise curtain walls, acoustic speech isolation,
            fire containment barriers, and ionoplast structural fins. Sourced and
            processed with world-class European technology.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 2: TOP 3 FEATURED SYSTEMS - DARK (#0b1012) ONLY              */}
      {/* -------------------------------------------------------------------- */}
      <section ref={topFeaturedRef} className={styles.topFeaturedSection}>
        <div className={styles.topFeaturedInner}>
          <div className={styles.topFeaturedHeader}>
            <div className="base-title" style={{ color: 'var(--color-taupe)' }}>
              TOP 3 FEATURED SYSTEMS
            </div>
            <div className={styles.categoryCodeTag}>FLAGSHIP FAÇADES</div>
          </div>

          <div className={styles.topFeaturedGrid}>
            {TOP_3_FEATURED.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className={styles.featuredCard}
              >
                <div className={styles.featuredCardImage}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                </div>

                <div className={styles.featuredCardOverlay} />

                <div className={styles.featuredBadge}>{item.badgeText}</div>

                <div className={styles.featuredContent}>
                  <span className={styles.featuredCategoryLabel}>
                    {item.categoryLabel}
                  </span>
                  <h3 className={styles.featuredTitle}>{item.title}</h3>

                  <div className={styles.featuredHoverDetails}>
                    <p className={styles.featuredDesc}>{item.description}</p>
                    <div className={styles.featuredLinkText}>
                      VIEW PRODUCT SPECIFICATIONS →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 3: 2-DIV SPLIT LAYOUT - CREAM (#f3f0ec)                      */}
      {/* -------------------------------------------------------------------- */}
      <section ref={splitRef} className={styles.splitSection}>
        <div className={styles.splitSectionInner}>
          {/* LEFT DIV: PINNED STICKY NARRATIVE */}
          <div className={styles.leftPinnedPane}>
            <div className={styles.stickyContent}>
              <div className="base-title" style={{ color: 'var(--color-taupe)' }}>
                MAGIC GLASS COLLECTION
              </div>

              <div className={styles.singleHeadlineWrapper}>
                <h2 className={styles.singleLeftHeadline}>
                  We offer a wide spectrum of bespoke architectural glass
                  solutions where timeless design meets technical precision.
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT DIV: SCROLLING PRODUCT GRID & INLINE CATEGORY FILTERS */}
          <div className={styles.rightScrollPane}>
            {/* Top Right Inline Category Filter Buttons */}
            <div className={styles.inlineCategoryPills}>
              {CATEGORIES_INFO.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.inlinePillBtn} ${
                    activeCategory === cat.id ? styles.inlinePillActive : ''
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div ref={productGridRef} className={styles.productGrid}>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={styles.productCard}
                >
                  <div className={styles.productImageFrame}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    />
                  </div>

                  <div className={styles.productInfoBlock}>
                    <h3 className={styles.productItemTitle}>{product.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

