'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import styles from './FloatingQuoteButton.module.css'

interface FloatingQuoteButtonProps {
  onOpenQuoteDrawer: () => void
}

/**
 * Finds the last content section of the current page directly above the footer.
 */
function getLastSectionAboveFooter(): HTMLElement | null {
  if (typeof document === 'undefined') return null

  // 1. Check sections within <main>
  const main = document.querySelector('main')
  if (main) {
    const sections = Array.from(main.querySelectorAll('section'))
    if (sections.length > 0) {
      return sections[sections.length - 1] as HTMLElement
    }

    // Direct children fallback (in case wrappers without <section> tags exist)
    const children = Array.from(main.children) as HTMLElement[]
    if (children.length > 0) {
      const lastChild = children[children.length - 1]
      const nested = Array.from(lastChild.querySelectorAll('section'))
      if (nested.length > 0) {
        return nested[nested.length - 1] as HTMLElement
      }
      return lastChild as HTMLElement
    }
  }

  // 2. Check preceding sibling of #footer
  const footer = document.getElementById('footer')
  if (footer && footer.previousElementSibling) {
    const prev = footer.previousElementSibling
    const sections = Array.from(prev.querySelectorAll('section'))
    if (sections.length > 0) {
      return sections[sections.length - 1] as HTMLElement
    }
    return prev as HTMLElement
  }

  return null
}

export const FloatingQuoteButton: React.FC<FloatingQuoteButtonProps> = ({
  onOpenQuoteDrawer,
}) => {
  const pathname = usePathname()
  const [isNearBottom, setIsNearBottom] = useState(false)
  const isNearBottomRef = useRef(false)

  useEffect(() => {
    let rafId: number | null = null

    const checkScrollPosition = () => {
      if (typeof window === 'undefined') return

      const footer = document.getElementById('footer')
      const lastSection = getLastSectionAboveFooter()
      const winHeight = window.innerHeight || 800
      let reached = false

      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        // If the footer is already in view
        if (footerRect.top <= winHeight) {
          reached = true
        } else if (lastSection) {
          const sectionRect = lastSection.getBoundingClientRect()
          const sectionHeight = sectionRect.height || lastSection.offsetHeight || 0

          // If last section is a standard visual section (<= 900px tall),
          // trigger when its top enters the viewport.
          // If it's a large container (> 900px, e.g. on industry-solution, products, infrastructure),
          // only trigger when the user scrolls down to within 750px of the footer.
          const effectiveTop =
            sectionHeight > 900
              ? footerRect.top - 750
              : Math.max(sectionRect.top, footerRect.top - 850)

          reached = effectiveTop <= winHeight
        } else {
          // If no distinct last section found, trigger when within 750px of footer
          reached = footerRect.top <= winHeight + 750
        }
      } else if (lastSection) {
        const sectionRect = lastSection.getBoundingClientRect()
        const sectionHeight = sectionRect.height || lastSection.offsetHeight || 0
        const triggerOffset = sectionHeight > 900 ? sectionHeight - 750 : 0
        reached = sectionRect.top + triggerOffset <= winHeight
      } else {
        // Resilient fallback: bottom 400px of page
        const scrollY = window.scrollY || window.pageYOffset
        const docHeight = document.documentElement.scrollHeight
        reached = scrollY + winHeight >= docHeight - 400
      }

      if (reached !== isNearBottomRef.current) {
        isNearBottomRef.current = reached
        setIsNearBottom(reached)
      }
    }

    const onScrollOrResize = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(checkScrollPosition)
    }

    // Check immediately and after page content paints
    checkScrollPosition()
    const timer1 = setTimeout(checkScrollPosition, 150)
    const timer2 = setTimeout(checkScrollPosition, 600)

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    const lenis = (window as any)?.__lenis
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', onScrollOrResize)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(timer1)
      clearTimeout(timer2)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (lenis && typeof lenis.off === 'function') {
        lenis.off('scroll', onScrollOrResize)
      }
    }
  }, [pathname])

  return (
    <div className={styles.floatingContainer}>
      <button
        type="button"
        className={`${styles.floatingBtn} ${isNearBottom ? styles.bouncingJump : ''}`}
        onClick={onOpenQuoteDrawer}
        aria-label="Request Technical Quote"
      >
        <span className={styles.iconDot} />
        <span>GET A QUOTE</span>
      </button>
    </div>
  )
}
