'use client'

import React from 'react'
import styles from './PdpMasonryGallery.module.css'
import { PdpScrubbedImage } from './PdpScrubbedImage'

interface GalleryItem {
  src: string
  title?: string
}

interface PdpMasonryGalleryProps {
  images: [string, string, string, string]
  title?: string
  imageItems?: GalleryItem[]
}

const DEFAULT_APPLICATION_TITLES = [
  'WINDOWS',
  'PARTITIONS',
  'DOORS',
  'ARCHITECTURAL INTERIOR',
]

export const PdpMasonryGallery: React.FC<PdpMasonryGalleryProps> = ({
  images,
  title,
  imageItems,
}) => {
  const items: GalleryItem[] = Array.from({ length: 4 }).map((_, index) => {
    const item = imageItems?.[index]
    return {
      src: item?.src || images[index] || images[0],
      title: item?.title || DEFAULT_APPLICATION_TITLES[index] || `APPLICATION 0${index + 1}`,
    }
  })

  return (
    <section className={styles.gallerySection}>
      <div className={styles.galleryContainer}>
        <div className={styles.headerBox}>
          <span className={styles.sectionBadge}>APPLICATIONS & PORTFOLIO</span>
          <h2 className={styles.sectionTitle}>
            <span className={styles.redHeading}>Glass</span> {title ? title.replace(/^Glass\s+/i, '') : 'Applications'}
          </h2>
        </div>

        {/* Row 1: Asymmetric organic pairing */}
        <div className={styles.galleryRow}>
          <div
            className={styles.imageCard}
            style={{ width: '52%', marginLeft: '0%', marginTop: '0px' }}
          >
            <PdpScrubbedImage
              src={items[0].src}
              alt={items[0].title || 'Architectural Glass Application 1'}
              width="100%"
              height="420px"
              marginLeft="0%"
              marginTop="0px"
            />
            {items[0].title && (
              <div className={styles.imageCaption}>
                <span className={styles.captionTag}>{items[0].title}</span>
              </div>
            )}
          </div>

          <div
            className={styles.imageCard}
            style={{ width: '42%', marginLeft: '6%', marginTop: '-50px' }}
          >
            <PdpScrubbedImage
              src={items[1].src}
              alt={items[1].title || 'Architectural Glass Application 2'}
              width="100%"
              height="500px"
              marginLeft="0%"
              marginTop="0px"
            />
            {items[1].title && (
              <div className={styles.imageCaption}>
                <span className={styles.captionTag}>{items[1].title}</span>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Staggered reverse organic pairing */}
        <div className={styles.galleryRow}>
          <div
            className={styles.imageCard}
            style={{ width: '44%', marginLeft: '5%', marginTop: '30px' }}
          >
            <PdpScrubbedImage
              src={items[2].src}
              alt={items[2].title || 'Architectural Glass Application 3'}
              width="100%"
              height="480px"
              marginLeft="0%"
              marginTop="0px"
            />
            {items[2].title && (
              <div className={styles.imageCaption}>
                <span className={styles.captionTag}>{items[2].title}</span>
              </div>
            )}
          </div>

          <div
            className={styles.imageCard}
            style={{ width: '46%', marginLeft: '5%', marginTop: '-40px' }}
          >
            <PdpScrubbedImage
              src={items[3].src}
              alt={items[3].title || 'Architectural Glass Application 4'}
              width="100%"
              height="380px"
              marginLeft="0%"
              marginTop="0px"
            />
            {items[3].title && (
              <div className={styles.imageCaption}>
                <span className={styles.captionTag}>{items[3].title}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
