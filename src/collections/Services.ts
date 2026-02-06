import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price.amount', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Package Title',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail Image',
      admin: {
        description: 'Visual representation for this service (recommended: 16:9 aspect ratio)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Short Video', value: 'short-video' },
        { label: 'Presentation & Corporate', value: 'presentation' },
        { label: 'Advertisement', value: 'ads' },
      ],
      admin: {
          position: 'sidebar',
      }
    },
    {
        name: 'order',
        type: 'number',
        defaultValue: 0,
        admin: {
            position: 'sidebar',
            description: 'Used to sort services manually (Ascending)'
        }
    },
    {
      name: 'highlight',
      type: 'textarea',
      maxLength: 120,
      label: 'Highlight (Max 120 chars)',
    },
    {
      name: 'recommendedFor',
      type: 'textarea',
      maxLength: 200,
      label: 'Recommended For',
      admin: {
        placeholder: 'e.g., "Perfect for Luxury Brands" or "Ideal for Startups and SMEs"',
      },
    },
    {
      name: 'price',
      type: 'group',
      label: 'Price Configuration',
      fields: [
        {
          name: 'amount',
          type: 'number',
          required: true,
          label: 'Amount',
        },
        {
          name: 'unit',
          type: 'text',
          defaultValue: 'Project',
          label: 'Unit (e.g. Project, Month)',
        },
        {
          name: 'isStartingAt',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show "Starts at"',
        },
        {
          name: 'hidePricing',
          type: 'checkbox',
          defaultValue: false,
          label: 'Hide Pricing',
        },
      ],
    },
    {
      name: 'specs',
      type: 'array',
      label: 'Technical Specs',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label (e.g. Duration)',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value (e.g. 30 Sec)',
        },
      ],
    },
    {
      name: 'deliverables',
      type: 'array',
      label: 'Deliverables',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., "1x Master File (4K ProRes)" or "3 Rounds of Revisions"',
          },
        },
      ],
    },
    {
      name: 'conditions',
      type: 'richText',
      label: 'Conditions / Fine Print',
    },
  ],
}
