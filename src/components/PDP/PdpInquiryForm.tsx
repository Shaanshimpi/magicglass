'use client'

import React from 'react'
import styles from './PdpInquiryForm.module.css'

interface PdpInquiryFormProps {
  productTitle: string
  onOpenQuoteDrawer: () => void
}

export const PdpInquiryForm: React.FC<PdpInquiryFormProps> = ({
  productTitle,
  onOpenQuoteDrawer,
}) => {
  return (
    <section className={styles.formSection}>
      <div className={styles.container}>
        <div className={styles.eyebrow}>
          ARCHITECTURAL CONSULTATION & INQUIRY
        </div>

        <h2 className={styles.heading}>
          Have an architectural project requiring {productTitle}?
        </h2>
        <p className={styles.subtext}>
          Our technical glass engineering team assists architects, developers, and facade contractors with custom BOQs, thermal load calculations, and technical specifications.
        </p>

        <div className={styles.ctaRow}>
          <button
            type="button"
            className="button--red"
            onClick={onOpenQuoteDrawer}
            style={{
              fontSize: '1.05rem',
              padding: '1.1rem 2.2rem',
              cursor: 'pointer',
            }}
          >
            REQUEST TECHNICAL QUOTE →
          </button>
        </div>
      </div>
    </section>
  )
}
