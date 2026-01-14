import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function seed() {
  const payload = await getPayload({ config: configPromise })

  console.log('🌱 Starting database seeding...')

  try {
    // 1. Seed General Settings
    console.log('📝 Seeding General Settings...')
    const existingGeneral = await payload.findGlobal({
      slug: 'general',
    })

    if (!existingGeneral || !existingGeneral.footerText) {
      await payload.updateGlobal({
        slug: 'general',
        data: {
          footerText: 'Morerolls Studio',
          socialLinks: [
            {
              label: 'Instagram',
              url: 'https://instagram.com/morerolls',
            },
            {
              label: 'Facebook',
              url: 'https://facebook.com/morerolls',
            },
            {
              label: 'Twitter',
              url: 'https://twitter.com/morerolls',
            },
          ],
        },
      })
      console.log('✅ General Settings initialized')
    } else {
      console.log('⏭️  General Settings already exist')
    }

    // 2. Seed Contact Page
    console.log('📧 Seeding Contact Page...')
    const existingContact = await payload.findGlobal({
      slug: 'contact-page',
    })

    if (!existingContact || !existingContact.email) {
      await payload.updateGlobal({
        slug: 'contact-page',
        data: {
          headline: "Let's Create Something Extraordinary.",
          email: 'hello@morerolls.studio',
          phone: '+1 (555) 123-4567',
          visitUs: {
            showSection: true,
            address: '123 Creative Street\nStudio City, CA 90210\nUnited States',
          },
        },
      })
      console.log('✅ Contact Page initialized')
    } else {
      console.log('⏭️  Contact Page already exists')
    }

    // 3. Seed Root Page Medias
    console.log('🎬 Seeding Root Page Medias...')
    const existingRootPage = await payload.findGlobal({
      slug: 'root-page-medias',
    })

    if (!existingRootPage || !existingRootPage.heroVideo) {
      await payload.updateGlobal({
        slug: 'root-page-medias',
        data: {
          heroVideo: {
            desktop: {
              type: 'youtube',
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            },
            mobile: {
              type: 'youtube',
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            },
          },
          clientLogos: [],
        },
      })
      console.log('✅ Root Page Medias initialized')
    } else {
      console.log('⏭️  Root Page Medias already exists')
    }

    // 4. Check About Page
    console.log('📄 Checking About Page...')
    const existingAbout = await payload.findGlobal({
      slug: 'about-page',
    })

    if (!existingAbout || !existingAbout.heroSection) {
      console.log('⚠️  About Page needs seeding - please run the /api/seed endpoint after starting the dev server')
    } else {
      console.log('✅ About Page already seeded')
    }

    console.log('\n🎉 Database seeding completed successfully!')
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error seeding database:', error)
    console.error(error.stack)
    process.exit(1)
  }
}

seed()
