
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Project } from '@/payload-types'

interface ProjectGridProps extends React.HTMLAttributes<HTMLElement> {
  projects: Project[]
}

export function ProjectGrid({ className, projects, ...props }: ProjectGridProps) {
  return (
    <section className={cn('bg-white text-black min-h-screen', className)} {...props}>
      <Container>
        <motion.div layout className="grid grid-cols-1 gap-y-16 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => {
              // Handle poster image url
              let posterUrl = ''
              if (project.poster && typeof project.poster === 'object' && 'url' in project.poster) {
                posterUrl = project.poster.url || ''
              }

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Link href={`/projects/${project.slug}`} className="group block">
                    {/* Image / Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-neutral-100 mb-6 shadow-sm">
                      {posterUrl ? (
                        <Image
                          src={posterUrl}
                          alt={project.title}
                          fill
                          priority={projects.indexOf(project) < 2}
                          unoptimized={true}
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-neutral-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-start gap-1">
                      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-1 group-hover:text-neutral-600 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm md:text-base text-neutral-500 uppercase tracking-widest">
                        <span>{project.year}</span>
                        {project.services && (
                          <>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                            <span>{project.services}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {projects.length === 0 && (
          <div className="text-center py-20 text-neutral-400 uppercase tracking-widest">
            No projects found
          </div>
        )}
      </Container>
    </section>
  )
}
