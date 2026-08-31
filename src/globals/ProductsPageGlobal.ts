import type { GlobalConfig } from 'payload'

export const ProductsPageGlobal: GlobalConfig = {
  slug: 'products-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'tag', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'textarea' },
      ],
    },
    {
      name: 'topFeaturedEyebrow',
      type: 'text',
      defaultValue: 'TOP 3 FEATURED SYSTEMS',
    },
    {
      name: 'topFeaturedTag',
      type: 'text',
      defaultValue: 'FLAGSHIP FAÇADES',
    },
    {
      name: 'featuredSystems',
      type: 'array',
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products' },
        { name: 'productSlug', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'badgeText', type: 'text' },
        { name: 'categoryLabel', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'descriptionHighlight', type: 'textarea' },
        { name: 'featuredImage', type: 'upload', relationTo: 'media' },
        { name: 'featuredImageUrl', type: 'text' },
        { name: 'link', type: 'text' },
      ],
    },
    {
      name: 'collectionEyebrow',
      type: 'text',
      defaultValue: 'MAGIC GLASS COLLECTION',
    },
    {
      name: 'collectionHeadline',
      type: 'textarea',
      defaultValue:
        'We offer a wide spectrum of bespoke architectural glass solutions where timeless design meets technical precision.',
    },
    {
      name: 'categoriesNav',
      type: 'array',
      fields: [
        { name: 'code', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'id', type: 'text' },
      ],
    },
  ],
}
