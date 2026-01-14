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
                highlight: 'ถ่ายทอดวิสัยทัศน์และภาพลักษณ์องค์กรอย่างมืออาชีพ เพื่อสร้างความน่าเชื่อถือและความประทับใจระดับสากล',
                recommendedFor: 'Companies rebranding or launching new initiatives.',
                specs: [
                    { label: 'Duration', value: '3 - 5 Minutes' },
                    { label: 'Resolution', value: '4K Master' },
                    { label: 'Timeline', value: '30 - 45 Business Days' },
                ],
                deliverables: [
                    { item: '1x Corporate Brand Film (Storytelling focus)' },
                    { item: 'Professional Executive Interview Setup & Lighting' },
                    { item: 'Premium Motion Graphics & Infographics' },
                    { item: 'Professional Voiceover (Thai or English)' },
                ]
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
                highlight: 'สร้าง Impact สูงสุดให้กับแคมเปญโฆษณา ด้วยงานโปรดักชันระดับ Cinema ที่เน้นการสร้างยอดขายและการจดจำแบรนด์',
                recommendedFor: 'Major product launches and brand awareness.',
                specs: [
                    { label: 'Duration', value: '15 - 30 Seconds (Multi-cut)' },
                    { label: 'Resolution', value: 'Cinema Grade (RAW/Log)' },
                    { label: 'Format', value: 'Multi-platform Optimized (16:9, 9:16, 1:1)' },
                ],
                deliverables: [
                    { item: '1x Main Commercial Master (TVC Quality)' },
                    { item: '3x Social Media Cut-downs (15s, 6s) for Ads' },
                    { item: 'Full Production Team & Cinema Standard Equipment' },
                    { item: 'Advanced Color Science & Custom Sound Design' },
                ]
            }
        })
        console.log('Services seeded.')
        
        return NextResponse.json({ success: true, message: 'All data seeded successfully' })
    } catch (error: any) {
        console.error("Seed Error:", error)
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 })
    }
  }
