'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { BlogPost, Media } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface BlogPostDetailProps {
  post: BlogPost
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  const cover =
    post.coverImage && typeof post.coverImage !== 'number'
      ? (post.coverImage as Media)
      : null

  return (
    <main className="bg-white min-h-screen text-black pt-24 pb-20">
      <Container>
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-black transition-colors mb-8 uppercase tracking-widest text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Cover Image */}
        {cover?.url && (
          <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 mb-12">
            <Image
              src={cover.url}
              alt={cover.alt ?? post.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        )}

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tight text-black"
            >
              {post.title}
            </motion.h1>
            {post.excerpt && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-neutral-600 leading-relaxed max-w-2xl"
              >
                {post.excerpt}
              </motion.p>
            )}
          </div>

          {/* Meta sidebar */}
          <div className="space-y-6">
            {post.category && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="border-t border-neutral-200 pt-4"
              >
                <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-1">
                  Category
                </h3>
                <p className="text-xl font-medium text-black">{post.category}</p>
              </motion.div>
            )}
            {post.publishedAt && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="border-t border-neutral-200 pt-4"
              >
                <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-1">
                  Published
                </h3>
                <p className="text-xl font-medium text-black">{formatDate(post.publishedAt)}</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Rich Text Content */}
        {post.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl prose prose-neutral prose-lg
              prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold
              prose-a:text-black prose-a:underline-offset-4
              prose-img:rounded-none prose-img:w-full
              prose-blockquote:border-l-black prose-blockquote:text-neutral-600"
          >
            <RichText data={post.content} />
          </motion.div>
        )}
      </Container>
    </main>
  )
}
