'use client'

import React, { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  HERO_DATASETS,
  HERO_OPTIONS_METADATA,
  HeroDataset,
} from './demoData'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'
import { InfrastructureBody } from '@/components/Infrastructure/InfrastructureContent'
import { PdpBodyContent } from '@/components/PDP/PdpClientContent'
import { PDP_MOCK_DATA, PdpProductDetail } from '@/components/PDP/pdpData'
import styles from './DemoHeroShowcase.module.css'

// Hero Options 1 to 5
import { HeroOption1SplitEditorial } from './heroOptions/HeroOption1SplitEditorial'
import { HeroOption2CinematicGlass } from './heroOptions/HeroOption2CinematicGlass'
import { HeroOption3ArchitecturalBento } from './heroOptions/HeroOption3ArchitecturalBento'
import { HeroOption4FramedConsole } from './heroOptions/HeroOption4FramedConsole'
import { HeroOption5SwissTechnical } from './heroOptions/HeroOption5SwissTechnical'

function ShowcaseContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { openQuoteDrawer } = useLayoutContext()

  // State from URL or defaults
  const initialDataset = searchParams.get('dataset') || 'infrastructure'
  const initialOption = parseInt(searchParams.get('option') || '1', 10)
  const initialView = searchParams.get('view') || 'full'

  const [activeDatasetKey, setActiveDatasetKey] = useState<string>(
    HERO_DATASETS[initialDataset] ? initialDataset : 'infrastructure'
  )
  const [selectedOptionId, setSelectedOptionId] = useState<number>(
    initialOption >= 1 && initialOption <= 5 ? initialOption : 1
  )
  const [fullScaleOptionId, setFullScaleOptionId] = useState<number>(
    initialOption >= 1 && initialOption <= 5 ? initialOption : 1
  )
  const [viewMode, setViewMode] = useState<'grid' | 'full' | 'split'>(
    initialView === 'grid' || initialView === 'split' ? initialView : 'full'
  )
  const [isDarkCanvas, setIsDarkCanvas] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false)
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false)

  // Split Comparison state (Options 1 to 5)
  const [splitOptionA, setSplitOptionA] = useState<number>(1)
  const [splitOptionB, setSplitOptionB] = useState<number>(2)

  const activeDataset: HeroDataset =
    HERO_DATASETS[activeDatasetKey] || HERO_DATASETS['infrastructure']

  // Corresponding PDP product data if on a PDP dataset
  const pdpProduct: PdpProductDetail = useMemo(() => {
    if (activeDatasetKey === 'acoustic-laminated') {
      return PDP_MOCK_DATA['acoustic-lami-glass'] || PDP_MOCK_DATA['toughened-glass']
    }
    if (activeDatasetKey === 'insulated-dgu') {
      return PDP_MOCK_DATA['insulated-glass-dgu'] || PDP_MOCK_DATA['toughened-glass']
    }
    return PDP_MOCK_DATA['toughened-glass']
  }, [activeDatasetKey])

  // Sync state when URL params change
  useEffect(() => {
    const pDataset = searchParams.get('dataset')
    const pOption = searchParams.get('option')
    const pView = searchParams.get('view')

    if (pDataset && HERO_DATASETS[pDataset]) {
      setActiveDatasetKey(pDataset)
    }
    if (pOption) {
      const optNum = parseInt(pOption, 10)
      if (!isNaN(optNum) && optNum >= 1 && optNum <= 5) {
        setSelectedOptionId(optNum)
        setFullScaleOptionId(optNum)
      }
    }
    if (pView === 'grid' || pView === 'full' || pView === 'split') {
      setViewMode(pView)
    }
  }, [searchParams])

  // Load client choice from localStorage if present
  useEffect(() => {
    try {
      const savedChoice = localStorage.getItem('mg_client_hero_choice')
      if (savedChoice) {
        const parsed = parseInt(savedChoice, 10)
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
          setSelectedOptionId(parsed)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Sync state changes with URL query parameters for easy sharing
  const updateQueryParams = (dataset: string, optionId: number, view: string) => {
    const params = new URLSearchParams()
    params.set('dataset', dataset)
    params.set('option', optionId.toString())
    params.set('view', view)
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const handleDatasetChange = (key: string) => {
    setActiveDatasetKey(key)
    updateQueryParams(key, fullScaleOptionId, viewMode)
  }

  const handleViewModeChange = (mode: 'grid' | 'full' | 'split') => {
    setViewMode(mode)
    updateQueryParams(activeDatasetKey, fullScaleOptionId, mode)
  }

  const handleOptionSwitch = (id: number) => {
    setFullScaleOptionId(id)
    setSelectedOptionId(id)
    try {
      localStorage.setItem('mg_client_hero_choice', id.toString())
    } catch {
      // ignore
    }
    updateQueryParams(activeDatasetKey, id, viewMode)
  }

  const handleSelectOption = (id: number) => {
    setSelectedOptionId(id)
    try {
      localStorage.setItem('mg_client_hero_choice', id.toString())
    } catch {
      // ignore
    }
    showToast(`Option ${id} marked as preferred hero choice!`)
    updateQueryParams(activeDatasetKey, id, viewMode)
  }

  const handleExpandFullScale = (id: number) => {
    setFullScaleOptionId(id)
    setSelectedOptionId(id)
    setViewMode('full')
    updateQueryParams(activeDatasetKey, id, 'full')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href
      navigator.clipboard.writeText(currentUrl)
      showToast('Client link copied! Share directly with client.')
    }
  }

  const renderHeroComponent = (
    optionId: number,
    dataset: HeroDataset,
    isCompact: boolean = false
  ) => {
    switch (optionId) {
      case 1:
        return (
          <HeroOption1SplitEditorial
            data={dataset}
            onCtaClick={openQuoteDrawer}
            isCompact={isCompact}
          />
        )
      case 2:
        return (
          <HeroOption2CinematicGlass
            data={dataset}
            onCtaClick={openQuoteDrawer}
            isCompact={isCompact}
          />
        )
      case 3:
        return (
          <HeroOption3ArchitecturalBento
            data={dataset}
            onCtaClick={openQuoteDrawer}
            isCompact={isCompact}
          />
        )
      case 4:
        return (
          <HeroOption4FramedConsole
            data={dataset}
            onCtaClick={openQuoteDrawer}
            isCompact={isCompact}
          />
        )
      case 5:
        return (
          <HeroOption5SwissTechnical
            data={dataset}
            onCtaClick={openQuoteDrawer}
            isCompact={isCompact}
          />
        )
      default:
        return (
          <HeroOption1SplitEditorial
            data={dataset}
            onCtaClick={openQuoteDrawer}
            isCompact={isCompact}
          />
        )
    }
  }

  const currentMeta =
    HERO_OPTIONS_METADATA.find((m) => m.id === fullScaleOptionId) ||
    HERO_OPTIONS_METADATA[0]

  const decisionSummaryText = `MAGIC GLASS // CLIENT DESIGN DECISION NOTE
==================================================
Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
Selected Hero Option: ${currentMeta.name}
Layout Style: ${currentMeta.styleTheme} (${currentMeta.layoutArchetype})
Evaluated Dataset: ${activeDataset.name}
Recommended Context: ${currentMeta.recommendedFor}

Key Design Strengths:
- ${currentMeta.pros.join('\n- ')}

Client Approval Status:
[ X ] Direction Selected for Live Website Integration
Approved by: [Client Name / Approver]
Link Reference: ${typeof window !== 'undefined' ? window.location.href : 'http://localhost:3003/demo-hero-options'}
==================================================`

  return (
    <div
      className={`${styles.showcasePage} ${
        isDarkCanvas ? styles.darkCanvas : ''
      }`}
    >
      {/* Sleek Floating Master Control Dock (Slim, Non-Intrusive) */}
      <nav
        className={`${styles.floatingControlDock} ${
          isToolbarCollapsed ? styles.dockCollapsed : ''
        }`}
        aria-label="Hero Demo Controls"
      >
        <div className={styles.dockInner}>
          {/* Brand & Option Switcher (Options 1 to 5) */}
          <div className={styles.dockLeft}>
            <div className={styles.dockBrandBadge}>
              <span className={styles.liveBeacon} />
              <span>MAGIC GLASS</span>
            </div>

            {/* Quick Option Pills */}
            <div className={styles.dockGroup}>
              <span className={styles.groupLabel}>OPTION:</span>
              <div className={styles.pillsRow}>
                {HERO_OPTIONS_METADATA.map((m) => {
                  const isActive = fullScaleOptionId === m.id
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={`${styles.pillBtn} ${
                        isActive ? styles.pillBtnActive : ''
                      }`}
                      onClick={() => handleOptionSwitch(m.id)}
                      title={m.name}
                    >
                      Opt {m.id}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Dataset Switcher & View Mode */}
          <div className={styles.dockCenter}>
            <div className={styles.dockGroup}>
              <span className={styles.groupLabel}>DATA:</span>
              <div className={styles.pillsRow}>
                {Object.values(HERO_DATASETS).map((ds) => (
                  <button
                    key={ds.id}
                    type="button"
                    className={`${styles.pillBtn} ${
                      activeDatasetKey === ds.id ? styles.pillBtnActive : ''
                    }`}
                    onClick={() => handleDatasetChange(ds.id)}
                  >
                    {ds.name.replace(' (PDP)', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className={styles.dockGroup}>
              <div className={styles.pillsRow}>
                <button
                  type="button"
                  className={`${styles.pillBtn} ${
                    viewMode === 'full' ? styles.pillBtnActive : ''
                  }`}
                  onClick={() => handleViewModeChange('full')}
                >
                  Full 1:1
                </button>
                <button
                  type="button"
                  className={`${styles.pillBtn} ${
                    viewMode === 'grid' ? styles.pillBtnActive : ''
                  }`}
                  onClick={() => handleViewModeChange('grid')}
                >
                  Grid (5)
                </button>
                <button
                  type="button"
                  className={`${styles.pillBtn} ${
                    viewMode === 'split' ? styles.pillBtnActive : ''
                  }`}
                  onClick={() => handleViewModeChange('split')}
                >
                  A/B Split
                </button>
              </div>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className={styles.dockRight}>
            <button
              type="button"
              className={styles.dockActionBtn}
              onClick={handleCopyShareLink}
              title="Copy shareable link with current option and dataset"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              <span>Share Link</span>
            </button>

            <button
              type="button"
              className={`${styles.dockActionBtn} ${styles.decisionBtn}`}
              onClick={() => setIsDecisionModalOpen(true)}
              title="Export client decision note"
            >
              <span>Decision Note</span>
            </button>

            <button
              type="button"
              className={styles.themeToggleMini}
              onClick={() => setIsDarkCanvas((prev) => !prev)}
              title="Toggle OLED dark canvas"
            >
              {isDarkCanvas ? 'Light' : 'Dark'}
            </button>

            {/* Collapse / Hide Toggle */}
            <button
              type="button"
              className={styles.collapseToggleBtn}
              onClick={() => setIsToolbarCollapsed((prev) => !prev)}
              title={isToolbarCollapsed ? 'Expand Toolbar' : 'Collapse Toolbar for Pure Full Screen'}
            >
              {isToolbarCollapsed ? '▼ Show Controls' : '▲ Hide'}
            </button>
          </div>
        </div>
      </nav>

      {/* When toolbar is collapsed, show a small floating button to expand */}
      {isToolbarCollapsed && (
        <button
          type="button"
          className={styles.floatingExpandPill}
          onClick={() => setIsToolbarCollapsed(false)}
        >
          ⚙️ Hero Controls (Opt {fullScaleOptionId})
        </button>
      )}

      {/* Main Display Area */}

      {/* VIEW MODE 1: FULL 1:1 SCALE (Hero + Rest of the page intact) */}
      {viewMode === 'full' && (
        <main className={styles.fullRenderContainer}>
          {/* Selected Hero Option */}
          {renderHeroComponent(fullScaleOptionId, activeDataset, false)}

          {/* Rest of the Page Structure (completely intact, without altering structure) */}
          {activeDatasetKey === 'infrastructure' ? (
            <InfrastructureBody />
          ) : (
            <div style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-taupe)' }}>
              <PdpBodyContent
                product={pdpProduct}
                featuredProjects={pdpProduct.featuredProjects || pdpProduct.sliderImages}
                relatedProducts={pdpProduct.relatedProducts}
              />
            </div>
          )}
        </main>
      )}

      {/* VIEW MODE 2: OVERVIEW GRID (5 Options) */}
      {viewMode === 'grid' && (
        <section className={styles.gridModeSection}>
          <div className={styles.gridModeIntro}>
            <h2 className={styles.gridHeading}>Hero Design Matrix (5 Options)</h2>
            <p className={styles.gridSubheading}>
              Testing dataset: <strong>{activeDataset.name}</strong>. Click any card to expand to full screen with the rest of the page.
            </p>
          </div>

          <div className={styles.optionsGrid}>
            {HERO_OPTIONS_METADATA.map((meta) => {
              const isSelected = selectedOptionId === meta.id
              return (
                <div
                  key={meta.id}
                  className={`${styles.optionCard} ${
                    isSelected ? styles.cardSelected : ''
                  }`}
                >
                  <div className={styles.cardTopHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>{meta.name}</h3>
                      <div className={styles.cardArchetype}>
                        {meta.styleTheme} · {meta.layoutArchetype}
                      </div>
                    </div>
                    <span className={styles.recBadge}>
                      {meta.recommendedFor}
                    </span>
                  </div>

                  <div className={styles.previewCanvasBox}>
                    <div className={styles.previewExpandOverlay}>
                      <button
                        type="button"
                        className={styles.expandBtn}
                        onClick={() => handleExpandFullScale(meta.id)}
                      >
                        <span>Full Scale ↗</span>
                      </button>
                    </div>

                    {renderHeroComponent(meta.id, activeDataset, true)}
                  </div>

                  <div className={styles.cardEvaluation}>
                    <p className={styles.cardDescription}>
                      {meta.description}
                    </p>

                    <div className={styles.prosList}>
                      <span className={styles.prosHeader}>KEY ADVANTAGES:</span>
                      {meta.pros.map((pro, i) => (
                        <div key={i} className={styles.proItem}>
                          <span className={styles.checkGlyph}>✓</span>
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.cardActionFooter}>
                    <button
                      type="button"
                      className={`${styles.selectOptionBtn} ${
                        isSelected ? styles.btnSelected : ''
                      }`}
                      onClick={() => handleSelectOption(meta.id)}
                    >
                      {isSelected ? '✓ Chosen Direction' : 'Select Option'}
                    </button>

                    <button
                      type="button"
                      className={styles.viewScaleBtn}
                      onClick={() => handleExpandFullScale(meta.id)}
                    >
                      View Full Page ↗
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* VIEW MODE 3: A/B SPLIT */}
      {viewMode === 'split' && (
        <section className={styles.splitModeSection}>
          <div className={styles.splitHeaderBar}>
            <div className={styles.splitSelectCol}>
              <span className={styles.groupLabel}>Option A:</span>
              <select
                className={styles.splitSelect}
                value={splitOptionA}
                onChange={(e) => setSplitOptionA(parseInt(e.target.value, 10))}
              >
                {HERO_OPTIONS_METADATA.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.splitSelectCol}>
              <span className={styles.groupLabel}>Option B:</span>
              <select
                className={styles.splitSelect}
                value={splitOptionB}
                onChange={(e) => setSplitOptionB(parseInt(e.target.value, 10))}
              >
                {HERO_OPTIONS_METADATA.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.splitViewerGrid}>
            <div className={styles.splitCardWrap}>
              <div className={styles.splitCardTitleRow}>
                <strong>Option {splitOptionA}</strong>
                <button
                  type="button"
                  className={styles.viewScaleBtn}
                  onClick={() => handleExpandFullScale(splitOptionA)}
                >
                  Expand 1:1 ↗
                </button>
              </div>
              {renderHeroComponent(splitOptionA, activeDataset, true)}
            </div>

            <div className={styles.splitCardWrap}>
              <div className={styles.splitCardTitleRow}>
                <strong>Option {splitOptionB}</strong>
                <button
                  type="button"
                  className={styles.viewScaleBtn}
                  onClick={() => handleExpandFullScale(splitOptionB)}
                >
                  Expand 1:1 ↗
                </button>
              </div>
              {renderHeroComponent(splitOptionB, activeDataset, true)}
            </div>
          </div>
        </section>
      )}

      {/* Decision Note Export Modal */}
      {isDecisionModalOpen && (
        <div className={styles.decisionModalOverlay} onClick={() => setIsDecisionModalOpen(false)}>
          <div className={styles.decisionModalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.decisionHeader}>
              <h3 className={styles.decisionTitle}>Client Decision Summary</h3>
              <button
                type="button"
                className={styles.closeModalBtn}
                onClick={() => setIsDecisionModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1rem' }}>
              Copy this decision note directly into WhatsApp, Email, or Slack to sign off on the chosen hero design direction with the development team.
            </p>
            <textarea
              readOnly
              className={styles.decisionTextarea}
              value={decisionSummaryText}
            />
            <div className={styles.decisionActionsRow}>
              <button
                type="button"
                className={styles.copySummaryBtn}
                onClick={() => {
                  navigator.clipboard.writeText(decisionSummaryText)
                  showToast('Decision summary copied to clipboard!')
                }}
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toastNotice}>
          <span style={{ color: '#38bdf8' }}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export function DemoHeroShowcase() {
  return (
    <Suspense fallback={<div style={{ padding: '60px 20px', textAlign: 'center' }}>Loading Hero Option...</div>}>
      <ShowcaseContent />
    </Suspense>
  )
}
