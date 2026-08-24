import React from 'react'
import { notFound } from 'next/navigation'
import { PDP_MOCK_DATA } from '@/components/PDP/pdpData'
import { PdpClientContent } from '@/components/PDP/PdpClientContent'

export default function ToughenedGlassPage() {
  const product = PDP_MOCK_DATA['toughened-glass']

  if (!product) {
    notFound()
  }

  return <PdpClientContent product={product} />
}
