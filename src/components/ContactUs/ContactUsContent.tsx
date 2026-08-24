'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PdpHero } from '@/components/PDP/PdpHero'
import { TrustBanner } from '@/components/TrustBanner/TrustBanner'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'
import mockData from '@/data/contact_us_mock.json'
import styles from './ContactUs.module.css'


interface ContactCard {
  id: string
  title: string
  detail: string
  icon: string
  actionText: string
  actionUrl: string | null
}

export const ContactUsContent: React.FC = () => {
  const { openQuoteDrawer } = useLayoutContext()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const { page, contactCards, mapEmbedUrl } = mockData as {
    page: any
    contactCards: ContactCard[]
    mapEmbedUrl: string
  }

  // GSAP Animation Refs
  const cardsSectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const splitSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Contact Cards Staggered Animation
      const validCards = cardRefs.current.filter(Boolean)
      if (validCards.length > 0 && cardsSectionRef.current) {
        gsap.from(validCards, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsSectionRef.current,
            start: 'top 80%',
          },
        })
      }

      // Map & Form Reveal Animation
      if (splitSectionRef.current) {
        gsap.from(`.${styles.mapCard}, .${styles.formCard}`, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: splitSectionRef.current,
            start: 'top 75%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.message) return
    setFormSubmitted(true)
    setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' })
  }

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'location':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        )
      case 'email':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        )
      case 'phone':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        )
      case 'clock':
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        )
    }
  }

  return (
    <div className={styles.pageWrapper} style={{ paddingTop: '70px' }}>

        {/* 1. PDP Hero Section */}
        <PdpHero
          indexNumber={page.indexNumber}
          title={page.title}
          subheading={page.subheading}
          category={page.category}
          heroImage={page.heroImage}
        />

        {/* 2. Contact Information Cards Grid (4 Cards) */}
        <section ref={cardsSectionRef} className={styles.cardsSection}>
          <div className={styles.container}>
            <div className={styles.cardsGrid}>
              {contactCards.map((card, idx) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el
                  }}
                  className={styles.contactCard}
                >
                  <div className={styles.iconBadge}>{renderIcon(card.icon)}</div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDetail}>{card.detail}</p>

                  {card.actionUrl ? (
                    <a
                      href={card.actionUrl}
                      target={card.actionUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={styles.cardActionLink}
                    >
                      ↳ {card.actionText}
                    </a>
                  ) : (
                    <span className={styles.cardActionLink} style={{ opacity: 0.6, cursor: 'default' }}>
                      {card.actionText}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Interactive Split Section: Google Map + Contact Form */}
        <section ref={splitSectionRef} className={styles.splitSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeaderBlock}>
              <span className={styles.eyebrow}>{page.eyebrow}</span>
              <h2 className={styles.mainHeading}>
                <span className={styles.redHeading}>{page.redTitle}</span> {page.mainTitle}
              </h2>
            </div>

            <div className={styles.splitGrid}>
              {/* Left Column: Location Map Embed */}
              <div className={styles.mapCard}>
                <div className={styles.mapHeader}>
                  <h3 className={styles.mapTitle}>Corporate & Factory Facilities</h3>
                  <span className={styles.mapSubtitle}>PUNE & YAVAT, MAHARASHTRA</span>
                </div>
                <div className={styles.mapFrameWrapper}>
                  <iframe
                    src={mapEmbedUrl}
                    title="Magic Glass Pune Location Map"
                    className={styles.mapIframe}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Right Column: Direct Contact Form */}
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>Send Us a Direct Message</h3>
                  <p className={styles.formDesc}>
                    Fill out your details below and our technical sales engineers will contact you shortly.
                  </p>
                </div>

                {formSubmitted && (
                  <div className={styles.successMessage}>
                    ✓ Thank you! Your message has been received. Our team will get back to you shortly.
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className={styles.formGrid}>
                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>FULL NAME *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Suraj Divate"
                        className={styles.inputField}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="name@company.com"
                        className={styles.inputField}
                      />
                    </div>
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>PHONE NUMBER</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className={styles.inputField}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>SUBJECT / PROJECT</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Architectural Facade Glass"
                        className={styles.inputField}
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>MESSAGE / REQUIREMENTS *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Please specify your glass specs, quantities, or project details..."
                      className={styles.textareaField}
                    />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    SEND MESSAGE →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Partner Client Slider */}
        <section style={{ backgroundColor: 'var(--color-black)', paddingBottom: '3rem' }}>
          <TrustBanner />
        </section>
    </div>
  )
}

