import type { GlobalConfig } from 'payload'

export const ContactUsPageGlobal: GlobalConfig = {
  slug: 'contact-us-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'indexNumber', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'redTitle', type: 'text' },
        { name: 'category', type: 'text' },
        { name: 'subheading', type: 'textarea' },
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
        { name: 'heroImageUrl', type: 'text' },
      ],
    },
    {
      name: 'contactCards',
      type: 'array',
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'detail', type: 'textarea', required: true },
        { name: 'icon', type: 'text' },
        { name: 'actionText', type: 'text' },
        { name: 'actionUrl', type: 'text' },
      ],
    },
    { name: 'mapEmbedUrl', type: 'text' },
    {
      name: 'formConfig',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'successMessage', type: 'textarea' },
      ],
    },
  ],
}
