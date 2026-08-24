import React from 'react'
import { ProductsCollection } from '@/components/ProductsCollection/ProductsCollection'

export const metadata = {
  title: 'Architectural Products Collection | Magic Glass',
  description: 'Explore our complete range of architectural glass systems: Toughened, Insulated DGU, Sentry Laminated, Solar Control Low-E, and Ceramic Fritted Glass.',
}

export default function ProductsPage() {
  return (
    <div style={{ paddingTop: '70px', backgroundColor: 'var(--color-black)', color: 'var(--color-taupe)' }}>
      <ProductsCollection />
    </div>
  )
}

