'use client'

import React, { useState, useRef } from 'react'
import styles from './Dashboard.module.css'
import { LeftPageNav, STATIC_PAGE_NAV_CONFIG, PageRoute } from './LeftPageNav'
import { RightSectionInspector } from './RightSectionInspector'
import { InquiriesInboxView } from './InquiriesInboxView'
import {
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiRefreshCw,
  FiExternalLink,
  FiSidebar,
  FiEdit3,
  FiLayers,
} from 'react-icons/fi'

export const DashboardShell: React.FC = () => {
  const [activePage, setActivePage] = useState<PageRoute>(STATIC_PAGE_NAV_CONFIG[0])
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [openSidebar, setOpenSidebar] = useState<'left' | 'right'>('left')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const isInboxActive = activePage.id === 'inquiries-inbox'

  const handlePostMessageUpdate = (fieldPath: string, value: string) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'MAGIC_GLASS_CMS_PREVIEW_UPDATE',
          fieldPath,
          value,
        },
        '*'
      )
    }
  }

  const handleRefreshIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = `${activePage.path}?preview=true&t=${Date.now()}`
    }
  }

  const getViewportWidth = () => {
    if (viewportMode === 'mobile') return '375px'
    if (viewportMode === 'tablet') return '768px'
    return '100%'
  }

  const handleSelectPage = (page: PageRoute) => {
    setActivePage(page)
    if (page.id === 'inquiries-inbox') {
      setOpenSidebar('left')
    } else {
      setOpenSidebar('right')
      if (iframeRef.current) {
        iframeRef.current.src = `${page.path}?preview=true`
      }
    }
  }

  // Determine a clean display URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'

  return (
    <div
      data-lenis-prevent
      className={`${styles.dashboardContainer} ${
        isInboxActive
          ? styles.layoutInbox
          : openSidebar === 'left'
          ? styles.layoutLeftOpen
          : styles.layoutRightOpen
      }`}
    >
      {/* Left Column */}
      {openSidebar === 'left' || isInboxActive ? (
        <LeftPageNav activePageId={activePage.id} onSelectPage={handleSelectPage} />
      ) : (
        <div
          className={styles.collapsedRail}
          onClick={() => setOpenSidebar('left')}
          title="Click to open Page Navigation (closes Inspector)"
        >
          <FiLayers className={styles.collapsedRailIcon} />
          <span className={styles.collapsedRailText}>Pages Menu</span>
        </div>
      )}

      {/* Main Canvas */}
      {isInboxActive ? (
        <main className={styles.inboxMainCanvas}>
          <InquiriesInboxView />
        </main>
      ) : (
        <>
          {/* Center Canvas: Live Iframe Preview */}
          <main className={styles.centerCanvas}>
            <div className={styles.topControlBar}>
              {/* Toggle sidebars */}
              <div className={styles.deviceSelector}>
                <button
                  className={`${styles.deviceBtn} ${openSidebar === 'left' ? styles.deviceBtnActive : ''}`}
                  onClick={() => setOpenSidebar('left')}
                  title="Open Page Navigation"
                >
                  <FiSidebar style={{ verticalAlign: 'middle', marginRight: 4 }} /> Pages
                </button>
                <button
                  className={`${styles.deviceBtn} ${openSidebar === 'right' ? styles.deviceBtnActive : ''}`}
                  onClick={() => setOpenSidebar('right')}
                  title="Open Section Inspector"
                >
                  <FiEdit3 style={{ verticalAlign: 'middle', marginRight: 4 }} /> Inspector
                </button>
              </div>

              {/* Viewport controls */}
              <div className={styles.deviceSelector}>
                <button
                  className={`${styles.deviceBtn} ${viewportMode === 'desktop' ? styles.deviceBtnActive : ''}`}
                  onClick={() => setViewportMode('desktop')}
                  title="Desktop View"
                >
                  <FiMonitor style={{ verticalAlign: 'middle', marginRight: 4 }} /> Desktop
                </button>
                <button
                  className={`${styles.deviceBtn} ${viewportMode === 'tablet' ? styles.deviceBtnActive : ''}`}
                  onClick={() => setViewportMode('tablet')}
                  title="Tablet View"
                >
                  <FiTablet style={{ verticalAlign: 'middle', marginRight: 4 }} /> Tablet
                </button>
                <button
                  className={`${styles.deviceBtn} ${viewportMode === 'mobile' ? styles.deviceBtnActive : ''}`}
                  onClick={() => setViewportMode('mobile')}
                  title="Mobile View"
                >
                  <FiSmartphone style={{ verticalAlign: 'middle', marginRight: 4 }} /> Mobile
                </button>
              </div>

              <div className={styles.urlPill}>
                {baseUrl}{activePage.path}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button className={styles.deviceBtn} onClick={handleRefreshIframe} title="Reload Preview Frame">
                  <FiRefreshCw />
                </button>
                <a
                  href={activePage.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.deviceBtn}
                  title="Open Page in New Tab"
                >
                  <FiExternalLink />
                </a>
              </div>
            </div>

            <div className={styles.iframeWrapper}>
              <iframe
                ref={iframeRef}
                src={`${activePage.path}?preview=true`}
                className={styles.previewIframe}
                style={{ width: getViewportWidth() }}
                title={`Preview of ${activePage.label}`}
              />
            </div>
          </main>

          {/* Right Column: Section Inspector */}
          {openSidebar === 'right' ? (
            <RightSectionInspector
              activePage={activePage}
              onPostMessageUpdate={handlePostMessageUpdate}
              onRefreshIframe={handleRefreshIframe}
            />
          ) : (
            <div
              className={styles.collapsedRail}
              onClick={() => setOpenSidebar('right')}
              title="Click to open Section Inspector (closes Pages Menu)"
            >
              <FiEdit3 className={styles.collapsedRailIcon} />
              <span className={styles.collapsedRailText}>Section Inspector</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
