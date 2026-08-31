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
    } = body

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Full name and email address are required.' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    const formattedGlassTypes = Array.isArray(glassTypes)
      ? glassTypes.map((type: string) => ({ type }))
      : []

    const inquiry = await payload.create({
      collection: 'inquiries',
      data: {
        formType,
        status: 'new',
        fullName,
        companyName,
        email,
        phone,
        subject,
        projectCategory,
        glassTypes: formattedGlassTypes,
        message,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
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
