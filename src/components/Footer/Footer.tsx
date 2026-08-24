'use client'

import React from 'react'
import styles from './Footer.module.css'

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Col 1: Corporate & Factory Offices & Contact Info */}
          <div>
            <div className="base-title" style={{ fontSize: '0.75rem', marginBottom: '1.25rem', color: '#cbd5e1' }}>
              MAGIC GLASS PRIVATE LIMITED
            </div>

            <div className={styles.officeBlock}>
              <h5 className={styles.officeHeading}>Corporate Office</h5>
              <p className={styles.addressText}>
                Boulevard Towers Phase-2, 9th Floor,<br />
                A1-901 & A1-902, Sadhu Vaswani Chowk,<br />
                Camp, Pune, Maharashtra – 411001
              </p>
            </div>

            <div className={styles.officeBlock}>
              <h5 className={styles.officeHeading}>Factory Office</h5>
              <p className={styles.addressText}>
                Gurukripa Industrial Estate,<br />
                National Highway No. 9, Gat No.: 813/2a,<br />
                At-Post Yavat, Tal: Daund, Dist: Pune – 412214
              </p>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <a href="tel:+917774017900" className={styles.contactLink}>
                TEL: +91-7774017900
              </a>
              <a href="mailto:info@magicglass.co.in" className={styles.contactLink}>
                EMAIL: info@magicglass.co.in
              </a>
              <a href="https://magicglass.co.in" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                WEB: www.magicglass.co.in
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linksList}>
              <li><a href="/#heritage">About</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/toughened-glass">Toughened Glass</a></li>
              <li><a href="/industry-solution">Industry Solution</a></li>
              <li><a href="/infrastructure">Infrastructure</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 3: Glass Solutions (Curated Core Working Products) */}
          <div>
            <h4 className={styles.colTitle}>Glass Solutions</h4>
            <ul className={styles.productsSubGrid}>
              <li><a href="/toughened-glass">Toughened Glass</a></li>
              <li><a href="/products/insulated-glass-dgu">DGU (Insulated)</a></li>
              <li><a href="/products/sentry-laminated-glass">Sentry Laminated</a></li>
              <li><a href="/products/acoustic-lami-glass">Acoustic Lami Glass</a></li>
              <li><a href="/products/high-performance-low-e-glass">Low-E Glass</a></li>
              <li><a href="/products/skn-ultra-high-performance-glass">SKN-Ultra Glass</a></li>
              <li><a href="/products/ceramic-glass">Ceramic Glass</a></li>
              <li><a href="/products/fire-safety-glass">Fire & Safety Glass</a></li>
            </ul>
            <a href="/products" className={styles.viewAllProductsLink}>
              View All Products →
            </a>
          </div>

          {/* Col 4: Direct Connect */}
          <div>
            <h4 className={styles.colTitle}>Direct Connect</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="https://wa.me/917774017900" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 600 }}>
                  WhatsApp Sales Chat →
                </a>
              </li>
              <li><a href="tel:+917774017900">Call: +91-7774017900</a></li>
              <li><a href="mailto:info@magicglass.co.in">info@magicglass.co.in</a></li>
              <li><a href="mailto:sales@magicglass.co.in">sales@magicglass.co.in</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p>© {new Date().getFullYear()} Magic Glass Private Limited. All rights reserved.</p>
          <p>Pune, Maharashtra, India • Premier Architectural Glass Processing</p>
        </div>
      </div>

      {/* Gigantic SVG Mask Wordmark Footer Logo */}
      <div className={styles.wordmarkWrapper}>
        <svg viewBox="0 0 1000 140" className={styles.wordmarkSvg}>
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="currentColor"
            fontSize="125"
            fontWeight="900"
            letterSpacing="-4"
            fontFamily="var(--font-outfit)"
          >
            MAGIC GLASS
          </text>
        </svg>
      </div>
    </footer>
  )
}
