'use client'

import React from 'react'
import Image from 'next/image'
import styles from './TrustBanner.module.css'

interface Partner {
  name: string
  logo?: string
  logoUrl?: string
}

interface TrustBannerProps {
  cmsData?: {
    eyebrow?: string
    heading?: string
    partners?: Partner[]
  }
}

const DEFAULT_PARTNERS: Partner[] = [
  { name: 'Tribeca Developers' },
  { name: 'Solitaire' },
  { name: 'Nyati Group' },
  { name: 'ABIL Group' },
  { name: 'Amar Builders' },
  { name: 'ASCII' },
  { name: 'Gujarat Guardian' },
  { name: 'Mantra Properties' },
  { name: 'Ark' },
  { name: 'Legrand by Nouveaute' },
  { name: 'Kesseböhmer' },
  { name: 'VTP Realty' },
  { name: 'Gera Developments' },
  { name: 'G Interio' },
  { name: 'Godrej Properties' },
  { name: 'Kasturi Housing' },
  { name: 'Sleek by Asian Paints' },
  { name: 'Saint-Gobain' },
]

export const TrustBanner: React.FC<TrustBannerProps> = ({ cmsData }) => {
  const eyebrow = cmsData?.eyebrow || "◆ WE'RE TRUSTED BY LEADING PARTNERS"
  const partners = cmsData?.partners?.length ? cmsData.partners : DEFAULT_PARTNERS

  const renderPartnerItem = (partner: Partner, key: string) => {
    const logoSrc = partner.logo || partner.logoUrl
    return (
      <span key={key} className={styles.partnerName} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
        {logoSrc && !logoSrc.startsWith('/images/partners/') ? (
          <Image
            src={logoSrc}
            alt={partner.name}
            width={100}
            height={32}
            style={{ objectFit: 'contain', filter: 'grayscale(1) brightness(1.8)' }}
            unoptimized={logoSrc.startsWith('http')}
          />
        ) : null}
        <span>{partner.name}</span>
        <span className={styles.dot}>•</span>
      </span>
    )
  }

  return (
    <section className={styles.trustSection}>
      <div className={styles.container}>
        <div className={styles.eyebrow} data-cms-field="trustBanner_eyebrow">
          {eyebrow}
        </div>

        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeContent}>
            {partners.map((partner, idx) => renderPartnerItem(partner, `p1-${idx}`))}
            {/* Duplicate for infinite seamless loop */}
            {partners.map((partner, idx) => renderPartnerItem(partner, `p2-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  )
}
