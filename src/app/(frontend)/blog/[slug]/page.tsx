import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BlogPostDetail } from '@/components/blog/BlogPostDetail'
import { notFound } from 'next/navigation'
import { BlogPost } from '@/payload-types'
import { getLocale } from '@/lib/locale'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'blog-posts',
      limit: 1000,
    })
    return posts.docs.map((post) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    locale,
    fallbackLocale: 'en',
  })

  const post = result.docs[0] as BlogPost | undefined
  if (!post) notFound()

  return <BlogPostDetail post={post} />
}
