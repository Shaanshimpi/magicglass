import { NextResponse } from 'next/server'
import { sendTestEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const targetEmail = (body.targetEmail || 'sales@magicglass.co.in').trim()

    if (!targetEmail || !targetEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'A valid recipient email address is required.' },
        { status: 400 }
      )
    }

    const result = await sendTestEmail(targetEmail)

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to send test email through Hostinger SMTP.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Test email dispatched successfully to ${targetEmail} via Hostinger SMTP (norepy@firefist.co.in).`,
      messageId: result.messageId,
    })
  } catch (error: any) {
    console.error('Error in /api/inquiries/test-email:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Server error while sending test email' },
      { status: 500 }
    )
  }
}
