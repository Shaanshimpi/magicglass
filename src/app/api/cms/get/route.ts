import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') // 'global' | 'collection'
    const slug = searchParams.get('slug')

    if (!type || !slug) {
      return NextResponse.json({ success: false, error: 'Missing type or slug' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    let data: any = null

    if (type === 'global') {
      data = await payload.findGlobal({
        slug: slug as any,
      })
    } else if (type === 'collection') {
      const itemId = searchParams.get('id')
      const itemSlug = searchParams.get('itemSlug')

      if (itemId) {
        data = await payload.findByID({
          collection: slug as any,
          id: itemId,
        })
      } else if (itemSlug) {
        const result = await payload.find({
          collection: slug as any,
          where: { slug: { equals: itemSlug } },
          limit: 1,
        })
        data = result.docs[0] || null
      } else {
        const result = await payload.find({
          collection: slug as any,
          limit: 200,
        })
        if (slug === 'projects') {
          if (Array.isArray(result.docs) && result.docs.length > 0) {
            data = [...result.docs].sort((a: any, b: any) => {
              const orderA = typeof a.order === 'number' && a.order > 0 ? a.order : 9999
              const orderB = typeof b.order === 'number' && b.order > 0 ? b.order : 9999
              if (orderA !== orderB) return orderA - orderB
              return (a.id || 0) - (b.id || 0)
            })
          } else {
            // Fallback to mock projects if DB query returns empty
            const mockProjects = (await import('@/data/projects_mock.json')).default
            data = mockProjects.map((p: any, idx: number) => ({
              id: p.id || p.slug,
              slug: p.slug || p.id,
              title: p.title,
              category: p.category,
              developer: p.developer || '',
              location: p.location || '',
              application: p.application || '',
              glassDescription: p.glassDescription || '',
              areaSqMtr: p.areaSqMtr || 0,
              imageUrl: p.image || '/images/projects/balmoral-by-riverside.jpg',
              heroFeatured: Boolean(p.heroFeatured),
              tagline: p.tagline || '',
              order: idx + 1,
            }))
          }
        } else {
          data = result.docs
        }
      }
    } else {
      return NextResponse.json({ success: false, error: 'Invalid type' }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Error fetching CMS data via API:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}
