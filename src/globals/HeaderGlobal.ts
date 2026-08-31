import type { GlobalConfig } from 'payload'

export const HeaderGlobal: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaButtons',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    {
      name: 'loaderBrandTag',
      type: 'text',
      defaultValue: '◆ MAGIC GLASS',
    },
    {
      name: 'loaderBrandTitle',
      type: 'text',
      defaultValue: 'ARCHITECTURAL GLAZING',
    },
    {
      name: 'loaderStatusText',
      type: 'text',
      defaultValue: 'INITIALIZING EXPERIENCE',
    },
    {
      name: 'loaderEstYear',
      type: 'text',
      defaultValue: 'EST. 2006',
    },
  ],
}
