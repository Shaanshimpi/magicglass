import type { GlobalConfig } from 'payload'

export const AboutPageGlobal: GlobalConfig = {
  slug: 'about-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'tagline', type: 'textarea' },
        { name: 'eyebrow', type: 'text' },
        { name: 'facilityImage', type: 'upload', relationTo: 'media' },
        { name: 'facilityImageUrl', type: 'text' },
      ],
    },
    {
      name: 'legacy',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'headline', type: 'text' },
        { name: 'bodyText', type: 'textarea' },
        { name: 'eyebrow', type: 'text' },
        { name: 'buttonLabel', type: 'text' },
        { name: 'buttonHref', type: 'text' },
      ],
    },
    {
      name: 'visionMission',
      type: 'group',
      fields: [
        { name: 'visionTitle', type: 'text' },
        { name: 'visionDesc', type: 'textarea' },
        { name: 'missionTitle', type: 'text' },
        { name: 'missionDesc', type: 'textarea' },
      ],
    },
    {
      name: 'whyMagicGlass',
      type: 'array',
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'leadership',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'portrait', type: 'upload', relationTo: 'media' },
        { name: 'portraitUrl', type: 'text' },
        { name: 'bio', type: 'textarea' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text' },
        { name: 'subtitle', type: 'text' },
        { name: 'eyebrow', type: 'text' },
        { name: 'buttonLabel', type: 'text' },
        { name: 'buttonHref', type: 'text' },
      ],
    },
  ],
}
