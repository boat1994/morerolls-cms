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
