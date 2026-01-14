import type { GlobalConfig } from 'payload'

export const General: GlobalConfig = {
  slug: 'general',
  label: 'General Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'footerText',
      type: 'text',
      label: 'Footer Copyright Text',
      defaultValue: 'Morerolls Studio',
      admin: {
        description: 'Text displayed after the copyright year (e.g., "Morerolls Studio")',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label (e.g., Instagram)',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
      admin: {
          
      },
    },
  ],
}
