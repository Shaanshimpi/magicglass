import type { GlobalConfig } from 'payload'

export const InquirySettingsGlobal: GlobalConfig = {
  slug: 'inquiry-settings',
  label: 'Inquiry & Notification Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'notificationEmail',
      type: 'text',
      required: true,
      defaultValue: 'sales@magicglass.co.in',
      admin: {
        description: 'Primary recipient email address for new inquiry and quote alerts.',
      },
    },
    {
      name: 'additionalEmails',
      type: 'text',
      admin: {
        description: 'Optional additional recipient emails (comma-separated).',
      },
    },
    {
      name: 'enableNotifications',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable or pause automatic email notifications for incoming inquiries.',
      },
    },
    {
      name: 'emailSubjectPrefix',
      type: 'text',
      defaultValue: '[Magic Glass Lead]',
      admin: {
        description: 'Subject line prefix for inquiry notification emails.',
      },
    },
  ],
}
