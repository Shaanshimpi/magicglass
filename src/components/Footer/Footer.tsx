'use client'

import React from 'react'
import styles from './Footer.module.css'

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className={styles.footerSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Col 1: Factory Address */}
          <div>
            <div className="base-title" style={{ fontSize: '0.75rem', marginBottom: '1rem', color: '#cbd5e1' }}>
              MAGIC GLASS PRIVATE LIMITED
            </div>
            <p className={styles.addressText}>
              State-of-the-Art Processing Facility<br />
              Gurukripa Industrial Estate, Plot No. 813/2A,<br />
              Pune-Solapur Road, At Post Yavat,<br />
              Taluka Daund, Pune, Maharashtra 412214
            </p>
            <a href="mailto:sales@magicglass.co.in" className={styles.contactLink}>
              EMAIL: sales@magicglass.co.in
            </a>
            <a href="https://magicglass.co.in" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
              WEB: www.magicglass.co.in
            </a>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linksList}>
              <li><a href="#heritage">Company Heritage</a></li>
              <li><a href="#products">Product Systems</a></li>
              <li><a href="#projects">Project Showcase</a></li>
              <li><a href="#footer">Technical Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Glass Solutions */}
          <div>
            <h4 className={styles.colTitle}>Glass Solutions</h4>
            <ul className={styles.linksList}>
              <li><a href="#products">Double Glazed DGU</a></li>
              <li><a href="#products">Low-E SKN Ultra</a></li>
              <li><a href="#products">Sentry Laminated</a></li>
              <li><a href="#products">Acoustic PVB 42dB</a></li>
              <li><a href="#products">Ceramic Fritted</a></li>
              <li><a href="#products">Architectural Mirrors</a></li>
            </ul>
          </div>

          {/* Col 4: WhatsApp & Social */}
          <div>
            <h4 className={styles.colTitle}>Direct Connect</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="https://wa.me/919822000000" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366' }}>
                  WhatsApp Sales Chat →
                </a>
              </li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn Corporate</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram Showcase</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p>© {new Date().getFullYear()} Magic Glass Private Limited. All rights reserved.</p>
          <p>Pune, Maharashtra, India • Privacy Policy</p>
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
