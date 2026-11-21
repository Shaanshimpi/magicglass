import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { sendInquiryNotification } from '@/lib/email'
import {
  validateEmail,
  validatePhone,
  validateFullName,
  validateMessage,
} from '@/lib/formValidation'

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

    // 1. Full name validation
    const nameVal = validateFullName(fullName)
    if (!nameVal.isValid) {
      return NextResponse.json(
        { success: false, error: nameVal.error },
        { status: 400 }
      )
    }

    // 2. Email address validation
    const emailVal = validateEmail(email)
    if (!emailVal.isValid) {
      return NextResponse.json(
        { success: false, error: emailVal.error },
        { status: 400 }
      )
    }

    // 3. Phone number 10-digit validation
    const phoneVal = validatePhone(phone, true)
    if (!phoneVal.isValid) {
      return NextResponse.json(
        { success: false, error: phoneVal.error },
        { status: 400 }
      )
    }

    // 4. Message validation for Contact Us form
    if (formType === 'contact_us') {
      const msgVal = validateMessage(message, true, 10)
      if (!msgVal.isValid) {
        return NextResponse.json(
          { success: false, error: msgVal.error },
          { status: 400 }
        )
      }
    }

    const payload = await getPayload({ config: configPromise })

    const formattedGlassTypes = Array.isArray(glassTypes)
      ? glassTypes.map((item: any) => ({
          type: typeof item === 'string' ? item : item.type || String(item),
        }))
      : []

    const cleanName = nameVal.cleanValue || fullName.trim()
    const cleanEmail = emailVal.cleanValue || email.trim().toLowerCase()
    const cleanPhone = phoneVal.cleanValue || phone.trim()

    const inquiry = await payload.create({
      collection: 'inquiries',
      data: {
        formType,
        status: 'new',
        fullName: cleanName,
        companyName: (companyName || '').trim(),
        email: cleanEmail,
        phone: cleanPhone,
        subject: (subject || '').trim(),
        projectCategory: (projectCategory || '').trim(),
        glassTypes: formattedGlassTypes,
        message: (message || '').trim(),
        attachmentName: (attachmentName || '').trim(),
      },
    })

    // Dispatch internal inquiry email alert via Hostinger SMTP (skip customer emails)
    let emailStatus: any = null
    try {
      emailStatus = await sendInquiryNotification(
        {
          id: inquiry.id,
          formType,
          fullName: cleanName,
          companyName: (companyName || '').trim(),
          email: cleanEmail,
          phone: cleanPhone,
          subject: (subject || '').trim(),
          projectCategory: (projectCategory || '').trim(),
          glassTypes: formattedGlassTypes,
          message: (message || '').trim(),
          attachmentName: (attachmentName || '').trim(),
        },
        payload
      )
    } catch (mailErr) {
      console.error('Non-critical: Failed to send inquiry email notification:', mailErr)
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and recorded in database successfully.',
      id: inquiry.id,
      emailDispatched: emailStatus?.success || false,
    })
  } catch (error: any) {
    console.error('Error recording form inquiry in Payload DB:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
