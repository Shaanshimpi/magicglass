'use client'

import React, { useState } from 'react'
import styles from './MockDashboard.module.css'
import {
  FiGrid,
  FiSliders,
  FiCpu,
  FiZap,
  FiCheckCircle,
  FiLayers,
  FiTrendingUp,
  FiShield,
  FiSun,
  FiFeather,
  FiCopy,
} from 'react-icons/fi'

export const ConceptBEditorialStudio: React.FC = () => {
  const [factoryArea, setFactoryArea] = useState(80000)
  const [impactStrength, setImpactStrength] = useState(5)
  const [uValue, setUValue] = useState(1.1)
  const [shgcValue, setShgcValue] = useState(0.25)

  const [aiPrompt, setAiPrompt] = useState('')
  const [aiOutput, setAiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleRunAi = (presetText: string) => {
    setIsGenerating(true)
    setAiOutput('')
    setTimeout(() => {
      setIsGenerating(false)
      setAiOutput(
        `[AI Enhanced Technical Output]: "${presetText} - Engineered with SentryGlas® interlayer technology for high-wind acoustic dampening, certified EN 12600 Class 1(C)1 impact tolerance, and optimal solar heat gain coefficient (SHGC 0.25)."`
      )
    }, 800)
  }

  return (
    <div className={styles.conceptContent}>
      {/* Top Studio Bar */}
      <div className={styles.panelHeader} style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiGrid style={{ color: '#c5a880' }} /> Editorial Studio & Bento Canvas
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
            Luxury agency spatial dashboard with tactile controls and generative AI copilot
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}>
            <FiZap style={{ color: '#c5a880' }} /> AI Auto-Audit
          </button>
          <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
            <FiCheckCircle /> Publish Global Changes
          </button>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className={styles.bentoGrid}>
        {/* Bento Box 1: Tactile Spec Dial & Range Sliders */}
        <div className={`${styles.glassPanel} ${styles.bentoSpan8}`}>
          <div className={styles.panelHeader}>
            <div>
              <div className={styles.panelTitle}>
                <FiSliders style={{ color: '#c5a880' }} /> Tactile Engineering Parameters
              </div>
              <div className={styles.panelSubtitle}>Adjust structural limits via tactile sliders</div>
            </div>
            <span className={styles.conceptBadge}>Interactive Spec Dial</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '12px' }}>
            {/* Slider 1: Factory Production Capacity */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span>Plant Floor Capacity (Sq. Ft)</span>
                <span className={styles.sliderVal}>{factoryArea.toLocaleString()} SQFT</span>
              </div>
              <input
                type="range"
                min={20000}
                max={200000}
                step={5000}
                value={factoryArea}
                onChange={(e) => setFactoryArea(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginTop: '6px' }}>
                <span>20k sq ft</span>
                <span>100k sq ft</span>
                <span>200k sq ft</span>
              </div>
            </div>

            {/* Slider 2: Tempered Impact Resistance */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span>Toughened Strength Multiplier</span>
                <span className={styles.sliderVal}>{impactStrength}x Standard Glass</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={impactStrength}
                onChange={(e) => setImpactStrength(Number(e.target.value))}
                className={styles.rangeInput}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b', marginTop: '6px' }}>
                <span>1x (Annealed)</span>
                <span>5x (Fully Tempered)</span>
                <span>10x (Sentry Lami)</span>
              </div>
            </div>

            {/* Slider 3: U-Value Insulation */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span>Thermal Transmittance (U-Value W/m²K)</span>
                <span className={styles.sliderVal}>{uValue} W/m²K</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={5.8}
                step={0.1}
                value={uValue}
                onChange={(e) => setUValue(Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Slider 4: SHGC Solar Gain */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span>Solar Heat Gain Coeff (SHGC)</span>
                <span className={styles.sliderVal}>{shgcValue}</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={shgcValue}
                onChange={(e) => setShgcValue(Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>
          </div>
        </div>

        {/* Bento Box 2: Generative AI Content Copilot Drawer */}
        <div className={`${styles.aiCopilot} ${styles.bentoSpan4}`}>
          <div className={styles.aiHeader}>
            <FiCpu style={{ fontSize: '16px' }} /> Generative Technical Copilot
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '14px' }}>
            Click an AI prompt preset to polish architectural glass technical microcopy:
          </div>

          <div>
            <span
              className={styles.aiPill}
              onClick={() => handleRunAi('Enhance SentryGlas Laminated Glass Specs for high-rise facades')}
            >
              ✨ SentryGlas Spec Polish
            </span>
            <span
              className={styles.aiPill}
              onClick={() => handleRunAi('Generate Low-E Solar Control benefit summary for architects')}
            >
              ✨ Low-E Benefit Summary
            </span>
            <span
              className={styles.aiPill}
              onClick={() => handleRunAi('Summarize Ceramic Fritted Glass durability characteristics')}
            >
              ✨ Ceramic Fritted Summary
            </span>
          </div>

          {/* AI Output Box */}
          <div
            style={{
              marginTop: '14px',
              padding: '12px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(197, 168, 128, 0.2)',
              borderRadius: '8px',
              minHeight: '100px',
              fontSize: '12px',
              color: '#e2e8f0',
              lineHeight: 1.5,
            }}
          >
            {isGenerating ? (
              <div style={{ color: '#c5a880', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiZap style={{ animation: 'spin 1s infinite linear' }} /> Polishing technical prose...
              </div>
            ) : aiOutput ? (
              aiOutput
            ) : (
              <span style={{ color: '#64748b', fontStyle: 'italic' }}>
                Select an AI preset above to synthesize technical content...
              </span>
            )}
          </div>
        </div>

        {/* Bento Box 3: Real-Time PDP Collections Visual Grid */}
        <div className={`${styles.glassPanel} ${styles.bentoSpan6}`}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>
              <FiLayers style={{ color: '#c5a880' }} /> Product Portfolio Collections
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>6 Active Glass Systems</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { title: 'Toughened Glass', icon: <FiShield />, tag: 'EN 12150' },
              { title: 'Insulated Glass DGU', icon: <FiSun />, tag: 'Double Sealed' },
              { title: 'Sentry Laminated', icon: <FiFeather />, tag: 'SGP Interlayer' },
              { title: 'Low-E Processing', icon: <FiTrendingUp />, tag: 'Solar Control' },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(197,168,128,0.12)', color: '#c5a880', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.icon}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{p.title}</div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>{p.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bento Box 4: Global Corporate Offices & Factory Settings */}
        <div className={`${styles.glassPanel} ${styles.bentoSpan6}`}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>
              <FiCheckCircle style={{ color: '#c5a880' }} /> Global Plant & Contact Settings
            </div>
            <span style={{ fontSize: '11px', color: '#4ade80' }}>Synced to Postgres</span>
          </div>

          <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6 }}>
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#fff' }}>Corporate Office:</strong> Dynamic House, SF-15, Sec 15, Faridabad
            </div>
            <div style={{ marginBottom: '8px' }}>
              <strong style={{ color: '#fff' }}>Manufacturing Unit:</strong> Plot 42, Sector 58 Industrial Area
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Direct Inquiries:</strong> info@magicglass.in | +91 98110 00000
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
