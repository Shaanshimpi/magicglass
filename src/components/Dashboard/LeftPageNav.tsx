'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Dashboard.module.css'
import { ProductCreateModal } from './ProductCreateModal'
import { ALL_PRODUCTS } from '@/components/ProductsCollection/products.data'
import {
  PageRoute,
  INQUIRIES_PAGE_ROUTE,
  MEDIA_LIBRARY_PAGE_ROUTE,
  STATIC_PAGE_NAV_CONFIG,
  GLOBAL_SHELL_NAV_CONFIG,
  createProductPageRoute,
  resolveDashboardRoute,
  formatSlugToTitle,
} from './dashboardRoutes'
import {
  FiHome,
  FiInfo,
  FiGrid,
  FiFolder,
  FiBriefcase,
  FiCpu,
  FiPhoneCall,
  FiChevronRight,
  FiChevronDown,
  FiLayout,
  FiSliders,
  FiMenu,
  FiBox,
  FiPlus,
  FiRefreshCw,
  FiLogOut,
  FiShield,
  FiLock,
  FiInbox,
  FiImage,
} from 'react-icons/fi'

export type { PageRoute }
export {
  INQUIRIES_PAGE_ROUTE,
  MEDIA_LIBRARY_PAGE_ROUTE,
  STATIC_PAGE_NAV_CONFIG,
  GLOBAL_SHELL_NAV_CONFIG,
  createProductPageRoute,
  resolveDashboardRoute,
  formatSlugToTitle,
}

export function getPageIcon(id: string): React.ReactNode {
  switch (id) {
    case 'home':
      return <FiHome />
    case 'about':
      return <FiInfo />
    case 'products':
      return <FiGrid />
    case 'projects':
      return <FiFolder />
    case 'industry':
      return <FiBriefcase />
    case 'infrastructure':
      return <FiCpu />
    case 'contact':
      return <FiPhoneCall />
    case 'header-shell':
      return <FiMenu />
    case 'footer-shell':
      return <FiLayout />
    case 'quote-drawer-shell':
      return <FiSliders />
    case 'inquiries-inbox':
      return <FiInbox />
    case 'media-library':
      return <FiImage />
    default:
      if (id.startsWith('pdp-')) return <FiBox />
      return <FiLayout />
  }
}

const DEFAULT_INITIAL_PRODUCTS = ALL_PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.id,
  title: p.title,
  category: p.category,
}))

interface LeftPageNavProps {
  activePageId: string
  activeItemSlug?: string
  onSelectPage: (page: PageRoute) => void
}

export const LeftPageNav: React.FC<LeftPageNavProps> = ({
  activePageId,
  activeItemSlug,
  onSelectPage,
}) => {
  const router = useRouter()
  const [productsList, setProductsList] = useState<Array<{ id: string; slug: string; title: string; category: string }>>(
    DEFAULT_INITIAL_PRODUCTS
  )
  const [isProductsOpen, setIsProductsOpen] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loggingOut, setLoggingOut] = useState(false)
  const [newInquiriesCount, setNewInquiriesCount] = useState<number>(0)

  // Fetch current authenticated user
  const fetchUserSession = async () => {
    try {
      const res = await fetch('/api/users/me', { credentials: 'include' })
      if (res.ok) {
        const json = await res.json()
        if (json.user) {
          setCurrentUser(json.user)
        }
      }
    } catch (err) {
      console.warn('Failed to load user session in dashboard:', err)
    }
  }

  // Fetch unread inquiries count
  const fetchInquiriesCount = async () => {
    try {
      const res = await fetch('/api/inquiries')
      const json = await res.json()
      if (json.success && json.stats) {
        setNewInquiriesCount(json.stats.newCount || 0)
      }
    } catch (err) {
      console.warn('Failed to fetch inquiries count:', err)
    }
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
      router.push('/login')
    } catch (err) {
      console.warn('Logout failed:', err)
      router.push('/login')
    } finally {
      setLoggingOut(false)
    }
  }

  const fetchProducts = async () => {
    setLoadingProducts(true)
    try {
      const res = await fetch('/api/cms/get?type=collection&slug=products')
      const json = await res.json()
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setProductsList(
          json.data.map((doc: any) => ({
            id: doc.id,
            slug: doc.slug,
            title: doc.title,
            category: doc.category,
          }))
        )
      }
    } catch (err) {
      console.warn('Failed to load products list for dashboard nav:', err)
    } finally {
      setLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchUserSession()
    fetchInquiriesCount()
  }, [])

  useEffect(() => {
    if (activeItemSlug || activePageId.startsWith('pdp-')) {
      setIsProductsOpen(true)
    }
  }, [activeItemSlug, activePageId])

  const handleProductCreated = (newProd: { slug: string; title: string; category: string }) => {
    fetchProducts()
    const pageObj = createProductPageRoute(newProd.slug, newProd.title)
    onSelectPage(pageObj)
  }

  return (
    <>
      <aside className={styles.leftSidebar} data-lenis-prevent>
        <div className={styles.brandHeader}>
          <div className={styles.logoBadge}>MG</div>
          <div>
            <div className={styles.brandName}>Magic Glass CMS</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>PostgreSQL Live Engine</div>
          </div>
        </div>

        {/* 1. Form Submissions */}
        <div className={styles.sectionGroupTitle}>Submissions</div>
        <a
          href={INQUIRIES_PAGE_ROUTE.dashboardPath}
          className={`${styles.navItem} ${styles.inquiriesNavItem} ${
            activePageId === 'inquiries-inbox' ? styles.navItemActive : ''
          }`}
          onClick={(e) => {
            e.preventDefault()
            onSelectPage(INQUIRIES_PAGE_ROUTE)
          }}
          title="View Form Submissions and Inquiries"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '16px', color: activePageId === 'inquiries-inbox' ? '#fff' : '#ef4444' }}>
              <FiInbox />
            </span>
            <span style={{ fontWeight: 600 }}>Inquiries & Messages</span>
          </div>
          {newInquiriesCount > 0 ? (
            <span className={styles.newInquiryBadge}>
              {newInquiriesCount}
            </span>
          ) : (
            <FiChevronRight style={{ fontSize: '14px', opacity: activePageId === 'inquiries-inbox' ? 1 : 0.4 }} />
          )}
        </a>

        {/* 2. Media & Asset Hub */}
        <div className={styles.sectionGroupTitle} style={{ marginTop: '16px' }}>Assets & CDN</div>
        <a
          href={MEDIA_LIBRARY_PAGE_ROUTE.dashboardPath}
          className={`${styles.navItem} ${styles.inquiriesNavItem} ${
            activePageId === 'media-library' ? styles.navItemActive : ''
          }`}
          onClick={(e) => {
            e.preventDefault()
            onSelectPage(MEDIA_LIBRARY_PAGE_ROUTE)
          }}
          title="Media Library & Asset Hub (Upload, View, Copy Links, Share)"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '16px', color: activePageId === 'media-library' ? '#fff' : '#38bdf8' }}>
              <FiImage />
            </span>
            <span style={{ fontWeight: 600 }}>Media & Asset Hub</span>
          </div>
          <FiChevronRight style={{ fontSize: '14px', opacity: activePageId === 'media-library' ? 1 : 0.4 }} />
        </a>

        {/* 3. Primary Site Pages */}
        <div className={styles.sectionGroupTitle} style={{ marginTop: '18px' }}>
          Site Pages
        </div>
        {STATIC_PAGE_NAV_CONFIG.map((page) => {
          const isSelected = activePageId === page.id && !activeItemSlug
          return (
            <a
              key={page.id}
              href={page.dashboardPath}
              className={`${styles.navItem} ${isSelected ? styles.navItemActive : ''}`}
              onClick={(e) => {
                e.preventDefault()
                onSelectPage(page)
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '15px' }}>{page.icon || getPageIcon(page.id)}</span>
                <span>{page.label}</span>
              </div>
              <FiChevronRight style={{ fontSize: '14px', opacity: isSelected ? 1 : 0.4 }} />
            </a>
          )
        })}

        {/* 4. Products PDP Catalog */}
        <div
          className={styles.sectionGroupTitle}
          style={{
            marginTop: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <span
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isProductsOpen ? <FiChevronDown size={12} /> : <FiChevronRight size={12} />}
            <span>Product Catalog ({productsList.length})</span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              className={styles.actionIconBtn}
              onClick={(e) => {
                e.stopPropagation()
                fetchProducts()
              }}
              title="Refresh Products"
            >
              <FiRefreshCw size={11} className={loadingProducts ? styles.spinIcon : ''} />
            </button>
            <button
              type="button"
              className={styles.actionIconBtn}
              onClick={(e) => {
                e.stopPropagation()
                setIsProductModalOpen(true)
              }}
              title="Add New Product PDP"
            >
              <FiPlus size={12} /> Add
            </button>
          </div>
        </div>

        {isProductsOpen && (
          <div className={styles.productsNavScroll}>
            {productsList.map((prod) => {
              const pageObj = createProductPageRoute(prod.slug, prod.title)
              const isSelected = activeItemSlug === prod.slug || activePageId === `pdp-${prod.slug}`

              return (
                <a
                  key={prod.slug}
                  href={pageObj.dashboardPath}
                  className={`${styles.navItem} ${styles.productNavItem} ${isSelected ? styles.navItemActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onSelectPage(pageObj)
                  }}
                  title={`Edit PDP: ${prod.title}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <FiBox style={{ fontSize: '13px', flexShrink: 0, opacity: 0.8 }} />
                    <span className={styles.productNavTitle}>{prod.title}</span>
                  </div>
                  <span className={styles.productNavBadge}>
                    {prod.category?.slice(0, 4).toUpperCase()}
                  </span>
                </a>
              )
            })}
          </div>
        )}

        {/* 5. Site Globals & Shell */}
        <div className={styles.sectionGroupTitle} style={{ marginTop: '18px' }}>
          Site Globals & Shell
        </div>
        {GLOBAL_SHELL_NAV_CONFIG.map((page) => {
          const isSelected = activePageId === page.id
          return (
            <a
              key={page.id}
              href={page.dashboardPath}
              className={`${styles.navItem} ${isSelected ? styles.navItemActive : ''}`}
              onClick={(e) => {
                e.preventDefault()
                onSelectPage(page)
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '15px' }}>{page.icon || getPageIcon(page.id)}</span>
                <span>{page.label}</span>
              </div>
              <FiChevronRight style={{ fontSize: '14px', opacity: isSelected ? 1 : 0.4 }} />
            </a>
          )
        })}

        {/* 6. Active User & Auth Controls */}
        <div className={styles.userProfileFooter}>
          {currentUser ? (
            <>
              <div className={styles.userCard}>
                <div className={styles.userAvatarMini}>
                  {currentUser.name?.[0] || currentUser.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userEmail} title={currentUser.email}>
                    {currentUser.name || currentUser.email}
                  </div>
                  <span
                    className={`${styles.userRoleBadge} ${
                      currentUser.role === 'admin'
                        ? styles.userRoleAdmin
                        : styles.userRoleManager
                    }`}
                  >
                    {currentUser.role === 'admin' ? 'ADMIN' : 'MANAGER'}
                  </span>
                </div>
              </div>

              <div className={styles.userNavActions}>
                {currentUser.role === 'admin' && (
                  <a
                    href="/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.userActionBtn}
                    title="Open Payload CMS Admin Panel"
                  >
                    <FiLock size={11} /> Admin CMS
                  </a>
                )}
                <button
                  type="button"
                  className={styles.userActionBtn}
                  onClick={handleLogout}
                  disabled={loggingOut}
                  title="Sign out of Dashboard"
                >
                  <FiLogOut size={11} /> {loggingOut ? '...' : 'Sign Out'}
                </button>
              </div>
            </>
          ) : (
            <div className={styles.userNavActions}>
              <button
                type="button"
                className={styles.userActionBtn}
                onClick={() => router.push('/staff-login')}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <FiShield size={11} /> Staff Login Portal
              </button>
            </div>
          )}
        </div>
      </aside>

      <ProductCreateModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onCreated={handleProductCreated}
      />
    </>
  )
}
