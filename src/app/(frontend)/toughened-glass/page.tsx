import React from 'react'
import { notFound } from 'next/navigation'
import { PdpClientContent } from '@/components/PDP/PdpClientContent'
import { getPdpProductCmsData } from '@/lib/cms'

export default async function ToughenedGlassPage() {
  const product = await getPdpProductCmsData('toughened-glass')

  if (!product) {
    notFound()
  }

  return <PdpClientContent product={product} />
}
