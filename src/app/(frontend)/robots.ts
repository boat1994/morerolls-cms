import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // ป้องกันบอทเข้าถึงหน้าจัดการและระบบหลังบ้าน
    },
    // sitemap: 'https://morerolls.com/sitemap.xml', // Uncomment and update this if you have a sitemap
  }
}
