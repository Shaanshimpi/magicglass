'use client'

import React from 'react'
import { PdpProductDetail } from './pdpData'
import { PdpHero } from './PdpHero'
import { PdpGeneralInfo } from './PdpGeneralInfo'
import { PdpMasonryGallery } from './PdpMasonryGallery'
import { PdpDiscoverSlider } from './PdpDiscoverSlider'
import { PdpImageSlider } from './PdpImageSlider'
import { PdpRelatedProducts } from './PdpRelatedProducts'
import { PdpInquiryForm } from './PdpInquiryForm'
import { useLayoutContext } from '@/components/Shell/ClientLayoutShell'

interface PdpClientContentProps {
  product: PdpProductDetail
}

export const PdpClientContent: React.FC<PdpClientContentProps> = ({
  product,
}) => {
  const { openQuoteDrawer } = useLayoutContext()

  return (
    <div style={{ paddingTop: '70px', backgroundColor: 'var(--color-black)', color: 'var(--color-taupe)' }}>
      <PdpHero
        indexNumber={product.indexNumber}
        title={product.title}
        subheading={product.subheading}
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
      <PdpMasonryGallery
        images={product.galleryImages}
        title={product.galleryTitle || 'Glass Applications'}
        imageItems={product.galleryImageItems}
      />
      <PdpDiscoverSlider
        images={product.sliderImages}
        title="Featured Installations"
      />
      <PdpImageSlider
        industryItems={product.industries}
        title="Our Industry"
      />
      <PdpRelatedProducts relatedIds={product.relatedProductIds} />
      <PdpInquiryForm
        productTitle={product.title}
        onOpenQuoteDrawer={openQuoteDrawer}
      />
    </div>
  )
}

