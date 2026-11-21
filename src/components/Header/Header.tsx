'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import styles from './Header.module.css'

interface HeaderProps {
  onOpenQuoteDrawer?: () => void
  isLoaded?: boolean
  onNavigatePreview?: (pageTab: string) => void
  cmsData?: {
    logo?: string
    navLinks?: Array<{ label: string; href: string }>
    ctaButtons?: Array<{ label: string; href: string; variant?: string }>
  }
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuoteDrawer,
  isLoaded = true,
  onNavigatePreview,
  cmsData,
}) => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const logoLinkRef = useRef<HTMLAnchorElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const menuOverlayRef = useRef<HTMLDivElement>(null)
  const menuLinksRef = useRef<HTMLUListElement>(null)

  // Automatically close mobile menu whenever route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

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
    handleCloseMenu()
    if (onNavigatePreview) {
      e.preventDefault()
      onNavigatePreview(pageTab)
    }
  }

  const defaultNavLinks = [
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Toughened Glass', href: '/products/toughened-glass' },
    { label: 'Industry Solution', href: '/industry-solution' },
    { label: 'Infrastructure', href: '/infrastructure' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact Us', href: '/contact-us' },
  ]

  const navItems = cmsData?.navLinks && cmsData.navLinks.length > 0
    ? cmsData.navLinks
    : defaultNavLinks

  const getPageTab = (href: string) => {
    if (href === '/about') return 'about'
    if (href === '/products') return 'products'
    if (href.includes('toughened-glass')) return 'toughened-glass'
    if (href.includes('industry-solution')) return 'industry-solution'
    if (href.includes('infrastructure')) return 'infrastructure'
    if (href.includes('projects')) return 'projects'
    if (href.includes('contact')) return 'contact-us'
    return href.replace(/^\//, '')
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
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, getPageTab(item.href))}
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, getPageTab(item.href))}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
