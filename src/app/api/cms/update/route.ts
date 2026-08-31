import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const action = body.action || 'update'
    const resolvedType = body.type || body.cmsType || 'global'
    const resolvedSlug = body.slug || body.cmsSlug
    const resolvedItemSlug = body.itemSlug || body.id
    const data = body.data
    const id = body.id
    const pathToRevalidate = body.pathToRevalidate

    if (!resolvedSlug) {
      return NextResponse.json({ success: false, error: 'Missing slug' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    let resultRecord: any = null

    if (action === 'delete') {
      if (resolvedType !== 'collection') {
        return NextResponse.json({ success: false, error: 'Only collection documents can be deleted' }, { status: 400 })
      }
      let targetId = id
      if (!targetId && resolvedItemSlug) {
        const found = await payload.find({
          collection: resolvedSlug as any,
          where: { slug: { equals: resolvedItemSlug } },
          limit: 1,
        })
        if (found.docs.length > 0) {
          targetId = found.docs[0].id
        }
      }
      if (!targetId) {
        return NextResponse.json({ success: false, error: 'Document id or itemSlug required for deletion' }, { status: 400 })
      }
      await payload.delete({
        collection: resolvedSlug as any,
        id: targetId,
      })
      resultRecord = { deleted: true, id: targetId }
    } else if (action === 'create') {
      if (resolvedType !== 'collection' || !data) {
        return NextResponse.json({ success: false, error: 'Creating requires a collection type and valid data' }, { status: 400 })
      }
      resultRecord = await payload.create({
        collection: resolvedSlug as any,
        data,
      })
    } else {
      // Default: Update Global or Collection document
      if (!data) {
        return NextResponse.json({ success: false, error: 'Missing data for update' }, { status: 400 })
      }

      if (resolvedType === 'global') {
        resultRecord = await payload.updateGlobal({
          slug: resolvedSlug as any,
          data,
        })
      } else if (resolvedType === 'collection') {
        if (Array.isArray(data)) {
          // Batch update array of collection items (e.g. projects list)
          const updatedItems = []
          for (const item of data) {
            const itemSlugVal = item.slug
            if (itemSlugVal) {
              const existing = await payload.find({
                collection: resolvedSlug as any,
                where: { slug: { equals: itemSlugVal } },
                limit: 1,
              })
              if (existing.docs.length > 0) {
                const u = await payload.update({
                  collection: resolvedSlug as any,
                  id: existing.docs[0].id,
                  data: item,
                })
                updatedItems.push(u)
              }
            }
          }
          resultRecord = updatedItems
        } else {
          let targetId = id || data.id
          if (!targetId && resolvedItemSlug) {
            const found = await payload.find({
              collection: resolvedSlug as any,
              where: { slug: { equals: resolvedItemSlug } },
              limit: 1,
            })
            if (found.docs.length > 0) {
              targetId = found.docs[0].id
            }
          }
          if (!targetId) {
            return NextResponse.json(
              { success: false, error: 'Collection update requires document id or valid itemSlug' },
              { status: 400 }
            )
          }
          resultRecord = await payload.update({
            collection: resolvedSlug as any,
            id: targetId,
            data,
          })
        }
      } else {
        return NextResponse.json({ success: false, error: 'Invalid update type' }, { status: 400 })
      }
    }

    if (pathToRevalidate) {
      try {
        revalidatePath(pathToRevalidate)
      } catch (err) {
        console.warn('Revalidation warning:', err)
      }
    }

    return NextResponse.json({ success: true, data: resultRecord })
  } catch (error: any) {
    console.error('Error in /api/cms/update:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}
