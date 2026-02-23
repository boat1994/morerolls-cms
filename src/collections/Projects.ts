import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'isFeatured', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Set the order for sorting (ascending)',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Feature on Homepage',
      admin: {
        position: 'sidebar',
      },
      defaultValue: false,
    },
    {
      name: 'client',
      type: 'text',
      localized: true,
    },
    {
      name: 'year',
      type: 'text',
    },
    {
      name: 'services',
      type: 'text',
      label: 'Services (e.g., Event Coverage, Editing)',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'screenshots',
      type: 'array',
      label: 'Screenshots',
      labels: {
        singular: 'Screenshot',
        plural: 'Screenshots',
      },
      admin: {
        description: 'Add screenshots with captions. Drag to reorder.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      name: 'videoSrc',
      type: 'text',
      label: 'Video Source URL',
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
