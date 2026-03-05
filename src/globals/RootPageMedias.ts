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
          name: 'heroTitle',
          type: 'text',
          label: 'Hero Title',
          localized: true,
          defaultValue: 'MOREROLLS STUDIO',
          admin: {
            description: 'Main heading displayed over the hero video',
          },
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          label: 'Hero Subtitle',
          localized: true,
          defaultValue: 'Cinematic Visual Storytelling',
          admin: {
            description: 'Subtitle text displayed under the hero title',
          },
        },
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
