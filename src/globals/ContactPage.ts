import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Main Headline',
      required: true,
      defaultValue: "Let's Create Something Extraordinary.",
      localized: true,
    },
    {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        required: true, 
    },
    {
        name: 'phone',
        type: 'text',
        label: 'Phone Number',
        required: true,
    },
    {
      name: 'visitUs',
      type: 'group',
      label: 'Visit Us Section',
      fields: [
        {
          name: 'showSection',
          type: 'checkbox',
          label: 'Show "Visit Us" Section',
          defaultValue: true,
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.showSection,
          },
        },
      ],
    },
  ],
}
