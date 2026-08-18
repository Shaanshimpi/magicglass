'use client'

import React, { useState } from 'react'
import { Loader } from '@/components/Loader/Loader'
import { Header } from '@/components/Header/Header'
import { Hero } from '@/components/Hero/Hero'
import { Heritage } from '@/components/Heritage/Heritage'
import { ProductSystems } from '@/components/ProductSystems/ProductSystems'
import { Craftsmanship } from '@/components/Craftsmanship/Craftsmanship'
import { TrustBanner } from '@/components/TrustBanner/TrustBanner'
import { Testimonials } from '@/components/Testimonials/Testimonials'
import { CategorySwitcher } from '@/components/CategorySwitcher/CategorySwitcher'
import { QuoteDrawer } from '@/components/QuoteDrawer/QuoteDrawer'
import { Footer } from '@/components/Footer/Footer'

export default function HomePage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleOpenQuote = () => {
    setIsQuoteOpen(true)
  }

  const handleCloseQuote = () => {
    setIsQuoteOpen(false)
  }

  const handleLoaderComplete = () => {
    setIsLoaded(true)
  }

  return (
    <>
      {!isLoaded && <Loader onComplete={handleLoaderComplete} />}
      <Header onOpenQuoteDrawer={handleOpenQuote} isLoaded={isLoaded} />
      <main>
        <Hero onOpenQuoteDrawer={handleOpenQuote} />
        <Heritage onOpenQuoteDrawer={handleOpenQuote} />
        <ProductSystems />
        <Craftsmanship />
        <TrustBanner />
        <Testimonials />
        <CategorySwitcher />
        <QuoteDrawer isOpen={isQuoteOpen} onClose={handleCloseQuote} />
      </main>
      <Footer />
    </>
  )
}
