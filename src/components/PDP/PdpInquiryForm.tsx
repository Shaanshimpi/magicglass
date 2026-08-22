'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PdpInquiryForm.module.css'

interface PdpInquiryFormProps {
  productTitle: string
  onOpenQuoteDrawer: () => void
}

export const PdpInquiryForm: React.FC<PdpInquiryFormProps> = ({
  productTitle,
  onOpenQuoteDrawer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      if (containerRef.current) {
        gsap.from(containerRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 1.0,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.formSection}>
      <div ref={containerRef} className={styles.container}>
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

