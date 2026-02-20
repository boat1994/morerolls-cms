import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page Specification',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroSection',
      type: 'group',
      label: 'Hero Section (The Statement)',
      fields: [
        {
          name: 'showHeadline',
          type: 'checkbox',
          label: 'Show Headline',
          defaultValue: true,
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          label: 'Headline',
          defaultValue: 'Devoted to the Frame',
          localized: true,
        },
        {
          name: 'showSubtext',
          type: 'checkbox',
          label: 'Show Subtext',
          defaultValue: false,
        },
        {
          name: 'subtext',
          type: 'text',
          label: 'Subtext',
          localized: true,
        },
        {
          name: 'textColor',
          type: 'select',
          label: 'Text Color',
          defaultValue: 'black',
          options: [
            { label: 'Black', value: 'black' },
            { label: 'White', value: 'white' },
          ],
        },
        {
          name: 'coverImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Cover Image',
        },
      ],
    },
    {
      name: 'philosophy',
      type: 'group',
      label: 'Philosophy (The Logic)',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Our Philosophy',
          localized: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
          localized: true,
        },
      ],
    },
    {
      name: 'founder',
      type: 'group',
      label: 'Founder Spotlight (The Proof)',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role',
          localized: true,
        },
        {
          name: 'bio',
          type: 'richText',
          label: 'Bio',
          localized: true,
        },
        {
          name: 'portrait',
          type: 'upload',
          relationTo: 'media',
          label: 'Portrait',
        },
        {
          name: 'yearsActive',
          type: 'number',
          label: 'Years Active',
        },
      ],
    },
    {
      name: 'standards',
      type: 'array',
      label: 'Standards (The Grid)',
      minRows: 3,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon (SVG preferred)',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          localized: true,
        },
      ],
    },
  ],
}
