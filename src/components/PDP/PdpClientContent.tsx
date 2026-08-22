'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { QuoteDrawer } from '@/components/QuoteDrawer/QuoteDrawer'
import { FloatingQuoteButton } from '@/components/FloatingQuoteButton/FloatingQuoteButton'
import { PdpProductDetail } from './pdpData'
import { PdpHero } from './PdpHero'
import { PdpGeneralInfo } from './PdpGeneralInfo'
import { PdpMasonryGallery } from './PdpMasonryGallery'
import { PdpImageSlider } from './PdpImageSlider'
import { PdpRelatedProducts } from './PdpRelatedProducts'
import { PdpInquiryForm } from './PdpInquiryForm'

interface PdpClientContentProps {
  product: PdpProductDetail
}

export const PdpClientContent: React.FC<PdpClientContentProps> = ({
  product,
}) => {
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
      <main style={{ paddingTop: '70px', backgroundColor: 'var(--color-black)', color: 'var(--color-taupe)' }}>
        <PdpHero
          indexNumber={product.indexNumber}
          title={product.title}
          category={product.category}
          heroImage={product.heroImage}
        />
        <PdpGeneralInfo
          introSummary={product.introSummary}
          secondaryText={product.secondaryText}
          detailImages={product.detailImages}
          characteristics={product.characteristics}
          specs={product.specs}
        />
        <PdpMasonryGallery images={product.galleryImages} />
        <PdpImageSlider images={product.sliderImages} />
        <PdpRelatedProducts relatedIds={product.relatedProductIds} />
        <PdpInquiryForm
          productTitle={product.title}
          onOpenQuoteDrawer={handleOpenQuote}
        />
      </main>
      <Footer />
      <QuoteDrawer isOpen={isQuoteOpen} onClose={handleCloseQuote} />
      <FloatingQuoteButton onOpenQuoteDrawer={handleOpenQuote} />
    </>
  )
}
