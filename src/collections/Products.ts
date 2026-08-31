import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
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
    { name: 'indexNumber', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'category', type: 'text', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'heroImageUrl', type: 'text' },
    { name: 'introSummary', type: 'textarea' },
    { name: 'secondaryText', type: 'textarea' },
    {
      name: 'detailImages',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
      ],
    },
    {
      name: 'characteristics',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'specs',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'galleryTitle', type: 'text' },
    {
      name: 'galleryImages',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'src', type: 'text' },
      ],
    },
    {
      name: 'industries',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
      ],
    },
    {
      name: 'sliderImages',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'src', type: 'text' },
      ],
    },
    {
      name: 'relatedProductSlugs',
      type: 'array',
      fields: [{ name: 'slug', type: 'text', required: true }],
    },
  ],
}
