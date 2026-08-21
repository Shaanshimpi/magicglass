'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import styles from './Header.module.css'

interface HeaderProps {
  onOpenQuoteDrawer?: () => void
  isLoaded?: boolean
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteDrawer, isLoaded = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const logoLinkRef = useRef<HTMLAnchorElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuLinksRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (headerRef.current && logoLinkRef.current && navRef.current && actionsRef.current) {
      if (isLoaded) {
        gsap.to(headerRef.current, {
          backgroundColor: 'rgba(11, 16, 18, 0.85)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
          duration: 0.4,
          ease: 'power2.out',
        })
        gsap.to([logoLinkRef.current, navRef.current, actionsRef.current], {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    }
  }, [isLoaded])

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

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <header ref={headerRef} className={styles.headerContainer}>
        <Link ref={logoLinkRef} href="/" className={styles.logoLink}>
          <Image
            src="/images/logo.png"
            alt="Magic Glass Logo"
            width={160}
            height={36}
            className={styles.logoImage}
            priority
          />
        </Link>

        <nav ref={navRef} className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/" className={styles.navLink}>
                Company
              </Link>
            </li>
            <li>
              <Link href="/products" className={styles.navLink}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/#craftsmanship" className={styles.navLink}>
                Craftsmanship
              </Link>
            </li>
            <li>
              <Link href="/#projects" className={styles.navLink}>
                Projects
              </Link>
            </li>
          </ul>
        </nav>

        <div ref={actionsRef} className={styles.headerActions}>
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

      <div
        ref={menuOverlayRef}
        className={styles.menuOverlay}
        onClick={(e) => {
          if (e.target === menuOverlayRef.current) handleCloseMenu()
        }}
      >
        <button
          type="button"
          className={styles.closeOverlayBtn}
          onClick={handleCloseMenu}
          aria-label="Close menu"
        >
          ✕
        </button>

        <div className={styles.menuContent}>
          <ul ref={menuLinksRef} className={styles.menuList}>
            <li>
              <Link href="/" onClick={handleCloseMenu}>
                Company & Factory
              </Link>
            </li>
            <li>
              <Link href="/products" onClick={handleCloseMenu}>
                Architectural Products
              </Link>
            </li>
            <li>
              <Link href="/#craftsmanship" onClick={handleCloseMenu}>
                Engineering Craftsmanship
              </Link>
            </li>
            <li>
              <Link href="/#projects" onClick={handleCloseMenu}>
                Featured Projects
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="button--red"
                onClick={() => {
                  handleCloseMenu()
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
