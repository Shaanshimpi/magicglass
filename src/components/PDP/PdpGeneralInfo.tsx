'use client'

import React from 'react'
import styles from './PdpGeneralInfo.module.css'
import { PdpScrubbedImage } from './PdpScrubbedImage'

interface PdpGeneralInfoProps {
  introSummary: string
  secondaryText: string
  detailImages: [string, string]
  characteristics: string[]
}

export const PdpGeneralInfo: React.FC<PdpGeneralInfoProps> = ({
  introSummary,
  secondaryText,
  detailImages,
  characteristics,
}) => {
  return (
    <section className={styles.generalSection}>
      <div className={styles.container}>
        <div className={styles.topBlock}>
          <p className={styles.introSummary}>{introSummary}</p>

          <div className={styles.detailImageFlex}>
            <PdpScrubbedImage
              src={detailImages[0]}
              alt="Architectural Glass Detail 1"
              width="46%"
              height="380px"
              marginLeft="0%"
            />
            <PdpScrubbedImage
              src={detailImages[1]}
              alt="Architectural Glass Detail 2"
              width="48%"
              height="440px"
              marginLeft="4%"
              marginTop="-30px"
            />
          </div>
        </div>

        <div className={styles.bottomBlock}>
          <p className={styles.secondaryText}>{secondaryText}</p>

          <div className={styles.characteristicsBox}>
            <div className={styles.caratteristicheTag}>
              TECHNICAL SPECIFICATIONS & PERFORMANCE
            </div>

            <ul className={styles.specList}>
              {characteristics.map((spec, index) => (
                <li key={index} className={styles.specItem}>
                  <span className={styles.specDot} />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
