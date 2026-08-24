'use client'

import React, { useState, useCallback, createContext, useContext } from 'react'
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

  // Preserve custom layout for /color-options or admin routes
  const isSpecialRoute = pathname?.startsWith('/color-options') || pathname?.startsWith('/admin')

  if (isSpecialRoute) {
    return <>{children}</>
  }

  const isHomePage = pathname === '/'

  return (
    <LayoutContext.Provider
      value={{
        isQuoteOpen,
        openQuoteDrawer,
        closeQuoteDrawer,
        isLoaded: isHomePage ? isLoaded : true,
        setLoaded: handleLoaderComplete,
      }}
    >
      {isHomePage && !isLoaded && <Loader onComplete={handleLoaderComplete} />}
      <Header onOpenQuoteDrawer={openQuoteDrawer} isLoaded={isHomePage ? isLoaded : true} />
      <main>{children}</main>
      <QuoteDrawer isOpen={isQuoteOpen} onClose={closeQuoteDrawer} />
      <Footer />
      <FloatingQuoteButton onOpenQuoteDrawer={openQuoteDrawer} />
    </LayoutContext.Provider>
  )
}
