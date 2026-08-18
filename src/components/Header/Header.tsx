'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
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

  // Step 1: Pill in Top Center -> Step 2: Slides Top Center to Top Left -> Step 3: Whole Header Appears
  useEffect(() => {
    if (isLoaded && headerRef.current && logoLinkRef.current && navRef.current && actionsRef.current) {
      const tl = gsap.timeline({ delay: 0.1 })

      // Calculate distance to center: header container center minus logo center
      const containerWidth = headerRef.current.offsetWidth
      const logoWidth = logoLinkRef.current.offsetWidth
      // Offset required to place the logo exactly in the horizontal center of the header container
      const centerX = (containerWidth / 2) - (logoWidth / 2) - 28

      // Step 1: Logo Pill appears cleanly in TOP CENTER
      tl.set(logoLinkRef.current, {
        x: centerX,
        opacity: 0,
        scale: 1.12,
      })
      .to(logoLinkRef.current, {
        opacity: 1,
        scale: 1.05,
        duration: 0.5,
        ease: 'power3.out',
      })

      // Step 2: Logo Pill slides from TOP CENTER -> TOP LEFT
      .to(logoLinkRef.current, {
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.inOut',
      }, '+=0.2')

      // Step 3: Rest of Header Elements Appear (Glass dock background + Nav + CTA)
      .to(
        headerRef.current,
        {
          backgroundColor: 'rgba(14, 19, 21, 0.82)',
          borderColor: 'rgba(255, 255, 255, 0.14)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 20px 45px rgba(0, 0, 0, 0.45)',
          duration: 0.65,
          ease: 'power2.out',
        },
        '-=0.35'
      )
      .to(
        [navRef.current, actionsRef.current],
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.45'
      )
    }
  }, [isLoaded])

  // Fullscreen Menu Overlay Toggle Animation
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
      {/* Top Center Fixed Header */}
      <header ref={headerRef} className={styles.headerContainer}>
        {/* Logo Pill (Top Center -> Top Left target) */}
        <a ref={logoLinkRef} href="#" className={styles.logoLink}>
          <Image
            src="/images/logo.png"
            alt="Magic Glass Logo"
            width={160}
            height={36}
            className={styles.logoImage}
            priority
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav ref={navRef} className={styles.desktopNav}>
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

        {/* Header Actions (CTA & Mobile Button) */}
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

      {/* Expanded Full-Screen Glass Overlay Menu */}
      <div
        ref={menuOverlayRef}
        className={styles.menuOverlay}
        onClick={(e) => {
          if (e.target === menuOverlayRef.current) handleCloseMenu()
        }}
      >
        {/* Dedicated Close Button on Top Right */}
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
              <a href="#heritage" onClick={handleCloseMenu}>
                Company & Factory
              </a>
            </li>
            <li>
              <a href="#products" onClick={handleCloseMenu}>
                Architectural Products
              </a>
            </li>
            <li>
              <a href="#craftsmanship" onClick={handleCloseMenu}>
                Engineering Craftsmanship
              </a>
            </li>
            <li>
              <a href="#projects" onClick={handleCloseMenu}>
                Featured Projects
              </a>
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
