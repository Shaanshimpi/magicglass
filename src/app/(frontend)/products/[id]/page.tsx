import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PDP_MOCK_DATA } from '@/components/PDP/pdpData'
import { PdpClientContent } from '@/components/PDP/PdpClientContent'
import { getPdpProductCmsData } from '@/lib/cms'

interface ProductDetailPageProps {
  params: Promise<{ id: string }> | { id: string }
}

export const revalidate = 3600 // Cache static generation with 1h ISR

export async function generateStaticParams() {
  return Object.keys(PDP_MOCK_DATA).map((id) => ({
    id,
  }))
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await getPdpProductCmsData(resolvedParams.id)

  if (!product) {
    return {
      title: 'Architectural Glass Specification',
      description: 'High-performance architectural glass engineering and processing solutions by Magic Glass.',
    }
  }

  const title = product.title || 'Architectural Glass'
  const description =
    product.introSummary ||
    product.secondaryText ||
    `Precision-engineered ${title} architectural glass solutions by Magic Glass for high-performance facades, structural glazing, and safety applications.`
  const heroImage = product.heroImage || '/images/hero-bg.jpg'
  const pageUrl = `https://magicglass.co.in/products/${resolvedParams.id}`

  return {
    title: `${title} | Architectural Glass Specifications`,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: `${title} — Magic Glass Specifications`,
      description,
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: `${title} - Magic Glass Architectural Installation`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} — Magic Glass`,
      description,
      images: [heroImage],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params
  const product = await getPdpProductCmsData(resolvedParams.id)

  if (!product) {
    notFound()
  }

  return (
    <PdpClientContent
      product={product}
      featuredProjects={product.featuredProjects || product.sliderImages}
      relatedProducts={product.relatedProducts}
    />
  )
}

