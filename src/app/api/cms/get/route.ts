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
        data = result.docs
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
