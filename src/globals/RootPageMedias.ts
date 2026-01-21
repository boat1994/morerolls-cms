import type { GlobalConfig } from 'payload'

export const RootPageMedias: GlobalConfig = {
  slug: 'root-page-medias',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroVideo',
      type: 'group',
      label: 'Hero Video',
      fields: [
        {
          name: 'desktop',
          type: 'group',
          label: 'Desktop Video',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'upload',
              options: [
                {
                  label: 'Upload (R2)',
                  value: 'upload',
                },
                {
                  label: 'YouTube',
                  value: 'youtube',
                },
              ],
            },
            {
              name: 'url',
              type: 'text',
              label: 'YouTube URL',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'youtube',
              },
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'Video File',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'upload',
              },
            },
            {
              name: 'poster',
              type: 'upload',
              relationTo: 'media',
              label: 'Poster Image (LCP)',
              required: true,
            },
          ],
        },
        {
          name: 'mobile',
          type: 'group',
          label: 'Mobile Video',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'upload',
              options: [
                {
                  label: 'Upload (R2)',
                  value: 'upload',
                },
                {
                  label: 'YouTube',
                  value: 'youtube',
                },
              ],
            },
            {
              name: 'url',
              type: 'text',
              label: 'YouTube URL',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'youtube',
              },
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'Video File',
              admin: {
                condition: (data, siblingData) => siblingData?.type === 'upload',
              },
            },
            {
              name: 'poster',
              type: 'upload',
              relationTo: 'media',
              label: 'Poster Image (LCP)',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'clientLogos',
      type: 'array',
      label: 'Client Logos',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo',
          admin: {
              description: 'Please upload a 1:1 aspect ratio image containing only the logo.',
          }
        },
      ],
    },
  ],
}
