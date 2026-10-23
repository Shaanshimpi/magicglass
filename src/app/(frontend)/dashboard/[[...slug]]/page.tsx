import React from 'react'
import type { Metadata } from 'next'
import { DashboardShell } from '@/components/Dashboard/DashboardShell'
import { resolveDashboardRoute } from '@/components/Dashboard/dashboardRoutes'

interface DashboardCatchAllPageProps {
  params: Promise<{ slug?: string[] }> | { slug?: string[] }
}

export async function generateMetadata({
  params,
}: DashboardCatchAllPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams?.slug || []
  const resolvedRoute = resolveDashboardRoute(slug)

  return {
    title: `${resolvedRoute.label} | Live CMS Dashboard | Magic Glass`,
    description: `Split-screen live CMS management dashboard with real-time visual canvas and Payload CMS integration. Currently managing: ${resolvedRoute.label}.`,
  }
}

export default async function DashboardPage({ params }: DashboardCatchAllPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug || []
  return <DashboardShell initialSlug={slug} />
}
