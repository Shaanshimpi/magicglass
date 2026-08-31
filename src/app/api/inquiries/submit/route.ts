import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      formType = 'quote_drawer',
      fullName,
      companyName = '',
      email,
      phone = '',
      subject = '',
      projectCategory = '',
      glassTypes = [],
      message = '',
      attachmentName = '',
    } = body

    if (!fullName || !fullName.trim() || !email || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name and email address are required.' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    const formattedGlassTypes = Array.isArray(glassTypes)
      ? glassTypes.map((item: any) => ({
          type: typeof item === 'string' ? item : item.type || String(item),
        }))
      : []

    const inquiry = await payload.create({
      collection: 'inquiries',
      data: {
        formType,
        status: 'new',
        fullName: fullName.trim(),
        companyName: (companyName || '').trim(),
        email: email.trim().toLowerCase(),
        phone: (phone || '').trim(),
        subject: (subject || '').trim(),
        projectCategory: (projectCategory || '').trim(),
        glassTypes: formattedGlassTypes,
        message: (message || '').trim(),
        attachmentName: (attachmentName || '').trim(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and recorded in database successfully.',
      id: inquiry.id,
    })
  } catch (error: any) {
    console.error('Error recording form inquiry in Payload DB:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
