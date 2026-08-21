'use client'

import React from 'react'
import styles from './PdpMasonryGallery.module.css'
import { PdpScrubbedImage } from './PdpScrubbedImage'

interface PdpMasonryGalleryProps {
  images: [string, string, string, string]
}

export const PdpMasonryGallery: React.FC<PdpMasonryGalleryProps> = ({
  images,
}) => {
  return (
    <section className={styles.gallerySection}>
      <div className={styles.galleryContainer}>
        {/* Row 1: Asymmetric organic pairing */}
        <div className={styles.galleryRow}>
          <PdpScrubbedImage
            src={images[0]}
            alt="Architectural Glass Application 1"
            width="52%"
            height="420px"
            marginLeft="0%"
            marginTop="0px"
          />
          <PdpScrubbedImage
            src={images[1]}
            alt="Architectural Glass Application 2"
            width="42%"
            height="500px"
            marginLeft="6%"
            marginTop="-50px"
          />
        </div>

        {/* Row 2: Staggered reverse organic pairing */}
        <div className={styles.galleryRow}>
          <PdpScrubbedImage
            src={images[2]}
            alt="Architectural Glass Application 3"
            width="44%"
            height="480px"
            marginLeft="5%"
            marginTop="30px"
          />
          <PdpScrubbedImage
            src={images[3]}
            alt="Architectural Glass Application 4"
            width="46%"
            height="380px"
            marginLeft="5%"
            marginTop="-40px"
          />
        </div>
      </div>
    </section>
  )
}
