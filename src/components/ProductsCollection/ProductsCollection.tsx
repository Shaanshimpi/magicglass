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

interface ProductsCollectionProps {
  cmsData?: any
}

export const ProductsCollection: React.FC<ProductsCollectionProps> = ({ cmsData }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const topFeaturedRef = useRef<HTMLElement>(null)
  const splitRef = useRef<HTMLElement>(null)
  const productGridRef = useRef<HTMLDivElement>(null)

  const topFeaturedEyebrow = cmsData?.topFeaturedEyebrow || 'TOP 3 FEATURED SYSTEMS'
  const topFeaturedTag = cmsData?.topFeaturedTag || 'FLAGSHIP FAÇADES'
  const featuredSystems = cmsData?.featuredSystems?.length ? cmsData.featuredSystems : TOP_3_FEATURED
  const collectionEyebrow = cmsData?.collectionEyebrow || 'MAGIC GLASS COLLECTION'
  const collectionHeadline =
    cmsData?.collectionHeadline ||
    'We offer a wide spectrum of bespoke architectural glass solutions where timeless design meets technical precision.'
  const categoriesList = cmsData?.categoriesNav?.length ? cmsData.categoriesNav : CATEGORIES_INFO
  const productsList = cmsData?.allProducts?.length ? cmsData.allProducts : ALL_PRODUCTS

  const filteredProducts: ProductItem[] =
    activeCategory === 'all'
      ? productsList
      : productsList.filter((p: any) => p.category?.toLowerCase() === activeCategory.toLowerCase())

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
          <div className={`base-title ${styles.heroTag}`} data-cms-field="hero_tag">
            {cmsData?.hero?.tag || 'COLLECTION / ARCHITECTURAL GLASS SYSTEMS'}
          </div>
          <h1 className={styles.heroTitle} data-cms-field="hero_title">
            {cmsData?.hero?.title || 'Architectural Glass & Precision Processing'}
          </h1>
          <p className={styles.heroSubtitle} data-cms-field="hero_subtitle">
            {cmsData?.hero?.subtitle ||
              'Engineered for high-rise curtain walls, acoustic speech isolation, fire containment barriers, and ionoplast structural fins. Sourced and processed with world-class European technology.'}
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* SECTION 2: TOP 3 FEATURED SYSTEMS - DARK (#0b1012) ONLY              */}
      {/* -------------------------------------------------------------------- */}
      <section ref={topFeaturedRef} className={styles.topFeaturedSection}>
        <div className={styles.topFeaturedInner}>
          <div className={styles.topFeaturedHeader}>
            <div className="base-title" style={{ color: 'var(--color-taupe)' }} data-cms-field="topFeaturedEyebrow">
              {topFeaturedEyebrow}
            </div>
            <div className={styles.categoryCodeTag} data-cms-field="topFeaturedTag">
              {topFeaturedTag}
            </div>
          </div>

          <div className={styles.topFeaturedGrid}>
            {featuredSystems.map((item: any, idx: number) => {
              const itemHref = item.link || `/products/${item.id || item.productSlug || 'sentry-laminated-glass'}`
              return (
                <Link
                  key={item.id || idx}
                  href={itemHref}
                  className={styles.featuredCard}
                >
                  <div className={styles.featuredCardImage}>
                    <Image
                      src={item.image || item.featuredImageUrl || '/images/craft-laminated.jpg'}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority
                      unoptimized={Boolean(item.image?.startsWith('http'))}
                    />
                  </div>

                  <div className={styles.featuredCardOverlay} />

                  <div className={styles.featuredBadge} data-cms-field={`featuredSystems_${idx}_badgeText`}>
                    {item.badgeText}
                  </div>

                  <div className={styles.featuredContent}>
                    <span className={styles.featuredCategoryLabel} data-cms-field={`featuredSystems_${idx}_categoryLabel`}>
                      {item.categoryLabel}
                    </span>
                    <h3 className={styles.featuredTitle} data-cms-field={`featuredSystems_${idx}_title`}>
                      {item.title}
                    </h3>

                    <div className={styles.featuredHoverDetails}>
                      <p className={styles.featuredDesc} data-cms-field={`featuredSystems_${idx}_description`}>
                        {item.description || item.descriptionHighlight}
                      </p>
                      <div className={styles.featuredLinkText}>
                        VIEW PRODUCT SPECIFICATIONS →
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
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
              <div className="base-title" style={{ color: 'var(--color-taupe)' }} data-cms-field="collectionEyebrow">
                {collectionEyebrow}
              </div>

              <div className={styles.singleHeadlineWrapper}>
                <h2 className={styles.singleLeftHeadline} data-cms-field="collectionHeadline">
                  {collectionHeadline}
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT DIV: SCROLLING PRODUCT GRID & INLINE CATEGORY FILTERS */}
          <div className={styles.rightScrollPane}>
            {/* Top Right Inline Category Filter Buttons */}
            <div className={styles.inlineCategoryPills}>
              {categoriesList.map((cat: any) => (
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
                      unoptimized={Boolean(product.image?.startsWith('http'))}
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
