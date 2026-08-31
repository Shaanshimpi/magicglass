'use client'

import React, { useState } from 'react'
import styles from './Dashboard.module.css'
import { MediaPickerModal } from './MediaPickerModal'
import { FiX, FiPlus, FiImage, FiFolder, FiLoader } from 'react-icons/fi'

interface ProjectCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

export const ProjectCreateModal: React.FC<ProjectCreateModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Commercial')
  const [developer, setDeveloper] = useState('')
  const [location, setLocation] = useState('Pune, Maharashtra')
  const [application, setApplication] = useState('')
  const [glassDescription, setGlassDescription] = useState('')
  const [areaSqMtr, setAreaSqMtr] = useState<number | string>('1200')
  const [imageUrl, setImageUrl] = useState('/images/projects/balmoral-by-riverside.jpg')
  const [heroFeatured, setHeroFeatured] = useState(false)
  const [tagline, setTagline] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false)

  if (!isOpen) return null

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!slug.trim() || !title.trim()) {
      setError('Project title and slug are required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const projectPayload = {
        slug: slug.trim(),
        title: title.trim(),
        category,
        developer: developer.trim() || 'Premier Developer',
        location: location.trim() || 'Pune, Maharashtra',
        application: application.trim() || 'High-Performance Facade Glazing',
        glassDescription: glassDescription.trim() || 'Toughened Double Glazed Low-E Units',
        areaSqMtr: Number(areaSqMtr) || 1200,
        imageUrl: imageUrl || '/images/projects/balmoral-by-riverside.jpg',
        heroFeatured: Boolean(heroFeatured),
        tagline: tagline.trim() || 'Architectural Excellence with Magic Glass',
      }

      const res = await fetch('/api/cms/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          type: 'collection',
          slug: 'projects',
          data: projectPayload,
          pathToRevalidate: '/projects',
        }),
      })

      const json = await res.json()
      if (json.success) {
        onCreated()
        onClose()
      } else {
        setError(json.error || 'Failed to create project')
      }
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={styles.modalBackdrop} onClick={onClose}>
        <div
          className={styles.modalCard}
          style={{ maxWidth: '620px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <div>
              <h3 className={styles.modalTitle}>Add New Portfolio Project</h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                Insert a verified architectural project record into PostgreSQL
              </p>
            </div>
            <button type="button" className={styles.modalCloseBtn} onClick={onClose}>
              <FiX size={18} />
            </button>
          </div>

          <form onSubmit={handleCreate}>
            <div className={styles.modalBody}>
              {error && (
                <div style={{ padding: '8px 12px', background: '#2a0f0f', color: '#f87171', fontSize: '12px', borderRadius: 6, marginBottom: 12 }}>
                  ✕ {error}
                </div>
              )}

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Project Title *</label>
                <input
                  type="text"
                  required
                  className={styles.inputControl}
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. The Balmoral Riverside"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Unique Slug *</label>
                  <input
                    type="text"
                    required
                    className={styles.inputControl}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. balmoral-riverside"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Category</label>
                  <select
                    className={styles.inputControl}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Airports">Airports</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Developer / Builder</label>
                  <input
                    type="text"
                    className={styles.inputControl}
                    value={developer}
                    onChange={(e) => setDeveloper(e.target.value)}
                    placeholder="e.g. Kasturi Housing"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Location</label>
                  <input
                    type="text"
                    className={styles.inputControl}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Balewadi, Pune"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Glazing Application</label>
                  <input
                    type="text"
                    className={styles.inputControl}
                    value={application}
                    onChange={(e) => setApplication(e.target.value)}
                    placeholder="e.g. Double Height Curtain Wall & Balustrades"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Area (Sq Mtr)</label>
                  <input
                    type="number"
                    className={styles.inputControl}
                    value={areaSqMtr}
                    onChange={(e) => setAreaSqMtr(e.target.value)}
                    placeholder="e.g. 3500"
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Glass Description / BOQ Specs</label>
                <input
                  type="text"
                  className={styles.inputControl}
                  value={glassDescription}
                  onChange={(e) => setGlassDescription(e.target.value)}
                  placeholder="e.g. 8mm Low-E HS + 16mm Argon + 8mm Toughened Clear DGU"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Project Visual Asset</label>
                <div className={styles.mediaFieldControl}>
                  <div className={styles.mediaThumbnailBox}>
                    {imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={imageUrl}
                        alt="Project Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <FiImage size={18} color="#64748b" />
                    )}
                  </div>
                  <div className={styles.mediaInfoBox}>
                    <div className={styles.mediaPathText} title={imageUrl}>
                      {imageUrl || '(Choose image)'}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.mediaPickBtn}
                    onClick={() => setIsMediaPickerOpen(true)}
                  >
                    <FiFolder size={12} /> Choose
                  </button>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Tagline / Headline</label>
                <input
                  type="text"
                  className={styles.inputControl}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Ultra-Luxury Residential Tower Glazing"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 8 }}>
                <input
                  type="checkbox"
                  id="heroFeaturedCheckbox"
                  checked={heroFeatured}
                  onChange={(e) => setHeroFeatured(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#c5a880' }}
                />
                <label htmlFor="heroFeaturedCheckbox" style={{ fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
                  Feature in Projects Page Top Carousel (Hero Featured)
                </label>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.deviceBtn}
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.publishBtn}
                disabled={loading}
                style={{ width: 'auto', padding: '8px 20px' }}
              >
                {loading ? <FiLoader style={{ animation: 'spin 1s infinite linear' }} /> : <FiPlus />}
                {loading ? 'Creating Project...' : 'Add Project to DB'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        currentValue={imageUrl}
        onSelect={(url) => setImageUrl(url)}
        onClose={() => setIsMediaPickerOpen(false)}
      />
    </>
  )
}
