'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import styles from './Header.module.css'

interface HeaderProps {
  onOpenQuoteDrawer?: () => void
  isLoaded?: boolean
  onNavigatePreview?: (pageTab: string) => void
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuoteDrawer,
  isLoaded = true,
  onNavigatePreview,
}) => {
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
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
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

  const handleNavClick = (e: React.MouseEvent, pageTab: string) => {
    if (onNavigatePreview) {
      e.preventDefault()
      onNavigatePreview(pageTab)
      handleCloseMenu()
    }
  }

  return (
    <>
      <header ref={headerRef} className={styles.headerContainer}>
        <Link
          ref={logoLinkRef}
          href="/"
          className={styles.logoLink}
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <Image
            src="/images/logo.png"
            alt="Magic Glass Logo"
            width={150}
            height={50}
            className={styles.logoImage}
            priority
          />
        </Link>

        <nav ref={navRef} className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            <li>
              <Link
                href="/about"
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, 'products')}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/toughened-glass"
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, 'toughened-glass')}
              >
                Toughened Glass
              </Link>
            </li>
            <li>
              <Link
                href="/industry-solution"
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, 'industry-solution')}
              >
                Industry Solution
              </Link>
            </li>
            <li>
              <Link
                href="/infrastructure"
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, 'infrastructure')}
              >
                Infrastructure
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, 'contact-us')}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <div ref={actionsRef} className={styles.headerActions}>
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
              <Link
                href="/about"
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                onClick={(e) => handleNavClick(e, 'products')}
              >
                Architectural Products
              </Link>
            </li>
            <li>
              <Link
                href="/toughened-glass"
                onClick={(e) => handleNavClick(e, 'toughened-glass')}
              >
                Toughened Glass
              </Link>
            </li>
            <li>
              <Link
                href="/industry-solution"
                onClick={(e) => handleNavClick(e, 'industry-solution')}
              >
                Industry Solutions
              </Link>
            </li>
            <li>
              <Link
                href="/infrastructure"
                onClick={(e) => handleNavClick(e, 'infrastructure')}
              >
                Infrastructure & BOQ
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                Featured Projects
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                onClick={(e) => handleNavClick(e, 'contact-us')}
              >
                Contact Us
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
                style={{ marginTop: '1.25rem' }}
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
