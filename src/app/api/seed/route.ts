import { getPayload } from 'payload'
import configPromise from '@payload-config'
import path from 'path'
import fs from 'fs'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding About Page via API...')

  try {
      // 1. Upload Images
      // In Next.js runtime, we might not have easy access to __dirname pointing to source.
      // We can try process.cwd()
      const demoDir = path.resolve(process.cwd(), 'public/demo')
      
      // Check if dir exists
      if (!fs.existsSync(demoDir)) {
          return NextResponse.json({ error: 'Demo dir not found at ' + demoDir }, { status: 500 })
      }

      const files = fs.readdirSync(demoDir).filter((file) => file.endsWith('.avif'))

      if (files.length === 0) {
        return NextResponse.json({ error: 'No demo images found' }, { status: 500 })
      }

      const createImage = async (filename: string, alt: string) => {
        const filePath = path.join(demoDir, filename)
        const buffer = fs.readFileSync(filePath)
        
        const existing = await payload.find({
          collection: 'media',
          where: {
            filename: {
              equals: filename
            }
          }
        })

        if (existing.docs.length > 0) {
          return existing.docs[0]
        }

        return await payload.create({
          collection: 'media',
          data: {
            alt,
          },
          file: {
            data: buffer,
            name: filename,
            mimetype: 'image/avif',
            size: buffer.length,
          },
        })
      }

      const coverImage = await createImage(files[0], 'About Cover Image')
      const portraitImage = await createImage(files[1], 'Founder Portrait')
      const icon1 = await createImage(files[2], 'Standard Icon 1')
      const icon2 = await createImage(files[3], 'Standard Icon 2')
      const icon3 = await createImage(files[4], 'Standard Icon 3')

      // 2. Update About Page Global
      await payload.updateGlobal({
        slug: 'about-page',
        data: {
          heroSection: {
            headline: 'Devoted to the Frame',
            coverImage: coverImage.id,
          },
          philosophy: {
            title: 'Our Philosophy',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                       {
                         type: 'text',
                         detail: 0,
                         format: 0,
                         mode: 'normal',
                         style: '',
                         text: 'At Morerolls, we believe that every frame counts. We are not just capturing moments; we are crafting legacies. Our dedication to visual excellence is uncompromising, and our passion for storytelling is what drives us forward.'
                       }
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                  },
                   {
                    type: 'paragraph',
                    children: [
                       {
                         type: 'text',
                         detail: 0,
                         format: 0,
                         mode: 'normal',
                         style: '',
                         text: 'We combine technical precision with artistic intuition to deliver results that elevate brands and resonate with audiences.'
                       }
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                  }
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
          founder: {
            name: 'Alex Moreroll',
            role: 'Director / Cinematographer',
            bio: {
                root: {
                    type: 'root',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                           {
                             type: 'text',
                             detail: 0,
                             format: 0,
                             mode: 'normal',
                             style: '',
                             text: 'With over a decade of experience in the industry, Alex has directed award-winning campaigns for global brands. His unique vision and attention to detail have established him as a leader in visual storytelling.'
                           }
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        textFormat: 0,
                        version: 1,
                      }
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 1,
                  },
            },
            portrait: portraitImage.id,
            yearsActive: 12,
          },
          standards: [
            {
              icon: icon1.id,
              title: 'Precision',
              description: 'We measure success in pixels and frames. Every details matters.',
            },
            {
              icon: icon2.id,
              title: 'Creativity',
              description: 'Innovation is at our core. We push boundaries to create something unique.',
            },
            {
              icon: icon3.id,
              title: 'Reliability',
              description: 'On time, on budget, and above expectations. That is our promise.',
            },
          ],
        },
      })
      
      return NextResponse.json({ success: true })
  } catch (error: any) {
      console.error(error)
      return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 })
  }
}
