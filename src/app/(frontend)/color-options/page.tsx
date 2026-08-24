'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header/Header'
import { Hero } from '@/components/Hero/Hero'
import { Heritage } from '@/components/Heritage/Heritage'
import { ProductSystems } from '@/components/ProductSystems/ProductSystems'
import { Craftsmanship } from '@/components/Craftsmanship/Craftsmanship'
import { TrustBanner } from '@/components/TrustBanner/TrustBanner'
import { Testimonials } from '@/components/Testimonials/Testimonials'
import { CategorySwitcher } from '@/components/CategorySwitcher/CategorySwitcher'
import { ProductsCollection } from '@/components/ProductsCollection/ProductsCollection'
import { AboutContent } from '@/components/About/AboutContent'
import { IndustrySolutionContent } from '@/components/IndustrySolution/IndustrySolutionContent'
import { InfrastructureContent } from '@/components/Infrastructure/InfrastructureContent'
import { ContactUsContent } from '@/components/ContactUs/ContactUsContent'
import { PdpClientContent } from '@/components/PDP/PdpClientContent'
import { PDP_MOCK_DATA } from '@/components/PDP/pdpData'
import { Footer } from '@/components/Footer/Footer'
import { QuoteDrawer } from '@/components/QuoteDrawer/QuoteDrawer'
import { FloatingQuoteButton } from '@/components/FloatingQuoteButton/FloatingQuoteButton'

import { ProjectsHero } from '@/components/Projects/ProjectsHero'
import { ProjectsFilterNav } from '@/components/Projects/ProjectsFilterNav'
import { ProjectsGrid } from '@/components/Projects/ProjectsGrid'
import { ProjectSpecModal } from '@/components/Projects/ProjectSpecModal'
import { ProjectItem, ProjectCategory } from '@/types/projects.types'
import mockProjectsData from '@/data/projects_mock.json'

interface FullColorTheme {
  id: string
  name: string
  tagline: string
  colorBlack: string
  colorGrey: string
  colorSurfaceHover: string
  colorTaupe: string
  colorCream: string
  colorCrimson: string
  colorBorderSubtle: string
  colorGlassBg: string
  isFavorite?: boolean
}

const COLOR_OPTIONS: FullColorTheme[] = [
  {
    id: 'charcoal-crimson',
    name: '1. Architectural Charcoal',
    tagline: 'Cool Industrial Slate & Precision Crimson',
    colorBlack: '#0b1012',
    colorGrey: '#1c2225',
    colorSurfaceHover: '#262e32',
    colorTaupe: '#b2babb',
    colorCream: '#f3f6f7',
    colorCrimson: '#e20714',
    colorBorderSubtle: 'rgba(255, 255, 255, 0.08)',
    colorGlassBg: 'rgba(11, 16, 18, 0.85)',
    isFavorite: true,
  },
  {
    id: 'navy-cyan',
    name: '2. Midnight Navy & Ice Cyan',
    tagline: 'High-Tech Sapphire & Electric Cyan',
    colorBlack: '#0a121d',
    colorGrey: '#142030',
    colorSurfaceHover: '#1d2c40',
    colorTaupe: '#94a3b8',
    colorCream: '#f0f9ff',
    colorCrimson: '#00b4d8',
    colorBorderSubtle: 'rgba(0, 180, 216, 0.15)',
    colorGlassBg: 'rgba(10, 18, 29, 0.88)',
    isFavorite: true,
  },
  {
    id: 'frost-light',
    name: '3. Frost Studio Daylight',
    tagline: 'Crisp High-Contrast Bright Studio Mode',
    colorBlack: '#f4f5f7',
    colorGrey: '#ffffff',
    colorSurfaceHover: '#e2e8f0',
    colorTaupe: '#475569',
    colorCream: '#0f172a',
    colorCrimson: '#e20714',
    colorBorderSubtle: 'rgba(15, 23, 42, 0.12)',
    colorGlassBg: 'rgba(244, 245, 247, 0.92)',
    isFavorite: true,
  },
  {
    id: 'warm-sand-copper',
    name: '4. Warm Sand & Copper',
    tagline: 'Architectural Ivory & Terracotta Accent',
    colorBlack: '#ece7e1',
    colorGrey: '#f7f4ee',
    colorSurfaceHover: '#dfd9d1',
    colorTaupe: '#686259',
    colorCream: '#1a1917',
    colorCrimson: '#c85a32',
    colorBorderSubtle: 'rgba(26, 25, 23, 0.12)',
    colorGlassBg: 'rgba(236, 231, 225, 0.92)',
  },
  {
    id: 'titanium-signal-red',
    name: '5. Titanium Graphite',
    tagline: 'Pure Neutral Dark & Signal Red Accent',
    colorBlack: '#0e0e10',
    colorGrey: '#1a1a20',
    colorSurfaceHover: '#262630',
    colorTaupe: '#9e9ea8',
    colorCream: '#f5f5f7',
    colorCrimson: '#ff2e4d',
    colorBorderSubtle: 'rgba(255, 255, 255, 0.1)',
    colorGlassBg: 'rgba(14, 14, 16, 0.88)',
  },
  {
    id: 'nordic-cobalt',
    name: '6. Nordic Silver & Cobalt',
    tagline: 'Cool Metallic Light & Deep Cobalt Blue',
    colorBlack: '#e2e6eb',
    colorGrey: '#ffffff',
    colorSurfaceHover: '#d1d8e0',
    colorTaupe: '#475569',
    colorCream: '#0f172a',
    colorCrimson: '#2563eb',
    colorBorderSubtle: 'rgba(15, 23, 42, 0.12)',
    colorGlassBg: 'rgba(226, 230, 235, 0.92)',
  },
  {
    id: 'cobalt-gold',
    name: '7. Imperial Cobalt & Gold',
    tagline: 'Executive Sapphire & Metallic Champagne Gold',
    colorBlack: '#091428',
    colorGrey: '#12223f',
    colorSurfaceHover: '#1c3257',
    colorTaupe: '#a3b5d1',
    colorCream: '#f8f4e6',
    colorCrimson: '#e5b869',
    colorBorderSubtle: 'rgba(229, 184, 105, 0.18)',
    colorGlassBg: 'rgba(9, 20, 40, 0.88)',
  },
  {
    id: 'alabaster-emerald',
    name: '8. Alabaster & Emerald',
    tagline: 'Fresh Architectural Light & Emerald Green',
    colorBlack: '#f1f5f2',
    colorGrey: '#ffffff',
    colorSurfaceHover: '#e0eadd',
    colorTaupe: '#4b6354',
    colorCream: '#0d2818',
    colorCrimson: '#059669',
    colorBorderSubtle: 'rgba(13, 40, 24, 0.12)',
    colorGlassBg: 'rgba(241, 245, 242, 0.92)',
  },
]

type PageTab =
  | 'home'
  | 'about'
  | 'products'
  | 'toughened-glass'
  | 'industry-solution'
  | 'infrastructure'
  | 'projects'
  | 'contact-us'
  | 'pdp'

const PAGE_TABS: { id: PageTab; label: string; icon: string }[] = [
  { id: 'home', label: '1. Home Page', icon: '🏠' },
  { id: 'about', label: '2. About Us', icon: 'ℹ️' },
  { id: 'products', label: '3. Products Catalog', icon: '📦' },
  { id: 'toughened-glass', label: '4. Toughened Glass', icon: '🛡️' },
  { id: 'industry-solution', label: '5. Industry Solutions', icon: '🏭' },
  { id: 'infrastructure', label: '6. Infrastructure & BOQ', icon: '🏗️' },
  { id: 'projects', label: '7. Featured Projects', icon: '🏢' },
  { id: 'contact-us', label: '8. Contact Us', icon: '📞' },
  { id: 'pdp', label: '9. Product Detail (PDP)', icon: '🔍' },
]

function ProjectsSectionPreview({ onOpenQuoteDrawer }: { onOpenQuoteDrawer: () => void }) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const projects = mockProjectsData as ProjectItem[]

  const filteredProjects =
    activeCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())

  const categories: { name: ProjectCategory; count: number }[] = [
    { name: 'ALL', count: projects.length },
    { name: 'Residential', count: projects.filter((p) => p.category === 'Residential').length },
    { name: 'Commercial', count: projects.filter((p) => p.category === 'Commercial').length },
    { name: 'Airports', count: projects.filter((p) => p.category === 'Airports').length },
  ]

  return (
    <div>
      <ProjectsHero
        projects={projects}
        onSelectProject={(project) => setSelectedProject(project)}
      />
      <ProjectsFilterNav
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
      />
      <ProjectsGrid
        projects={filteredProjects}
        onSelectProject={(project) => setSelectedProject(project)}
      />
      <ProjectSpecModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuoteDrawer={onOpenQuoteDrawer}
      />
    </div>
  )
}

export default function ColorOptionsPage() {
  const [activeThemeId, setActiveThemeId] = useState<string>('frost-light')
  const [activeTab, setActiveTab] = useState<PageTab>('home')
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  const currentTheme = COLOR_OPTIONS.find((t) => t.id === activeThemeId) || COLOR_OPTIONS[0]

  const handleOpenQuote = () => setIsQuoteOpen(true)
  const handleCloseQuote = () => setIsQuoteOpen(false)

  const sampleProduct = PDP_MOCK_DATA['clear-glass']
  const sidebarWidth = isSidebarOpen ? '330px' : '50px'

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#030506',
        color: '#ffffff',
        fontFamily: 'var(--font-outfit), sans-serif',
        display: 'flex',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* COLLAPSIBLE SIDEBAR */}
      <aside
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: sidebarWidth,
          zIndex: 9999,
          background: 'rgba(8, 12, 15, 0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '10px 0 35px rgba(0, 0, 0, 0.6)',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Toggle Collapse Button Header */}
        <div
          style={{
            padding: '0.85rem 1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSidebarOpen ? 'space-between' : 'center',
            flexShrink: 0,
          }}
        >
          {isSidebarOpen && (
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: currentTheme.colorCrimson,
                  fontWeight: 600,
                  marginBottom: '2px',
                }}
              >
                PALETTE STUDIO
              </div>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                Theme Studio (8 Options)
              </h2>
            </div>
          )}

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '0.4rem 0.6rem',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono), monospace',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              transition: 'background 0.2s ease',
            }}
          >
            {isSidebarOpen ? '◀ Hide Sidebar' : '▶'}
          </button>
        </div>

        {/* Sidebar Body Content */}
        {isSidebarOpen && (
          <div
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              overflowY: 'scroll',
              maxHeight: 'calc(100vh - 60px)',
              flex: 1,
              minHeight: 0,
              WebkitOverflowScrolling: 'touch',
              overscrollBehavior: 'contain',
            }}
          >
            {/* Page View Tabs Section */}
            <div>
              <label
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#8899a6',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                Preview Page View
              </label>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.35rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {PAGE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono), monospace',
                      fontWeight: 600,
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      background: activeTab === tab.id ? '#ffffff' : 'transparent',
                      color: activeTab === tab.id ? '#000000' : '#c2bbb2',
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette List Section */}
            <div>
              <label
                style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#8899a6',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                Select Distinct Palette
              </label>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                }}
              >
                {COLOR_OPTIONS.map((theme) => {
                  const isActive = theme.id === activeThemeId
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setActiveThemeId(theme.id)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: isActive
                          ? `2px solid ${theme.colorCrimson}`
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        background: isActive
                          ? 'rgba(255, 255, 255, 0.12)'
                          : 'rgba(255, 255, 255, 0.03)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive
                          ? `0 4px 20px ${theme.colorCrimson}33`
                          : 'none',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          width: '100%',
                          marginBottom: '0.35rem',
                        }}
                      >
                        {/* Swatch dots */}
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <span
                            title={`Base: ${theme.colorBlack}`}
                            style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              backgroundColor: theme.colorBlack,
                              border: '1px solid rgba(255,255,255,0.3)',
                            }}
                          />
                          <span
                            title={`Panel: ${theme.colorGrey}`}
                            style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              backgroundColor: theme.colorGrey,
                              border: '1px solid rgba(255,255,255,0.3)',
                            }}
                          />
                          <span
                            title={`Accent: ${theme.colorCrimson}`}
                            style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              backgroundColor: theme.colorCrimson,
                            }}
                          />
                        </div>

                        {theme.isFavorite && (
                          <span
                            style={{
                              fontSize: '0.58rem',
                              fontFamily: 'var(--font-mono), monospace',
                              backgroundColor: 'rgba(255,255,255,0.15)',
                              color: '#ffd700',
                              padding: '1px 4px',
                              borderRadius: '4px',
                              fontWeight: 700,
                            }}
                          >
                            ★ FAV
                          </span>
                        )}

                        {isActive && (
                          <span
                            style={{
                              fontSize: '0.62rem',
                              fontFamily: 'var(--font-mono), monospace',
                              backgroundColor: theme.colorCrimson,
                              color: '#fff',
                              padding: '1px 5px',
                              borderRadius: '4px',
                              fontWeight: 700,
                              marginLeft: 'auto',
                            }}
                          >
                            ACTIVE
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: isActive ? '#ffffff' : '#e0e0e0',
                          marginBottom: '0.15rem',
                        }}
                      >
                        {theme.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.66rem',
                          color: '#a0a0a0',
                          lineHeight: 1.2,
                        }}
                      >
                        {theme.tagline}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Hex Tokens Inspector */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: '0.85rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono), monospace',
                color: '#8899a6',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              <div style={{ color: '#ffffff', fontWeight: 600, marginBottom: '2px' }}>
                Active Tokens ({currentTheme.name}):
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Base BG:</span>
                <strong style={{ color: '#fff' }}>{currentTheme.colorBlack}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Card Panel:</span>
                <strong style={{ color: '#fff' }}>{currentTheme.colorGrey}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Heading Text:</span>
                <strong style={{ color: '#fff' }}>{currentTheme.colorCream}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Muted Text:</span>
                <strong style={{ color: '#fff' }}>{currentTheme.colorTaupe}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Accent CTA:</span>
                <strong style={{ color: currentTheme.colorCrimson }}>
                  {currentTheme.colorCrimson}
                </strong>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN PREVIEW VIEWPORT AREA */}
      <div
        style={{
          marginLeft: sidebarWidth,
          flex: 1,
          transition: 'margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          minHeight: '100vh',
          width: `calc(100vw - ${sidebarWidth})`,
        }}
      >
        <main
          style={
            {
              '--color-black': currentTheme.colorBlack,
              '--color-grey': currentTheme.colorGrey,
              '--color-surface-hover': currentTheme.colorSurfaceHover,
              '--color-taupe': currentTheme.colorTaupe,
              '--color-cream': currentTheme.colorCream,
              '--color-crimson': currentTheme.colorCrimson,
              '--color-border-subtle': currentTheme.colorBorderSubtle,
              '--color-glass-bg': currentTheme.colorGlassBg,
              backgroundColor: currentTheme.colorBlack,
              color: currentTheme.colorTaupe,
              transition: 'all 0.35s ease',
              minHeight: '100vh',
              position: 'relative',
            } as React.CSSProperties
          }
        >
          <Header
            onOpenQuoteDrawer={handleOpenQuote}
            isLoaded={true}
            onNavigatePreview={(tab) => setActiveTab(tab as PageTab)}
          />

          <div style={{ paddingTop: activeTab === 'home' ? '0' : '70px', backgroundColor: currentTheme.colorBlack }}>
            {activeTab === 'home' && (
              <div>
                <Hero onOpenQuoteDrawer={handleOpenQuote} />
                <Heritage onOpenQuoteDrawer={handleOpenQuote} />
                <ProductSystems />
                <Craftsmanship />
                <TrustBanner />
                <Testimonials />
                <CategorySwitcher />
              </div>
            )}

            {activeTab === 'about' && <AboutContent />}

            {activeTab === 'products' && (
              <div>
                <ProductsCollection />
                <FloatingQuoteButton onOpenQuoteDrawer={handleOpenQuote} />
              </div>
            )}

            {activeTab === 'toughened-glass' && (
              <PdpClientContent product={PDP_MOCK_DATA['toughened-glass']} />
            )}

            {activeTab === 'industry-solution' && <IndustrySolutionContent />}

            {activeTab === 'infrastructure' && <InfrastructureContent />}

            {activeTab === 'projects' && (
              <ProjectsSectionPreview onOpenQuoteDrawer={handleOpenQuote} />
            )}

            {activeTab === 'contact-us' && <ContactUsContent />}

            {activeTab === 'pdp' && (
              <PdpClientContent product={sampleProduct} />
            )}
          </div>

          <Footer />
          <QuoteDrawer isOpen={isQuoteOpen} onClose={handleCloseQuote} />
        </main>
      </div>
    </div>
  )
}
