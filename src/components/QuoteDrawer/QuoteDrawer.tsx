'use client'

import React, { useState } from 'react'
import styles from './QuoteDrawer.module.css'

interface QuoteDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORIES = ['Commercial Facade', 'Residential Interior', 'Skylight / Roof', 'Infrastructure']
const GLASS_TYPES = ['DGU Insulated', 'Low-E SKN Ultra', 'Sentry Laminated', 'Acoustic PVB', 'Toughened HS', 'Ceramic Fritted', 'Mirror']

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedCat, setSelectedCat] = useState<string>('Commercial Facade')
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['DGU Insulated'])
  const [submitted, setSubmitted] = useState<boolean>(false)

  const toggleGlassType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2500)
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
              <div className="base-title" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                TECHNICAL INQUIRY
              </div>
              <h3 className={styles.drawerTitle}>Request Technical Quote</h3>
            </div>
            <button type="button" className={styles.closeBtn} onClick={onClose}>
              &times;
            </button>
          </div>

          {submitted ? (
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
              <div className="base-title" style={{ color: 'var(--color-crimson)', marginBottom: '1rem' }}>
                ◆ INQUIRY TRANSMITTED
              </div>
              <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-cream)' }}>
                Thank you for your request.
              </h4>
              <p style={{ color: '#666e6c' }}>
                Our Pune technical sales engineering team will review your specifications and respond within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Category Pills */}
              <div className={styles.formGroup}>
                <label className={styles.label}>1. Project Category</label>
                <div className={styles.pillsGrid}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`${styles.categoryPill} ${selectedCat === cat ? styles.categoryPillActive : ''}`}
                      onClick={() => setSelectedCat(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Glass Types Checkboxes */}
              <div className={styles.formGroup}>
                <label className={styles.label}>2. Glass Specifications Required</label>
                <div className={styles.checkboxesGrid}>
                  {GLASS_TYPES.map((type) => (
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

              {/* CAD Dropzone */}
              <div className={styles.formGroup}>
                <label className={styles.label}>3. Drawings / BOQ Spreadsheet</label>
                <div className={styles.dropzone}>
                  <p className={styles.dropzoneText}>
                    Drop DWG, DXF, PDF drawings or BOQ spreadsheet here
                  </p>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className={styles.formGroup} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className={styles.label}>Full Name</label>
                  <input type="text" required placeholder="Architect / Developer Name" className={styles.inputField} />
                </div>
                <div>
                  <label className={styles.label}>Company Name</label>
                  <input type="text" required placeholder="Firm / Contractor Name" className={styles.inputField} />
                </div>
              </div>

              <div className={styles.formGroup} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className={styles.label}>Work Email</label>
                  <input type="email" required placeholder="email@company.com" className={styles.inputField} />
                </div>
                <div>
                  <label className={styles.label}>Phone Number</label>
                  <input type="tel" required placeholder="+91 98765 43210" className={styles.inputField} />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                SUBMIT TECHNICAL INQUIRY
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
