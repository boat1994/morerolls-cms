import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { Container } from '@/components/ui/Container'
import { BlogPost } from '@/payload-types'
import { getLocale } from '@/lib/locale'
import { getDictionary } from '@/lib/i18n'

export const revalidate = 60

export default async function BlogPage() {
  const locale = await getLocale()
  const dict = await getDictionary(locale)
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
            {dict.blog.header_title}
          </h1>
          <p className="text-lg text-black">{dict.blog.header_subtitle}</p>
        </div>
      </Container>
      <BlogGrid posts={posts.docs as BlogPost[]} dict={dict.blog} locale={locale} />
    </main>
  )
}
