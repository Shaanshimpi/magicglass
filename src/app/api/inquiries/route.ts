import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const formType = searchParams.get('formType')
    const search = searchParams.get('search')?.toLowerCase().trim()
    const limit = parseInt(searchParams.get('limit') || '200', 10)

    const payload = await getPayload({ config: configPromise })

    // Fetch all inquiries to calculate summary telemetry and filter
    const result = await payload.find({
      collection: 'inquiries',
      limit,
      sort: '-createdAt',
    })

    const allDocs = result.docs || []

    // Calculate telemetry counters
    const stats = {
      total: allDocs.length,
      newCount: allDocs.filter((d: any) => d.status === 'new').length,
      contactedCount: allDocs.filter((d: any) => d.status === 'contacted').length,
      quotedCount: allDocs.filter((d: any) => d.status === 'quoted').length,
      closedCount: allDocs.filter((d: any) => d.status === 'closed').length,
      quoteDrawerCount: allDocs.filter((d: any) => d.formType === 'quote_drawer').length,
      contactUsCount: allDocs.filter((d: any) => d.formType === 'contact_us').length,
      pdpInquiryCount: allDocs.filter((d: any) => d.formType === 'pdp_inquiry').length,
    }

    // Apply in-memory filters for ultra-responsive search and status combination
    let filtered = allDocs

    if (status && status !== 'all') {
      filtered = filtered.filter((d: any) => d.status === status)
    }

    if (formType && formType !== 'all') {
      filtered = filtered.filter((d: any) => d.formType === formType)
    }

    if (search) {
      filtered = filtered.filter((d: any) => {
        const name = (d.fullName || '').toLowerCase()
        const comp = (d.companyName || '').toLowerCase()
        const em = (d.email || '').toLowerCase()
        const ph = (d.phone || '').toLowerCase()
        const msg = (d.message || '').toLowerCase()
        const subj = (d.subject || '').toLowerCase()
        const cat = (d.projectCategory || '').toLowerCase()
        const glass = Array.isArray(d.glassTypes)
          ? d.glassTypes.map((g: any) => (g.type || '').toLowerCase()).join(' ')
          : ''

        return (
          name.includes(search) ||
          comp.includes(search) ||
          em.includes(search) ||
          ph.includes(search) ||
          msg.includes(search) ||
          subj.includes(search) ||
          cat.includes(search) ||
          glass.includes(search)
        )
      })
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      stats,
    })
  } catch (error: any) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { id, status, internalNotes } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID is required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    const updateData: Record<string, any> = {}
    if (status !== undefined) updateData.status = status
    if (internalNotes !== undefined) updateData.internalNotes = internalNotes

    const updated = await payload.update({
      collection: 'inquiries',
      id,
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: updated,
    })
  } catch (error: any) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID is required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    await payload.delete({
      collection: 'inquiries',
      id,
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully',
      id,
    })
  } catch (error: any) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}
