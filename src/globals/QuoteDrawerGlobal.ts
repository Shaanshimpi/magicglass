import type { GlobalConfig } from 'payload'

export const QuoteDrawerGlobal: GlobalConfig = {
  slug: 'quote-drawer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'projectCategories',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text' },
      ],
    },
    {
      name: 'glassTypes',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text' },
      ],
    },
    { name: 'cadDropzoneText', type: 'text' },
    { name: 'submissionNotice', type: 'text' },
  ],
}
