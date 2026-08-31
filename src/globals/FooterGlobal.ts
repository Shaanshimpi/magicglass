import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'logoUrl', type: 'text' },
    {
      name: 'companyName',
      type: 'text',
      defaultValue: 'MAGIC GLASS PRIVATE LIMITED',
    },
    {
      name: 'corporateOffice',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'CORPORATE OFFICE' },
        { name: 'address', type: 'textarea' },
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'text' },
        { name: 'web', type: 'text' },
      ],
    },
    {
      name: 'factoryOffice',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'FACTORY OFFICE' },
        { name: 'address', type: 'textarea' },
      ],
    },
    {
      name: 'mainNavLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'glassSolutionsLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'directConnectLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'type', type: 'text' },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© Magic Glass Private Limited. All rights reserved.',
    },
    {
      name: 'cityTagline',
      type: 'text',
      defaultValue: 'Pune, Maharashtra, India • Premier Architectural Glass Processing',
    },
    {
      name: 'wordmarkText',
      type: 'text',
      defaultValue: 'MAGIC GLASS',
    },
  ],
}
