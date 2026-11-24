import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    { name: 'title', type: 'text', required: true },
    { name: 'category', type: 'text', required: true },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Sequence order for display (1, 2, 3...)',
      },
      index: true,
    },
    { name: 'developer', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'application', type: 'text' },
    { name: 'glassDescription', type: 'textarea' },
    { name: 'areaSqMtr', type: 'number' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text' },
    { name: 'heroFeatured', type: 'checkbox', defaultValue: false },
    { name: 'tagline', type: 'text' },
  ],
}
