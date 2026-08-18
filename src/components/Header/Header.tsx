'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import styles from './Header.module.css'

interface HeaderProps {
  onOpenQuoteDrawer?: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteDrawer }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuLinksRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (isMenuOpen && menuOverlayRef.current && menuLinksRef.current) {
      gsap.to(menuOverlayRef.current, {
        opacity: 1,
        pointerEvents: 'all',
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.fromTo(
        menuLinksRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      )
    } else if (menuOverlayRef.current) {
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Top Center Fixed Header */}
      <header className={styles.headerContainer}>
        <a href="#" className={styles.logoLink}>
          <Image
            src="/images/logo.png"
            alt="Magic Glass Logo"
            width={160}
            height={36}
            className={styles.logoImage}
            priority
          />
        </a>

        <nav className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            <li>
              <a href="#heritage" className={styles.navLink}>
                Company
              </a>
            </li>
            <li>
              <a href="#products" className={styles.navLink}>
                Products
              </a>
            </li>
            <li>
              <a href="#craftsmanship" className={styles.navLink}>
                Craftsmanship
              </a>
            </li>
            <li>
              <a href="#projects" className={styles.navLink}>
                Projects
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <button
            type="button"
            className="button--red"
            onClick={onOpenQuoteDrawer}
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.725rem' }}
          >
            GET A QUOTE
          </button>

          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`${styles.hamburgerLines} ${isMenuOpen ? styles.open : ''}`}>
              <span />
              <span />
            </div>
          </button>
        </div>
      </header>

      {/* Expanded Full-Screen Glass Overlay Menu */}
      <div ref={menuOverlayRef} className={styles.menuOverlay}>
        <div className={styles.menuContent}>
          <ul ref={menuLinksRef} className={styles.menuList}>
            <li>
              <a href="#heritage" onClick={() => setIsMenuOpen(false)}>
                Company & Factory
              </a>
            </li>
            <li>
              <a href="#products" onClick={() => setIsMenuOpen(false)}>
                Architectural Products
              </a>
            </li>
            <li>
              <a href="#craftsmanship" onClick={() => setIsMenuOpen(false)}>
                Engineering Craftsmanship
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => setIsMenuOpen(false)}>
                Featured Projects
              </a>
            </li>
            <li>
              <button
                type="button"
                className="button--red"
                onClick={() => {
                  setIsMenuOpen(false)
                  onOpenQuoteDrawer?.()
                }}
                style={{ marginTop: '1.5rem' }}
              >
                REQUEST TECHNICAL QUOTE
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
