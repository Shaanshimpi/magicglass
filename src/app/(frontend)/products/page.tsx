import React from 'react'
import { ProductsCollection } from '@/components/ProductsCollection/ProductsCollection'
import { getProductsPageCmsData } from '@/lib/cms'

export const metadata = {
  title: 'Architectural Products Collection | Magic Glass',
  description: 'Explore our complete range of architectural glass systems: Toughened, Insulated DGU, Sentry Laminated, Solar Control Low-E, and Ceramic Fritted Glass.',
}

export default async function ProductsPage() {
  const cmsData = await getProductsPageCmsData()
  return (
    <div style={{ paddingTop: '70px', backgroundColor: 'var(--color-black)', color: 'var(--color-taupe)' }}>
      <ProductsCollection cmsData={cmsData} />
    </div>
  )
}

