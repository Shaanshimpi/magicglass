import React from 'react'
import { notFound } from 'next/navigation'
import { PDP_MOCK_DATA } from '@/components/PDP/pdpData'
import { PdpClientContent } from '@/components/PDP/PdpClientContent'

interface ProductDetailPageProps {
  params: Promise<{ id: string }> | { id: string }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params
  const product = PDP_MOCK_DATA[resolvedParams.id]

  if (!product) {
    notFound()
  }

  return <PdpClientContent product={product} />
}
