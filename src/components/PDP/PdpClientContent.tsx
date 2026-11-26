'use client'

import React from 'react'
import { PdpProductDetail, PdpRelatedProductItem } from './pdpData'
import { PdpHero } from './PdpHero'
import { PdpGeneralInfo } from './PdpGeneralInfo'
import { PdpDiscoverSlider } from './PdpDiscoverSlider'
import { PdpRelatedProducts } from './PdpRelatedProducts'

interface PdpClientContentProps {
  product: PdpProductDetail
  featuredProjects?: any[]
  relatedProducts?: PdpRelatedProductItem[]
}

export const PdpBodyContent: React.FC<PdpClientContentProps> = ({
  product,
  featuredProjects,
  relatedProducts,
}) => {
  const sliderImages =
    featuredProjects && featuredProjects.length > 0
      ? featuredProjects
      : product.featuredProjects && product.featuredProjects.length > 0
      ? product.featuredProjects
      : product.sliderImages && product.sliderImages.length > 0
      ? product.sliderImages
      : undefined

  const productsList =
    relatedProducts && relatedProducts.length > 0
      ? relatedProducts
      : product.relatedProducts && product.relatedProducts.length > 0
      ? product.relatedProducts
      : undefined

  return (
    <>
      <PdpGeneralInfo
        introSummary={product.introSummary}
        secondaryText={product.secondaryText}
        detailImages={product.detailImages}
        characteristics={product.characteristics}
        specs={product.specs}
      />
      <PdpDiscoverSlider
        images={sliderImages}
        title="Featured Installations"
      />
      <PdpRelatedProducts
        products={productsList}
        relatedIds={product.relatedProductIds}
      />
    </>
  )
}

export const PdpClientContent: React.FC<PdpClientContentProps> = ({
  product,
  featuredProjects,
  relatedProducts,
}) => {
  return (
    <div style={{ paddingTop: '70px', backgroundColor: 'var(--color-black)', color: 'var(--color-taupe)' }}>
      <PdpHero
        indexNumber={product.indexNumber}
        title={product.title}
        subheading={product.subheading}
        category={product.category}
        heroImage={product.heroImage}
      />
      <PdpBodyContent
        product={product}
        featuredProjects={featuredProjects}
        relatedProducts={relatedProducts}
      />
    </div>
  )
}

