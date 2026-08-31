'use client'

import React, { useState } from 'react'
import styles from './MockDashboard.module.css'
import { ConceptACommandCenter } from './ConceptACommandCenter'
import { ConceptBEditorialStudio } from './ConceptBEditorialStudio'
import { ConceptCTacticalHud } from './ConceptCTacticalHud'
import { FiLayers, FiGrid, FiActivity, FiExternalLink } from 'react-icons/fi'

export const MockDashboardShell: React.FC = () => {
  const [activeConcept, setActiveConcept] = useState<'conceptA' | 'conceptB' | 'conceptC'>('conceptA')

  return (
    <div className={styles.dashboardWrapper}>
      {/* Top Header & Switcher Navigation */}
      <header className={styles.topNav}>
        <div className={styles.brandTitle}>
          <div className={styles.brandLogo}>MG</div>
          <div>
            <div className={styles.brandText}>Magic Glass CMS Admin</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Interactive Mock Dashboard Showcase</div>
          </div>
        </div>

        {/* Concept Switcher Tabs */}
        <div className={styles.tabGroup}>
          <button
            className={`${styles.tabBtn} ${activeConcept === 'conceptA' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveConcept('conceptA')}
          >
            <FiLayers /> Concept A: Visual Command Center
          </button>

          <button
            className={`${styles.tabBtn} ${activeConcept === 'conceptB' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveConcept('conceptB')}
          >
            <FiGrid /> Concept B: Editorial Studio
          </button>

          <button
            className={`${styles.tabBtn} ${activeConcept === 'conceptC' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveConcept('conceptC')}
          >
            <FiActivity /> Concept C: Tactical HUD
          </button>
        </div>

        {/* Right Header Controls */}
        <div className={styles.headerActions}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionBtn} ${styles.actionBtnSecondary}`}
          >
            <FiExternalLink /> Live Site
          </a>
        </div>
      </header>

      {/* Main Concept Canvas */}
      <main>
        {activeConcept === 'conceptA' && <ConceptACommandCenter />}
        {activeConcept === 'conceptB' && <ConceptBEditorialStudio />}
        {activeConcept === 'conceptC' && <ConceptCTacticalHud />}
      </main>
    </div>
  )
}
