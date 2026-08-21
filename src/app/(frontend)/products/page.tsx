'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header/Header'
import { ProductsCollection } from '@/components/ProductsCollection/ProductsCollection'
import { QuoteDrawer } from '@/components/QuoteDrawer/QuoteDrawer'
import { FloatingQuoteButton } from '@/components/FloatingQuoteButton/FloatingQuoteButton'
import { Footer } from '@/components/Footer/Footer'

export default function ProductsPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  const handleOpenQuote = () => {
    setIsQuoteOpen(true)
  }

  const handleCloseQuote = () => {
    setIsQuoteOpen(false)
  }

  return (
    <>
      <Header onOpenQuoteDrawer={handleOpenQuote} isLoaded={true} />
      <main style={{ paddingTop: '70px', backgroundColor: '#f3f0ec' }}>
        <ProductsCollection />
        <QuoteDrawer isOpen={isQuoteOpen} onClose={handleCloseQuote} />
      </main>
      <Footer />
      <FloatingQuoteButton onOpenQuoteDrawer={handleOpenQuote} />
    </>
  )
}
