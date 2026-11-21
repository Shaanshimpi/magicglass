import nodemailer from 'nodemailer'
import type { Payload } from 'payload'

// Create Hostinger SMTP Transporter
export function getMailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com'
  const port = parseInt(process.env.SMTP_PORT || '465', 10)
  const isSecure = process.env.SMTP_SECURE !== 'false' && port === 465
  const user = process.env.SMTP_USER || 'norepy@firefist.co.in'
  const pass = process.env.SMTP_PASS || 'Noreply@9689#FIREFIST'

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
    // Useful timeout settings for cloud/serverless environments
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })
}

export interface InquiryNotificationData {
  id?: string | number
  formType: string
  fullName: string
  companyName?: string
  email: string
  phone?: string
  subject?: string
  projectCategory?: string
  glassTypes?: Array<{ type: string } | string>
  message?: string
  attachmentName?: string
  createdAt?: string | Date
}

export interface InquirySettings {
  notificationEmail: string
  additionalEmails?: string
  enableNotifications: boolean
  emailSubjectPrefix?: string
}

/**
 * Retrieves inquiry notification settings from Payload CMS Global,
 * with fallbacks to environment variables and default 'sales@magicglass.co.in'
 */
export async function getInquirySettings(payload?: Payload): Promise<InquirySettings> {
  const defaultRecipient = process.env.DEFAULT_NOTIFICATION_EMAIL || 'sales@magicglass.co.in'

  if (!payload) {
    return {
      notificationEmail: defaultRecipient,
      additionalEmails: '',
      enableNotifications: true,
      emailSubjectPrefix: '[Magic Glass Lead]',
    }
  }

  try {
    const globalSettings: any = await payload.findGlobal({
      slug: 'inquiry-settings' as any,
    })

    if (globalSettings) {
      return {
        notificationEmail: (globalSettings.notificationEmail || defaultRecipient).trim(),
        additionalEmails: (globalSettings.additionalEmails || '').trim(),
        enableNotifications:
          globalSettings.enableNotifications !== undefined
            ? Boolean(globalSettings.enableNotifications)
            : true,
        emailSubjectPrefix: (globalSettings.emailSubjectPrefix || '[Magic Glass Lead]').trim(),
      }
    }
  } catch (err) {
    console.warn('Could not read inquiry-settings global, using default settings:', err)
  }

  return {
    notificationEmail: defaultRecipient,
    additionalEmails: '',
    enableNotifications: true,
    emailSubjectPrefix: '[Magic Glass Lead]',
  }
}

/**
 * Builds HTML template for new inquiry notifications
 */
function buildInquiryEmailHtml(data: InquiryNotificationData): string {
  const formLabels: Record<string, string> = {
    quote_drawer: 'Quote Drawer Form',
    contact_us: 'Contact Us Form',
    pdp_inquiry: 'Product Consultation Form',
  }

  const formLabel = formLabels[data.formType] || data.formType || 'Website Inquiry'

  const glassTypesFormatted = Array.isArray(data.glassTypes) && data.glassTypes.length > 0
    ? data.glassTypes
        .map((g) => (typeof g === 'string' ? g : g.type))
        .filter(Boolean)
        .join(', ')
    : 'None specified'

  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Website Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0f17; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #111827; border: 1px solid #1f2937; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0d131f; padding: 24px 30px; border-bottom: 2px solid #dc2626;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: #dc2626; color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; padding: 4px 10px; border-radius: 4px; text-transform: uppercase;">
                      NEW LEAD ALERT
                    </span>
                    <h1 style="margin: 12px 0 0 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                      Magic Glass Website Inquiry
                    </h1>
                  </td>
                  <td align="right" valign="top">
                    <span style="color: #94a3b8; font-size: 12px;">
                      ${formattedDate} IST
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Meta Bar -->
          <tr>
            <td style="background-color: #162032; padding: 12px 30px; font-size: 12px; color: #cbd5e1; border-bottom: 1px solid #1f2937;">
              Source: <strong style="color: #38bdf8;">${formLabel}</strong>
              ${data.projectCategory ? ` &nbsp;|&nbsp; Category: <strong style="color: #fca5a5;">${data.projectCategory}</strong>` : ''}
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Contact Details Grid -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="50%" valign="top" style="padding-bottom: 16px;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; display: block; margin-bottom: 4px;">Lead Name</span>
                    <strong style="font-size: 16px; color: #ffffff;">${data.fullName}</strong>
                  </td>
                  <td width="50%" valign="top" style="padding-bottom: 16px;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; display: block; margin-bottom: 4px;">Company / Firm</span>
                    <strong style="font-size: 15px; color: #ffffff;">${data.companyName || 'Not specified'}</strong>
                  </td>
                </tr>
                <tr>
                  <td width="50%" valign="top" style="padding-bottom: 16px;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; display: block; margin-bottom: 4px;">Email Address</span>
                    <a href="mailto:${data.email}" style="color: #38bdf8; text-decoration: none; font-size: 14px; font-weight: 500;">
                      ${data.email}
                    </a>
                  </td>
                  <td width="50%" valign="top" style="padding-bottom: 16px;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; display: block; margin-bottom: 4px;">Phone Number</span>
                    ${data.phone ? `<a href="tel:${data.phone}" style="color: #34d399; text-decoration: none; font-size: 14px; font-weight: 500;">${data.phone}</a>` : '<span style="color: #94a3b8; font-size: 14px;">Not provided</span>'}
                  </td>
                </tr>
                ${data.subject ? `
                <tr>
                  <td colspan="2" valign="top" style="padding-bottom: 16px;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; display: block; margin-bottom: 4px;">Subject / Project</span>
                    <span style="font-size: 14px; color: #e2e8f0;">${data.subject}</span>
                  </td>
                </tr>` : ''}
                ${glassTypesFormatted !== 'None specified' ? `
                <tr>
                  <td colspan="2" valign="top" style="padding-bottom: 16px;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; display: block; margin-bottom: 4px;">Glass Specifications Requested</span>
                    <span style="display: inline-block; background-color: #1f2937; color: #f1f5f9; padding: 6px 12px; border-radius: 4px; font-size: 13px; border: 1px solid #374151;">
                      ${glassTypesFormatted}
                    </span>
                  </td>
                </tr>` : ''}
              </table>

              <!-- Message / Details Box -->
              <div style="background-color: #0b0f17; border: 1px solid #1f2937; border-radius: 6px; padding: 18px; margin-bottom: 24px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; color: #94a3b8; display: block; margin-bottom: 8px;">Inquiry Message / Requirements:</span>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">
                  ${data.message || 'No additional message was provided.'}
                </p>
              </div>

              <!-- Quick Action Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding: 10px 0;">
                    <a href="mailto:${data.email}?subject=RE:%20Magic%20Glass%20Inquiry%20-%20${encodeURIComponent(data.projectCategory || data.subject || 'Architectural Glass')}" 
                       style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 6px; letter-spacing: 0.5px;">
                      Reply Directly to Client &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0d131f; padding: 18px 30px; border-top: 1px solid #1f2937; text-align: center; font-size: 11px; color: #64748b;">
              This notification was generated automatically by the Magic Glass website lead capture engine.<br />
              Delivered via Hostinger Mail (norepy@firefist.co.in) to configured team recipients.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Sends an email notification to internal recipients for a new inquiry
 */
export async function sendInquiryNotification(
  inquiryData: InquiryNotificationData,
  payload?: Payload
): Promise<{ success: boolean; messageId?: string; recipients?: string[]; skipped?: boolean; error?: string }> {
  try {
    const settings = await getInquirySettings(payload)

    if (!settings.enableNotifications) {
      console.log('Inquiry notification emails are paused in settings. Skipping dispatch.')
      return { success: true, skipped: true }
    }

    // Build recipient list
    const primary = settings.notificationEmail
    const additional = settings.additionalEmails
      ? settings.additionalEmails
          .split(',')
          .map((e) => e.trim())
          .filter((e) => e.includes('@'))
      : []

    const allRecipients = Array.from(new Set([primary, ...additional].filter(Boolean)))

    if (allRecipients.length === 0) {
      console.warn('No notification email recipients found.')
      return { success: false, error: 'No recipient email configured' }
    }

    const transporter = getMailTransporter()
    const fromAddress = process.env.SMTP_FROM_EMAIL || 'norepy@firefist.co.in'
    const fromName = process.env.SMTP_FROM_NAME || 'Magic Glass Notifications'
    const prefix = settings.emailSubjectPrefix || '[Magic Glass Lead]'

    const subject = `${prefix} New inquiry from ${inquiryData.fullName}${inquiryData.companyName ? ` (${inquiryData.companyName})` : ''}`

    const html = buildInquiryEmailHtml(inquiryData)

    const mailOptions = {
      from: `"${fromName}" <${fromAddress}>`,
      to: allRecipients.join(', '),
      replyTo: `"${inquiryData.fullName}" <${inquiryData.email}>`,
      subject,
      html,
      text: `New Website Inquiry:\n\nName: ${inquiryData.fullName}\nCompany: ${inquiryData.companyName || 'N/A'}\nEmail: ${inquiryData.email}\nPhone: ${inquiryData.phone || 'N/A'}\nCategory: ${inquiryData.projectCategory || 'N/A'}\nMessage:\n${inquiryData.message || 'N/A'}\n`,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✓ Inquiry notification sent to [${allRecipients.join(', ')}]. Message ID: ${info.messageId}`)

    return {
      success: true,
      messageId: info.messageId,
      recipients: allRecipients,
    }
  } catch (err: any) {
    console.error('Failed to send inquiry notification email:', err)
    return {
      success: false,
      error: err.message || 'Failed to dispatch email',
    }
  }
}

/**
 * Sends a test email to verify Hostinger SMTP connectivity
 */
export async function sendTestEmail(
  targetEmail: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getMailTransporter()
    const fromAddress = process.env.SMTP_FROM_EMAIL || 'norepy@firefist.co.in'
    const fromName = process.env.SMTP_FROM_NAME || 'Magic Glass Notifications'

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: targetEmail,
      subject: '✓ Magic Glass SMTP Connection Test (Hostinger Mail)',
      html: `
        <div style="font-family: Arial, sans-serif; background: #111827; color: #f8fafc; padding: 24px; border-radius: 8px;">
          <h2 style="color: #34d399; margin-top: 0;">✓ SMTP Connected Successfully!</h2>
          <p>This is a verification test from your <strong>Magic Glass</strong> website lead capture system.</p>
          <ul style="color: #cbd5e1; line-height: 1.8;">
            <li><strong>SMTP Server:</strong> smtp.hostinger.com:465 (SSL)</li>
            <li><strong>Sender Account:</strong> norepy@firefist.co.in</li>
            <li><strong>Recipient:</strong> ${targetEmail}</li>
            <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
          </ul>
          <p style="color: #94a3b8; font-size: 13px; margin-bottom: 0;">New inquiry notifications are live and working.</p>
        </div>
      `,
      text: `Magic Glass SMTP Test successful!\nSent to: ${targetEmail}\nFrom: norepy@firefist.co.in\nTime: ${new Date().toISOString()}`,
    })

    return { success: true, messageId: info.messageId }
  } catch (err: any) {
    console.error('SMTP test email error:', err)
    return { success: false, error: err.message || 'SMTP test failed' }
  }
}
