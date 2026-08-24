'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
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
  }, [])

  // Scroll to top and refresh ScrollTrigger on route navigation
  useEffect(() => {
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
