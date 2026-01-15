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
    },
    {
      name: 'year',
      type: 'text',
    },
    {
      name: 'services',
      type: 'text',
      label: 'Services (e.g., Event Coverage, Editing)',
    },
    {
      name: 'description',
      type: 'textarea',
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
