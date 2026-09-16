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
  { name: 'Tribeca Developers', logoUrl: '/images/partners/tribeca.png' },
  { name: 'Solitaire', logoUrl: '/images/partners/solitaire.png' },
  { name: 'Nyati Group', logoUrl: '/images/partners/nyati.png' },
  { name: 'ABIL Group', logoUrl: '/images/partners/abil.png' },
  { name: 'Amar Builders', logoUrl: '/images/partners/amar-builders.png' },
  { name: 'ASCII', logoUrl: '/images/partners/ascii.png' },
  { name: 'Gujarat Guardian', logoUrl: '/images/partners/gujarat-guardian.png' },
  { name: 'Mantra Properties', logoUrl: '/images/partners/mantra.png' },
  { name: 'Ark', logoUrl: '/images/partners/ark.png' },
  { name: 'Legrand by Nouveaute', logoUrl: '/images/partners/legrand.png' },
  { name: 'Kesseböhmer', logoUrl: '/images/partners/kessebohmer.png' },
  { name: 'VTP Realty', logoUrl: '/images/partners/vtp.png' },
  { name: 'Gera Developments', logoUrl: '/images/partners/gera.png' },
  { name: 'G Interio', logoUrl: '/images/partners/g-interio.png' },
  { name: 'Godrej Properties', logoUrl: '/images/partners/godrej.png' },
  { name: 'Kasturi Housing', logoUrl: '/images/partners/kasturi.png' },
  { name: 'Sleek by Asian Paints', logoUrl: '/images/partners/sleek.png' },
  { name: 'Saint-Gobain', logoUrl: '/images/partners/saint-gobain.png' },
]

export const TrustBanner: React.FC<TrustBannerProps> = ({ cmsData }) => {
  const eyebrow = cmsData?.eyebrow || "◆ WE'RE TRUSTED BY LEADING PARTNERS"
  const partners = cmsData?.partners?.length ? cmsData.partners : DEFAULT_PARTNERS

  const renderPartnerItem = (partner: Partner, key: string) => {
    const logoSrc = partner.logo || partner.logoUrl
    return (
      <div key={key} className={styles.partnerItem} title={partner.name}>
        {logoSrc ? (
          <div className={styles.logoWrapper}>
            <Image
              src={logoSrc}
              alt={partner.name}
              width={200}
              height={90}
              className={styles.partnerLogo}
              unoptimized={logoSrc.startsWith('http')}
            />
          </div>
        ) : (
          <span className={styles.partnerFallbackName}>{partner.name}</span>
        )}
      </div>
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
