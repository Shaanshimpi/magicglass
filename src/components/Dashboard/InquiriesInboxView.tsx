'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styles from './Dashboard.module.css'
import {
  FiInbox,
  FiMail,
  FiPhone,
  FiRefreshCw,
  FiDownload,
  FiTrash2,
  FiSearch,
  FiCopy,
  FiCheck,
  FiSend,
  FiCode,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi'

export interface InquiryRecord {
  id: string
  formType: 'quote_drawer' | 'contact_us' | 'pdp_inquiry'
  status?: string
  fullName: string
  companyName?: string
  email: string
  phone?: string
  subject?: string
  projectCategory?: string
  glassTypes?: Array<{ type: string; id?: string }>
  message?: string
  attachmentName?: string
  internalNotes?: string
  createdAt: string
  updatedAt: string
}

export const InquiriesInboxView: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [formTypeFilter, setFormTypeFilter] = useState<'all' | 'quote_drawer' | 'contact_us' | 'pdp_inquiry'>('all')
  const [copied, setCopied] = useState(false)
  const [showRawJson, setShowRawJson] = useState(false)

  // Fetch inquiries from database API
  const fetchInquiries = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/inquiries')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
        setInquiries(json.data)
        if (json.data.length > 0 && !selectedId) {
          setSelectedId(json.data[0].id)
        }
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err)
    } finally {
      setLoading(false)
    }
  }, [selectedId])

  useEffect(() => {
    fetchInquiries()
  }, [fetchInquiries])

  // Filter inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      if (formTypeFilter !== 'all' && item.formType !== formTypeFilter) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const name = (item.fullName || '').toLowerCase()
        const comp = (item.companyName || '').toLowerCase()
        const em = (item.email || '').toLowerCase()
        const ph = (item.phone || '').toLowerCase()
        const msg = (item.message || '').toLowerCase()
        const subj = (item.subject || '').toLowerCase()
        const cat = (item.projectCategory || '').toLowerCase()
        const glass = (item.glassTypes || []).map((g) => (g.type || '').toLowerCase()).join(' ')

        return (
          name.includes(q) ||
          comp.includes(q) ||
          em.includes(q) ||
          ph.includes(q) ||
          msg.includes(q) ||
          subj.includes(q) ||
          cat.includes(q) ||
          glass.includes(q)
        )
      }
      return true
    })
  }, [inquiries, formTypeFilter, searchQuery])

  // Active selected record
  const selectedRecord = useMemo(() => {
    return inquiries.find((i) => i.id === selectedId) || filteredInquiries[0] || null
  }, [inquiries, filteredInquiries, selectedId])

  // Delete submission
  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!confirm('Permanently delete this submission record?')) return

    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) {
        const remaining = inquiries.filter((item) => item.id !== id)
        setInquiries(remaining)
        if (selectedId === id) {
          setSelectedId(remaining.length > 0 ? remaining[0].id : null)
        }
      }
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  // Export to CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return
    const headers = [
      'ID',
      'Date',
      'Source',
      'Full Name',
      'Company',
      'Email',
      'Phone',
      'Category / Subject',
      'Glass Specifications',
      'Message / Scope',
    ]

    const rows = inquiries.map((item) => [
      `"${item.id}"`,
      `"${new Date(item.createdAt).toLocaleString()}"`,
      `"${item.formType}"`,
      `"${(item.fullName || '').replace(/"/g, '""')}"`,
      `"${(item.companyName || '').replace(/"/g, '""')}"`,
      `"${item.email}"`,
      `"${item.phone || ''}"`,
      `"${(item.projectCategory || item.subject || '').replace(/"/g, '""')}"`,
      `"${(item.glassTypes || []).map((g) => g.type).join('; ')}"`,
      `"${(item.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `magic_glass_submissions_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Copy values
  const copyRecordValues = () => {
    if (!selectedRecord) return
    const glassList = (selectedRecord.glassTypes || []).map((g) => g.type).join(', ')
    const text = `
SUBMISSION RECORD (ID: ${selectedRecord.id})
--------------------------------------------
Date: ${new Date(selectedRecord.createdAt).toLocaleString()}
Form Channel: ${formatFormType(selectedRecord.formType)}
Full Name: ${selectedRecord.fullName}
Company: ${selectedRecord.companyName || 'N/A'}
Email: ${selectedRecord.email}
Phone: ${selectedRecord.phone || 'N/A'}
Project Category: ${selectedRecord.projectCategory || 'N/A'}
Subject: ${selectedRecord.subject || 'N/A'}
Glass Specifications: ${glassList || 'N/A'}

Message / Scope:
${selectedRecord.message || 'No additional scope provided.'}
--------------------------------------------
    `.trim()

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Format form type
  const formatFormType = (type: string) => {
    switch (type) {
      case 'quote_drawer':
        return 'Quote Request'
      case 'contact_us':
        return 'Contact Form'
      case 'pdp_inquiry':
        return 'Product Consultation'
      default:
        return type
    }
  }

  // Format relative time
  const formatRelativeTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (diffMins < 2) return 'Just now'
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays === 1) return 'Yesterday'
      if (diffDays < 7) return `${diffDays}d ago`
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } catch {
      return dateStr
    }
  }

  return (
    <div className={styles.inquiriesContainer} data-lenis-prevent>
      {/* 1. Header Toolbar */}
      <header className={styles.inquiriesHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>Form Submissions</h1>
          <span className={styles.headerCountBadge}>{inquiries.length}</span>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Filter submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInputClean}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.searchClearBtn}
                onClick={() => setSearchQuery('')}
              >
                &times;
              </button>
            )}
          </div>

          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={fetchInquiries}
            disabled={loading}
            title="Refresh submissions"
          >
            <FiRefreshCw className={loading ? styles.spinIcon : ''} />
          </button>

          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleExportCSV}
            title="Export CSV"
          >
            <FiDownload /> Export
          </button>
        </div>
      </header>

      {/* 2. Main Split View Layout */}
      <div className={styles.splitLayout}>
        {/* Left Column: Master Submissions List */}
        <div className={styles.listColumn}>
          {/* Filter Pills */}
          <div className={styles.filterPillsRow}>
            <button
              type="button"
              className={`${styles.filterButton} ${formTypeFilter === 'all' ? styles.filterButtonActive : ''}`}
              onClick={() => setFormTypeFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`${styles.filterButton} ${formTypeFilter === 'quote_drawer' ? styles.filterButtonActive : ''}`}
              onClick={() => setFormTypeFilter('quote_drawer')}
            >
              Quotes
            </button>
            <button
              type="button"
              className={`${styles.filterButton} ${formTypeFilter === 'contact_us' ? styles.filterButtonActive : ''}`}
              onClick={() => setFormTypeFilter('contact_us')}
            >
              Contact
            </button>
            <button
              type="button"
              className={`${styles.filterButton} ${formTypeFilter === 'pdp_inquiry' ? styles.filterButtonActive : ''}`}
              onClick={() => setFormTypeFilter('pdp_inquiry')}
            >
              Products
            </button>
          </div>

          {/* Submissions List Container */}
          <div className={styles.listScroll}>
            {loading && inquiries.length === 0 ? (
              <div className={styles.emptyStateContainer}>
                <FiRefreshCw className={styles.spinIcon} size={20} />
                <p>Loading submissions...</p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className={styles.emptyStateContainer}>
                <FiInbox size={28} style={{ opacity: 0.35, marginBottom: 8 }} />
                <p>No submissions found</p>
              </div>
            ) : (
              filteredInquiries.map((item) => {
                const isSelected = selectedRecord?.id === item.id
                const glassArray = item.glassTypes || []

                return (
                  <div
                    key={item.id}
                    className={`${styles.submissionListItem} ${isSelected ? styles.submissionListItemActive : ''}`}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <div className={styles.itemTopRow}>
                      <span className={styles.itemSenderName}>{item.fullName}</span>
                      <span className={styles.itemDate}>{formatRelativeTime(item.createdAt)}</span>
                    </div>

                    <div className={styles.itemCompanyRow}>
                      {item.companyName ? (
                        <span className={styles.itemCompanyName}>{item.companyName}</span>
                      ) : (
                        <span className={styles.itemEmail}>{item.email}</span>
                      )}
                    </div>

                    <div className={styles.itemMetaRow}>
                      <span
                        className={`${styles.sourceBadge} ${
                          item.formType === 'quote_drawer'
                            ? styles.sourceQuote
                            : item.formType === 'contact_us'
                            ? styles.sourceContact
                            : styles.sourcePdp
                        }`}
                      >
                        {formatFormType(item.formType)}
                      </span>

                      {item.projectCategory && (
                        <span className={styles.categoryChip}>{item.projectCategory}</span>
                      )}
                    </div>

                    {item.message ? (
                      <p className={styles.itemSnippet}>{item.message}</p>
                    ) : glassArray.length > 0 ? (
                      <p className={styles.itemSnippetMuted}>
                        Specs: {glassArray.map((g) => g.type).join(', ')}
                      </p>
                    ) : null}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Column: Submission Inspector (Input Values) */}
        <div className={styles.inspectorColumn}>
          {selectedRecord ? (
            <div className={styles.inspectorScroll}>
              {/* Top Banner */}
              <div className={styles.inspectorHeader}>
                <div>
                  <div className={styles.inspectorSourceMeta}>
                    <span
                      className={`${styles.sourceBadge} ${
                        selectedRecord.formType === 'quote_drawer'
                          ? styles.sourceQuote
                          : selectedRecord.formType === 'contact_us'
                          ? styles.sourceContact
                          : styles.sourcePdp
                      }`}
                    >
                      {formatFormType(selectedRecord.formType)}
                    </span>
                    <span className={styles.inspectorTimestamp}>
                      Received on{' '}
                      {new Date(selectedRecord.createdAt).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <h2 className={styles.inspectorTitle}>{selectedRecord.fullName}</h2>
                  {selectedRecord.companyName && (
                    <div className={styles.inspectorCompany}>{selectedRecord.companyName}</div>
                  )}
                </div>

                {/* Header Action Buttons */}
                <div className={styles.inspectorActions}>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={copyRecordValues}
                    title="Copy all submission data"
                  >
                    {copied ? <FiCheck color="#34d399" /> : <FiCopy />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>

                  <a
                    href={`mailto:${selectedRecord.email}?subject=${encodeURIComponent(
                      `Regarding your Magic Glass Inquiry - ${selectedRecord.projectCategory || selectedRecord.subject || 'Architectural Glass'}`
                    )}`}
                    className={styles.primaryActionBtn}
                    title="Send Email"
                  >
                    <FiSend size={12} /> Reply Email
                  </a>

                  <button
                    type="button"
                    className={styles.deleteIconBtn}
                    onClick={(e) => handleDelete(selectedRecord.id, e)}
                    title="Delete submission"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              {/* Form Input Values Grid */}
              <div className={styles.valuesCard}>
                <div className={styles.cardSectionTitle}>Contact Details</div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.fieldBox}>
                    <span className={styles.fieldLabel}>Full Name</span>
                    <span className={styles.fieldValue}>{selectedRecord.fullName}</span>
                  </div>

                  <div className={styles.fieldBox}>
                    <span className={styles.fieldLabel}>Company / Firm</span>
                    <span className={styles.fieldValue}>{selectedRecord.companyName || '—'}</span>
                  </div>

                  <div className={styles.fieldBox}>
                    <span className={styles.fieldLabel}>Email Address</span>
                    <a
                      href={`mailto:${selectedRecord.email}`}
                      className={styles.fieldLink}
                    >
                      <FiMail size={12} /> {selectedRecord.email}
                    </a>
                  </div>

                  <div className={styles.fieldBox}>
                    <span className={styles.fieldLabel}>Phone Number</span>
                    {selectedRecord.phone ? (
                      <a href={`tel:${selectedRecord.phone}`} className={styles.fieldLink}>
                        <FiPhone size={12} /> {selectedRecord.phone}
                      </a>
                    ) : (
                      <span className={styles.fieldValueMuted}>—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Project & Technical Specifications */}
              <div className={styles.valuesCard}>
                <div className={styles.cardSectionTitle}>Project Specifications</div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.fieldBox}>
                    <span className={styles.fieldLabel}>Project Category</span>
                    <span className={styles.fieldValue}>
                      {selectedRecord.projectCategory || '—'}
                    </span>
                  </div>

                  {selectedRecord.subject && (
                    <div className={styles.fieldBox}>
                      <span className={styles.fieldLabel}>Subject / Inquiry Title</span>
                      <span className={styles.fieldValue}>{selectedRecord.subject}</span>
                    </div>
                  )}
                </div>

                {/* Glass Specifications Required */}
                {selectedRecord.glassTypes && selectedRecord.glassTypes.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <span className={styles.fieldLabel}>Glass Types Required</span>
                    <div className={styles.specChipsWrap}>
                      {selectedRecord.glassTypes.map((g, i) => (
                        <span key={i} className={styles.specPill}>
                          {g.type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Message / Scope Text */}
              <div className={styles.valuesCard}>
                <div className={styles.cardSectionTitle}>Message & Scope Requirements</div>
                <div className={styles.messageBlock}>
                  {selectedRecord.message ? (
                    <p className={styles.messageText}>{selectedRecord.message}</p>
                  ) : (
                    <p className={styles.messageTextMuted}>
                      No additional message text submitted with this request.
                    </p>
                  )}
                </div>
              </div>

              {/* Raw JSON Debug Viewer */}
              <div className={styles.rawJsonSection}>
                <button
                  type="button"
                  className={styles.rawJsonToggleBtn}
                  onClick={() => setShowRawJson(!showRawJson)}
                >
                  <FiCode size={13} />
                  <span>{showRawJson ? 'Hide Raw Submission Payload' : 'View Raw Submission Payload'}</span>
                  {showRawJson ? <FiChevronUp size={13} /> : <FiChevronDown size={13} />}
                </button>

                {showRawJson && (
                  <pre className={styles.rawJsonPre}>
                    {JSON.stringify(selectedRecord, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.inspectorEmpty}>
              <FiInbox size={36} style={{ opacity: 0.25, marginBottom: 12 }} />
              <h3>Select a submission</h3>
              <p>Choose an item from the left stream to inspect client specifications and submitted input values.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
