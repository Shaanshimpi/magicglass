'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  useEffect(() => {
    // Completely disable and destroy Lenis smooth scroll on dashboard or admin routes
    if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')) {
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        ;(window as any).__lenis.destroy()
        delete (window as any).__lenis
      }
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      prevent: (node) => {
        if (!node || node.nodeType !== 1) return false
        const el = node as Element
        return el.hasAttribute('data-lenis-prevent') || el.closest('[data-lenis-prevent]') !== null
      },
    })

    if (typeof window !== 'undefined') {
      ;(window as any).__lenis = lenis
    }

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__lenis
      }
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [pathname])

  // Scroll to top and refresh ScrollTrigger on route navigation
  useEffect(() => {
    if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')) {
      return
    }
    if (typeof window !== 'undefined' && (window as any).__lenis) {
      ;(window as any).__lenis.scrollTo(0, { immediate: true })
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  return <>{children}</>
}
