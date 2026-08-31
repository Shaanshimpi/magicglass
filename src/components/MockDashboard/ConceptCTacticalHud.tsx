'use client'

import React, { useState } from 'react'
import styles from './MockDashboard.module.css'
import {
  FiActivity,
  FiFileText,
  FiDatabase,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiCornerDownRight,
  FiMaximize2,
  FiRefreshCw,
  FiShield,
  FiInbox,
} from 'react-icons/fi'

export const ConceptCTacticalHud: React.FC = () => {
  const [selectedDiffField, setSelectedDiffField] = useState('home_hero_tagline')

  const mockDiffs: Record<string, { published: string; draft: string }> = {
    home_hero_tagline: {
      published: 'Architectural Glass Engineering',
      draft: 'Precision Architectural Glazing & High-Performance Low-E Glass Processing',
    },
    toughened_max_size: {
      published: '3000mm x 6000mm',
      draft: '3300mm x 8000mm Jumbo Processing Capacity',
    },
    quote_notice: {
      published: 'Turnaround time 24 hours',
      draft: 'Instant Technical Quotation & CAD BOQ Review within 4 hours',
    },
  }

  return (
    <div className={styles.conceptContent}>
      {/* Top Telemetry Header */}
      <div className={styles.panelHeader} style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#00ffaa', display: 'flex', alignItems: 'center', gap: '10px', textShadow: '0 0 10px rgba(0,255,170,0.3)' }}>
            <FiActivity /> Tactical Glazing Operations HUD
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
            High-density telemetry dashboard with CAD dropzone metrics & side-by-side draft comparison
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className={styles.actionBtn} style={{ background: 'rgba(0,255,170,0.1)', border: '1px solid #00ffaa', color: '#00ffaa' }}>
            <FiRefreshCw /> Revalidate ISR Cache
          </button>
        </div>
      </div>

      {/* Telemetry Counter Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className={styles.hudCard}>
          <div className={styles.hudLabel}>Active Inquiries</div>
          <div className={styles.hudValue}>142</div>
          <div className={styles.hudSubtext}>+18 quote requests this week</div>
        </div>

        <div className={styles.hudCard}>
          <div className={styles.hudLabel}>CAD/BOQ File Uploads</div>
          <div className={styles.hudValue}>38</div>
          <div className={styles.hudSubtext}>.DWG, .DXF, .PDF files received</div>
        </div>

        <div className={styles.hudCard}>
          <div className={styles.hudLabel}>Payload API Latency</div>
          <div className={styles.hudValue}>42ms</div>
          <div className={styles.hudSubtext}>Neon PostgreSQL connected</div>
        </div>

        <div className={styles.hudCard}>
          <div className={styles.hudLabel}>ISR Cache Status</div>
          <div className={styles.hudValue} style={{ color: '#38bdf8', textShadow: '0 0 10px #38bdf8' }}>
            FRESH
          </div>
          <div className={styles.hudSubtext}>All 8 routes statically cached</div>
        </div>
      </div>

      {/* Main Grid: CAD Submission Telemetry + Draft Diff Viewer */}
      <div className={styles.bentoGrid}>
        {/* BOQ DWG CAD Submissions Telemetry */}
        <div className={`${styles.glassPanel} ${styles.bentoSpan6}`} style={{ borderColor: 'rgba(0, 255, 170, 0.2)' }}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle} style={{ color: '#00ffaa' }}>
              <FiInbox /> Quote Drawer BOQ Submissions
            </div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Latest 3 Entries</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { client: 'DLF Cybercity Tower B', category: 'High-Rise Curtain Wall', file: 'Facade_Elevation_v3.dwg', size: '14.2 MB', time: '12 mins ago' },
              { client: 'GMR Aerocity Terminal', category: 'Acoustic Laminated DGU', file: 'Acoustic_Spec_Sheet.pdf', size: '4.8 MB', time: '1 hour ago' },
              { client: 'Oberoi Luxury Villas', category: 'SentryGlas Balustrade', file: 'Structural_Glass_Details.dxf', size: '8.1 MB', time: '3 hours ago' },
            ].map((sub, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  background: '#0a1017',
                  border: '1px solid rgba(0, 255, 170, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>{sub.client}</div>
                  <div style={{ fontSize: '11px', color: '#00ffaa', marginTop: '2px' }}>
                    {sub.category} &bull; <span style={{ color: '#64748b' }}>{sub.file} ({sub.size})</span>
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>{sub.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Side-by-Side Version Diff & Staging Inspector */}
        <div className={`${styles.glassPanel} ${styles.bentoSpan6}`} style={{ borderColor: 'rgba(56, 189, 248, 0.2)' }}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle} style={{ color: '#38bdf8' }}>
              <FiFileText /> Draft vs Published Side-by-Side Diff
            </div>
            <span className={styles.conceptBadge} style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
              Staging Mode
            </span>
          </div>

          {/* Diff Selector */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => setSelectedDiffField('home_hero_tagline')}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: selectedDiffField === 'home_hero_tagline' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: selectedDiffField === 'home_hero_tagline' ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer',
              }}
            >
              Hero Tagline
            </button>
            <button
              onClick={() => setSelectedDiffField('toughened_max_size')}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: selectedDiffField === 'toughened_max_size' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: selectedDiffField === 'toughened_max_size' ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer',
              }}
            >
              Max Size Spec
            </button>
            <button
              onClick={() => setSelectedDiffField('quote_notice')}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: selectedDiffField === 'quote_notice' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: selectedDiffField === 'quote_notice' ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer',
              }}
            >
              Turnaround Notice
            </button>
          </div>

          {/* Side by Side Content Box */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '10px', color: '#f87171', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 600 }}>
                Live Published Version
              </div>
              <div style={{ fontSize: '12px', color: '#e2e8f0', fontFamily: 'monospace' }}>
                {mockDiffs[selectedDiffField]?.published}
              </div>
            </div>

            <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '10px', color: '#4ade80', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 600 }}>
                Staging Draft Version
              </div>
              <div style={{ fontSize: '12px', color: '#4ade80', fontFamily: 'monospace' }}>
                {mockDiffs[selectedDiffField]?.draft}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
