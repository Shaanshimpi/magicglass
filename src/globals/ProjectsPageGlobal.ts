import type { GlobalConfig } from 'payload'

export const ProjectsPageGlobal: GlobalConfig = {
  slug: 'projects-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'featuredProjects',
          type: 'relationship',
          relationTo: 'projects',
          hasMany: true,
          admin: {
            description: 'Select projects featured in the /projects page hero carousel.',
          },
        },
        {
          name: 'headline',
          type: 'text',
          defaultValue: 'FEATURED ARCHITECTURAL FAÇADES',
        },
        {
          name: 'tagline',
          type: 'textarea',
          defaultValue:
            'Pioneering structural glass engineering across landmark transit hubs, commercial towers, and luxury developments.',
        },
      ],
    },
  ],
}
