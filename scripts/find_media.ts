
import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

const payload = await getPayload({ config: configPromise })

const media = await payload.find({
  collection: 'media',
  limit: 5,
})

console.log('Found media:', media.docs.map(m => ({ id: m.id, alt: m.alt, url: m.url })))
process.exit(0)
