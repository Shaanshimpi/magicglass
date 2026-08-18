'use client'

import React from 'react'
import styles from './TrustBanner.module.css'

const PARTNERS = [
  'Godrej Properties',
  'Saint-Gobain',
  'Tribeca Developers',
  'Solitaire',
  'Nyati Group',
  'ABIL Group',
  'Amar Builders',
  'Gera Developments',
  'VTP Realty',
  'Kasturi Housing',
  'Mantra Properties',
  'Sleek by Asian Paints',
  'Legrand by Nouveaute',
  'Kesseböhmer',
]

export const TrustBanner: React.FC = () => {
  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.eyebrow}>
          ◆ TRUSTED BY LEADING PARTNERS
        </div>

        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeContent}>
            {PARTNERS.map((partner, idx) => (
              <span key={`p1-${idx}`} className={styles.partnerName}>
                {partner} <span className={styles.dot}>•</span>
              </span>
            ))}
            {/* Duplicate for infinite seamless loop */}
            {PARTNERS.map((partner, idx) => (
              <span key={`p2-${idx}`} className={styles.partnerName}>
                {partner} <span className={styles.dot}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
