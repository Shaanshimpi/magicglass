'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Dashboard.module.css'
import { ProductCreateModal } from './ProductCreateModal'
import { ALL_PRODUCTS } from '@/components/ProductsCollection/products.data'
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
} from 'react-icons/fi'

export interface PageRoute {
  id: string
  label: string
  path: string
  cmsType: 'global' | 'collection'
  cmsSlug: string
  itemSlug?: string
  icon?: React.ReactNode
}

export const INQUIRIES_PAGE_ROUTE: PageRoute = {
  id: 'inquiries-inbox',
  label: 'Inquiries & Leads',
  path: '/inquiries',
  cmsType: 'collection',
  cmsSlug: 'inquiries',
  icon: <FiInbox />,
}

const DEFAULT_INITIAL_PRODUCTS = ALL_PRODUCTS.map((p) => ({
  id: p.id,
  slug: p.id,
  title: p.title,
  category: p.category,
}))

export const STATIC_PAGE_NAV_CONFIG: PageRoute[] = [
  { id: 'home', label: 'Homepage', path: '/', cmsType: 'global', cmsSlug: 'home-page', icon: <FiHome /> },
  { id: 'about', label: 'About Us', path: '/about', cmsType: 'global', cmsSlug: 'about-page', icon: <FiInfo /> },
  { id: 'products', label: 'Products Overview', path: '/products', cmsType: 'global', cmsSlug: 'products-page', icon: <FiGrid /> },
  { id: 'projects', label: 'Projects Portfolio', path: '/projects', cmsType: 'collection', cmsSlug: 'projects', icon: <FiFolder /> },
  { id: 'industry', label: 'Industry Solution', path: '/industry-solution', cmsType: 'global', cmsSlug: 'industry-solution-page', icon: <FiBriefcase /> },
  { id: 'infrastructure', label: 'Infrastructure', path: '/infrastructure', cmsType: 'global', cmsSlug: 'infrastructure-page', icon: <FiCpu /> },
  { id: 'contact', label: 'Contact Us', path: '/contact-us', cmsType: 'global', cmsSlug: 'contact-us-page', icon: <FiPhoneCall /> },
]

export const GLOBAL_SHELL_NAV_CONFIG: PageRoute[] = [
  { id: 'header-shell', label: 'Header & Loader', path: '/', cmsType: 'global', cmsSlug: 'header', icon: <FiMenu /> },
  { id: 'footer-shell', label: 'Footer & Offices', path: '/', cmsType: 'global', cmsSlug: 'footer', icon: <FiLayout /> },
  { id: 'quote-drawer-shell', label: 'Quote Drawer', path: '/', cmsType: 'global', cmsSlug: 'quote-drawer', icon: <FiSliders /> },
]

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

  const prodSlugToPath = (slug: string) =>
    slug === 'toughened-glass' ? '/toughened-glass' : `/products/${slug}`

  const handleProductCreated = (newProd: { slug: string; title: string; category: string }) => {
    fetchProducts()
    onSelectPage({
      id: `pdp-${newProd.slug}`,
      label: newProd.title,
      path: prodSlugToPath(newProd.slug),
      cmsType: 'collection',
      cmsSlug: 'products',
      itemSlug: newProd.slug,
      icon: <FiBox />,
    })
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
        <div
          className={`${styles.navItem} ${styles.inquiriesNavItem} ${
            activePageId === 'inquiries-inbox' ? styles.navItemActive : ''
          }`}
          onClick={() => onSelectPage(INQUIRIES_PAGE_ROUTE)}
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
        </div>

        {/* 2. Primary Site Pages */}
        <div className={styles.sectionGroupTitle} style={{ marginTop: '18px' }}>
          Site Pages
        </div>
        {STATIC_PAGE_NAV_CONFIG.map((page) => {
          const isSelected = activePageId === page.id && !activeItemSlug
          return (
            <div
              key={page.id}
              className={`${styles.navItem} ${isSelected ? styles.navItemActive : ''}`}
              onClick={() => onSelectPage(page)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '15px' }}>{page.icon}</span>
                <span>{page.label}</span>
              </div>
              <FiChevronRight style={{ fontSize: '14px', opacity: isSelected ? 1 : 0.4 }} />
            </div>
          )
        })}

        {/* 3. Products PDP Catalog */}
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
              const pageObj: PageRoute = {
                id: `pdp-${prod.slug}`,
                label: prod.title,
                path: prodSlugToPath(prod.slug),
                cmsType: 'collection',
                cmsSlug: 'products',
                itemSlug: prod.slug,
                icon: <FiBox />,
              }
              const isSelected = activeItemSlug === prod.slug || activePageId === `pdp-${prod.slug}`

              return (
                <div
                  key={prod.slug}
                  className={`${styles.navItem} ${styles.productNavItem} ${isSelected ? styles.navItemActive : ''}`}
                  onClick={() => onSelectPage(pageObj)}
                  title={`Edit PDP: ${prod.title}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <FiBox style={{ fontSize: '13px', flexShrink: 0, opacity: 0.8 }} />
                    <span className={styles.productNavTitle}>{prod.title}</span>
                  </div>
                  <span className={styles.productNavBadge}>
                    {prod.category?.slice(0, 4).toUpperCase()}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* 4. Site Globals & Shell */}
        <div className={styles.sectionGroupTitle} style={{ marginTop: '18px' }}>
          Site Globals & Shell
        </div>
        {GLOBAL_SHELL_NAV_CONFIG.map((page) => {
          const isSelected = activePageId === page.id
          return (
            <div
              key={page.id}
              className={`${styles.navItem} ${isSelected ? styles.navItemActive : ''}`}
              onClick={() => onSelectPage(page)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '15px' }}>{page.icon}</span>
                <span>{page.label}</span>
              </div>
              <FiChevronRight style={{ fontSize: '14px', opacity: isSelected ? 1 : 0.4 }} />
            </div>
          )
        })}

        {/* 5. Active User & Auth Controls */}
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
