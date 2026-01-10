'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Media } from '@/payload-types' // We try to import, if fail we define locally or use any

// Fallback interface removed in favor of imported types
// interface Project { ... }

import { Project } from '@/payload-types'

interface ProjectGridProps extends React.HTMLAttributes<HTMLElement> {
  projects: Project[]
}

export function ProjectGrid({ className, projects, ...props }: ProjectGridProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Dynamically extract categories from services
  const categories = useMemo(() => {
    const allServices = projects.map((p) => p.services).filter(Boolean) as string[]
    // specialized logic: if services is comma separated, split it?
    // For now assume services is the category string.
    // Or we can split by comma if multiple services.
    const categoriesSet = new Set<string>()
    allServices.forEach((s) => {
      s.split(',').forEach((item) => categoriesSet.add(item.trim()))
    })
    return Array.from(categoriesSet).sort()
  }, [projects])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const filteredProjects =
    selectedCategories.length === 0
      ? projects
      : projects.filter((project) => {
          if (!project.services) return false
          // Check if any of the project's services match selected categories
          const projectCategories = project.services.split(',').map((s) => s.trim())
          return selectedCategories.some((c) => projectCategories.includes(c))
        })

  return (
    <section className={cn('bg-white text-black min-h-screen', className)} {...props}>
      <Container>
        {/* Filter Bar */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-10 md:mb-16 justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={cn(
                  'px-5 py-2 md:px-6 md:py-2 rounded-full border border-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300',
                  selectedCategories.includes(category)
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-neutral-100',
                )}
              >
                {category}
              </button>
            ))}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="px-4 py-2 text-xs md:text-sm uppercase tracking-widest text-neutral-500 hover:text-black transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              // Handle poster image url
              let posterUrl = ''
              if (project.poster && typeof project.poster === 'object' && 'url' in project.poster) {
                posterUrl = project.poster.url || ''
              }

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/projects/${project.slug}`} className="group block">
                    {/* Image / Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-neutral-100 mb-4">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={project.title}
                          fill
                          unoptimized={true} // เพิ่มบรรทัดนี้
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-neutral-400">
                          No Image
                        </div>
                      )}
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg font-bold uppercase tracking-wider mb-1 group-hover:text-neutral-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-neutral-500 uppercase tracking-widest">
                        {project.services || project.client}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-neutral-400 uppercase tracking-widest">
            No projects found
          </div>
        )}
      </Container>
    </section>
  )
}
