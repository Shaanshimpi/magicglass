import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'formType', 'email', 'phone', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Allow public client forms to create inquiry submissions
    read: ({ req: { user } }) => Boolean(user), // Restrict reading to authenticated admins
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: [
        { label: 'Quote Drawer', value: 'quote_drawer' },
        { label: 'Contact Us Form', value: 'contact_us' },
        { label: 'PDP Consultation', value: 'pdp_inquiry' },
      ],
      defaultValue: 'quote_drawer',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'New Inquiry', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quotation Sent', value: 'quoted' },
        { label: 'Closed / Archived', value: 'closed' },
      ],
      defaultValue: 'new',
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
    },
    {
      name: 'projectCategory',
      type: 'text',
    },
    {
      name: 'glassTypes',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'text',
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
  timestamps: true,
}
