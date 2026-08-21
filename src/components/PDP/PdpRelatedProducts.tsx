'use client'

import React from 'react'
import Link from 'next/link'
import styles from './PdpRelatedProducts.module.css'
import { PDP_MOCK_DATA, PdpProductDetail } from './pdpData'
import { PdpScrubbedImage } from './PdpScrubbedImage'

interface PdpRelatedProductsProps {
  relatedIds: [string, string]
}

export const PdpRelatedProducts: React.FC<PdpRelatedProductsProps> = ({
  relatedIds,
}) => {
  const relatedProducts: PdpProductDetail[] = relatedIds
    .map((id) => PDP_MOCK_DATA[id])
    .filter(Boolean)

  if (!relatedProducts.length) return null

  return (
    <section className={styles.relatedSection}>
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
