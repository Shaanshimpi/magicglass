import React from 'react'
import type { Metadata } from 'next'
import { DemoHeroShowcase } from '@/components/DemoHeroes/DemoHeroShowcase'

export const metadata: Metadata = {
  title: 'Hero Design Options Demo | Magic Glass',
  description:
    'Interactive client presentation and comparison matrix of hero design alternatives for Infrastructure and PDP product detail pages.',
}

export default function HeroOptionsAliasPage() {
  return <DemoHeroShowcase />
}
