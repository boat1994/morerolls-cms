import type { CollectionConfig } from 'payload'

export const Works: CollectionConfig = {
  slug: 'works',
  admin: {
    useAsTitle: 'title',
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
