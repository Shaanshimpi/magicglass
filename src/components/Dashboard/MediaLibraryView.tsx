'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './MediaLibraryView.module.css'
import {
  FiUploadCloud,
  FiSearch,
  FiCopy,
  FiShare2,
  FiMaximize2,
  FiDownload,
  FiGrid,
  FiList,
  FiRefreshCw,
  FiCheck,
  FiExternalLink,
  FiX,
  FiImage,
  FiLayers,
} from 'react-icons/fi'

export interface MediaItem {
  id: string
  name: string
  url: string
  category: string
  width: number
  height: number
  size: number
  aspect: string
  format: string
  createdAt?: string
}

const CATEGORIES = [
  'All',
  'Heroes & Banners',
  'Products',
  'Projects',
  'Industries',
  'Infrastructure',
  'Applications',
  'General',
  'User Uploads',
]

export const MediaLibraryView: React.FC = () => {
  const [mediaList, setMediaList] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  
  // Drag & drop upload state
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Modals state
  const [inspectItem, setInspectItem] = useState<MediaItem | null>(null)
  const [shareItem, setShareItem] = useState<MediaItem | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const fetchMedia = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      if (data.success && Array.isArray(data.media)) {
        setMediaList(data.media)
      }
    } catch (err) {
      console.error('Failed to load media:', err)
      showToast('Error loading media assets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  // File Upload Handler
  const handleUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadProgress(15)

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    try {
      setUploadProgress(45)
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      })
      setUploadProgress(85)
      const data = await res.json()

      if (data.success && Array.isArray(data.uploaded)) {
        setUploadProgress(100)
        showToast(`Successfully uploaded ${data.uploaded.length} asset(s)!`)
        // Prepend uploaded files
        setMediaList((prev) => [...data.uploaded, ...prev])
      } else {
        showToast(data.error || 'Upload failed')
      }
    } catch (err: any) {
      console.error('Upload error:', err)
      showToast('Error uploading file(s)')
    } finally {
      setTimeout(() => {
        setUploading(false)
        setUploadProgress(0)
      }, 500)
    }
  }

  // Copy to clipboard helper
  const handleCopy = (text: string, label: string = 'URL') => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text)
      showToast(`${label} copied to clipboard!`)
    }
  }

  // Native share or dialog
  const handleShare = async (item: MediaItem) => {
    const fullUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${item.url}`
        : item.url

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.name,
          text: `Check out ${item.name} on Magic Glass`,
          url: fullUrl,
        })
        return
      } catch {
        // User cancelled or unsupported, fallback to modal
      }
    }
    setShareItem(item)
  }

  // Filtered List
  const filteredList = mediaList.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' ||
      item.category.toLowerCase() === activeCategory.toLowerCase()

    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.url.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      `${item.width}x${item.height}`.includes(q)

    return matchesCategory && matchesSearch
  })

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`
  }

  return (
    <div className={styles.container}>
      {/* 1. Header & Controls */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerInfo}>
            <h1>
              <FiImage style={{ color: '#e63946' }} />
              Media & Asset Library
              <span className={styles.headerBadge}>{mediaList.length} Assets</span>
            </h1>
            <p className={styles.headerSubtitle}>
              Interactive asset management for Magic Glass. Upload high-resolution banners, inspect dimensions, copy CDN links, and generate embed codes.
            </p>
          </div>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.primaryUploadBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              <FiUploadCloud /> Upload New Asset
            </button>

            <button
              type="button"
              className={`${styles.viewModeBtn} ${viewMode === 'grid' ? styles.viewModeBtnActive : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <FiGrid />
            </button>

            <button
              type="button"
              className={`${styles.viewModeBtn} ${viewMode === 'table' ? styles.viewModeBtnActive : ''}`}
              onClick={() => setViewMode('table')}
              title="List View"
            >
              <FiList />
            </button>

            <button
              type="button"
              className={styles.refreshBtn}
              onClick={fetchMedia}
              title="Refresh Library"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className={styles.statsBar}>
          <div className={styles.statPill}>
            <span>Total Media:</span>
            <span className={styles.statValue}>{mediaList.length}</span>
          </div>
          <div className={styles.statPill}>
            <span>High-Res Heroes:</span>
            <span className={styles.statValue}>
              {mediaList.filter((m) => m.category === 'Heroes & Banners').length}
            </span>
          </div>
          <div className={styles.statPill}>
            <span>Products:</span>
            <span className={styles.statValue}>
              {mediaList.filter((m) => m.category === 'Products').length}
            </span>
          </div>
          <div className={styles.statPill}>
            <span>Projects:</span>
            <span className={styles.statValue}>
              {mediaList.filter((m) => m.category === 'Projects').length}
            </span>
          </div>
          <div className={styles.statPill}>
            <span>User Uploads:</span>
            <span className={styles.statValue}>
              {mediaList.filter((m) => m.category === 'User Uploads').length}
            </span>
          </div>
        </div>
      </header>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,image/avif"
        style={{ display: 'none' }}
        onChange={(e) => handleUploadFiles(e.target.files)}
      />

      {/* 2. Drag & Drop Upload Zone */}
      <section
        className={`${styles.dropzoneContainer} ${isDragging ? styles.dropzoneActive : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleUploadFiles(e.dataTransfer.files)
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={styles.dropzoneContent}>
          <FiUploadCloud className={styles.dropzoneIcon} />
          <p className={styles.dropzoneText}>
            Drag & drop images here, or <span style={{ color: '#e63946', textDecoration: 'underline' }}>browse</span> to upload
          </p>
          <p className={styles.dropzoneSubtext}>
            Supports PNG, JPEG, WebP, SVG, AVIF up to 30MB each. High-resolution 1920px+ banners recommended.
          </p>

          {uploading && (
            <div className={styles.uploadProgressBar}>
              <div
                className={styles.uploadProgressFill}
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
      </section>

      {/* 3. Filter Bar & Search */}
      <div className={styles.filterBar}>
        <div className={styles.categoriesWrapper}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.searchBox}>
          <FiSearch style={{ color: '#8b949e' }} />
          <input
            type="text"
            placeholder="Search by name, dimensions, or path..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setSearchQuery('')}
            >
              <FiX style={{ fontSize: '1rem' }} />
            </button>
          )}
        </div>
      </div>

      {/* 4. Main Gallery / Content */}
      {viewMode === 'grid' ? (
        <div className={styles.mediaGrid}>
          {filteredList.map((item) => (
            <div key={item.id} className={styles.mediaCard}>
              <div
                className={styles.thumbnailWrapper}
                onClick={() => setInspectItem(item)}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  loading="lazy"
                  className={styles.thumbnailImg}
                />
                
                {/* Badges */}
                <div className={styles.dimensionBadge}>
                  {item.width > 0 ? `${item.width}×${item.height}` : item.format}
                </div>

                <div className={styles.categoryTag}>
                  {item.category}
                </div>

                {/* Hover Quick Actions */}
                <div
                  className={styles.cardHoverOverlay}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => handleCopy(item.url, 'Relative link')}
                    title="Copy Relative Link"
                  >
                    <FiCopy />
                  </button>
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => handleShare(item)}
                    title="Share Asset"
                  >
                    <FiShare2 />
                  </button>
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={() => setInspectItem(item)}
                    title="Full Preview"
                  >
                    <FiMaximize2 />
                  </button>
                  <a
                    href={item.url}
                    download={item.name}
                    className={styles.actionBtn}
                    title="Download Original"
                  >
                    <FiDownload />
                  </a>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle} title={item.name}>
                  {item.name}
                </h3>
                <div className={styles.cardMetaRow}>
                  <span>{item.format} &bull; {formatFileSize(item.size)}</span>
                  <span>{item.aspect}</span>
                </div>
                <div
                  className={styles.cardUrlSnippet}
                  onClick={() => handleCopy(item.url, 'URL')}
                  title="Click to copy path"
                >
                  {item.url}
                </div>
              </div>
            </div>
          ))}

          {filteredList.length === 0 && !loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', color: '#8b949e' }}>
              <FiImage style={{ fontSize: '3rem', color: '#30363d', marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#f0f6fc' }}>No media assets found</p>
              <p style={{ fontSize: '0.88rem' }}>Try selecting another category or clear your search filter.</p>
            </div>
          )}
        </div>
      ) : (
        /* Detailed List Table */
        <div className={styles.mediaTableWrapper}>
          <table className={styles.mediaTable}>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Preview</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Dimensions</th>
                <th>Aspect Ratio</th>
                <th>Size</th>
                <th>Format</th>
                <th>Path</th>
                <th style={{ textAlign: 'right', width: '130px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.url}
                      alt={item.name}
                      className={styles.tableThumb}
                      onClick={() => setInspectItem(item)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>{item.name}</td>
                  <td>
                    <span style={{ color: '#388bfd', fontSize: '0.75rem', background: 'rgba(56,139,253,0.1)', padding: '2px 6px', borderRadius: 4 }}>
                      {item.category}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'monospace' }}>
                    {item.width ? `${item.width} × ${item.height}` : '—'}
                  </td>
                  <td style={{ fontFamily: 'monospace' }}>{item.aspect}</td>
                  <td>{formatFileSize(item.size)}</td>
                  <td>{item.format}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#8b949e' }}>
                    {item.url}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        style={{ width: 30, height: 30 }}
                        onClick={() => handleCopy(item.url, 'Link')}
                        title="Copy Link"
                      >
                        <FiCopy style={{ fontSize: '0.75rem' }} />
                      </button>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        style={{ width: 30, height: 30 }}
                        onClick={() => handleShare(item)}
                        title="Share"
                      >
                        <FiShare2 style={{ fontSize: '0.75rem' }} />
                      </button>
                      <button
                        type="button"
                        className={styles.actionBtn}
                        style={{ width: 30, height: 30 }}
                        onClick={() => setInspectItem(item)}
                        title="Preview"
                      >
                        <FiMaximize2 style={{ fontSize: '0.75rem' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Detailed Preview Modal */}
      {inspectItem && (
        <div className={styles.modalOverlay} onClick={() => setInspectItem(null)}>
          <div
            className={styles.previewModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>{inspectItem.name}</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setInspectItem(null)}
              >
                <FiX />
              </button>
            </div>

            <div className={styles.previewCanvas}>
              <img src={inspectItem.url} alt={inspectItem.name} />
            </div>

            <div className={styles.previewDetailsBar}>
              <div className={styles.metadataGrid}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Dimensions</span>
                  <span className={styles.metaVal}>
                    {inspectItem.width ? `${inspectItem.width} × ${inspectItem.height} px` : 'Vector / Responsive'}
                  </span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Aspect Ratio</span>
                  <span className={styles.metaVal}>{inspectItem.aspect}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>File Size</span>
                  <span className={styles.metaVal}>{formatFileSize(inspectItem.size)}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Category</span>
                  <span className={styles.metaVal}>{inspectItem.category}</span>
                </div>
              </div>

              <div className={styles.modalActionsRow}>
                <div style={{ display: 'flex', gap: '0.5rem', flex: 1, minWidth: 0 }}>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => handleCopy(inspectItem.url, 'Relative URL')}
                  >
                    <FiCopy /> Copy Relative URL
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => {
                      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://magicglass.co.in'
                      handleCopy(`${origin}${inspectItem.url}`, 'Full CDN URL')
                    }}
                  >
                    <FiExternalLink /> Copy Full URL
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => handleShare(inspectItem)}
                  >
                    <FiShare2 /> Share
                  </button>
                  <a
                    href={inspectItem.url}
                    download={inspectItem.name}
                    className={styles.secondaryBtn}
                  >
                    <FiDownload /> Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Rich Share Modal */}
      {shareItem && (
        <div className={styles.modalOverlay} onClick={() => setShareItem(null)}>
          <div
            className={styles.shareModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader} style={{ padding: '0 0 0.75rem 0' }}>
              <h2>Share & Embed Asset</h2>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setShareItem(null)}
              >
                <FiX />
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#8b949e', margin: 0 }}>
              Share direct links or copy production embed snippets for <strong>{shareItem.name}</strong>.
            </p>

            {/* Direct Link */}
            <div className={styles.snippetBlock}>
              <span className={styles.snippetTitle}>Direct URL</span>
              <div className={styles.snippetBox}>
                <span className={styles.snippetCode}>{shareItem.url}</span>
                <button
                  type="button"
                  className={styles.copySnippetBtn}
                  onClick={() => handleCopy(shareItem.url, 'URL')}
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Next.js Image Snippet */}
            <div className={styles.snippetBlock}>
              <span className={styles.snippetTitle}>Next.js Image Tag</span>
              <div className={styles.snippetBox}>
                <span className={styles.snippetCode}>
                  {`<Image src="${shareItem.url}" alt="${shareItem.name}" fill sizes="100vw" quality={90} />`}
                </span>
                <button
                  type="button"
                  className={styles.copySnippetBtn}
                  onClick={() =>
                    handleCopy(
                      `<Image src="${shareItem.url}" alt="${shareItem.name}" fill sizes="100vw" quality={90} />`,
                      'Next.js code'
                    )
                  }
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Markdown Snippet */}
            <div className={styles.snippetBlock}>
              <span className={styles.snippetTitle}>Markdown Embed</span>
              <div className={styles.snippetBox}>
                <span className={styles.snippetCode}>
                  {`![${shareItem.name}](${shareItem.url})`}
                </span>
                <button
                  type="button"
                  className={styles.copySnippetBtn}
                  onClick={() =>
                    handleCopy(`![${shareItem.name}](${shareItem.url})`, 'Markdown')
                  }
                >
                  Copy
                </button>
              </div>
            </div>

            {/* HTML Tag Snippet */}
            <div className={styles.snippetBlock}>
              <span className={styles.snippetTitle}>HTML Image Tag</span>
              <div className={styles.snippetBox}>
                <span className={styles.snippetCode}>
                  {`<img src="${shareItem.url}" alt="${shareItem.name}" loading="lazy" />`}
                </span>
                <button
                  type="button"
                  className={styles.copySnippetBtn}
                  onClick={() =>
                    handleCopy(
                      `<img src="${shareItem.url}" alt="${shareItem.name}" loading="lazy" />`,
                      'HTML tag'
                    )
                  }
                >
                  Copy
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setShareItem(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Toast Notification */}
      {toastMessage && (
        <div className={styles.toastNotification}>
          <FiCheck /> {toastMessage}
        </div>
      )}
    </div>
  )
}
