'use client'

import React, { useState, useEffect, useTransition } from 'react'
import styles from './Dashboard.module.css'
import { PageRoute } from './LeftPageNav'
import { MediaPickerModal } from './MediaPickerModal'
import { ProjectCreateModal } from './ProjectCreateModal'
import {
  FiSave,
  FiChevronDown,
  FiChevronUp,
  FiImage,
  FiPlus,
  FiTrash2,
  FiFolder,
  FiLayers,
  FiAlertCircle,
  FiCheckCircle,
  FiSearch,
} from 'react-icons/fi'

interface RightSectionInspectorProps {
  activePage: PageRoute
  onPostMessageUpdate: (fieldPath: string, value: string) => void
  onRefreshIframe: () => void
}

export const RightSectionInspector: React.FC<RightSectionInspectorProps> = ({
  activePage,
  onPostMessageUpdate,
  onRefreshIframe,
}) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isSaving, startSaving] = useTransition()
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hero: true,
    overview: true,
    featured: true,
    collection: true,
    specs: true,
    gallery: true,
    offices: true,
    links: true,
    partners: true,
    testimonials: true,
    legacy: true,
    visionMission: true,
    whyMagicGlass: true,
    leadership: true,
    cta: true,
    industries: true,
    contactCards: true,
    map: true,
    navLinks: true,
    ctaButtons: true,
    loader: true,
    quoteOptions: true,
  })

  // Media Picker state
  const [pickerTarget, setPickerTarget] = useState<{ fieldPath: string; currentValue: string } | null>(null)

  // Project Portfolio state
  const [projectsList, setProjectsList] = useState<any[]>([])
  const [projectFilterCategory, setProjectFilterCategory] = useState<string>('ALL')
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>('')
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null)
  const [isProjectCreateModalOpen, setIsProjectCreateModalOpen] = useState<boolean>(false)

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }))
  }

  // Fetch CMS data whenever activePage changes
  const fetchData = async () => {
    setLoading(true)
    setFeedback(null)
    try {
      if (activePage.cmsSlug === 'projects' && activePage.cmsType === 'collection') {
        const res = await fetch('/api/cms/get?type=collection&slug=projects')
        const json = await res.json()
        if (json.success && Array.isArray(json.data)) {
          setProjectsList(json.data)
          setData(json.data)
        }
      } else {
        const itemSlugParam = activePage.itemSlug ? `&itemSlug=${activePage.itemSlug}` : ''
        const res = await fetch(
          `/api/cms/get?type=${activePage.cmsType}&slug=${activePage.cmsSlug}${itemSlugParam}`
        )
        const json = await res.json()
        if (json.success) {
          setData(json.data || {})
        } else {
          setFeedback({ type: 'error', message: json.error || 'Failed to load content' })
        }
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Network error fetching data' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [activePage.id, activePage.cmsSlug, activePage.itemSlug])

  // Generalized Field Change Handler
  const handleFieldChange = (path: string, val: any) => {
    setData((prev: any) => {
      const clone = JSON.parse(JSON.stringify(prev || {}))
      const keys = path.split('.')
      let current = clone
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }
      current[keys[keys.length - 1]] = val
      return clone
    })

    if (typeof val === 'string') {
      const fieldId = path.replace(/\./g, '_')
      onPostMessageUpdate(fieldId, val)
    }
  }

  // Save changes to DB
  const handleSave = () => {
    startSaving(async () => {
      setFeedback(null)
      try {
        const isCollection = activePage.cmsType === 'collection'
        let payload: any = {
          type: activePage.cmsType,
          slug: activePage.cmsSlug,
          pathToRevalidate: activePage.path,
        }

        if (isCollection && activePage.cmsSlug === 'products') {
          payload.action = 'update'
          payload.itemSlug = activePage.itemSlug
          payload.data = data
        } else if (isCollection && activePage.cmsSlug === 'projects') {
          payload.action = 'update'
          payload.data = data
        } else {
          payload.action = 'update'
          payload.data = data
        }

        const res = await fetch('/api/cms/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        const json = await res.json()
        if (json.success) {
          setFeedback({ type: 'success', message: 'All changes saved & revalidated live in PostgreSQL!' })
          onRefreshIframe()
        } else {
          setFeedback({ type: 'error', message: json.error || 'Save failed' })
        }
      } catch (err: any) {
        setFeedback({ type: 'error', message: err.message || 'Error executing live save' })
      }
    })
  }

  // Helper for MediaPicker
  const openMediaPicker = (fieldPath: string, currentValue: string) => {
    setPickerTarget({ fieldPath, currentValue })
  }

  const handleMediaSelect = (selectedUrl: string) => {
    if (pickerTarget) {
      handleFieldChange(pickerTarget.fieldPath, selectedUrl)
      setPickerTarget(null)
    }
  }

  // Helper to render a visual image picker control
  const renderMediaControl = (label: string, fieldPath: string, value: string) => (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.mediaFieldControl}>
        <div className={styles.mediaThumbnailBox}>
          {value ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={value}
              alt="Thumbnail"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <FiImage size={18} color="#64748b" />
          )}
        </div>
        <div className={styles.mediaInfoBox}>
          <div className={styles.mediaPathText} title={value}>
            {value || '(No image selected)'}
          </div>
        </div>
        <button
          type="button"
          className={styles.mediaPickBtn}
          onClick={() => openMediaPicker(fieldPath, value)}
        >
          <FiFolder size={12} /> Choose
        </button>
      </div>
    </div>
  )

  // Project item handlers
  const handleProjectFieldChange = (idx: number, field: string, val: any) => {
    const updated = [...projectsList]
    updated[idx] = { ...updated[idx], [field]: val }
    setProjectsList(updated)
    setData(updated)
  }

  const handleSaveSingleProject = async (project: any) => {
    try {
      const res = await fetch('/api/cms/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          type: 'collection',
          slug: 'projects',
          itemSlug: project.slug,
          data: project,
          pathToRevalidate: '/projects',
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: 'success', message: `Project "${project.title}" saved live!` })
        onRefreshIframe()
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to save project' })
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Error updating project' })
    }
  }

  const handleDeleteProject = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return
    try {
      const res = await fetch('/api/cms/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          type: 'collection',
          slug: 'projects',
          itemSlug: slug,
          pathToRevalidate: '/projects',
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: 'success', message: `Project "${title}" deleted.` })
        fetchData()
        onRefreshIframe()
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to delete' })
    }
  }

  return (
    <>
      <aside className={styles.rightSidebar} data-lenis-prevent>
        {/* Inspector Header */}
        <div className={styles.inspectorHeader}>
          <div className={styles.inspectorTitleWrapper}>
            <span className={styles.pageTypeBadge}>
              {activePage.cmsType === 'collection' ? 'COLLECTION' : 'GLOBAL'}
            </span>
            <h2 className={styles.inspectorTitle}>{activePage.label}</h2>
            {activePage.itemSlug && (
              <span className={styles.slugBadge}>slug: {activePage.itemSlug}</span>
            )}
          </div>
          <button
            type="button"
            className={styles.publishBtn}
            onClick={handleSave}
            disabled={isSaving || loading}
          >
            <FiSave />
            {isSaving ? 'Publishing...' : 'Save & Publish Live'}
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`${styles.feedbackToast} ${
              feedback.type === 'success' ? styles.toastSuccess : styles.toastError
            }`}
          >
            {feedback.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
            <span>{feedback.message}</span>
          </div>
        )}

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            <span>Loading PostgreSQL CMS Record...</span>
          </div>
        ) : (
          <div className={styles.inspectorContentScroll}>
            {/* ============================================================= */}
            {/* 1. PRODUCT PDP INSPECTOR (products collection)                */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'products' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('hero')}>
                    <span className={styles.accordionTitle}>01. Hero & Identity</span>
                    {openSections.hero ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.hero && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Product Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.title || ''}
                          onChange={(e) => handleFieldChange('title', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Subheading / Tagline</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.subheading || ''}
                          onChange={(e) => handleFieldChange('subheading', e.target.value)}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Category</label>
                          <select
                            className={styles.inputControl}
                            value={data?.category || 'structural'}
                            onChange={(e) => handleFieldChange('category', e.target.value)}
                          >
                            <option value="structural">Structural & Exterior</option>
                            <option value="interior">Interior & Partitions</option>
                            <option value="safety">Safety & Processing</option>
                            <option value="specialty">Specialty & Decorative</option>
                          </select>
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Index Number</label>
                          <input
                            type="text"
                            className={styles.inputControl}
                            value={data?.indexNumber || ''}
                            onChange={(e) => handleFieldChange('indexNumber', e.target.value)}
                          />
                        </div>
                      </div>
                      {renderMediaControl(
                        'Hero Showcase Image',
                        'heroImageUrl',
                        data?.heroImageUrl || data?.heroImage?.url || ''
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('overview')}>
                    <span className={styles.accordionTitle}>02. Narrative Overview & Detail Images</span>
                    {openSections.overview ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.overview && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Intro Engineering Summary</label>
                        <textarea
                          rows={4}
                          className={styles.inputControl}
                          value={data?.introSummary || ''}
                          onChange={(e) => handleFieldChange('introSummary', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Secondary Technical Narrative</label>
                        <textarea
                          rows={3}
                          className={styles.inputControl}
                          value={data?.secondaryText || ''}
                          onChange={(e) => handleFieldChange('secondaryText', e.target.value)}
                        />
                      </div>
                      {renderMediaControl(
                        'Scrubbed Detail Image 1 (Left)',
                        'detailImages.0.imageUrl',
                        data?.detailImages?.[0]?.imageUrl || data?.detailImages?.[0]?.image?.url || ''
                      )}
                      {renderMediaControl(
                        'Scrubbed Detail Image 2 (Right)',
                        'detailImages.1.imageUrl',
                        data?.detailImages?.[1]?.imageUrl || data?.detailImages?.[1]?.image?.url || ''
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('specs')}>
                    <span className={styles.accordionTitle}>03. Technical Specifications & Performance</span>
                    {openSections.specs ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.specs && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <label className={styles.fieldLabel} style={{ margin: 0 }}>Specifications Table</label>
                          <button
                            type="button"
                            className={styles.actionIconBtn}
                            onClick={() => {
                              const currentSpecs = Array.isArray(data?.specs) ? [...data.specs] : []
                              currentSpecs.push({ label: 'New Specification', value: 'Custom Spec' })
                              handleFieldChange('specs', currentSpecs)
                            }}
                          >
                            <FiPlus size={12} /> Add Row
                          </button>
                        </div>
                        {Array.isArray(data?.specs) &&
                          data.specs.map((spec: any, sIdx: number) => (
                            <div key={sIdx} className={styles.specTableRowEditor}>
                              <input
                                type="text"
                                className={styles.inputControl}
                                style={{ flex: 1 }}
                                value={spec.label || ''}
                                onChange={(e) => {
                                  const updated = [...data.specs]
                                  updated[sIdx].label = e.target.value
                                  handleFieldChange('specs', updated)
                                }}
                                placeholder="Label (e.g. Glass Thickness)"
                              />
                              <input
                                type="text"
                                className={styles.inputControl}
                                style={{ flex: 1.5 }}
                                value={spec.value || ''}
                                onChange={(e) => {
                                  const updated = [...data.specs]
                                  updated[sIdx].value = e.target.value
                                  handleFieldChange('specs', updated)
                                }}
                                placeholder="Value (e.g. 6mm to 19mm)"
                              />
                              <button
                                type="button"
                                className={styles.deleteIconBtn}
                                onClick={() => {
                                  const updated = data.specs.filter((_: any, i: number) => i !== sIdx)
                                  handleFieldChange('specs', updated)
                                }}
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          ))}
                      </div>

                      <div className={styles.fieldGroup} style={{ marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <label className={styles.fieldLabel} style={{ margin: 0 }}>Characteristics Bullets</label>
                          <button
                            type="button"
                            className={styles.actionIconBtn}
                            onClick={() => {
                              const currentChars = Array.isArray(data?.characteristics) ? [...data.characteristics] : []
                              currentChars.push({ item: 'Engineered high durability' })
                              handleFieldChange('characteristics', currentChars)
                            }}
                          >
                            <FiPlus size={12} /> Add Item
                          </button>
                        </div>
                        {Array.isArray(data?.characteristics) &&
                          data.characteristics.map((char: any, cIdx: number) => (
                            <div key={cIdx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={typeof char === 'string' ? char : char.item || ''}
                                onChange={(e) => {
                                  const updated = [...data.characteristics]
                                  updated[cIdx] = { item: e.target.value }
                                  handleFieldChange('characteristics', updated)
                                }}
                              />
                              <button
                                type="button"
                                className={styles.deleteIconBtn}
                                onClick={() => {
                                  const updated = data.characteristics.filter((_: any, i: number) => i !== cIdx)
                                  handleFieldChange('characteristics', updated)
                                }}
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 04. APPLICATIONS GALLERY */}
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('gallery')}>
                    <span className={styles.accordionTitle}>04. Glass Applications Gallery</span>
                    {openSections.gallery ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.gallery && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Gallery Section Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.galleryTitle || 'Glass Applications'}
                          onChange={(e) => handleFieldChange('galleryTitle', e.target.value)}
                        />
                      </div>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <label className={styles.fieldLabel} style={{ margin: 0 }}>Application Cards</label>
                          <button
                            type="button"
                            className={styles.actionIconBtn}
                            onClick={() => {
                              const existing = Array.isArray(data?.galleryImages) ? [...data.galleryImages] : []
                              existing.push({ title: 'NEW APPLICATION', src: '/images/prod-structural.jpg' })
                              handleFieldChange('galleryImages', existing)
                            }}
                          >
                            <FiPlus size={12} /> Add Card
                          </button>
                        </div>
                        {Array.isArray(data?.galleryImages) &&
                          data.galleryImages.map((gItem: any, gIdx: number) => (
                            <div key={gIdx} style={{ padding: '10px', background: '#0e1726', borderRadius: 6, marginBottom: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={gItem.title || ''}
                                  onChange={(e) => {
                                    const updated = [...data.galleryImages]
                                    updated[gIdx] = { ...updated[gIdx], title: e.target.value }
                                    handleFieldChange('galleryImages', updated)
                                  }}
                                  placeholder="Application Title (e.g. FACADES, WINDOWS)"
                                />
                                <button
                                  type="button"
                                  className={styles.deleteIconBtn}
                                  onClick={() => {
                                    const updated = data.galleryImages.filter((_: any, i: number) => i !== gIdx)
                                    handleFieldChange('galleryImages', updated)
                                  }}
                                >
                                  <FiTrash2 size={13} />
                                </button>
                              </div>
                              {renderMediaControl(
                                `Application Image ${gIdx + 1}`,
                                `galleryImages.${gIdx}.src`,
                                gItem.src || gItem.image?.url || ''
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 05. DISCOVER ARCHITECTURAL SLIDER */}
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('discover')}>
                    <span className={styles.accordionTitle}>05. Discover Architectural Slider</span>
                    {openSections.discover ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.discover && (
                    <div className={styles.accordionBody}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <label className={styles.fieldLabel} style={{ margin: 0 }}>Featured Installation Slider Images</label>
                        <button
                          type="button"
                          className={styles.actionIconBtn}
                          onClick={() => {
                            const existing = Array.isArray(data?.sliderImages) ? [...data.sliderImages] : []
                            existing.push({ src: '/images/hero-bg.jpg' })
                            handleFieldChange('sliderImages', existing)
                          }}
                        >
                          <FiPlus size={12} /> Add Image
                        </button>
                      </div>

                      {Array.isArray(data?.sliderImages) &&
                        data.sliderImages.map((sItem: any, sIdx: number) => (
                          <div key={sIdx} style={{ padding: '8px 10px', background: '#0e1726', borderRadius: 6, marginBottom: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                              <span style={{ fontSize: '11px', color: '#c5a880', fontWeight: 600 }}>Slider Slide {sIdx + 1}</span>
                              <button
                                type="button"
                                className={styles.deleteIconBtn}
                                style={{ padding: '3px 6px' }}
                                onClick={() => {
                                  const updated = data.sliderImages.filter((_: any, i: number) => i !== sIdx)
                                  handleFieldChange('sliderImages', updated)
                                }}
                              >
                                <FiTrash2 size={12} />
                              </button>
                            </div>
                            {renderMediaControl(
                              `Slide Image ${sIdx + 1}`,
                              `sliderImages.${sIdx}.src`,
                              typeof sItem === 'string' ? sItem : sItem.src || sItem.image?.url || ''
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* 06. INDUSTRY SECTOR FOCUS */}
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('industries')}>
                    <span className={styles.accordionTitle}>06. Sector Focus / Our Industry</span>
                    {openSections.industries ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.industries && (
                    <div className={styles.accordionBody}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <label className={styles.fieldLabel} style={{ margin: 0 }}>Industry Sector Cards</label>
                        <button
                          type="button"
                          className={styles.actionIconBtn}
                          onClick={() => {
                            const existing = Array.isArray(data?.industries) ? [...data.industries] : []
                            existing.push({
                              title: 'NEW SECTOR',
                              description: 'Engineered glass solutions tailored for rigorous performance standards.',
                              imageUrl: '/images/prod-structural.jpg',
                            })
                            handleFieldChange('industries', existing)
                          }}
                        >
                          <FiPlus size={12} /> Add Sector
                        </button>
                      </div>

                      {Array.isArray(data?.industries) &&
                        data.industries.map((ind: any, indIdx: number) => (
                          <div key={indIdx} style={{ padding: '12px', background: '#0e1726', borderRadius: 8, marginBottom: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                              <span style={{ fontSize: '11px', color: '#c5a880', fontWeight: 600 }}>Sector {indIdx + 1}</span>
                              <button
                                type="button"
                                className={styles.deleteIconBtn}
                                onClick={() => {
                                  const updated = data.industries.filter((_: any, i: number) => i !== indIdx)
                                  handleFieldChange('industries', updated)
                                }}
                              >
                                <FiTrash2 size={12} />
                              </button>
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Sector Title</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={ind.title || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[indIdx] = { ...updated[indIdx], title: e.target.value }
                                  handleFieldChange('industries', updated)
                                }}
                                placeholder="e.g. BUILDING & CONSTRUCTION, AUTOMOTIVE"
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Description</label>
                              <textarea
                                className={styles.textareaControl}
                                rows={3}
                                value={ind.description || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[indIdx] = { ...updated[indIdx], description: e.target.value }
                                  handleFieldChange('industries', updated)
                                }}
                                placeholder="Engineering capabilities and application summary..."
                              />
                            </div>
                            {renderMediaControl(
                              `Sector Showcase Image`,
                              `industries.${indIdx}.imageUrl`,
                              ind.imageUrl || ind.image?.url || ''
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* 07. RELATED PRODUCTS */}
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('related')}>
                    <span className={styles.accordionTitle}>07. Related Products Navigation</span>
                    {openSections.related ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.related && (
                    <div className={styles.accordionBody}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <label className={styles.fieldLabel} style={{ margin: 0 }}>Related Product Slugs</label>
                        <button
                          type="button"
                          className={styles.actionIconBtn}
                          onClick={() => {
                            const existing = Array.isArray(data?.relatedProductSlugs) ? [...data.relatedProductSlugs] : []
                            existing.push({ slug: 'clear-glass' })
                            handleFieldChange('relatedProductSlugs', existing)
                          }}
                        >
                          <FiPlus size={12} /> Add Related
                        </button>
                      </div>
                      {Array.isArray(data?.relatedProductSlugs) &&
                        data.relatedProductSlugs.map((rItem: any, rIdx: number) => (
                          <div key={rIdx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                            <input
                              type="text"
                              className={styles.inputControl}
                              value={typeof rItem === 'string' ? rItem : rItem.slug || ''}
                              onChange={(e) => {
                                const updated = [...data.relatedProductSlugs]
                                updated[rIdx] = { slug: e.target.value }
                                handleFieldChange('relatedProductSlugs', updated)
                              }}
                              placeholder="e.g. insulated-glass-dgu, laminated-glass"
                            />
                            <button
                              type="button"
                              className={styles.deleteIconBtn}
                              onClick={() => {
                                const updated = data.relatedProductSlugs.filter((_: any, i: number) => i !== rIdx)
                                handleFieldChange('relatedProductSlugs', updated)
                              }}
                            >
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================================= */}
            {/* 2. PROJECTS PORTFOLIO MANAGER                                  */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'projects' && (
              <div className={styles.projectsManagerContainer}>
                <div className={styles.projectsToolbar}>
                  <div className={styles.projectCategoryPills}>
                    {['ALL', 'Airports', 'Commercial', 'Residential', 'Infrastructure', 'Hospitality'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`${styles.filterPillBtn} ${projectFilterCategory === cat ? styles.filterPillActive : ''}`}
                        onClick={() => setProjectFilterCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <FiSearch style={{ position: 'absolute', left: 10, top: 10, color: '#64748b' }} />
                      <input
                        type="text"
                        className={styles.inputControl}
                        style={{ paddingLeft: 32 }}
                        placeholder="Search project title, developer, or location..."
                        value={projectSearchQuery}
                        onChange={(e) => setProjectSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className={styles.publishBtn}
                      style={{ width: 'auto', padding: '0 16px', fontSize: '13px' }}
                      onClick={() => setIsProjectCreateModalOpen(true)}
                    >
                      <FiPlus size={14} /> Add Project
                    </button>
                  </div>
                </div>

                <div className={styles.projectsListScroll}>
                  {projectsList
                    .filter((p) => {
                      const matchCat =
                        projectFilterCategory === 'ALL' ||
                        p.category?.toLowerCase().includes(projectFilterCategory.toLowerCase())
                      const matchSearch =
                        !projectSearchQuery ||
                        p.title?.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                        p.developer?.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
                        p.location?.toLowerCase().includes(projectSearchQuery.toLowerCase())
                      return matchCat && matchSearch
                    })
                    .map((project, pIdx) => {
                      const isExpanded = expandedProjectId === project.slug || expandedProjectId === String(pIdx)
                      return (
                        <div key={project.slug || pIdx} className={styles.projectCardItem}>
                          <div
                            className={styles.projectCardHeader}
                            onClick={() => setExpandedProjectId(isExpanded ? null : project.slug || String(pIdx))}
                          >
                            <div className={styles.projectThumbnail}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={project.imageUrl || project.image?.url || '/images/projects/balmoral-by-riverside.jpg'}
                                alt={project.title}
                              />
                            </div>
                            <div className={styles.projectHeaderInfo}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <h4 className={styles.projectItemTitle}>{project.title}</h4>
                                {project.heroFeatured && <span className={styles.featuredStar}>★ Featured</span>}
                              </div>
                              <div className={styles.projectMetaLine}>
                                <span className={styles.projectCategoryBadge}>{project.category}</span>
                                <span className={styles.projectLocationText}>• {project.location || 'Pune'}</span>
                              </div>
                            </div>
                            <div className={styles.projectExpandIcon}>
                              {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                            </div>
                          </div>

                          {isExpanded && (
                            <div className={styles.projectCardBody}>
                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Project Title</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={project.title || ''}
                                  onChange={(e) => handleProjectFieldChange(pIdx, 'title', e.target.value)}
                                />
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Category</label>
                                  <select
                                    className={styles.inputControl}
                                    value={project.category || 'Commercial'}
                                    onChange={(e) => handleProjectFieldChange(pIdx, 'category', e.target.value)}
                                  >
                                    <option value="Commercial">Commercial</option>
                                    <option value="Residential">Residential</option>
                                    <option value="Airports">Airports</option>
                                    <option value="Hospitality">Hospitality</option>
                                    <option value="Infrastructure">Infrastructure</option>
                                  </select>
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Developer / Client</label>
                                  <input
                                    type="text"
                                    className={styles.inputControl}
                                    value={project.developer || ''}
                                    onChange={(e) => handleProjectFieldChange(pIdx, 'developer', e.target.value)}
                                  />
                                </div>
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Location</label>
                                  <input
                                    type="text"
                                    className={styles.inputControl}
                                    value={project.location || ''}
                                    onChange={(e) => handleProjectFieldChange(pIdx, 'location', e.target.value)}
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Area (Sq Mtr)</label>
                                  <input
                                    type="number"
                                    className={styles.inputControl}
                                    value={project.areaSqMtr || ''}
                                    onChange={(e) => handleProjectFieldChange(pIdx, 'areaSqMtr', Number(e.target.value))}
                                  />
                                </div>
                              </div>

                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Glazing Application</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={project.application || ''}
                                  onChange={(e) => handleProjectFieldChange(pIdx, 'application', e.target.value)}
                                />
                              </div>

                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Glass BOQ Specs</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={project.glassDescription || ''}
                                  onChange={(e) => handleProjectFieldChange(pIdx, 'glassDescription', e.target.value)}
                                />
                              </div>

                              {renderMediaControl(
                                'Project Showcase Asset',
                                `${pIdx}.imageUrl`,
                                project.imageUrl || project.image?.url || ''
                              )}

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                <button
                                  type="button"
                                  className={styles.deleteIconBtn}
                                  style={{ padding: '6px 12px', width: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}
                                  onClick={() => handleDeleteProject(project.slug, project.title)}
                                >
                                  <FiTrash2 size={13} /> Delete Project
                                </button>
                                <button
                                  type="button"
                                  className={styles.publishBtn}
                                  style={{ width: 'auto', padding: '6px 16px', fontSize: '12px' }}
                                  onClick={() => handleSaveSingleProject(project)}
                                >
                                  Save Project
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 3. ABOUT US PAGE GLOBAL                                       */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'about-page' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('hero')}>
                    <span className={styles.accordionTitle}>01. Hero & Facility Image</span>
                    {openSections.hero ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.hero && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Eyebrow</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.hero?.eyebrow || 'ABOUT MAGIC GLASS'}
                          onChange={(e) => handleFieldChange('hero.eyebrow', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Main Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.hero?.title || 'About Magic Glass'}
                          onChange={(e) => handleFieldChange('hero.title', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Tagline / Statement</label>
                        <textarea
                          rows={3}
                          className={styles.inputControl}
                          value={data?.hero?.tagline || ''}
                          onChange={(e) => handleFieldChange('hero.tagline', e.target.value)}
                        />
                      </div>
                      {renderMediaControl(
                        'Facility Full-Width Image',
                        'hero.facilityImageUrl',
                        data?.hero?.facilityImageUrl || data?.hero?.facilityImage?.url || '/images/hero-bg.jpg'
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('legacy')}>
                    <span className={styles.accordionTitle}>02. Our Legacy & Manifesto</span>
                    {openSections.legacy ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.legacy && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Headline</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.legacy?.headline || ''}
                          onChange={(e) => handleFieldChange('legacy.headline', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Body Narrative</label>
                        <textarea
                          rows={4}
                          className={styles.inputControl}
                          value={data?.legacy?.bodyText || ''}
                          onChange={(e) => handleFieldChange('legacy.bodyText', e.target.value)}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Button Label</label>
                          <input
                            type="text"
                            className={styles.inputControl}
                            value={data?.legacy?.buttonLabel || 'OUR SOLUTIONS ↗'}
                            onChange={(e) => handleFieldChange('legacy.buttonLabel', e.target.value)}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Button Href</label>
                          <input
                            type="text"
                            className={styles.inputControl}
                            value={data?.legacy?.buttonHref || '/industry-solution'}
                            onChange={(e) => handleFieldChange('legacy.buttonHref', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('visionMission')}>
                    <span className={styles.accordionTitle}>03. Vision & Mission</span>
                    {openSections.visionMission ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.visionMission && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Vision Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.visionMission?.visionTitle || ''}
                          onChange={(e) => handleFieldChange('visionMission.visionTitle', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Vision Description</label>
                        <textarea
                          rows={2}
                          className={styles.inputControl}
                          value={data?.visionMission?.visionDesc || ''}
                          onChange={(e) => handleFieldChange('visionMission.visionDesc', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Mission Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.visionMission?.missionTitle || ''}
                          onChange={(e) => handleFieldChange('visionMission.missionTitle', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Mission Description</label>
                        <textarea
                          rows={2}
                          className={styles.inputControl}
                          value={data?.visionMission?.missionDesc || ''}
                          onChange={(e) => handleFieldChange('visionMission.missionDesc', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('whyMagicGlass')}>
                    <span className={styles.accordionTitle}>04. Why Magic Glass (4 Pillars)</span>
                    {openSections.whyMagicGlass ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.whyMagicGlass && (
                    <div className={styles.accordionBody}>
                      {Array.isArray(data?.whyMagicGlass) &&
                        data.whyMagicGlass.map((w: any, wIdx: number) => (
                          <div key={wIdx} style={{ padding: 10, background: '#0e1726', borderRadius: 6, marginBottom: 8 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 8, marginBottom: 6 }}>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={w.number || `0${wIdx + 1}`}
                                onChange={(e) => {
                                  const updated = [...data.whyMagicGlass]
                                  updated[wIdx].number = e.target.value
                                  handleFieldChange('whyMagicGlass', updated)
                                }}
                              />
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={w.title || ''}
                                onChange={(e) => {
                                  const updated = [...data.whyMagicGlass]
                                  updated[wIdx].title = e.target.value
                                  handleFieldChange('whyMagicGlass', updated)
                                }}
                              />
                            </div>
                            <textarea
                              rows={2}
                              className={styles.inputControl}
                              value={w.description || ''}
                              onChange={(e) => {
                                const updated = [...data.whyMagicGlass]
                                updated[wIdx].description = e.target.value
                                handleFieldChange('whyMagicGlass', updated)
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('leadership')}>
                    <span className={styles.accordionTitle}>05. Leadership Team</span>
                    {openSections.leadership ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.leadership && (
                    <div className={styles.accordionBody}>
                      {Array.isArray(data?.leadership) &&
                        data.leadership.map((l: any, lIdx: number) => (
                          <div key={lIdx} style={{ padding: 10, background: '#0e1726', borderRadius: 6, marginBottom: 10 }}>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Leader Name</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={l.name || ''}
                                onChange={(e) => {
                                  const updated = [...data.leadership]
                                  updated[lIdx].name = e.target.value
                                  handleFieldChange('leadership', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Role / Designation</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={l.role || ''}
                                onChange={(e) => {
                                  const updated = [...data.leadership]
                                  updated[lIdx].role = e.target.value
                                  handleFieldChange('leadership', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Executive Biography</label>
                              <textarea
                                rows={3}
                                className={styles.inputControl}
                                value={l.bio || ''}
                                onChange={(e) => {
                                  const updated = [...data.leadership]
                                  updated[lIdx].bio = e.target.value
                                  handleFieldChange('leadership', updated)
                                }}
                              />
                            </div>
                            {renderMediaControl(
                              `Portrait Photo (${l.name || `Leader ${lIdx + 1}`})`,
                              `leadership.${lIdx}.portraitUrl`,
                              l.portraitUrl || l.portrait?.url || ''
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================================= */}
            {/* 4. INDUSTRY SOLUTION PAGE GLOBAL                              */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'industry-solution-page' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('hero')}>
                    <span className={styles.accordionTitle}>01. Hero Header</span>
                    {openSections.hero ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.hero && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Main Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.hero?.title || ''}
                          onChange={(e) => handleFieldChange('hero.title', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Subheading</label>
                        <textarea
                          rows={2}
                          className={styles.inputControl}
                          value={data?.hero?.subheading || ''}
                          onChange={(e) => handleFieldChange('hero.subheading', e.target.value)}
                        />
                      </div>
                      {renderMediaControl(
                        'Hero Header Image',
                        'hero.heroImageUrl',
                        data?.hero?.heroImageUrl || data?.hero?.heroImage?.url || ''
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('industries')}>
                    <span className={styles.accordionTitle}>02. Industry Sectors (5 Solutions)</span>
                    {openSections.industries ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.industries && (
                    <div className={styles.accordionBody}>
                      {Array.isArray(data?.industries) &&
                        data.industries.map((ind: any, iIdx: number) => (
                          <div key={iIdx} style={{ padding: 10, background: '#0e1726', borderRadius: 6, marginBottom: 12 }}>
                            <div style={{ fontSize: '11px', color: '#c5a880', fontWeight: 600, marginBottom: 6 }}>
                              INDUSTRY #{iIdx + 1}: {ind.title?.toUpperCase()}
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Title</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={ind.title || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[iIdx].title = e.target.value
                                  handleFieldChange('industries', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Subtitle</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={ind.subtitle || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[iIdx].subtitle = e.target.value
                                  handleFieldChange('industries', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Technical Specs</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={ind.specs || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[iIdx].specs = e.target.value
                                  handleFieldChange('industries', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Description</label>
                              <textarea
                                rows={3}
                                className={styles.inputControl}
                                value={ind.description || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[iIdx].description = e.target.value
                                  handleFieldChange('industries', updated)
                                }}
                              />
                            </div>
                            {renderMediaControl(
                              `Visual Showcase Image`,
                              `industries.${iIdx}.imageUrl`,
                              ind.imageUrl || ind.image?.url || ''
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================================= */}
            {/* 5. INFRASTRUCTURE PAGE GLOBAL                                 */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'infrastructure-page' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('hero')}>
                    <span className={styles.accordionTitle}>01. Hero Header</span>
                    {openSections.hero ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.hero && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Main Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.hero?.title || ''}
                          onChange={(e) => handleFieldChange('hero.title', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Subheading</label>
                        <textarea
                          rows={2}
                          className={styles.inputControl}
                          value={data?.hero?.subheading || ''}
                          onChange={(e) => handleFieldChange('hero.subheading', e.target.value)}
                        />
                      </div>
                      {renderMediaControl(
                        'Hero Header Image',
                        'hero.heroImageUrl',
                        data?.hero?.heroImageUrl || data?.hero?.heroImage?.url || ''
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('industries')}>
                    <span className={styles.accordionTitle}>02. Factory Machines & Lines (7 Capabilities)</span>
                    {openSections.industries ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.industries && (
                    <div className={styles.accordionBody}>
                      {Array.isArray(data?.industries) &&
                        data.industries.map((mach: any, mIdx: number) => (
                          <div key={mIdx} style={{ padding: 10, background: '#0e1726', borderRadius: 6, marginBottom: 12 }}>
                            <div style={{ fontSize: '11px', color: '#c5a880', fontWeight: 600, marginBottom: 6 }}>
                              MACHINE #{mIdx + 1}: {mach.title?.toUpperCase()}
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Machine Name</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={mach.title || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[mIdx].title = e.target.value
                                  handleFieldChange('industries', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Subtitle</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={mach.subtitle || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[mIdx].subtitle = e.target.value
                                  handleFieldChange('industries', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Machine Specs / Capacity</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={mach.specs || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[mIdx].specs = e.target.value
                                  handleFieldChange('industries', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Process Description</label>
                              <textarea
                                rows={3}
                                className={styles.inputControl}
                                value={mach.description || ''}
                                onChange={(e) => {
                                  const updated = [...data.industries]
                                  updated[mIdx].description = e.target.value
                                  handleFieldChange('industries', updated)
                                }}
                              />
                            </div>
                            {renderMediaControl(
                              `Machinery Photo`,
                              `industries.${mIdx}.imageUrl`,
                              mach.imageUrl || mach.image?.url || ''
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================================= */}
            {/* 6. CONTACT US PAGE GLOBAL                                     */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'contact-us-page' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('hero')}>
                    <span className={styles.accordionTitle}>01. Hero Header</span>
                    {openSections.hero ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.hero && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Main Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.hero?.title || 'CONTACT US'}
                          onChange={(e) => handleFieldChange('hero.title', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Subheading</label>
                        <textarea
                          rows={2}
                          className={styles.inputControl}
                          value={data?.hero?.subheading || ''}
                          onChange={(e) => handleFieldChange('hero.subheading', e.target.value)}
                        />
                      </div>
                      {renderMediaControl(
                        'Hero Header Image',
                        'hero.heroImageUrl',
                        data?.hero?.heroImageUrl || data?.hero?.heroImage?.url || ''
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('contactCards')}>
                    <span className={styles.accordionTitle}>02. Contact Channels (4 Cards)</span>
                    {openSections.contactCards ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.contactCards && (
                    <div className={styles.accordionBody}>
                      {Array.isArray(data?.contactCards) &&
                        data.contactCards.map((c: any, cIdx: number) => (
                          <div key={cIdx} style={{ padding: 10, background: '#0e1726', borderRadius: 6, marginBottom: 10 }}>
                            <div style={{ fontSize: '11px', color: '#c5a880', fontWeight: 600, marginBottom: 6 }}>
                              CARD #{cIdx + 1}: {c.title?.toUpperCase()}
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Card Title</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={c.title || ''}
                                onChange={(e) => {
                                  const updated = [...data.contactCards]
                                  updated[cIdx].title = e.target.value
                                  handleFieldChange('contactCards', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Address / Contact Detail</label>
                              <textarea
                                rows={2}
                                className={styles.inputControl}
                                value={c.detail || ''}
                                onChange={(e) => {
                                  const updated = [...data.contactCards]
                                  updated[cIdx].detail = e.target.value
                                  handleFieldChange('contactCards', updated)
                                }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Action Text</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={c.actionText || ''}
                                  onChange={(e) => {
                                    const updated = [...data.contactCards]
                                    updated[cIdx].actionText = e.target.value
                                    handleFieldChange('contactCards', updated)
                                  }}
                                />
                              </div>
                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Action URL / Link</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={c.actionUrl || ''}
                                  onChange={(e) => {
                                    const updated = [...data.contactCards]
                                    updated[cIdx].actionUrl = e.target.value
                                    handleFieldChange('contactCards', updated)
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('map')}>
                    <span className={styles.accordionTitle}>03. Google Map Embed URL</span>
                    {openSections.map ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.map && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Map Embed Iframe URL</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.mapEmbedUrl || ''}
                          onChange={(e) => handleFieldChange('mapEmbedUrl', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================================= */}
            {/* 7. PRODUCTS OVERVIEW PAGE GLOBAL                              */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'products-page' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('hero')}>
                    <span className={styles.accordionTitle}>01. Hero Section</span>
                    {openSections.hero ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.hero && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Tagline</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.hero?.tag || ''}
                          onChange={(e) => handleFieldChange('hero.tag', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Main Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.hero?.title || ''}
                          onChange={(e) => handleFieldChange('hero.title', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Subtitle</label>
                        <textarea
                          rows={3}
                          className={styles.inputControl}
                          value={data?.hero?.subtitle || ''}
                          onChange={(e) => handleFieldChange('hero.subtitle', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('featured')}>
                    <span className={styles.accordionTitle}>02. Top 3 Featured Systems (Dark Section)</span>
                    {openSections.featured ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.featured && (
                    <div className={styles.accordionBody}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Section Eyebrow</label>
                          <input
                            type="text"
                            className={styles.inputControl}
                            value={data?.topFeaturedEyebrow || 'TOP 3 FEATURED SYSTEMS'}
                            onChange={(e) => handleFieldChange('topFeaturedEyebrow', e.target.value)}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Badge Tag</label>
                          <input
                            type="text"
                            className={styles.inputControl}
                            value={data?.topFeaturedTag || 'FLAGSHIP FAÇADES'}
                            onChange={(e) => handleFieldChange('topFeaturedTag', e.target.value)}
                          />
                        </div>
                      </div>

                      {Array.isArray(data?.featuredSystems) &&
                        data.featuredSystems.map((item: any, fIdx: number) => (
                          <div key={fIdx} style={{ padding: 10, background: '#0e1726', borderRadius: 6, marginBottom: 10 }}>
                            <div style={{ fontSize: '11px', color: '#c5a880', fontWeight: 600, marginBottom: 6 }}>
                              FEATURED SYSTEM #{fIdx + 1}
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Product Title</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={item.title || ''}
                                onChange={(e) => {
                                  const updated = [...data.featuredSystems]
                                  updated[fIdx].title = e.target.value
                                  handleFieldChange('featuredSystems', updated)
                                }}
                              />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Badge Text</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={item.badgeText || ''}
                                  onChange={(e) => {
                                    const updated = [...data.featuredSystems]
                                    updated[fIdx].badgeText = e.target.value
                                    handleFieldChange('featuredSystems', updated)
                                  }}
                                />
                              </div>
                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Category Label</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={item.categoryLabel || ''}
                                  onChange={(e) => {
                                    const updated = [...data.featuredSystems]
                                    updated[fIdx].categoryLabel = e.target.value
                                    handleFieldChange('featuredSystems', updated)
                                  }}
                                />
                              </div>
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Highlight Description</label>
                              <textarea
                                rows={2}
                                className={styles.inputControl}
                                value={item.description || item.descriptionHighlight || ''}
                                onChange={(e) => {
                                  const updated = [...data.featuredSystems]
                                  updated[fIdx].description = e.target.value
                                  handleFieldChange('featuredSystems', updated)
                                }}
                              />
                            </div>
                            {renderMediaControl(
                              `Featured System ${fIdx + 1} Image`,
                              `featuredSystems.${fIdx}.featuredImageUrl`,
                              item.featuredImageUrl || item.featuredImage?.url || ''
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('collection')}>
                    <span className={styles.accordionTitle}>03. Magic Glass Collection Narrative</span>
                    {openSections.collection ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.collection && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Sticky Eyebrow</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.collectionEyebrow || 'MAGIC GLASS COLLECTION'}
                          onChange={(e) => handleFieldChange('collectionEyebrow', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Sticky Headline Narrative</label>
                        <textarea
                          rows={3}
                          className={styles.inputControl}
                          value={data?.collectionHeadline || ''}
                          onChange={(e) => handleFieldChange('collectionHeadline', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================================= */}
            {/* 8. FOOTER & OFFICES GLOBAL                                     */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'footer' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('offices')}>
                    <span className={styles.accordionTitle}>01. Corporate & Factory Offices</span>
                    {openSections.offices ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.offices && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Company Legal Name</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.companyName || 'MAGIC GLASS PRIVATE LIMITED'}
                          onChange={(e) => handleFieldChange('companyName', e.target.value)}
                        />
                      </div>

                      <div style={{ padding: 10, background: '#0e1726', borderRadius: 6, marginBottom: 10 }}>
                        <div style={{ fontSize: '11px', color: '#c5a880', fontWeight: 600, marginBottom: 6 }}>
                          CORPORATE OFFICE
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Heading</label>
                          <input
                            type="text"
                            className={styles.inputControl}
                            value={data?.corporateOffice?.heading || 'CORPORATE OFFICE'}
                            onChange={(e) => handleFieldChange('corporateOffice.heading', e.target.value)}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Address</label>
                          <textarea
                            rows={3}
                            className={styles.inputControl}
                            value={data?.corporateOffice?.address || ''}
                            onChange={(e) => handleFieldChange('corporateOffice.address', e.target.value)}
                          />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Phone</label>
                            <input
                              type="text"
                              className={styles.inputControl}
                              value={data?.corporateOffice?.phone || ''}
                              onChange={(e) => handleFieldChange('corporateOffice.phone', e.target.value)}
                            />
                          </div>
                          <div className={styles.fieldGroup}>
                            <label className={styles.fieldLabel}>Email</label>
                            <input
                              type="text"
                              className={styles.inputControl}
                              value={data?.corporateOffice?.email || ''}
                              onChange={(e) => handleFieldChange('corporateOffice.email', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: 10, background: '#0e1726', borderRadius: 6 }}>
                        <div style={{ fontSize: '11px', color: '#c5a880', fontWeight: 600, marginBottom: 6 }}>
                          FACTORY OFFICE
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Heading</label>
                          <input
                            type="text"
                            className={styles.inputControl}
                            value={data?.factoryOffice?.heading || 'FACTORY OFFICE'}
                            onChange={(e) => handleFieldChange('factoryOffice.heading', e.target.value)}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Address</label>
                          <textarea
                            rows={3}
                            className={styles.inputControl}
                            value={data?.factoryOffice?.address || ''}
                            onChange={(e) => handleFieldChange('factoryOffice.address', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('links')}>
                    <span className={styles.accordionTitle}>02. Links, Tagline & Wordmark</span>
                    {openSections.links ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.links && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Copyright Text</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.copyrightText || ''}
                          onChange={(e) => handleFieldChange('copyrightText', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>City / Bottom Tagline</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.cityTagline || 'Pune, Maharashtra, India • Premier Architectural Glass Processing'}
                          onChange={(e) => handleFieldChange('cityTagline', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Giant Wordmark Text</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.wordmarkText || 'MAGIC GLASS'}
                          onChange={(e) => handleFieldChange('wordmarkText', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================================= */}
            {/* 9. HOMEPAGE GLOBAL (Trust Partners & Testimonials)            */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'home-page' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('hero')}>
                    <span className={styles.accordionTitle}>01. Hero & Heritage</span>
                    {openSections.hero ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.hero && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Hero Heading</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.hero?.heading || ''}
                          onChange={(e) => handleFieldChange('hero.heading', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Heritage Statement</label>
                        <textarea
                          rows={3}
                          className={styles.inputControl}
                          value={data?.heritage?.statementText || ''}
                          onChange={(e) => handleFieldChange('heritage.statementText', e.target.value)}
                        />
                      </div>
                      {renderMediaControl(
                        'Hero Background Image',
                        'hero.bgImageUrl',
                        data?.hero?.bgImageUrl || data?.hero?.bgImage?.url || ''
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('partners')}>
                    <span className={styles.accordionTitle}>02. Trusted Partners (Logos & Text Fallbacks)</span>
                    {openSections.partners ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.partners && (
                    <div className={styles.accordionBody}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <label className={styles.fieldLabel} style={{ margin: 0 }}>Partner Brands List</label>
                        <button
                          type="button"
                          className={styles.actionIconBtn}
                          onClick={() => {
                            const current = Array.isArray(data?.trustBanner?.partners) ? [...data.trustBanner.partners] : []
                            current.push({ name: 'New Partner Name', logoUrl: '' })
                            handleFieldChange('trustBanner.partners', current)
                          }}
                        >
                          <FiPlus size={12} /> Add Partner
                        </button>
                      </div>

                      {Array.isArray(data?.trustBanner?.partners) &&
                        data.trustBanner.partners.map((partner: any, pIdx: number) => (
                          <div key={pIdx} style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center' }}>
                            <input
                              type="text"
                              className={styles.inputControl}
                              style={{ flex: 1.5 }}
                              value={partner.name || ''}
                              onChange={(e) => {
                                const updated = [...data.trustBanner.partners]
                                updated[pIdx].name = e.target.value
                                handleFieldChange('trustBanner.partners', updated)
                              }}
                              placeholder="Partner Name (e.g. Godrej Properties)"
                            />
                            <button
                              type="button"
                              className={styles.mediaPickBtn}
                              style={{ width: 'auto', padding: '6px 10px', height: '36px' }}
                              onClick={() => openMediaPicker(`trustBanner.partners.${pIdx}.logoUrl`, partner.logoUrl || '')}
                            >
                              <FiFolder size={12} /> Logo
                            </button>
                            <button
                              type="button"
                              className={styles.deleteIconBtn}
                              onClick={() => {
                                const updated = data.trustBanner.partners.filter((_: any, i: number) => i !== pIdx)
                                handleFieldChange('trustBanner.partners', updated)
                              }}
                            >
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('testimonials')}>
                    <span className={styles.accordionTitle}>03. Client Testimonials</span>
                    {openSections.testimonials ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.testimonials && (
                    <div className={styles.accordionBody}>
                      {Array.isArray(data?.testimonials) &&
                        data.testimonials.map((t: any, tIdx: number) => (
                          <div key={tIdx} style={{ padding: 10, background: '#0e1726', borderRadius: 6, marginBottom: 10 }}>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Author / Client Name</label>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={t.author || ''}
                                onChange={(e) => {
                                  const updated = [...data.testimonials]
                                  updated[tIdx].author = e.target.value
                                  handleFieldChange('testimonials', updated)
                                }}
                              />
                            </div>
                            <div className={styles.fieldGroup}>
                              <label className={styles.fieldLabel}>Client Quote</label>
                              <textarea
                                rows={2}
                                className={styles.inputControl}
                                value={t.quote || ''}
                                onChange={(e) => {
                                  const updated = [...data.testimonials]
                                  updated[tIdx].quote = e.target.value
                                  handleFieldChange('testimonials', updated)
                                }}
                              />
                            </div>
                            {renderMediaControl(
                              `Avatar / Project Photo`,
                              `testimonials.${tIdx}.avatarUrl`,
                              t.avatarUrl || t.avatar?.url || ''
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================================= */}
            {/* 10. HEADER & LOADER GLOBAL                                    */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'header' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('hero')}>
                    <span className={styles.accordionTitle}>01. Logo Asset</span>
                    {openSections.hero ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.hero && (
                    <div className={styles.accordionBody}>
                      {renderMediaControl(
                        'Header Brand Logo',
                        'logoUrl',
                        data?.logoUrl || data?.logo?.url || '/images/logo.png'
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('navLinks')}>
                    <span className={styles.accordionTitle}>02. Main Navigation Links</span>
                    {openSections.navLinks ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.navLinks && (
                    <div className={styles.accordionBody}>
                      {Array.isArray(data?.navLinks) &&
                        data.navLinks.map((link: any, lIdx: number) => (
                          <div key={lIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 36px', gap: 6, marginBottom: 6 }}>
                            <input
                              type="text"
                              className={styles.inputControl}
                              value={link.label || ''}
                              onChange={(e) => {
                                const updated = [...data.navLinks]
                                updated[lIdx].label = e.target.value
                                handleFieldChange('navLinks', updated)
                              }}
                              placeholder="Label (e.g. Products)"
                            />
                            <input
                              type="text"
                              className={styles.inputControl}
                              value={link.href || ''}
                              onChange={(e) => {
                                const updated = [...data.navLinks]
                                updated[lIdx].href = e.target.value
                                handleFieldChange('navLinks', updated)
                              }}
                              placeholder="Href (e.g. /products)"
                            />
                            <button
                              type="button"
                              className={styles.deleteIconBtn}
                              onClick={() => {
                                const updated = data.navLinks.filter((_: any, i: number) => i !== lIdx)
                                handleFieldChange('navLinks', updated)
                              }}
                            >
                              <FiTrash2 size={13} />
                            </button>
                          </div>
                        ))}
                      <button
                        type="button"
                        className={styles.actionIconBtn}
                        style={{ marginTop: 8 }}
                        onClick={() => {
                          const current = Array.isArray(data?.navLinks) ? [...data.navLinks] : []
                          current.push({ label: 'New Link', href: '/' })
                          handleFieldChange('navLinks', current)
                        }}
                      >
                        <FiPlus size={12} /> Add Link
                      </button>
                    </div>
                  )}
                </div>

                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('loader')}>
                    <span className={styles.accordionTitle}>03. Startup Animation & Loader</span>
                    {openSections.loader ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.loader && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Brand Tag</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.loaderBrandTag || '◆ MAGIC GLASS'}
                          onChange={(e) => handleFieldChange('loaderBrandTag', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Brand Title</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.loaderBrandTitle || 'ARCHITECTURAL GLAZING'}
                          onChange={(e) => handleFieldChange('loaderBrandTitle', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Status Message</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.loaderStatusText || 'INITIALIZING EXPERIENCE'}
                          onChange={(e) => handleFieldChange('loaderStatusText', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Est. Year</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.loaderEstYear || 'EST. 2006'}
                          onChange={(e) => handleFieldChange('loaderEstYear', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ============================================================= */}
            {/* 11. QUOTE DRAWER GLOBAL                                       */}
            {/* ============================================================= */}
            {activePage.cmsSlug === 'quote-drawer' && (
              <>
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('quoteOptions')}>
                    <span className={styles.accordionTitle}>01. Project Categories & Glass Types</span>
                    {openSections.quoteOptions ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.quoteOptions && (
                    <div className={styles.accordionBody}>
                      <div className={styles.fieldGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <label className={styles.fieldLabel} style={{ margin: 0 }}>Project Categories</label>
                          <button
                            type="button"
                            className={styles.actionIconBtn}
                            onClick={() => {
                              const current = Array.isArray(data?.projectCategories) ? [...data.projectCategories] : []
                              current.push({ label: 'New Project Category' })
                              handleFieldChange('projectCategories', current)
                            }}
                          >
                            <FiPlus size={12} /> Add
                          </button>
                        </div>
                        {Array.isArray(data?.projectCategories) &&
                          data.projectCategories.map((c: any, cIdx: number) => (
                            <div key={cIdx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={typeof c === 'string' ? c : c.label || ''}
                                onChange={(e) => {
                                  const updated = [...data.projectCategories]
                                  updated[cIdx] = { label: e.target.value }
                                  handleFieldChange('projectCategories', updated)
                                }}
                              />
                              <button
                                type="button"
                                className={styles.deleteIconBtn}
                                onClick={() => {
                                  const updated = data.projectCategories.filter((_: any, i: number) => i !== cIdx)
                                  handleFieldChange('projectCategories', updated)
                                }}
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          ))}
                      </div>

                      <div className={styles.fieldGroup} style={{ marginTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <label className={styles.fieldLabel} style={{ margin: 0 }}>Glass Solutions Selection</label>
                          <button
                            type="button"
                            className={styles.actionIconBtn}
                            onClick={() => {
                              const current = Array.isArray(data?.glassTypes) ? [...data.glassTypes] : []
                              current.push({ label: 'New Glass Solution' })
                              handleFieldChange('glassTypes', current)
                            }}
                          >
                            <FiPlus size={12} /> Add
                          </button>
                        </div>
                        {Array.isArray(data?.glassTypes) &&
                          data.glassTypes.map((g: any, gIdx: number) => (
                            <div key={gIdx} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                              <input
                                type="text"
                                className={styles.inputControl}
                                value={typeof g === 'string' ? g : g.label || ''}
                                onChange={(e) => {
                                  const updated = [...data.glassTypes]
                                  updated[gIdx] = { label: e.target.value }
                                  handleFieldChange('glassTypes', updated)
                                }}
                              />
                              <button
                                type="button"
                                className={styles.deleteIconBtn}
                                onClick={() => {
                                  const updated = data.glassTypes.filter((_: any, i: number) => i !== gIdx)
                                  handleFieldChange('glassTypes', updated)
                                }}
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          ))}
                      </div>

                      <div className={styles.fieldGroup} style={{ marginTop: 16 }}>
                        <label className={styles.fieldLabel}>CAD Dropzone Prompt</label>
                        <input
                          type="text"
                          className={styles.inputControl}
                          value={data?.cadDropzoneText || ''}
                          onChange={(e) => handleFieldChange('cadDropzoneText', e.target.value)}
                        />
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Submission Notice</label>
                        <textarea
                          rows={2}
                          className={styles.inputControl}
                          value={data?.submissionNotice || ''}
                          onChange={(e) => handleFieldChange('submissionNotice', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </aside>

      <MediaPickerModal
        isOpen={Boolean(pickerTarget)}
        currentValue={pickerTarget?.currentValue || ''}
        onSelect={handleMediaSelect}
        onClose={() => setPickerTarget(null)}
      />

      <ProjectCreateModal
        isOpen={isProjectCreateModalOpen}
        onClose={() => setIsProjectCreateModalOpen(false)}
        onCreated={() => {
          fetchData()
          onRefreshIframe()
        }}
      />
    </>
  )
}
