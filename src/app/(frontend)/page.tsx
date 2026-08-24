import React from 'react'
import { Hero } from '@/components/Hero/Hero'
import { Heritage } from '@/components/Heritage/Heritage'
import { ProductSystems } from '@/components/ProductSystems/ProductSystems'
import { Craftsmanship } from '@/components/Craftsmanship/Craftsmanship'
import { TrustBanner } from '@/components/TrustBanner/TrustBanner'
import { Testimonials } from '@/components/Testimonials/Testimonials'
import { CategorySwitcher } from '@/components/CategorySwitcher/CategorySwitcher'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Heritage />
      <ProductSystems />
      <Craftsmanship />
      <TrustBanner />
      <Testimonials />
      <CategorySwitcher />
    </>
  )
}

