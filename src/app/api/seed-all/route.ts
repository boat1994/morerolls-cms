import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export const POST = async () => {
    const payload = await getPayload({ config: configPromise })
  
    console.log('Seeding ALL data...')
  
    try {
        // Seed General
        await payload.updateGlobal({
            slug: 'general',
            data: {
              footerText: 'Morerolls Studio',
              socialLinks: [
                {
                  label: 'Instagram',
                  url: 'https://instagram.com',
                },
                {
                  label: 'Vimeo',
                  url: 'https://vimeo.com',
                },
                {
                  label: 'LinkedIn',
                  url: 'https://linkedin.com',
                },
              ],
            },
        })
        console.log('General seeded.')

        // Seed Contact Page
        await payload.updateGlobal({
            slug: 'contact-page',
            data: {
              headline: "Let's Create\nSomething\nExtraordinary.",
              email: "hello@morerolls.com",
              phone: "+66 12 345 6789",
              visitUs: {
                  showSection: true,
                  address: "123 Creative District,\nSukhumvit Road, Bangkok,\nThailand 10110"
              }
            },
        })
        console.log('Contact Page seeded.')

        // Seed Services
        // Check if services exist first? Since we dropped table, it's empty.
        // But we should use create logic.
        
        await payload.create({
            collection: 'services',
            data: {
                title: 'Premium Cinematic Short',
                category: 'short-video',
                price: {
                    amount: 200000,
                    unit: 'Project',
                    isStartingAt: true
                },
                highlight: 'High-end cinematic short video production for digital platforms.',
                recommendedFor: 'Brands looking for premium visuals.',
            }
        })

        await payload.create({
            collection: 'services',
            data: {
                title: 'Corporate Narrative & Identity',
                category: 'presentation',
                price: {
                    amount: 350000,
                    unit: 'Project',
                    isStartingAt: true
                },
                highlight: 'Comprehensive corporate identity storytelling.',
                recommendedFor: 'Companies rebranding or launching new initiatives.',
            }
        })

        await payload.create({
            collection: 'services',
            data: {
                title: 'Commercial Brand Campaign',
                category: 'ads',
                price: {
                    amount: 500000,
                    unit: 'Campaign',
                    isStartingAt: true
                },
                highlight: 'Full-scale commercial advertisement production.',
                recommendedFor: 'Major product launches and brand awareness.',
            }
        })
        console.log('Services seeded.')
        
        return NextResponse.json({ success: true, message: 'All data seeded successfully' })
    } catch (error: any) {
        console.error("Seed Error:", error)
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 })
    }
  }
