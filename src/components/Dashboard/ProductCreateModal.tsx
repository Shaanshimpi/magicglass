'use client'

import React, { useState } from 'react'
import styles from './Dashboard.module.css'
import { MediaPickerModal } from './MediaPickerModal'
import { FiX, FiPlus, FiImage, FiFolder, FiLoader } from 'react-icons/fi'

interface ProductCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (newProduct: { slug: string; title: string; category: string }) => void
}

export const ProductCreateModal: React.FC<ProductCreateModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('structural')
  const [subheading, setSubheading] = useState('')
  const [indexNumber, setIndexNumber] = useState('15')
  const [heroImageUrl, setHeroImageUrl] = useState('/images/prod-structural.jpg')
  const [introSummary, setIntroSummary] = useState('')
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
      setError('Product title and slug are required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const productPayload = {
        slug: slug.trim(),
        title: title.trim(),
        category,
        subheading: subheading.trim() || 'Architectural Glass Solution',
        indexNumber: indexNumber.trim() || '01',
        heroImageUrl: heroImageUrl || '/images/prod-structural.jpg',
        introSummary: introSummary.trim() || `${title.trim()} engineered for high-performance architectural applications with uncompromising structural integrity.`,
        secondaryText: 'Manufactured with high-precision European technology and automated quality control.',
        detailImages: [
          { imageUrl: heroImageUrl || '/images/prod-structural.jpg' },
          { imageUrl: '/images/craft-dgu.jpg' },
        ],
        characteristics: [
          { item: 'Engineered for high structural load endurance' },
          { item: 'Precision CNC edge polishing and inspection' },
          { item: 'IS 2553 and ISO 9001 quality certified' },
        ],
        specs: [
          { label: 'Glass Thickness', value: '6mm to 19mm', icon: '' },
          { label: 'Max Processing Dimension', value: '3300mm x 7000mm', icon: '' },
          { label: 'Testing Standard', value: 'IS 2553 / EN 12150', icon: '' },
        ],
        galleryTitle: 'Glass Applications',
        galleryImages: [
          { title: 'FACADES & CURTAIN WALLS', src: heroImageUrl || '/images/prod-structural.jpg' },
          { title: 'COMMERCIAL ENTRANCES', src: '/images/apps/railings.png' },
          { title: 'INTERIOR PARTITIONS', src: '/images/apps/partition.png' },
          { title: 'STRUCTURAL CANOPIES', src: '/images/apps/roof.png' },
        ],
        industries: [
          {
            title: 'ARCHITECTURE & FACADES',
            description: 'Engineered for modern high-rise curtain walls, structural balustrades, and canopies.',
            imageUrl: '/images/prod-structural.jpg',
          },
          {
            title: 'COMMERCIAL INTERIORS',
            description: 'Acoustic isolation, frameless conference enclosures, and decorative privacy walls.',
            imageUrl: '/images/prod-partitions.jpg',
          },
        ],
        sliderImages: [{ src: heroImageUrl || '/images/prod-structural.jpg' }],
        relatedProductSlugs: [{ slug: 'toughened-glass' }, { slug: 'insulated-glass-dgu' }],
      }

      const res = await fetch('/api/cms/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          type: 'collection',
          slug: 'products',
          data: productPayload,
          pathToRevalidate: `/products/${slug.trim()}`,
        }),
      })

      const json = await res.json()
      if (json.success) {
        onCreated({
          slug: slug.trim(),
          title: title.trim(),
          category,
        })
        onClose()
      } else {
        setError(json.error || 'Failed to create product')
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
          style={{ maxWidth: '580px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <div>
              <h3 className={styles.modalTitle}>Add New Product PDP</h3>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                Create a dynamic architectural glass product page in PostgreSQL
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
                <label className={styles.fieldLabel}>Product Title *</label>
                <input
                  type="text"
                  required
                  className={styles.inputControl}
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Curved Tempered Glass"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>URL Slug *</label>
                  <input
                    type="text"
                    required
                    className={styles.inputControl}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. curved-tempered-glass"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Category</label>
                  <select
                    className={styles.inputControl}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="structural">Structural & Exterior</option>
                    <option value="interior">Interior & Partitions</option>
                    <option value="safety">Safety & Processing</option>
                    <option value="specialty">Specialty & Decorative</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Index Number</label>
                  <input
                    type="text"
                    className={styles.inputControl}
                    value={indexNumber}
                    onChange={(e) => setIndexNumber(e.target.value)}
                    placeholder="e.g. 15"
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Subheading / Badge</label>
                  <input
                    type="text"
                    className={styles.inputControl}
                    value={subheading}
                    onChange={(e) => setSubheading(e.target.value)}
                    placeholder="e.g. Custom 3D Curved Structural Facades"
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Hero Showcase Image</label>
                <div className={styles.mediaFieldControl}>
                  <div className={styles.mediaThumbnailBox}>
                    {heroImageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={heroImageUrl}
                        alt="Hero Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <FiImage size={18} color="#64748b" />
                    )}
                  </div>
                  <div className={styles.mediaInfoBox}>
                    <div className={styles.mediaPathText} title={heroImageUrl}>
                      {heroImageUrl || '(Default image will be used)'}
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
                <label className={styles.fieldLabel}>Intro Summary</label>
                <textarea
                  rows={2}
                  className={styles.inputControl}
                  value={introSummary}
                  onChange={(e) => setIntroSummary(e.target.value)}
                  placeholder="Enter high-level engineering summary..."
                />
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
                {loading ? 'Creating PDP...' : 'Create & Open PDP'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        currentValue={heroImageUrl}
        onSelect={(url) => setHeroImageUrl(url)}
        onClose={() => setIsMediaPickerOpen(false)}
      />
    </>
  )
}
