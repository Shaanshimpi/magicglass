'use client'

import React, { useState } from 'react'
import styles from './QuoteDrawer.module.css'

interface QuoteDrawerProps {
  isOpen: boolean
  onClose: () => void
  cmsData?: any
}

const DEFAULT_CATEGORIES = [
  'Commercial Facade',
  'Residential Interior',
  'Skylight / Roof',
  'Infrastructure',
]
const DEFAULT_GLASS_TYPES = [
  'DGU Insulated',
  'Low-E SKN Ultra',
  'Sentry Laminated',
  'Acoustic PVB',
  'Toughened HS',
  'Ceramic Fritted',
  'Mirror',
]

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({ isOpen, onClose, cmsData }) => {
  const categories: string[] = cmsData?.projectCategories?.length
    ? cmsData.projectCategories.map((c: any) => c.label || c)
    : DEFAULT_CATEGORIES

  const glassTypes: string[] = cmsData?.glassTypes?.length
    ? cmsData.glassTypes.map((g: any) => g.label || g)
    : DEFAULT_GLASS_TYPES

  const submissionNotice =
    cmsData?.submissionNotice ||
    'Our Pune technical sales engineering team will review your specifications and respond within 24 business hours.'

  const [selectedCat, setSelectedCat] = useState<string>(categories[0] || 'Commercial Facade')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([glassTypes[0] || 'DGU Insulated'])
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [formState, setFormState] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
  })

  const toggleGlassType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const res = await fetch('/api/inquiries/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'quote_drawer',
          fullName: formState.fullName,
          companyName: formState.companyName,
          email: formState.email,
          phone: formState.phone,
          projectCategory: selectedCat,
          glassTypes: selectedTypes,
          message: formState.message,
        }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to submit quote inquiry')
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormState({ fullName: '', companyName: '', email: '', phone: '', message: '' })
        onClose()
      }, 3500)
    } catch (err: any) {
      console.error('Quote submission error:', err)
      setErrorMessage(err.message || 'Unable to transmit quote request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Slide-out Drawer Overlay & Panel */}
      <div
        className={`${styles.drawerOverlay} ${isOpen ? styles.drawerOverlayOpen : ''}`}
        onClick={onClose}
      >
        <div
          className={`${styles.drawerPanel} ${isOpen ? styles.drawerPanelOpen : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.drawerHeader}>
            <div>
              <div className="base-title" style={{ marginBottom: '0.25rem', color: 'var(--color-crimson)' }}>
                TECHNICAL INQUIRY
              </div>
              <h3 className={styles.drawerTitle}>Request Technical Quote</h3>
            </div>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close quote drawer">
              &times;
            </button>
          </div>

          {submitted ? (
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
              <div
                className="base-title"
                style={{ color: 'var(--color-crimson)', marginBottom: '1rem' }}
              >
                ◆ INQUIRY TRANSMITTED
              </div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-cream)' }}>
                Thank you for your request.
              </h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '420px', margin: '0 auto 2rem' }}>
                {submissionNotice}
              </p>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={onClose}
                style={{ maxWidth: '200px', margin: '0 auto' }}
              >
                CLOSE DRAWER
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <div className={styles.errorBanner}>
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* 1. Category Pills */}
              <div className={styles.formGroup}>
                <label className={styles.label}>1. Project Category</label>
                <div className={styles.pillsGrid}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`${styles.categoryPill} ${
                        selectedCat === cat ? styles.categoryPillActive : ''
                      }`}
                      onClick={() => setSelectedCat(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Glass Types Checkboxes */}
              <div className={styles.formGroup}>
                <label className={styles.label}>2. Glass Specifications Required</label>
                <div className={styles.checkboxesGrid}>
                  {glassTypes.map((type) => (
                    <label key={type} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleGlassType(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Contact Inputs */}
              <div
                className={styles.formGroup}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
              >
                <div>
                  <label className={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formState.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Architect / Developer Name"
                    className={styles.inputField}
                  />
                </div>
                <div>
                  <label className={styles.label}>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formState.companyName}
                    onChange={handleInputChange}
                    placeholder="Firm / Contractor Name"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div
                className={styles.formGroup}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
              >
                <div>
                  <label className={styles.label}>Work Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    placeholder="email@company.com"
                    className={styles.inputField}
                  />
                </div>
                <div>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className={styles.inputField}
                  />
                </div>
              </div>

              {/* 4. Project Notes / Scope */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Project Scope & Dimensions (Optional)</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Estimated square footage, thermal U-value targets, acoustic ratings, delivery timeline, or site requirements..."
                  className={styles.inputField}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitBtn}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'TRANSMITTING SPECIFICATIONS...' : 'SUBMIT TECHNICAL SPECIFICATIONS →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
