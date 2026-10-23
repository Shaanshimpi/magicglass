import { ALL_PRODUCTS } from '@/components/ProductsCollection/products.data'
import React from 'react'

export interface PageRoute {
  id: string
  label: string
  path: string // Live site path for iframe preview (e.g. '/', '/about', '/toughened-glass', '/products/insulated-glass')
  dashboardPath: string // Bookmarkable Dashboard URL (e.g. '/dashboard/home', '/dashboard/about', '/dashboard/products/toughened-glass')
  cmsType: 'global' | 'collection'
  cmsSlug: string
  itemSlug?: string
  icon?: React.ReactNode
}

export const INQUIRIES_PAGE_ROUTE: PageRoute = {
  id: 'inquiries-inbox',
  label: 'Inquiries & Leads',
  path: '/inquiries',
  dashboardPath: '/dashboard/inquiries',
  cmsType: 'collection',
  cmsSlug: 'inquiries',
}

export const MEDIA_LIBRARY_PAGE_ROUTE: PageRoute = {
  id: 'media-library',
  label: 'Media & Asset Hub',
  path: '/media',
  dashboardPath: '/dashboard/media',
  cmsType: 'collection',
  cmsSlug: 'media',
}

export const STATIC_PAGE_NAV_CONFIG: PageRoute[] = [
  {
    id: 'home',
    label: 'Homepage',
    path: '/',
    dashboardPath: '/dashboard/home',
    cmsType: 'global',
    cmsSlug: 'home-page',
  },
  {
    id: 'about',
    label: 'About Us',
    path: '/about',
    dashboardPath: '/dashboard/about',
    cmsType: 'global',
    cmsSlug: 'about-page',
  },
  {
    id: 'products',
    label: 'Products Overview',
    path: '/products',
    dashboardPath: '/dashboard/products',
    cmsType: 'global',
    cmsSlug: 'products-page',
  },
  {
    id: 'projects',
    label: 'Projects Portfolio',
    path: '/projects',
    dashboardPath: '/dashboard/projects',
    cmsType: 'collection',
    cmsSlug: 'projects',
  },
  {
    id: 'industry',
    label: 'Industry Solution',
    path: '/industry-solution',
    dashboardPath: '/dashboard/industry-solution',
    cmsType: 'global',
    cmsSlug: 'industry-solution-page',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    path: '/infrastructure',
    dashboardPath: '/dashboard/infrastructure',
    cmsType: 'global',
    cmsSlug: 'infrastructure-page',
  },
  {
    id: 'contact',
    label: 'Contact Us',
    path: '/contact-us',
    dashboardPath: '/dashboard/contact-us',
    cmsType: 'global',
    cmsSlug: 'contact-us-page',
  },
]

export const GLOBAL_SHELL_NAV_CONFIG: PageRoute[] = [
  {
    id: 'header-shell',
    label: 'Header & Loader',
    path: '/',
    dashboardPath: '/dashboard/header',
    cmsType: 'global',
    cmsSlug: 'header',
  },
  {
    id: 'footer-shell',
    label: 'Footer & Offices',
    path: '/',
    dashboardPath: '/dashboard/footer',
    cmsType: 'global',
    cmsSlug: 'footer',
  },
  {
    id: 'quote-drawer-shell',
    label: 'Quote Drawer',
    path: '/',
    dashboardPath: '/dashboard/quote-drawer',
    cmsType: 'global',
    cmsSlug: 'quote-drawer',
  },
]

export function formatSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function createProductPageRoute(slug: string, title?: string): PageRoute {
  const cleanSlug = slug.trim().toLowerCase()
  const found = ALL_PRODUCTS.find((p) => p.id === cleanSlug)
  const displayTitle = title || (found ? found.title : formatSlugToTitle(cleanSlug))
  const previewPath = cleanSlug === 'toughened-glass' ? '/toughened-glass' : `/products/${cleanSlug}`

  return {
    id: `pdp-${cleanSlug}`,
    label: displayTitle,
    path: previewPath,
    dashboardPath: `/dashboard/products/${cleanSlug}`,
    cmsType: 'collection',
    cmsSlug: 'products',
    itemSlug: cleanSlug,
  }
}

/**
 * Resolves a URL slug array into a canonical Dashboard PageRoute
 * @param slugParts - e.g. [] -> Homepage, ['inquiries'], ['media'], ['about'], ['products', 'toughened-glass']
 */
export function resolveDashboardRoute(slugParts?: string[]): PageRoute {
  if (!slugParts || slugParts.length === 0) {
    return STATIC_PAGE_NAV_CONFIG[0] // Default to Homepage
  }

  const first = slugParts[0].toLowerCase()

  // 1. Submissions & Inquiries
  if (first === 'inquiries' || first === 'submissions' || first === 'leads') {
    return INQUIRIES_PAGE_ROUTE
  }

  // 2. Media Hub & Assets
  if (first === 'media' || first === 'assets' || first === 'media-library') {
    return MEDIA_LIBRARY_PAGE_ROUTE
  }

  // 3. Global Shells
  if (first === 'header' || first === 'header-shell') {
    return GLOBAL_SHELL_NAV_CONFIG[0]
  }
  if (first === 'footer' || first === 'footer-shell') {
    return GLOBAL_SHELL_NAV_CONFIG[1]
  }
  if (first === 'quote-drawer' || first === 'quote-drawer-shell' || first === 'quote') {
    return GLOBAL_SHELL_NAV_CONFIG[2]
  }

  // 4. Products route handling
  if (first === 'products' || first === 'pdp') {
    if (slugParts.length > 1 && slugParts[1]) {
      return createProductPageRoute(slugParts[1])
    }
    // Just /dashboard/products -> Products overview static page
    return STATIC_PAGE_NAV_CONFIG[2]
  }

  // 5. Static Pages
  if (first === 'home' || first === 'homepage') return STATIC_PAGE_NAV_CONFIG[0]
  if (first === 'about' || first === 'about-us') return STATIC_PAGE_NAV_CONFIG[1]
  if (first === 'projects') return STATIC_PAGE_NAV_CONFIG[3]
  if (first === 'industry-solution' || first === 'industry' || first === 'solutions') {
    return STATIC_PAGE_NAV_CONFIG[4]
  }
  if (first === 'infrastructure') return STATIC_PAGE_NAV_CONFIG[5]
  if (first === 'contact-us' || first === 'contact') return STATIC_PAGE_NAV_CONFIG[6]

  // 6. Direct product slug: e.g. /dashboard/toughened-glass
  const directProduct = ALL_PRODUCTS.find((p) => p.id === first)
  if (directProduct) {
    return createProductPageRoute(directProduct.id, directProduct.title)
  }

  // 7. Sub-path globals: e.g. /dashboard/global/header
  if ((first === 'global' || first === 'shell') && slugParts.length > 1) {
    const second = slugParts[1].toLowerCase()
    if (second === 'header') return GLOBAL_SHELL_NAV_CONFIG[0]
    if (second === 'footer') return GLOBAL_SHELL_NAV_CONFIG[1]
    if (second === 'quote' || second === 'quote-drawer') return GLOBAL_SHELL_NAV_CONFIG[2]
  }

  // Fallback to Homepage
  return STATIC_PAGE_NAV_CONFIG[0]
}
