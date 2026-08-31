import type { GlobalConfig } from 'payload'

export const HomePageGlobal: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'tagline', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'primaryCtaLabel', type: 'text' },
        { name: 'primaryCtaHref', type: 'text' },
        { name: 'secondaryCtaLabel', type: 'text' },
        { name: 'secondaryCtaHref', type: 'text' },
        { name: 'scrollText', type: 'text' },
        { name: 'bgImage', type: 'upload', relationTo: 'media' },
        { name: 'bgImageUrl', type: 'text' },
      ],
    },
    {
      name: 'heritage',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text' },
        { name: 'statementText', type: 'textarea' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaHref', type: 'text' },
        { name: 'bgImage', type: 'upload', relationTo: 'media' },
        { name: 'bgImageUrl', type: 'text' },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'glassApplications',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'topDescription', type: 'textarea' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaHref', type: 'text' },
        {
          name: 'cards',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
            { name: 'hoverCategory', type: 'text' },
            { name: 'specs', type: 'text' },
            { name: 'hoverLink', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'imageUrl', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'craftsmanship',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
        {
          name: 'cards',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'imageUrl', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'trustBanner',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
        {
          name: 'partners',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'logoUrl', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'title', type: 'text' },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
        { name: 'avatarUrl', type: 'text' },
      ],
    },
    {
      name: 'categorySwitcher',
      type: 'array',
      fields: [
        { name: 'id', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'badge', type: 'text' },
        { name: 'subtitle', type: 'text' },
        {
          name: 'specs',
          type: 'array',
          fields: [{ name: 'text', type: 'text' }],
        },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
      ],
    },
  ],
}
