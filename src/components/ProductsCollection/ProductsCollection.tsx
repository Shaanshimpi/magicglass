'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductsCollection.module.css'
import {
  ALL_PRODUCTS,
  TOP_3_FEATURED,
  CATEGORIES_INFO,
  ProductItem,
} from './products.data'

export const ProductsCollection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredProducts: ProductItem[] =
    activeCategory === 'all'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <div className={styles.collectionWrapper}>
      {/* -------------------------------------------------------------------- */}
      {/* SECTION 1: MINIMAL HERO (~50vh Height) - CREAM (#f3f0ec)             */}
      {/* -------------------------------------------------------------------- */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
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
      <section className={styles.topFeaturedSection}>
        <div className={styles.topFeaturedInner}>
          <div className={styles.topFeaturedHeader}>
            <div className="base-title" style={{ color: '#c2bbb2' }}>
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
      <section className={styles.splitSection}>
        <div className={styles.splitSectionInner}>
          {/* LEFT DIV: PINNED STICKY NARRATIVE */}
          <div className={styles.leftPinnedPane}>
            <div className={styles.stickyContent}>
              <div className="base-title" style={{ color: '#5d5954' }}>
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
            <div className={styles.productGrid}>
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
