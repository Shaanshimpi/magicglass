import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getInquirySettings } from '@/lib/email'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await getInquirySettings(payload)

    return NextResponse.json({
      success: true,
      data: settings,
    })
  } catch (error: any) {
    console.error('Error fetching inquiry settings:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch inquiry settings',
        data: {
          notificationEmail: process.env.DEFAULT_NOTIFICATION_EMAIL || 'sales@magicglass.co.in',
          additionalEmails: '',
          enableNotifications: true,
          emailSubjectPrefix: '[Magic Glass Lead]',
        },
      },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      notificationEmail = 'sales@magicglass.co.in',
      additionalEmails = '',
      enableNotifications = true,
      emailSubjectPrefix = '[Magic Glass Lead]',
    } = body

    if (!notificationEmail || !notificationEmail.trim()) {
      return NextResponse.json(
        { success: false, error: 'Primary notification email cannot be empty.' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config: configPromise })

    const updated = await payload.updateGlobal({
      slug: 'inquiry-settings' as any,
      data: {
        notificationEmail: notificationEmail.trim(),
        additionalEmails: (additionalEmails || '').trim(),
        enableNotifications: Boolean(enableNotifications),
        emailSubjectPrefix: (emailSubjectPrefix || '[Magic Glass Lead]').trim(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry notification settings saved successfully.',
      data: updated,
    })
  } catch (error: any) {
    console.error('Error saving inquiry settings:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save inquiry settings' },
      { status: 500 }
    )
  }
}
