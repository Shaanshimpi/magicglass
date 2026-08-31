'use client'

import React, { useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import { ProductCreateModal } from './ProductCreateModal'
import {
  FiHome,
  FiInfo,
  FiGrid,
  FiFolder,
  FiBriefcase,
  FiCpu,
  FiPhoneCall,
  FiChevronRight,
  FiLayout,
  FiSliders,
  FiMenu,
  FiBox,
  FiPlus,
  FiRefreshCw,
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
  const [productsList, setProductsList] = useState<Array<{ id: string; slug: string; title: string; category: string }>>([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  const fetchProducts = async () => {
    setLoadingProducts(true)
    try {
      const res = await fetch('/api/cms/get?type=collection&slug=products')
      const json = await res.json()
      if (json.success && Array.isArray(json.data)) {
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
  }, [])

  const handleProductCreated = (newProd: { slug: string; title: string; category: string }) => {
    fetchProducts()
    onSelectPage({
      id: `pdp-${newProd.slug}`,
      label: newProd.title,
      path: `/products/${newProd.slug}`,
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

        {/* 1. Primary Site Pages */}
        <div className={styles.sectionGroupTitle}>Site Pages</div>
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

        {/* 2. Products PDP Catalog */}
        <div
          className={styles.sectionGroupTitle}
          style={{
            marginTop: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Product Catalog ({productsList.length})</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              className={styles.actionIconBtn}
              onClick={fetchProducts}
              title="Refresh Products"
            >
              <FiRefreshCw size={11} className={loadingProducts ? styles.spinIcon : ''} />
            </button>
            <button
              type="button"
              className={styles.actionIconBtn}
              onClick={() => setIsProductModalOpen(true)}
              title="Add New Product PDP"
            >
              <FiPlus size={12} /> Add
            </button>
          </div>
        </div>

        <div className={styles.productsNavScroll}>
          {productsList.map((prod) => {
            const pageObj: PageRoute = {
              id: `pdp-${prod.slug}`,
              label: prod.title,
              path: prod.slug === 'toughened-glass' ? '/toughened-glass' : `/products/${prod.slug}`,
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

        {/* 3. Site Globals & Shell */}
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
      </aside>

      <ProductCreateModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onCreated={handleProductCreated}
      />
    </>
  )
}
