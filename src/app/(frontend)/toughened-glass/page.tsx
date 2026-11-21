import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PdpClientContent } from '@/components/PDP/PdpClientContent'
import { getPdpProductCmsData } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Toughened Glass | Fortified Safety Glass Processing',
  description:
    'Fortified safety toughened glass offering quadruple (4x) the strength of standard annealed float glass. Precision thermal processing in Pune for facades, windows, and structural balustrades.',
  openGraph: {
    title: 'Toughened Glass | Magic Glass Architectural Processing',
    description:
      'Fortified safety toughened glass with quadruple strength. Engineered in Pune for high-rise facades and architectural developments.',
    images: ['/images/products/heroes/toughened-glass.png'],
  },
}

export default async function ToughenedGlassPage() {
  const product = await getPdpProductCmsData('toughened-glass')

  if (!product) {
    notFound()
  }

  return <PdpClientContent product={product} />
}
