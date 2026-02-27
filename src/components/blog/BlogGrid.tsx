'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { BlogPost, Media } from '@/payload-types'
import type { Dictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/locale'

type BlogGridProps = React.HTMLAttributes<HTMLElement> & {
  posts: BlogPost[]
  dict: Dictionary['blog']
  locale: Locale
}

function formatDate(dateStr?: string | null, locale: string = 'en') {
  if (!dateStr) return ''
  const localeCode = locale === 'th' ? 'th-TH' : 'en-GB'
  return new Date(dateStr).toLocaleDateString(localeCode, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function BlogGrid({ className, posts = [], dict, locale, ...props }: BlogGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set<string>()
    posts.forEach((p) => {
      if (p.category) cats.add(p.category.trim())
    })
    return Array.from(cats).sort()
  }, [posts])

  const filtered = selectedCategory
    ? posts.filter((p) => p.category?.trim() === selectedCategory)
    : posts

  return (
    <section className={cn('bg-white text-black', className)} {...props}>
      <Container>
        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                'px-4 py-1.5 text-xs uppercase tracking-widest border transition-colors duration-200',
                selectedCategory === null
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:border-black hover:text-black',
              )}
            >
              {dict.all_categories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                className={cn(
                  'px-4 py-1.5 text-xs uppercase tracking-widest border transition-colors duration-200',
                  selectedCategory === cat
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-neutral-500 border-neutral-200 hover:border-black hover:text-black',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => {
              const cover =
                post.coverImage && typeof post.coverImage !== 'number'
                  ? (post.coverImage as Media)
                  : null
              return (
                <motion.div
                  layout
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    {/* Cover */}
                    <div className="relative aspect-video overflow-hidden bg-neutral-100 mb-4">
                      {cover?.url ? (
                        <Image
                          src={cover.url}
                          alt={cover.alt ?? post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs uppercase tracking-widest">
                          {dict.no_image}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col items-start gap-1">
                      {(post.category || post.publishedAt) && (
                        <p className="text-xs text-neutral-400 uppercase tracking-widest">
                          {[post.category, formatDate(post.publishedAt, locale)].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      <h3 className="text-lg font-bold uppercase tracking-wider group-hover:text-neutral-600 transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-neutral-400 uppercase tracking-widest">
            {dict.no_posts_found}
          </div>
        )}
      </Container>
    </section>
  )
}
