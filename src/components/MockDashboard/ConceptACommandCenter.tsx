'use client'

import React, { useState } from 'react'
import styles from './MockDashboard.module.css'
import {
  FiLayers,
  FiEye,
  FiSearch,
  FiSliders,
  FiMove,
  FiCheckCircle,
  FiRefreshCw,
  FiEdit3,
  FiImage,
  FiPlus,
  FiChevronRight,
  FiZap,
} from 'react-icons/fi'

export const ConceptACommandCenter: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [heroTagline, setHeroTagline] = useState('Architectural Glass Engineering')
  const [heroHeading, setHeroHeading] = useState('PERFECTING LIGHT & STRENGTH THROUGH GLASS')
  const [ctaLabel, setCtaLabel] = useState('Explore Product Portfolio')
  const [searchQuery, setSearchQuery] = useState('')
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const [sections, setSections] = useState([
    { id: 'hero', name: 'Hero Banner', status: 'Published', itemsCount: 3 },
    { id: 'heritage', name: 'Heritage & Legacy', status: 'Published', itemsCount: 4 },
    { id: 'systems', name: 'Product Systems Grid', status: 'Draft Updated', itemsCount: 6 },
    { id: 'craft', name: 'Technical Craftsmanship', status: 'Published', itemsCount: 4 },
    { id: 'partners', name: 'Partner Marquee', status: 'Published', itemsCount: 12 },
    { id: 'testimonials', name: 'Client Testimonials', status: 'Published', itemsCount: 3 },
  ])

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const updated = [...sections]
    const temp = updated[index - 1]
    updated[index - 1] = updated[index]
    updated[index] = temp
    setSections(updated)
  }

  return (
    <div className={styles.splitCanvas}>
      {/* Left Sidebar: Visual Structure & Section Ordering */}
      <div className={styles.glassPanel} style={{ overflowY: 'auto' }}>
        <div className={styles.panelHeader}>
          <div>
            <div className={styles.panelTitle}>
              <FiLayers style={{ color: '#c5a880' }} /> Spatial Structure
            </div>
            <div className={styles.panelSubtitle}>Drag or reorder homepage canvas modules</div>
          </div>
          <button className={`${styles.actionBtn} ${styles.actionBtnSecondary}`} style={{ padding: '4px 8px' }}>
            <FiPlus /> Add
          </button>
        </div>

        {/* Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '8px 12px',
            marginBottom: '16px',
          }}
        >
          <FiSearch style={{ color: '#64748b' }} />
          <input
            type="text"
            placeholder="Search sections or fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '12px',
              width: '100%',
            }}
          />
        </div>

        {/* Section Re-order list */}
        <div>
          {sections
            .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((sec, idx) => (
              <div
                key={sec.id}
                className={styles.sectionItem}
                style={{
                  borderColor: activeSection === sec.id ? '#c5a880' : 'rgba(255, 255, 255, 0.06)',
                  background: activeSection === sec.id ? 'rgba(197, 168, 128, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                }}
                onClick={() => setActiveSection(sec.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FiMove className={styles.dragHandle} onClick={() => handleMoveUp(idx)} title="Click to move up" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: activeSection === sec.id ? '#f8fafc' : '#cbd5e1' }}>
                      {sec.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{sec.itemsCount} content blocks</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: sec.status === 'Published' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                      color: sec.status === 'Published' ? '#4ade80' : '#fde047',
                    }}
                  >
                    {sec.status}
                  </span>
                  <FiChevronRight style={{ color: '#475569', fontSize: '14px' }} />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Center: Live Interactive Split-Screen Preview */}
      <div className={styles.iframeContainer}>
        <div className={styles.iframeBar}>
          <div className={`${styles.dot} ${styles.dotRed}`} />
          <div className={`${styles.dot} ${styles.dotYellow}`} />
          <div className={`${styles.dot} ${styles.dotGreen}`} />
          <div className={styles.urlBar}>https://magicglass-five.vercel.app/ (Live Canvas Sync)</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setPreviewDevice('desktop')}
              style={{
                background: previewDevice === 'desktop' ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Desktop
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              style={{
                background: previewDevice === 'mobile' ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Mobile
            </button>
          </div>
        </div>

        {/* Live Mock Frame */}
        <div
          style={{
            flex: 1,
            background: '#070a0d',
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: previewDevice === 'mobile' ? '375px' : '100%',
              transition: 'all 0.3s ease',
              border: previewDevice === 'mobile' ? '1px solid rgba(255,255,255,0.2)' : 'none',
              borderRadius: previewDevice === 'mobile' ? '16px' : '0',
              overflow: 'hidden',
              background: '#000',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            }}
          >
            {/* Mock Hero Render inside preview */}
            <div
              style={{
                padding: '60px 40px',
                background: 'radial-gradient(circle at 50% 20%, rgba(197, 168, 128, 0.15), transparent 70%), #070a0d',
                border: '1px dashed #c5a880',
                position: 'relative',
                borderRadius: '8px',
              }}
            >
              <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#c5a880', background: 'rgba(197,168,128,0.1)', padding: '3px 8px', borderRadius: '4px' }}>
                <FiZap /> LIVE CANVAS ACTIVE
              </div>
              <div style={{ color: '#c5a880', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>
                {heroTagline}
              </div>
              <h1 style={{ fontSize: previewDevice === 'mobile' ? '24px' : '38px', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, marginBottom: '16px' }}>
                {heroHeading}
              </h1>
              <button style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #c5a880, #9f825b)', border: 'none', borderRadius: '6px', color: '#000', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                {ctaLabel} &rarr;
              </button>
            </div>

            {/* Sub-block section previews */}
            <div style={{ marginTop: '20px', padding: '24px', background: '#0b1014', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Heritage & Legacy Section
              </div>
              <div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: 500 }}>
                30+ Years of Architectural Glass Innovation across 1,200+ Facades
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Contextual Field Inspector & Instant Edits */}
      <div className={`${styles.glassPanel} ${styles.splitRightSidebar}`} style={{ overflowY: 'auto' }}>
        <div className={styles.panelHeader}>
          <div>
            <div className={styles.panelTitle}>
              <FiEdit3 style={{ color: '#c5a880' }} /> Direct Field Editor
            </div>
            <div className={styles.panelSubtitle}>Editing: {activeSection.toUpperCase()} Block</div>
          </div>
          <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`} style={{ padding: '6px 12px' }}>
            <FiCheckCircle /> Save Draft
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
              Eyebrow Tagline
            </label>
            <input
              type="text"
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
              Main Heading Title
            </label>
            <textarea
              rows={3}
              value={heroHeading}
              onChange={(e) => setHeroHeading(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
              Primary Button Text
            </label>
            <input
              type="text"
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
              Hero Background Media
            </label>
            <div
              style={{
                border: '2px dashed rgba(255,255,255,0.12)',
                borderRadius: '10px',
                padding: '16px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <FiImage style={{ fontSize: '24px', color: '#c5a880', marginBottom: '4px' }} />
              <div style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 500 }}>Drop high-res video or WebP</div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>Max file size 25MB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
