
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

const payload = await getPayload({ config: configPromise })

try {
  const global = await payload.findGlobal({
    slug: 'root-page-medias',
  })

  console.log('Current global:', JSON.stringify(global, null, 2))

  const POSTER_ID = 15 // Using image_3-1.webp

  const updated = await payload.updateGlobal({
    slug: 'root-page-medias',
    data: {
      heroVideo: {
        ...global.heroVideo,
        desktop: {
          ...global.heroVideo?.desktop,
          poster: POSTER_ID,
        },
        mobile: {
          ...global.heroVideo?.mobile,
          poster: POSTER_ID,
        },
      },
    },
  })

  console.log('Updated global:', updated)
} catch (error) {
  console.error('Error seeding poster:', error)
}

process.exit(0)
