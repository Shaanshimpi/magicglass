'use client'

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { QuoteDrawer } from '@/components/QuoteDrawer/QuoteDrawer'
import { FloatingQuoteButton } from '@/components/FloatingQuoteButton/FloatingQuoteButton'
import { Loader } from '@/components/Loader/Loader'

interface LayoutContextType {
  isQuoteOpen: boolean
  openQuoteDrawer: () => void
  closeQuoteDrawer: () => void
  isLoaded: boolean
  setLoaded: () => void
}

const LayoutContext = createContext<LayoutContextType>({
  isQuoteOpen: false,
  openQuoteDrawer: () => {},
  closeQuoteDrawer: () => {},
  isLoaded: true,
  setLoaded: () => {},
})

export const useLayoutContext = () => useContext(LayoutContext)

export const ClientLayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const openQuoteDrawer = useCallback(() => {
    setIsQuoteOpen(true)
  }, [])

  const closeQuoteDrawer = useCallback(() => {
    setIsQuoteOpen(false)
  }, [])

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  // Manual scroll restoration on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  // Trigger loader on route change
  useEffect(() => {
    setIsLoaded(false)
  }, [pathname])

  // Lock scroll while loader is active, and ensure page starts at scroll 0
  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? (window as any).__lenis : null

    if (!isLoaded) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      window.scrollTo(0, 0)
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
        lenis.stop()
      }
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      window.scrollTo(0, 0)
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
        lenis.start()
      }
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (lenis) {
        lenis.start()
      }
    }
  }, [isLoaded])

  // Preserve custom layout for /color-options or admin routes
  const isSpecialRoute = pathname?.startsWith('/color-options') || pathname?.startsWith('/admin')

  if (isSpecialRoute) {
    return <>{children}</>
  }

  return (
    <LayoutContext.Provider
      value={{
        isQuoteOpen,
        openQuoteDrawer,
        closeQuoteDrawer,
        isLoaded,
        setLoaded: handleLoaderComplete,
      }}
    >
      {!isLoaded && <Loader key={pathname} onComplete={handleLoaderComplete} />}
      <Header onOpenQuoteDrawer={openQuoteDrawer} isLoaded={isLoaded} />
      <main>{children}</main>
      <QuoteDrawer isOpen={isQuoteOpen} onClose={closeQuoteDrawer} />
      <Footer />
      {!isQuoteOpen && <FloatingQuoteButton onOpenQuoteDrawer={openQuoteDrawer} />}
    </LayoutContext.Provider>
  )
}
