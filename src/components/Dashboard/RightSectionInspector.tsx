'use client'

import React, { useState, useEffect, useTransition } from 'react'
import styles from './Dashboard.module.css'
import { PageRoute } from './LeftPageNav'
import { MediaPickerModal } from './MediaPickerModal'
import { ProjectCreateModal } from './ProjectCreateModal'
import { ALL_PRODUCTS } from '@/components/ProductsCollection/products.data'
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
  FiStar,
  FiX,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
} from 'react-icons/fi'

const DragHandleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="5" cy="3" r="1.5" />
    <circle cx="11" cy="3" r="1.5" />
    <circle cx="5" cy="8" r="1.5" />
    <circle cx="11" cy="8" r="1.5" />
    <circle cx="5" cy="13" r="1.5" />
    <circle cx="11" cy="13" r="1.5" />
  </svg>
)

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
  const [pickerTarget, setPickerTarget] = useState<{
    fieldPath: string
    currentValue: string
    isMultiple?: boolean
    currentValues?: string[]
  } | null>(null)

  // Project Portfolio state
  const [projectsList, setProjectsList] = useState<any[]>([])
  const [projectFilterCategory, setProjectFilterCategory] = useState<string>('ALL')
  const [projectSearchQuery, setProjectSearchQuery] = useState<string>('')
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null)
  const [isProjectCreateModalOpen, setIsProjectCreateModalOpen] = useState<boolean>(false)
  const [draggedProjectSlug, setDraggedProjectSlug] = useState<string | null>(null)
  const [dragOverProjectSlug, setDragOverProjectSlug] = useState<string | null>(null)
  const [dragDropPosition, setDragDropPosition] = useState<'top' | 'bottom' | null>(null)
  const [isDraggingActive, setIsDraggingActive] = useState<boolean>(false)
  const [isReordering, setIsReordering] = useState<boolean>(false)
  const dragEndTimerRef = React.useRef<any>(null)

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }))
  }

  // Available Products Catalog state for Featured Products selection
  const [availableProducts, setAvailableProducts] = useState<any[]>([])

  const fetchAvailableProducts = async () => {
    try {
      const res = await fetch('/api/cms/get?type=collection&slug=products')
      const json = await res.json()
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setAvailableProducts(json.data)
      } else {
        setAvailableProducts(
          ALL_PRODUCTS.map((p) => ({
            id: p.id,
            slug: p.id,
            title: p.title,
            category: p.categoryLabel,
            introSummary: p.description,
            heroImageUrl: p.image,
          }))
        )
      }
    } catch {
      setAvailableProducts(
        ALL_PRODUCTS.map((p) => ({
          id: p.id,
          slug: p.id,
          title: p.title,
          category: p.categoryLabel,
          introSummary: p.description,
          heroImageUrl: p.image,
        }))
      )
    }
  }

  // Available Projects Portfolio state for Relation Selectors
  const [availableProjects, setAvailableProjects] = useState<any[]>([])

  const fetchAvailableProjects = async () => {
    try {
      const res = await fetch('/api/cms/get?type=collection&slug=projects')
      const json = await res.json()
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setAvailableProjects(json.data)
      } else {
        const fallback = (await import('@/data/projects_mock.json')).default
        setAvailableProjects(fallback)
      }
    } catch {
      try {
        const fallback = (await import('@/data/projects_mock.json')).default
        setAvailableProjects(fallback)
      } catch {
        // ignore
      }
    }
  }

  // Fetch CMS data whenever activePage changes
  const fetchData = async () => {
    setLoading(true)
    setFeedback(null)
    fetchAvailableProducts()
    fetchAvailableProjects()
    try {
      if (activePage.cmsSlug === 'projects' && activePage.cmsType === 'collection') {
        const res = await fetch('/api/cms/get?type=collection&slug=projects')
        const json = await res.json()
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProjectsList(json.data)
          setData(json.data)
        } else {
          // If API returns empty or error, fallback to local projects mock
          const fallback = (await import('@/data/projects_mock.json')).default
          const list = fallback.map((p: any, idx: number) => ({
            id: p.id || p.slug,
            slug: p.slug || p.id,
            title: p.title,
            category: p.category,
            developer: p.developer || '',
            location: p.location || '',
            application: p.application || '',
            glassDescription: p.glassDescription || '',
            areaSqMtr: p.areaSqMtr || 0,
            imageUrl: p.image || '/images/projects/balmoral-by-riverside.jpg',
            heroFeatured: Boolean(p.heroFeatured),
            tagline: p.tagline || '',
            order: idx + 1,
          }))
          setProjectsList(list)
          setData(list)
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
      if (activePage.cmsSlug === 'projects' && activePage.cmsType === 'collection') {
        try {
          const fallback = (await import('@/data/projects_mock.json')).default
          const list = fallback.map((p: any, idx: number) => ({
            id: p.id || p.slug,
            slug: p.slug || p.id,
            title: p.title,
            category: p.category,
            developer: p.developer || '',
            location: p.location || '',
            application: p.application || '',
            glassDescription: p.glassDescription || '',
            areaSqMtr: p.areaSqMtr || 0,
            imageUrl: p.image || '/images/projects/balmoral-by-riverside.jpg',
            heroFeatured: Boolean(p.heroFeatured),
            tagline: p.tagline || '',
            order: idx + 1,
          }))
          setProjectsList(list)
          setData(list)
        } catch {
          setFeedback({ type: 'error', message: err.message || 'Network error fetching data' })
        }
      } else {
        setFeedback({ type: 'error', message: err.message || 'Network error fetching data' })
      }
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
        const k = keys[i]
        const nextK = keys[i + 1]
        if (!current[k]) {
          current[k] = !isNaN(Number(nextK)) ? [] : {}
        }
        current = current[k]
      }
      const lastKey = keys[keys.length - 1]
      current[lastKey] = val

      // If updating an ImageUrl field, clear the companion upload relation field so it doesn't shadow the new URL
      const companionMap: Record<string, string> = {
        heroImageUrl: 'heroImage',
        facilityImageUrl: 'facilityImage',
        bgImageUrl: 'bgImage',
        imageUrl: 'image',
        featuredImageUrl: 'featuredImage',
        portraitUrl: 'portrait',
        avatarUrl: 'avatar',
        logoUrl: 'logo',
        src: 'image',
      }
      if (companionMap[lastKey] && current[companionMap[lastKey]] !== undefined) {
        current[companionMap[lastKey]] = null
      }

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
  const openMediaPicker = (
    fieldPath: string,
    currentValue: string,
    isMultiple = false,
    currentValues: string[] = []
  ) => {
    setPickerTarget({ fieldPath, currentValue, isMultiple, currentValues })
  }

  const handleMediaSelect = (selectedUrl: string) => {
    if (pickerTarget) {
      // 1. Projects portfolio single-item showcase asset
      if (
        pickerTarget.fieldPath.startsWith('projects.') ||
        /^\d+\.(imageUrl|image)$/.test(pickerTarget.fieldPath) ||
        (activePage.cmsSlug === 'projects' && pickerTarget.fieldPath.endsWith('.imageUrl'))
      ) {
        let targetIdx = -1
        if (pickerTarget.fieldPath.startsWith('projects.')) {
          const slug = pickerTarget.fieldPath.replace(/^projects\./, '').replace(/\.(imageUrl|image)$/, '')
          targetIdx = projectsList.findIndex((p) => p.slug === slug)
        } else if (/^\d+\.(imageUrl|image)$/.test(pickerTarget.fieldPath)) {
          targetIdx = parseInt(pickerTarget.fieldPath.split('.')[0], 10)
        }

        if (targetIdx >= 0 && targetIdx < projectsList.length) {
          const updated = [...projectsList]
          updated[targetIdx] = {
            ...updated[targetIdx],
            imageUrl: selectedUrl,
            image: null,
          }
          setProjectsList(updated)
          setData(updated)
          setPickerTarget(null)
          return
        }
      }

      if (pickerTarget.fieldPath.includes('.__append_image__')) {
        const parts = pickerTarget.fieldPath.split('.')
        const fieldName = parts[0]
        const idx = parseInt(parts[1], 10)
        if (!isNaN(idx) && Array.isArray(data?.[fieldName])) {
          const updated = [...data[fieldName]]
          const existing = updated[idx] || {}
          const currentList = Array.isArray(existing.images) && existing.images.length > 0
            ? existing.images.map((im: any) => typeof im === 'string' ? im : im.imageUrl || im.image?.url || '').filter(Boolean)
            : (existing.imageUrl ? [existing.imageUrl] : [])
          if (!currentList.includes(selectedUrl)) {
            currentList.push(selectedUrl)
          }
          updated[idx] = {
            ...existing,
            imageUrl: currentList[0] || '',
            image: null,
            images: currentList.map((u: string) => ({ imageUrl: u, image: null })),
          }
          handleFieldChange(fieldName, updated)
        }
      } else if (pickerTarget.fieldPath.includes('.images.') && pickerTarget.fieldPath.includes('.imageUrl')) {
        const parts = pickerTarget.fieldPath.split('.')
        const fieldName = parts[0]
        const idx = parseInt(parts[1], 10)
        const imgIdx = parseInt(parts[3], 10)
        if (!isNaN(idx) && !isNaN(imgIdx) && Array.isArray(data?.[fieldName])) {
          const updated = [...data[fieldName]]
          const existing = updated[idx] || {}
          const currentList = Array.isArray(existing.images) && existing.images.length > 0
            ? existing.images.map((im: any) => typeof im === 'string' ? im : im.imageUrl || im.image?.url || '').filter(Boolean)
            : (existing.imageUrl ? [existing.imageUrl] : [])
          currentList[imgIdx] = selectedUrl
          updated[idx] = {
            ...existing,
            imageUrl: currentList[0] || '',
            image: null,
            images: currentList.map((u: string) => ({ imageUrl: u, image: null })),
          }
          handleFieldChange(fieldName, updated)
        }
      } else {
        handleFieldChange(pickerTarget.fieldPath, selectedUrl)
      }
      setPickerTarget(null)
    }
  }

  const handleMediaSelectMultiple = (selectedUrls: string[]) => {
    if (pickerTarget) {
      if (pickerTarget.fieldPath.includes('.__multi_images__')) {
        const parts = pickerTarget.fieldPath.split('.')
        const fieldName = parts[0]
        const idx = parseInt(parts[1], 10)
        if (!isNaN(idx) && Array.isArray(data?.[fieldName])) {
          const updated = [...data[fieldName]]
          const existing = updated[idx] || {}
          updated[idx] = {
            ...existing,
            imageUrl: selectedUrls[0] || '',
            image: null,
            images: selectedUrls.map((u) => ({ imageUrl: u, image: null })),
          }
          handleFieldChange(fieldName, updated)
        }
      } else if (pickerTarget.fieldPath === 'sliderImages.__multi_append__') {
        const existing = Array.isArray(data?.sliderImages) ? [...data.sliderImages] : []
        const pool = projectsList.length > 0 ? projectsList : availableProjects
        selectedUrls.forEach((url) => {
          const matchedProj = pool.find((p: any) =>
            (p.imageUrl && p.imageUrl === url) || (p.image?.url && p.image.url === url)
          )
          if (matchedProj) {
            existing.push({
              slug: matchedProj.slug || matchedProj.id,
              title: matchedProj.title || '',
              developer: matchedProj.developer || '',
              location: matchedProj.location || '',
              category: matchedProj.category || '',
              src: url,
            })
          } else {
            existing.push({
              title: '',
              developer: '',
              location: '',
              category: '',
              src: url,
            })
          }
        })
        handleFieldChange('sliderImages', existing)
      } else if (pickerTarget.fieldPath === 'galleryImages.__multi_append__') {
        const existing = Array.isArray(data?.galleryImages) ? [...data.galleryImages] : []
        selectedUrls.forEach((url) => {
          existing.push({
            title: 'APPLICATION',
            src: url,
          })
        })
        handleFieldChange('galleryImages', existing)
      } else {
        handleFieldChange(pickerTarget.fieldPath, selectedUrls)
      }
      setPickerTarget(null)
    }
  }

  // Helper to render a multi-image picker and gallery manager for cards
  const renderMultiMediaControl = (
    label: string,
    itemIdx: number,
    item: any,
    fieldName = 'industries'
  ) => {
    const currentImages: string[] = []
    if (Array.isArray(item.images) && item.images.length > 0) {
      item.images.forEach((im: any) => {
        const u = typeof im === 'string' ? im : im?.imageUrl || im?.image?.url || ''
        if (u && !currentImages.includes(u)) currentImages.push(u)
      })
    }
    if (currentImages.length === 0 && (item.imageUrl || item.image?.url)) {
      currentImages.push(item.imageUrl || item.image?.url)
    }

    const updateItemImages = (newImagesList: string[]) => {
      const updated = [...(data?.[fieldName] || [])]
      const existing = updated[itemIdx] || {}
      updated[itemIdx] = {
        ...existing,
        imageUrl: newImagesList[0] || '',
        image: null,
        images: newImagesList.map((u) => ({ imageUrl: u, image: null })),
      }
      handleFieldChange(fieldName, updated)
    }

    const handleRemoveImage = (imgIdx: number) => {
      const next = currentImages.filter((_, i) => i !== imgIdx)
      updateItemImages(next)
    }

    const handleMoveImage = (fromIdx: number, toIdx: number) => {
      if (toIdx < 0 || toIdx >= currentImages.length) return
      const next = [...currentImages]
      const [moved] = next.splice(fromIdx, 1)
      next.splice(toIdx, 0, moved)
      updateItemImages(next)
    }

    return (
      <div className={styles.fieldGroup} style={{ marginTop: '14px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <label className={styles.fieldLabel} style={{ margin: 0, fontWeight: 600, color: '#f1f5f9' }}>
              {label}
            </label>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              {currentImages.length > 1
                ? `✓ ${currentImages.length} images selected (multi-image carousel active)`
                : currentImages.length === 1
                ? '1 image selected (add more to enable card carousel)'
                : 'No image selected'}
            </div>
          </div>
          <button
            type="button"
            className={styles.actionIconBtn}
            onClick={() =>
              openMediaPicker(
                `${fieldName}.${itemIdx}.__multi_images__`,
                currentImages[0] || '',
                true,
                currentImages
              )
            }
            style={{ padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <FiFolder size={12} /> Choose Multiple
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {currentImages.map((imgUrl, imgIdx) => (
            <div
              key={imgIdx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 10px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: imgIdx === 0 ? '1px solid rgba(197, 168, 128, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                  background: '#1e293b',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl}
                  alt={`Photo ${imgIdx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '4px',
                      background: imgIdx === 0 ? 'rgba(197, 168, 128, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      color: imgIdx === 0 ? '#c5a880' : '#94a3b8',
                    }}
                  >
                    {imgIdx === 0 ? '★ Primary Cover' : `Slide ${imgIdx + 1}`}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginTop: '2px',
                  }}
                  title={imgUrl}
                >
                  {imgUrl}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                {imgIdx > 0 && (
                  <button
                    type="button"
                    title="Move up"
                    onClick={() => handleMoveImage(imgIdx, imgIdx - 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '3px 5px',
                      fontSize: '11px',
                    }}
                  >
                    ▲
                  </button>
                )}
                {imgIdx < currentImages.length - 1 && (
                  <button
                    type="button"
                    title="Move down"
                    onClick={() => handleMoveImage(imgIdx, imgIdx + 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '3px 5px',
                      fontSize: '11px',
                    }}
                  >
                    ▼
                  </button>
                )}
                <button
                  type="button"
                  className={styles.mediaPickBtn}
                  onClick={() =>
                    openMediaPicker(
                      `${fieldName}.${itemIdx}.images.${imgIdx}.imageUrl`,
                      imgUrl
                    )
                  }
                  style={{ padding: '3px 8px', fontSize: '11px' }}
                >
                  <FiFolder size={11} /> Replace
                </button>
                <button
                  type="button"
                  className={styles.deleteIconBtn}
                  onClick={() => handleRemoveImage(imgIdx)}
                  title="Remove image"
                  style={{ padding: '3px 6px' }}
                >
                  <FiTrash2 size={12} />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              openMediaPicker(`${fieldName}.${itemIdx}.__append_image__`, '')
            }}
            style={{
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              color: '#c5a880',
              fontSize: '11px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '4px',
              transition: 'all 0.2s ease',
            }}
          >
            <FiPlus size={12} /> + Add Another Photo
          </button>
        </div>
      </div>
    )
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

  const handleReorderProjects = async (
    draggedSlug: string,
    targetSlug: string,
    position: 'top' | 'bottom'
  ) => {
    if (draggedSlug === targetSlug) return
    const fromIdx = projectsList.findIndex((p) => p.slug === draggedSlug)
    const toIdx = projectsList.findIndex((p) => p.slug === targetSlug)
    if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return

    const list = [...projectsList]
    const [draggedItem] = list.splice(fromIdx, 1)

    let insertIdx = list.findIndex((p) => p.slug === targetSlug)
    if (position === 'bottom') {
      insertIdx += 1
    }
    list.splice(insertIdx, 0, draggedItem)

    const updatedWithOrder = list.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }))

    setProjectsList(updatedWithOrder)
    setData(updatedWithOrder)

    // Auto-save reordered sequence to database
    setIsReordering(true)
    setFeedback({ type: 'success', message: 'Saving new project sequence...' })
    try {
      const res = await fetch('/api/cms/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reorder',
          type: 'collection',
          slug: 'projects',
          orderList: updatedWithOrder.map((p, idx) => ({
            slug: p.slug,
            id: p.id,
            order: idx + 1,
          })),
          pathToRevalidate: '/projects',
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({
          type: 'success',
          message: `Sequence updated! Moved "${draggedItem.title}" to position #${insertIdx + 1}.`,
        })
        onRefreshIframe()
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to save reordered sequence' })
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Error updating sequence' })
    } finally {
      setIsReordering(false)
    }
  }

  const handleMoveProjectByOne = async (slug: string, direction: -1 | 1) => {
    const currentIdx = projectsList.findIndex((p) => p.slug === slug)
    if (currentIdx === -1) return
    const targetIdx = currentIdx + direction
    if (targetIdx < 0 || targetIdx >= projectsList.length) return

    const list = [...projectsList]
    const [moved] = list.splice(currentIdx, 1)
    list.splice(targetIdx, 0, moved)

    const updatedWithOrder = list.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }))

    setProjectsList(updatedWithOrder)
    setData(updatedWithOrder)

    setIsReordering(true)
    setFeedback({ type: 'success', message: `Saving position for "${moved.title}"...` })
    try {
      const res = await fetch('/api/cms/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reorder',
          type: 'collection',
          slug: 'projects',
          orderList: updatedWithOrder.map((p, idx) => ({
            slug: p.slug,
            id: p.id,
            order: idx + 1,
          })),
          pathToRevalidate: '/projects',
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({
          type: 'success',
          message: `Position updated! "${moved.title}" is now #${targetIdx + 1}.`,
        })
        onRefreshIframe()
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to save position' })
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Error updating position' })
    } finally {
      setIsReordering(false)
    }
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
            className={`${styles.feedbackToast} ${feedback.type === 'success' ? styles.toastSuccess : styles.toastError
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
                      <div
                        className={styles.fieldGroup}
                        style={{
                          background: 'rgba(37, 99, 235, 0.08)',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          marginBottom: '12px',
                        }}
                      >
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            margin: 0,
                            fontWeight: 600,
                            color: data?.isFeatured ? '#60a5fa' : '#94a3b8',
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={Boolean(data?.isFeatured)}
                            onChange={(e) => handleFieldChange('isFeatured', e.target.checked)}
                            style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                          />
                          <span>★ Mark as Featured Architectural Product</span>
                        </label>
                      </div>

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
                            value={data?.category || 'toughened'}
                            onChange={(e) => handleFieldChange('category', e.target.value)}
                          >
                            <option value="toughened">Toughened Glass</option>
                            <option value="laminated">Laminated Glass</option>
                            <option value="insulated">Insulated Glass</option>
                            <option value="reflective">Reflective Glass</option>
                            <option value="other">Other Glass</option>
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

                {/* =========================================================================
                    TEMPORARILY COMMENTED OUT: Removed from frontend PDP layout
                    04. Glass Applications Gallery (galleryTitle, galleryImages)
                    To restore, uncomment this block.
                    ========================================================================= */}
                {/*
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
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button
                              type="button"
                              className={styles.actionIconBtn}
                              onClick={() => {
                                openMediaPicker('galleryImages.__multi_append__', '', true, [])
                              }}
                              style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                            >
                              <FiFolder size={12} /> Choose Multiple
                            </button>
                            <button
                              type="button"
                              className={styles.actionIconBtn}
                              onClick={() => {
                                const existing = Array.isArray(data?.galleryImages) ? [...data.galleryImages] : []
                                existing.push({ title: 'NEW APPLICATION', src: '/images/products/details/partitions.png' })
                                handleFieldChange('galleryImages', existing)
                              }}
                            >
                              <FiPlus size={12} /> Add Card
                            </button>
                          </div>
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
                */}

                {/* 04. FEATURED INSTALLATIONS SLIDER (RELATION-BASED) */}
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('discover')}>
                    <span className={styles.accordionTitle}>04. Featured Installations Slider</span>
                    {openSections.discover ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.discover && (
                    <div className={styles.accordionBody}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <label className={styles.fieldLabel} style={{ margin: 0 }}>Featured Installation Slides</label>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            type="button"
                            className={styles.actionIconBtn}
                            onClick={() => {
                              openMediaPicker('sliderImages.__multi_append__', '', true, [])
                            }}
                            style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                          >
                            <FiFolder size={12} /> Choose Multiple
                          </button>
                          <button
                            type="button"
                            className={styles.actionIconBtn}
                            onClick={() => {
                              const existing = Array.isArray(data?.sliderImages) ? [...data.sliderImages] : []
                              const pool = projectsList.length > 0 ? projectsList : availableProjects
                              const firstProj = pool[0]
                              if (firstProj) {
                                existing.push({
                                  slug: firstProj.slug || firstProj.id,
                                  title: firstProj.title || '',
                                  developer: firstProj.developer || '',
                                  location: firstProj.location || '',
                                  category: firstProj.category || '',
                                  src: firstProj.imageUrl || firstProj.image?.url || firstProj.image || '/images/hero-bg.jpg',
                                })
                              } else {
                                existing.push({ src: '/images/hero-bg.jpg' })
                              }
                              handleFieldChange('sliderImages', existing)
                            }}
                          >
                            <FiPlus size={12} /> Add Installation
                          </button>
                        </div>
                      </div>

                      {Array.isArray(data?.sliderImages) &&
                        data.sliderImages.map((sItem: any, sIdx: number) => {
                          const pool = projectsList.length > 0 ? projectsList : availableProjects
                          const currentSlug = typeof sItem === 'object' ? (sItem.slug || sItem.id || '') : ''
                          const matchedProject = pool.find((p: any) =>
                            (currentSlug && (p.slug === currentSlug || p.id === currentSlug)) ||
                            (sItem?.title && p.title && p.title.trim().toLowerCase() === sItem.title.trim().toLowerCase())
                          )

                          return (
                            <div key={sIdx} style={{ padding: '12px', background: '#0e1726', borderRadius: 8, marginBottom: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: '11px', color: '#c5a880', fontWeight: 600 }}>
                                  Slide {sIdx + 1} {matchedProject ? `• ${matchedProject.title}` : ''}
                                </span>
                                <button
                                  type="button"
                                  className={styles.deleteIconBtn}
                                  style={{ padding: '3px 6px' }}
                                  onClick={() => {
                                    const updated = data.sliderImages.filter((_: any, i: number) => i !== sIdx)
                                    handleFieldChange('sliderImages', updated)
                                  }}
                                  title="Remove slide"
                                >
                                  <FiTrash2 size={12} />
                                </button>
                              </div>

                              {/* Project Relation Dropdown */}
                              <div className={styles.fieldGroup} style={{ marginBottom: 10 }}>
                                <label className={styles.fieldLabel} style={{ color: '#60a5fa', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                                  <span>Select from Projects Portfolio</span>
                                  {matchedProject && (
                                    <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 500 }}>
                                      ✓ Linked: <code>{matchedProject.slug || matchedProject.id}</code>
                                    </span>
                                  )}
                                </label>
                                <select
                                  className={styles.productCatalogSelectControl}
                                  value={matchedProject?.slug || matchedProject?.id || currentSlug || ''}
                                  onChange={(e) => {
                                    const selectedSlug = e.target.value
                                    const chosen = pool.find((p: any) => p.slug === selectedSlug || p.id === selectedSlug)
                                    const updated = [...data.sliderImages]
                                    if (chosen) {
                                      updated[sIdx] = {
                                        ...(typeof sItem === 'string' ? {} : sItem),
                                        slug: chosen.slug || chosen.id,
                                        title: chosen.title || '',
                                        developer: chosen.developer || '',
                                        location: chosen.location || '',
                                        category: chosen.category || '',
                                        src: chosen.imageUrl || chosen.image?.url || chosen.image || (typeof sItem === 'object' ? sItem.src : sItem) || '',
                                      }
                                    } else {
                                      updated[sIdx] = {
                                        ...(typeof sItem === 'string' ? { src: sItem } : sItem),
                                        slug: '',
                                      }
                                    }
                                    handleFieldChange('sliderImages', updated)
                                  }}
                                >
                                  <option value="">-- Choose Project Record --</option>
                                  {pool.map((p: any) => (
                                    <option key={p.slug || p.id} value={p.slug || p.id}>
                                      {p.title} {p.category ? `• ${p.category}` : ''} {p.location ? `(${p.location})` : ''}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Display Title</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={typeof sItem === 'string' ? '' : sItem.title || ''}
                                  onChange={(e) => {
                                    const updated = [...data.sliderImages]
                                    updated[sIdx] = {
                                      ...(typeof sItem === 'string' ? { src: sItem } : sItem),
                                      title: e.target.value,
                                    }
                                    handleFieldChange('sliderImages', updated)
                                  }}
                                  placeholder="e.g. Balmoral by Riverside"
                                />
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Developer</label>
                                  <input
                                    type="text"
                                    className={styles.inputControl}
                                    value={typeof sItem === 'string' ? '' : sItem.developer || ''}
                                    onChange={(e) => {
                                      const updated = [...data.sliderImages]
                                      updated[sIdx] = {
                                        ...(typeof sItem === 'string' ? { src: sItem } : sItem),
                                        developer: e.target.value,
                                      }
                                      handleFieldChange('sliderImages', updated)
                                    }}
                                    placeholder="e.g. Kasturi Builder"
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Location</label>
                                  <input
                                    type="text"
                                    className={styles.inputControl}
                                    value={typeof sItem === 'string' ? '' : sItem.location || ''}
                                    onChange={(e) => {
                                      const updated = [...data.sliderImages]
                                      updated[sIdx] = {
                                        ...(typeof sItem === 'string' ? { src: sItem } : sItem),
                                        location: e.target.value,
                                      }
                                      handleFieldChange('sliderImages', updated)
                                    }}
                                    placeholder="e.g. Baner, Pune"
                                  />
                                </div>
                              </div>
                              {renderMediaControl(
                                `Slide Image ${sIdx + 1}`,
                                `sliderImages.${sIdx}.src`,
                                typeof sItem === 'string' ? sItem : sItem.src || sItem.image?.url || ''
                              )}
                            </div>
                          )
                        })}
                    </div>
                  )}
                </div>

                {/* =========================================================================
                    TEMPORARILY COMMENTED OUT: Removed from frontend PDP layout
                    06. Sector Focus / Our Industry (industries)
                    To restore, uncomment this block.
                    ========================================================================= */}
                {/*
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
                              imageUrl: '/images/products/details/architecture.png',
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
                */}

                {/* 05. RELATED PRODUCTS NAVIGATION (RELATION-BASED) */}
                <div className={styles.accordionCard}>
                  <div className={styles.accordionHeader} onClick={() => toggleSection('related')}>
                    <span className={styles.accordionTitle}>05. Related Products Navigation</span>
                    {openSections.related ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openSections.related && (
                    <div className={styles.accordionBody}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <label className={styles.fieldLabel} style={{ margin: 0 }}>Linked Related Products</label>
                        <button
                          type="button"
                          className={styles.actionIconBtn}
                          onClick={() => {
                            const existing = Array.isArray(data?.relatedProductSlugs) ? [...data.relatedProductSlugs] : []
                            const existingSlugs = existing.map((r: any) => typeof r === 'string' ? r : r.slug)
                            const selectable = availableProducts.filter(
                              (p: any) => (p.slug || p.id) !== activePage.itemSlug
                            )
                            const nextUnselected = selectable.find((p: any) => !existingSlugs.includes(p.slug || p.id))
                            const slugToUse = nextUnselected ? (nextUnselected.slug || nextUnselected.id) : (selectable[0]?.slug || selectable[0]?.id || '')
                            if (slugToUse) {
                              existing.push({ slug: slugToUse })
                              handleFieldChange('relatedProductSlugs', existing)
                            }
                          }}
                        >
                          <FiPlus size={12} /> Add Related
                        </button>
                      </div>
                      {Array.isArray(data?.relatedProductSlugs) &&
                        data.relatedProductSlugs.map((rItem: any, rIdx: number) => {
                          const currentSlug = typeof rItem === 'string' ? rItem : (rItem.slug || '')
                          const selectable = availableProducts.filter(
                            (p: any) => (p.slug || p.id) !== activePage.itemSlug
                          )

                          return (
                            <div key={rIdx} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                              <div style={{ flex: 1 }}>
                                <select
                                  className={styles.productCatalogSelectControl}
                                  value={currentSlug}
                                  onChange={(e) => {
                                    const updated = [...data.relatedProductSlugs]
                                    updated[rIdx] = { slug: e.target.value }
                                    handleFieldChange('relatedProductSlugs', updated)
                                  }}
                                >
                                  <option value="" disabled>-- Select a Related Product --</option>
                                  {selectable.map((prod: any) => {
                                    const pSlug = prod.slug || prod.id
                                    return (
                                      <option key={pSlug} value={pSlug}>
                                        {prod.title} {prod.category ? `(${prod.category})` : ''}
                                      </option>
                                    )
                                  })}
                                </select>
                              </div>
                              <button
                                type="button"
                                className={styles.deleteIconBtn}
                                onClick={() => {
                                  const updated = data.relatedProductSlugs.filter((_: any, i: number) => i !== rIdx)
                                  handleFieldChange('relatedProductSlugs', updated)
                                }}
                                title="Remove related product"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                          )
                        })}
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
                {/* 01. Hero Featured Projects Carousel Manager */}
                <div className={styles.heroProjectsManagerCard}>
                  <div className={styles.heroProjectsManagerHeader}>
                    <div className={styles.heroProjectsManagerTitle}>
                      <FiStar style={{ color: '#fbbf24' }} />
                      <span>Hero Section: Featured Projects Carousel</span>
                    </div>
                    <span className={styles.heroProjectsCountBadge}>
                      {projectsList.filter((p) => p.heroFeatured).length} Active in Hero
                    </span>
                  </div>

                  {/* Active Hero Projects Chips */}
                  <div className={styles.heroProjectsChipsList}>
                    {projectsList.filter((p) => p.heroFeatured).length === 0 ? (
                      <div style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
                        No projects currently marked as featured in hero. (First 4 projects will display as fallback).
                      </div>
                    ) : (
                      projectsList
                        .filter((p) => p.heroFeatured)
                        .map((fp) => {
                          const originalIdx = projectsList.findIndex((p) => p.slug === fp.slug)
                          return (
                            <div key={fp.slug} className={styles.heroProjectChip}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={
                                  fp.imageUrl ||
                                  fp.image?.url ||
                                  '/images/projects/balmoral-by-riverside.jpg'
                                }
                                alt={fp.title}
                                className={styles.heroProjectChipImg}
                              />
                              <span className={styles.heroProjectChipTitle} title={fp.title}>
                                {fp.title}
                              </span>
                              <button
                                type="button"
                                className={styles.heroProjectChipRemoveBtn}
                                title={`Remove "${fp.title}" from hero carousel`}
                                onClick={() => {
                                  if (originalIdx !== -1) {
                                    handleProjectFieldChange(originalIdx, 'heroFeatured', false)
                                  }
                                }}
                              >
                                <FiX size={13} />
                              </button>
                            </div>
                          )
                        })
                    )}
                  </div>

                  {/* Quick Add Dropdown */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select
                      className={styles.inputControl}
                      style={{
                        fontSize: '12px',
                        padding: '7px 10px',
                        background: '#09101f',
                        borderColor: '#c5a880',
                        color: '#f8fafc',
                      }}
                      value=""
                      onChange={(e) => {
                        const slugToAdd = e.target.value
                        if (!slugToAdd) return
                        const idx = projectsList.findIndex((p) => p.slug === slugToAdd)
                        if (idx !== -1) {
                          handleProjectFieldChange(idx, 'heroFeatured', true)
                        }
                      }}
                    >
                      <option value="">➕ Add Project to Hero Carousel...</option>
                      {projectsList
                        .filter((p) => !p.heroFeatured)
                        .map((p) => (
                          <option key={p.slug} value={p.slug}>
                            {p.title} ({p.category || 'Project'})
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

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

                <div className={styles.projectsSequencingNotice}>
                  <div className={styles.sequencingNoticeText}>
                    <span>✥</span>
                    <span>
                      <strong>Sequencing:</strong> Drag project cards or use arrows to reorder how projects appear across the website.
                    </span>
                  </div>
                  {isReordering && (
                    <span className={styles.reorderingStatusBadge}>
                      <FiRefreshCw className={styles.spinIcon} size={11} />
                      Saving order...
                    </span>
                  )}
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
                      const masterIdx = projectsList.findIndex((p) => p.slug === project.slug)
                      const actualIdx = masterIdx !== -1 ? masterIdx : pIdx
                      const isExpanded = expandedProjectId === project.slug || expandedProjectId === String(pIdx)
                      const sequenceNum = project.order || (actualIdx + 1)
                      const isDragging = draggedProjectSlug === project.slug
                      const isDragOver = dragOverProjectSlug === project.slug

                      return (
                        <div
                          key={project.slug || pIdx}
                          className={`${styles.projectCardItem} ${isDragging ? styles.isDragging : ''} ${isDragOver && dragDropPosition === 'top' ? styles.dragOverTop : ''
                            } ${isDragOver && dragDropPosition === 'bottom' ? styles.dragOverBottom : ''}`}
                          draggable={!isExpanded}
                          onDragStart={(e) => {
                            if (isExpanded) return
                            e.dataTransfer.setData('text/plain', project.slug)
                            e.dataTransfer.effectAllowed = 'move'
                            setDraggedProjectSlug(project.slug)
                            setIsDraggingActive(true)
                          }}
                          onDragOver={(e) => {
                            e.preventDefault()
                            e.dataTransfer.dropEffect = 'move'
                            if (draggedProjectSlug && draggedProjectSlug !== project.slug) {
                              const rect = e.currentTarget.getBoundingClientRect()
                              const offset = e.clientY - rect.top
                              const position = offset < rect.height / 2 ? 'top' : 'bottom'
                              setDragOverProjectSlug(project.slug)
                              setDragDropPosition(position)
                            }
                          }}
                          onDragLeave={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                              if (dragOverProjectSlug === project.slug) {
                                setDragOverProjectSlug(null)
                                setDragDropPosition(null)
                              }
                            }
                          }}
                          onDrop={(e) => {
                            e.preventDefault()
                            const draggedSlug = draggedProjectSlug || e.dataTransfer.getData('text/plain')
                            if (draggedSlug && draggedSlug !== project.slug) {
                              handleReorderProjects(draggedSlug, project.slug, dragDropPosition || 'bottom')
                            }
                            setDraggedProjectSlug(null)
                            setDragOverProjectSlug(null)
                            setDragDropPosition(null)
                          }}
                          onDragEnd={() => {
                            setDraggedProjectSlug(null)
                            setDragOverProjectSlug(null)
                            setDragDropPosition(null)
                            if (dragEndTimerRef.current) clearTimeout(dragEndTimerRef.current)
                            dragEndTimerRef.current = setTimeout(() => {
                              setIsDraggingActive(false)
                            }, 120)
                          }}
                        >
                          <div
                            className={styles.projectCardHeader}
                            onClick={() => {
                              if (isDraggingActive) return
                              setExpandedProjectId(isExpanded ? null : project.slug || String(pIdx))
                            }}
                          >
                            <div
                              className={styles.dragHandle}
                              title="Drag to reorder sequence"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <DragHandleIcon />
                            </div>

                            <span className={styles.projectSeqBadge} title={`Display Sequence #${sequenceNum}`}>
                              #{sequenceNum}
                            </span>

                            <div className={styles.seqStepButtons} onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                className={styles.seqStepBtn}
                                disabled={actualIdx <= 0 || isReordering}
                                title="Move sequence up"
                                onClick={() => handleMoveProjectByOne(project.slug, -1)}
                              >
                                <FiArrowUp size={11} />
                              </button>
                              <button
                                type="button"
                                className={styles.seqStepBtn}
                                disabled={actualIdx >= projectsList.length - 1 || isReordering}
                                title="Move sequence down"
                                onClick={() => handleMoveProjectByOne(project.slug, 1)}
                              >
                                <FiArrowDown size={11} />
                              </button>
                            </div>

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
                              <div
                                className={styles.fieldGroup}
                                style={{
                                  background: project.heroFeatured
                                    ? 'rgba(251, 191, 36, 0.08)'
                                    : 'rgba(255, 255, 255, 0.03)',
                                  padding: '10px 12px',
                                  borderRadius: '6px',
                                  border: project.heroFeatured
                                    ? '1px solid rgba(251, 191, 36, 0.35)'
                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                  marginBottom: '12px',
                                }}
                              >
                                <label
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    margin: 0,
                                    fontWeight: 600,
                                    color: project.heroFeatured ? '#fbbf24' : '#94a3b8',
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={Boolean(project.heroFeatured)}
                                    onChange={(e) =>
                                      handleProjectFieldChange(
                                        actualIdx,
                                        'heroFeatured',
                                        e.target.checked
                                      )
                                    }
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      accentColor: '#fbbf24',
                                    }}
                                  />
                                  <span>★ Feature in Hero Carousel (Top of /projects page)</span>
                                </label>
                              </div>

                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Hero Carousel Tagline</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={project.tagline || ''}
                                  placeholder="e.g. Balmoral Riverside — Pune's Grand Luxury Facade"
                                  onChange={(e) =>
                                    handleProjectFieldChange(actualIdx, 'tagline', e.target.value)
                                  }
                                />
                              </div>

                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Project Title</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={project.title || ''}
                                  onChange={(e) => handleProjectFieldChange(actualIdx, 'title', e.target.value)}
                                />
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Category</label>
                                  <select
                                    className={styles.inputControl}
                                    value={project.category || 'Commercial'}
                                    onChange={(e) => handleProjectFieldChange(actualIdx, 'category', e.target.value)}
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
                                    onChange={(e) => handleProjectFieldChange(actualIdx, 'developer', e.target.value)}
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
                                    onChange={(e) => handleProjectFieldChange(actualIdx, 'location', e.target.value)}
                                  />
                                </div>
                                <div className={styles.fieldGroup}>
                                  <label className={styles.fieldLabel}>Area (Sq Mtr)</label>
                                  <input
                                    type="number"
                                    className={styles.inputControl}
                                    value={project.areaSqMtr || ''}
                                    onChange={(e) => handleProjectFieldChange(actualIdx, 'areaSqMtr', Number(e.target.value))}
                                  />
                                </div>
                              </div>

                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Glazing Application</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={project.application || ''}
                                  onChange={(e) => handleProjectFieldChange(actualIdx, 'application', e.target.value)}
                                />
                              </div>

                              <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Glass BOQ Specs</label>
                                <input
                                  type="text"
                                  className={styles.inputControl}
                                  value={project.glassDescription || ''}
                                  onChange={(e) => handleProjectFieldChange(actualIdx, 'glassDescription', e.target.value)}
                                />
                              </div>

                              {renderMediaControl(
                                'Project Showcase Asset',
                                `projects.${project.slug}.imageUrl`,
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
                            {renderMultiMediaControl(
                              `Visual Showcase Photos (Multi-Image)`,
                              iIdx,
                              ind,
                              'industries'
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
                            {renderMultiMediaControl(
                              `Machinery Photos (Multi-Image)`,
                              mIdx,
                              mach,
                              'industries'
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
                          <div
                            key={fIdx}
                            style={{
                              padding: 12,
                              background: '#0e1726',
                              borderRadius: 8,
                              marginBottom: 14,
                              border: '1px solid rgba(59, 130, 246, 0.25)',
                            }}
                          >
                            <div className={styles.featuredProductBadgeLine}>
                              <span style={{ color: '#c5a880', fontWeight: 600, fontSize: '11px' }}>
                                FEATURED SYSTEM #{fIdx + 1}
                              </span>
                              {item.productSlug && (
                                <span
                                  style={{
                                    color: '#60a5fa',
                                    fontSize: '11px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                  }}
                                >
                                  ✓ Linked: <code>{item.productSlug}</code>
                                </span>
                              )}
                            </div>

                            {/* Product Catalog Selector Dropdown */}
                            <div className={styles.fieldGroup} style={{ marginBottom: 12 }}>
                              <label
                                className={styles.fieldLabel}
                                style={{ color: '#60a5fa', fontWeight: 600 }}
                              >
                                Select Product from Catalog
                              </label>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <select
                                  className={styles.productCatalogSelectControl}
                                  value={item.productSlug || ''}
                                  onChange={(e) => {
                                    const selectedSlug = e.target.value
                                    const found = availableProducts.find(
                                      (p: any) =>
                                        p.slug === selectedSlug || p.id === selectedSlug
                                    )
                                    const updated = [...(data?.featuredSystems || [])]
                                    if (found) {
                                      updated[fIdx] = {
                                        ...updated[fIdx],
                                        productSlug: found.slug || found.id,
                                        title: found.title || updated[fIdx].title,
                                        categoryLabel:
                                          found.category ||
                                          updated[fIdx].categoryLabel ||
                                          'Laminated Glass',
                                        badgeText:
                                          updated[fIdx].badgeText || 'FLAGSHIP FAÇADE',
                                        description:
                                          found.introSummary ||
                                          found.subheading ||
                                          updated[fIdx].description ||
                                          '',
                                        featuredImageUrl:
                                          found.heroImageUrl ||
                                          found.image ||
                                          updated[fIdx].featuredImageUrl ||
                                          '/images/products/sentry-laminated-glass.png',
                                        link: `/products/${found.slug || found.id}`,
                                      }
                                    } else {
                                      updated[fIdx] = {
                                        ...updated[fIdx],
                                        productSlug: selectedSlug,
                                      }
                                    }
                                    handleFieldChange('featuredSystems', updated)
                                  }}
                                >
                                  <option value="">-- Choose a Product from Catalog --</option>
                                  {availableProducts.map((prod: any) => (
                                    <option key={prod.slug || prod.id} value={prod.slug || prod.id}>
                                      {prod.title} ({prod.category || 'Glass'})
                                    </option>
                                  ))}
                                </select>
                                {item.productSlug && (
                                  <button
                                    type="button"
                                    className={styles.deleteIconBtn}
                                    style={{
                                      width: 'auto',
                                      padding: '0 8px',
                                      fontSize: '11px',
                                      height: '36px',
                                      flexShrink: 0,
                                    }}
                                    title="Unlink product"
                                    onClick={() => {
                                      const updated = [...(data?.featuredSystems || [])]
                                      updated[fIdx] = { ...updated[fIdx], productSlug: '' }
                                      handleFieldChange('featuredSystems', updated)
                                    }}
                                  >
                                    Unlink
                                  </button>
                                )}
                              </div>
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

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                              <button
                                type="button"
                                className={styles.deleteIconBtn}
                                style={{
                                  width: 'auto',
                                  padding: '4px 10px',
                                  fontSize: '11px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                }}
                                onClick={() => {
                                  const updated = data.featuredSystems.filter(
                                    (_: any, i: number) => i !== fIdx
                                  )
                                  handleFieldChange('featuredSystems', updated)
                                }}
                              >
                                <FiTrash2 size={12} /> Remove System
                              </button>
                            </div>
                          </div>
                        ))}

                      <button
                        type="button"
                        className={styles.actionIconBtn}
                        style={{
                          marginTop: 6,
                          padding: '7px 14px',
                          width: 'auto',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: '12px',
                        }}
                        onClick={() => {
                          const existing = Array.isArray(data?.featuredSystems)
                            ? [...data.featuredSystems]
                            : []
                          existing.push({
                            productSlug: '',
                            title: 'New Featured System',
                            badgeText: 'FLAGSHIP FAÇADE',
                            categoryLabel: 'Laminated Glass',
                            description: 'High performance architectural glass specification.',
                            featuredImageUrl: '/images/products/sentry-laminated-glass.png',
                            link: '/products',
                          })
                          handleFieldChange('featuredSystems', existing)
                        }}
                      >
                        <FiPlus size={13} /> Add Featured System Card
                      </button>
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
                            <div
                              onClick={() => openMediaPicker(`trustBanner.partners.${pIdx}.logoUrl`, partner.logoUrl || '')}
                              title={partner.logoUrl || 'No logo chosen - click to choose'}
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 6,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: '#111827',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                flexShrink: 0,
                              }}
                            >
                              {partner.logoUrl ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                  src={partner.logoUrl}
                                  alt={partner.name || 'Partner Logo'}
                                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 2 }}
                                />
                              ) : (
                                <FiImage size={14} color="#64748b" />
                              )}
                            </div>
                            <button
                              type="button"
                              className={styles.mediaPickBtn}
                              style={{ width: 'auto', padding: '6px 10px', height: '36px' }}
                              onClick={() => openMediaPicker(`trustBanner.partners.${pIdx}.logoUrl`, partner.logoUrl || '')}
                            >
                              <FiFolder size={12} /> {partner.logoUrl ? 'Change' : 'Logo'}
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
                          value={data?.loaderBrandTitle || "It's not just glass It's"}
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
        currentValues={pickerTarget?.currentValues || []}
        multiple={Boolean(pickerTarget?.isMultiple)}
        onSelect={handleMediaSelect}
        onSelectMultiple={handleMediaSelectMultiple}
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
