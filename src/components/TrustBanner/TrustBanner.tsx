'use client'

import React from 'react'
import styles from './TrustBanner.module.css'

const PARTNERS = [
  'Tribeca Developers',
  'Solitaire',
  'Nyati Group',
  'ABIL Group',
  'Amar Builders',
  'ASCII',
  'Gujarat Guardian',
  'Mantra Properties',
  'Ark',
  'Legrand by Nouveaute',
  'Kesseböhmer',
  'VTP Realty',
  'Gera Developments',
  'G Interio',
  'Godrej Properties',
  'Kasturi Housing',
  'Sleek by Asian Paints',
  'Saint-Gobain',
]

export const TrustBanner: React.FC = () => {
  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.eyebrow}>
          ◆ WE'RE TRUSTED BY LEADING PARTNERS
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
