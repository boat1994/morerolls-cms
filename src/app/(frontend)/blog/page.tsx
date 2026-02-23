import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { Container } from '@/components/ui/Container'
import { BlogPost } from '@/payload-types'
import { getLocale } from '@/lib/locale'

export const revalidate = 60

export default async function BlogPage() {
  const locale = await getLocale()
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'blog-posts',
    sort: '-publishedAt',
    locale,
    fallbackLocale: 'en',
  })

  return (
    <main className="bg-white min-h-screen pt-24 pb-20">
      <Container>
        <div className="mb-12 mt-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black uppercase tracking-tighter">
            Blog
          </h1>
          <p className="text-lg text-black">Stories, knowledge & behind the scenes</p>
        </div>
      </Container>
      <BlogGrid posts={posts.docs as BlogPost[]} />
    </main>
  )
}
