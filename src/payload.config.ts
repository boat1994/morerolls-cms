import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { RootPageMedias } from './globals/RootPageMedias'
import { AboutPage } from './globals/AboutPage'
import { General } from './globals/General'
import { ContactPage } from './globals/ContactPage'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isCLI = process.argv.some((value) => value.match(/^(generate|migrate|build):?/))
const isProduction = process.env.NODE_ENV === 'production'

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'ภาษาไทย', code: 'th' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [Users, Media, Projects, Services],
  globals: [RootPageMedias, AboutPage, General, ContactPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({
    binding: cloudflare.env.D1,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) => {
            const path = prefix ? `${prefix}/${filename}` : filename
            return `https://${process.env.NEXT_PUBLIC_R2_HOSTNAME || 'pub-ce68ca97bac342d383f6284fff969191.r2.dev'}/${path}`
          },
        },
      },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
