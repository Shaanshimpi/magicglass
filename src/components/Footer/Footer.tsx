'use client'

import React from 'react'
import styles from './Footer.module.css'

interface FooterProps {
  cmsData?: any
}

export const Footer: React.FC<FooterProps> = ({ cmsData }) => {
  const companyName = cmsData?.companyName || 'MAGIC GLASS PRIVATE LIMITED'
  const corporateOffice = cmsData?.corporateOffice || {
    heading: 'CORPORATE OFFICE',
    address:
      'Boulevard Towers Phase-2, 9th Floor, A1-901 & A1-902, Sadhu Vaswani Chowk, Camp, Pune, Maharashtra – 411001',
  }

  const factoryOffice = cmsData?.factoryOffice || {
    heading: 'FACTORY OFFICE',
    address:
      'Gurukripa Ind. Estate, National Highway No. 9, Survey No.: 813/8 & 813/9, At-Post Yavat, Tal: Daund, Dist: Pune Pin Code – 412214',
  }

  const mainNav = cmsData?.mainNavLinks?.length
    ? cmsData.mainNavLinks
    : [
        { label: 'About Us', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Industry Solution', href: '/industry-solution' },
        { label: 'Infrastructure', href: '/infrastructure' },
        { label: 'Projects Portfolio', href: '/projects' },
        { label: 'Contact Us', href: '/contact-us' },
      ]

  const glassSolutions = cmsData?.glassSolutionsLinks?.length
    ? cmsData.glassSolutionsLinks
    : [
        { label: 'Toughened Glass', href: '/toughened-glass' },
        { label: 'Double Glazed Unit (DGU)', href: '/products/insulated-glass-dgu' },
        { label: 'Sentry Laminated Glass', href: '/products/sentry-laminated-glass' },
        { label: 'Acoustic Laminated Glass', href: '/products/acoustic-lami-glass' },
        { label: 'Low-E Glass Processing', href: '/products/high-performance-low-e-glass' },
        { label: 'SKN-Ultra High-Performance Glass', href: '/products/skn-ultra-high-performance-glass' },
        { label: 'Ceramic Glass', href: '/products/ceramic-glass' },
        { label: 'Fire & Safety Glass', href: '/products/fire-safety-glass' },
      ]

  const directConnect = cmsData?.directConnectLinks?.length
    ? cmsData.directConnectLinks
    : [
        { label: 'WhatsApp Sales Chat →', href: 'https://wa.me/917774017900', type: 'whatsapp' },
        { label: 'Call: +91-7774017900', href: 'tel:+917774017900', type: 'phone' },
        { label: 'sales@magicglass.co.in', href: 'mailto:sales@magicglass.co.in', type: 'email' },
      ]

  const copyrightText =
    cmsData?.copyrightText ||
    `© ${new Date().getFullYear()} Magic Glass Private Limited. All rights reserved.`

  const cityTagline =
    cmsData?.cityTagline ||
    'Pune, Maharashtra, India • Premier Architectural Glass Processing'

  const wordmarkText = cmsData?.wordmarkText || 'MAGIC GLASS'

  return (
    <footer id="footer" className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Col 1: Corporate & Factory Offices & Contact Info */}
          <div>
            <div
              className="base-title"
              style={{ marginBottom: '1.25rem', color: 'var(--color-crimson)' }}
              data-cms-field="companyName"
            >
              {companyName}
            </div>

            <div className={styles.officeBlock}>
              <h5 className={styles.officeHeading} data-cms-field="corporateOffice_heading">
                {corporateOffice.heading || 'CORPORATE OFFICE'}
              </h5>
              <p className={styles.addressText} style={{ whiteSpace: 'pre-line' }} data-cms-field="corporateOffice_address">
                {corporateOffice.address}
              </p>
            </div>

            <div className={styles.officeBlock}>
              <h5 className={styles.officeHeading} data-cms-field="factoryOffice_heading">
                {factoryOffice.heading || 'FACTORY OFFICE'}
              </h5>
              <p className={styles.addressText} style={{ whiteSpace: 'pre-line' }} data-cms-field="factoryOffice_address">
                {factoryOffice.address}
              </p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linksList}>
              {mainNav.map((link: any, idx: number) => (
                <li key={idx}>
                  <a href={link.href} data-cms-field={`mainNavLinks_${idx}_label`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Glass Solutions */}
          <div>
            <h4 className={styles.colTitle}>Glass Solutions</h4>
            <ul className={styles.productsSubGrid}>
              {glassSolutions.map((link: any, idx: number) => (
                <li key={idx}>
                  <a href={link.href} data-cms-field={`glassSolutionsLinks_${idx}_label`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="/products" className={styles.viewAllProductsLink}>
              View All Products →
            </a>
          </div>

          {/* Col 4: Direct Connect */}
          <div>
            <h4 className={styles.colTitle}>Direct Connect</h4>
            <ul className={styles.linksList}>
              {directConnect.map((link: any, idx: number) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={
                      link.type === 'whatsapp' || link.href.includes('wa.me')
                        ? { color: '#25D366', fontWeight: 600 }
                        : undefined
                    }
                    data-cms-field={`directConnectLinks_${idx}_label`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p data-cms-field="copyrightText">{copyrightText}</p>
          <div className={styles.bottomCenterAction}>
            <a
              href="/login"
              id="footer-staff-login-btn"
              className={styles.staffLoginBtn}
              title="Staff Login & Production CMS Dashboard"
            >
              <svg
                className={styles.staffLockIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Staff Login / Dashboard</span>
            </a>
          </div>
          <p data-cms-field="cityTagline">{cityTagline}</p>
        </div>
      </div>

      <div className={styles.giantWordmarkContainer} aria-hidden="true">
        <span className={styles.giantWordmarkText} data-cms-field="wordmarkText">
          {wordmarkText}
        </span>
      </div>
    </footer>
  )
}
