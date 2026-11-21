'use client'

import React, { useState, useEffect } from 'react'
import { FiMail, FiCheck, FiAlertCircle, FiSend, FiSave, FiX, FiRefreshCw } from 'react-icons/fi'
import styles from './InquiryEmailSettingsModal.module.css'

interface InquiryEmailSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export const InquiryEmailSettingsModal: React.FC<InquiryEmailSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [notificationEmail, setNotificationEmail] = useState<string>('sales@magicglass.co.in')
  const [additionalEmails, setAdditionalEmails] = useState<string>('')
  const [enableNotifications, setEnableNotifications] = useState<boolean>(true)
  const [emailSubjectPrefix, setEmailSubjectPrefix] = useState<string>('[Magic Glass Lead]')

  const [loading, setLoading] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [testing, setTesting] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Fetch settings when modal opens
  useEffect(() => {
    if (!isOpen) return

    const loadSettings = async () => {
      setLoading(true)
      setStatusMessage(null)
      try {
        const res = await fetch('/api/inquiries/settings')
        const json = await res.json()
        if (json.success && json.data) {
          setNotificationEmail(json.data.notificationEmail || 'sales@magicglass.co.in')
          setAdditionalEmails(json.data.additionalEmails || '')
          setEnableNotifications(
            json.data.enableNotifications !== undefined ? Boolean(json.data.enableNotifications) : true
          )
          setEmailSubjectPrefix(json.data.emailSubjectPrefix || '[Magic Glass Lead]')
        }
      } catch (err: any) {
        console.warn('Failed to load inquiry settings:', err)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [isOpen])

  if (!isOpen) return null

  // Save Settings handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatusMessage(null)

    try {
      const res = await fetch('/api/inquiries/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notificationEmail: notificationEmail.trim(),
          additionalEmails: additionalEmails.trim(),
          enableNotifications,
          emailSubjectPrefix: emailSubjectPrefix.trim(),
        }),
      })

      const json = await res.json()
      if (json.success) {
        setStatusMessage({
          type: 'success',
          text: '✓ Notification settings updated and active.',
        })
      } else {
        throw new Error(json.error || 'Failed to save settings')
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error saving settings: ${err.message || 'Unknown error'}`,
      })
    } finally {
      setSaving(false)
    }
  }

  // Test Email handler
  const handleTestEmail = async () => {
    setTesting(true)
    setStatusMessage(null)

    try {
      const res = await fetch('/api/inquiries/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetEmail: notificationEmail.trim() || 'sales@magicglass.co.in',
        }),
      })

      const json = await res.json()
      if (json.success) {
        setStatusMessage({
          type: 'success',
          text: `✓ Test email sent successfully to ${notificationEmail.trim()} via Hostinger SMTP.`,
        })
      } else {
        throw new Error(json.error || 'Failed to send test email')
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `SMTP Test Error: ${err.message || 'Failed to deliver test email'}`,
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.iconBadge}>
              <FiMail />
            </div>
            <div>
              <h2 className={styles.title}>Inquiry Email Alert Settings</h2>
              <p className={styles.subtitle}>Configure who receives website inquiry & lead notifications</p>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className={styles.body}>
          {/* Hostinger SMTP Status Card */}
          <div className={styles.serverBadge}>
            <div className={styles.serverBadgeHeader}>
              <span>Hostinger SMTP Delivery Engine</span>
              <span style={{ fontSize: '11px', color: '#34d399' }}>● Active</span>
            </div>
            <div>
              <strong>Sender:</strong> norepy@firefist.co.in &nbsp;|&nbsp; <strong>Host:</strong> smtp.hostinger.com:465 (SSL)
            </div>
            <div style={{ marginTop: '4px', opacity: 0.85, fontSize: '11px' }}>
              Only internal staff lead notifications are sent. Customer auto-replies are skipped.
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`${styles.alertBox} ${
                statusMessage.type === 'success' ? styles.alertSuccess : styles.alertError
              }`}
            >
              {statusMessage.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Toggle Notifications */}
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={enableNotifications}
              onChange={(e) => setEnableNotifications(e.target.checked)}
              className={styles.checkbox}
            />
            <span className={styles.checkboxLabel}>
              Enable automatic email notifications for new website inquiries
            </span>
          </label>

          {/* Primary Recipient Email */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Primary Notification Email *
            </label>
            <input
              type="email"
              required
              value={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.value)}
              placeholder="sales@magicglass.co.in"
              className={styles.input}
            />
            <span className={styles.hint}>
              Default: <strong>sales@magicglass.co.in</strong>. Receives instant alert when a visitor submits a quote or contact form.
            </span>
          </div>

          {/* Additional CC Emails */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Additional Recipients (CC)
            </label>
            <input
              type="text"
              value={additionalEmails}
              onChange={(e) => setAdditionalEmails(e.target.value)}
              placeholder="e.g. director@magicglass.co.in, manager@magicglass.co.in"
              className={styles.input}
            />
            <span className={styles.hint}>
              Optional. Comma-separated email addresses to receive inquiry copies.
            </span>
          </div>

          {/* Subject Prefix */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Email Subject Tag
            </label>
            <input
              type="text"
              value={emailSubjectPrefix}
              onChange={(e) => setEmailSubjectPrefix(e.target.value)}
              placeholder="[Magic Glass Lead]"
              className={styles.input}
            />
          </div>

          {/* Footer Controls */}
          <div className={styles.footer} style={{ margin: '10px -24px -24px -24px' }}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleTestEmail}
              disabled={testing || loading || !notificationEmail}
              title="Test Hostinger SMTP connection and send a sample email"
            >
              <FiSend /> {testing ? 'Sending Test...' : 'Send Test Email'}
            </button>

            <div className={styles.footerActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={saving || loading}
              >
                <FiSave /> {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
