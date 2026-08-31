import type { GlobalConfig } from 'payload'

export const IndustrySolutionPageGlobal: GlobalConfig = {
  slug: 'industry-solution-page',
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
        { name: 'category', type: 'text' },
        { name: 'subheading', type: 'textarea' },
        { name: 'heroImage', type: 'upload', relationTo: 'media' },
        { name: 'heroImageUrl', type: 'text' },
      ],
    },
    {
      name: 'industries',
      type: 'array',
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { name: 'specs', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
      ],
    },
  ],
}
