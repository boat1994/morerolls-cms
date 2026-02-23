'use client'
import dynamic from 'next/dynamic'
import { Container } from '@/components/ui/Container'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Media } from '@/payload-types'
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Project } from '@/payload-types'

interface ProjectDetailsProps {
  project: Project
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [hasWindow, setHasWindow] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setHasWindow(true)
  }, [])

  // Handle poster
  let posterUrl = ''
  if (project.poster && typeof project.poster === 'object' && 'url' in project.poster) {
    posterUrl = project.poster.url || ''
  }

  return (
    <main className="bg-white min-h-screen text-black pt-24 pb-20">
      <Container>
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-black transition-colors mb-8 uppercase tracking-widest text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Video Player */}
        <div className="aspect-video w-full bg-neutral-100 mb-12 relative overflow-hidden group/video">
          {hasWindow && project.videoSrc ? (
            <>
              {!isPlaying && posterUrl && (
                <div
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <Image
                    src={posterUrl}
                    alt={project.title}
                    fill
                    unoptimized={true} // เพิ่มบรรทัดนี้
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover/video:bg-black/20 transition-colors duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover/video:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-black border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
              )}

              <ReactPlayer
                url={project.videoSrc}
                width="100%"
                height="100%"
                controls={true}
                playing={isPlaying}
                onPlay={() => setIsPlaying(true)}
                config={{
                  youtube: {
                    playerVars: { showinfo: 0, rel: 0, modestbranding: 1, autoplay: 1 },
                  },
                }}
              />
            </>
          ) : posterUrl ? (
            /* Static Image if no video */
            <Image src={posterUrl} alt={project.title} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              Video / Image not available
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-black"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-700 leading-relaxed max-w-2xl whitespace-pre-wrap"
            >
              {project.description}
            </motion.p>
          </div>

          <div className="space-y-8">
            {project.client && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="border-t border-neutral-200 pt-4"
              >
                <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-1">Client</h3>
                <p className="text-xl font-medium text-black">{project.client}</p>
              </motion.div>
            )}
            {project.year && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="border-t border-neutral-200 pt-4"
              >
                <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-1">Year</h3>
                <p className="text-xl font-medium text-black">{project.year}</p>
              </motion.div>
            )}
            {project.services && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t border-neutral-200 pt-4"
              >
                <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-1">
                  Services
                </h3>
                <p className="text-xl font-medium text-black">{project.services}</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Screenshots Section */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-16 space-y-12">
            <hr className="border-neutral-200" />
            {project.screenshots.map((item, index) => {
              const imgMedia = typeof item.image === 'object' ? (item.image as Media) : null
              if (!imgMedia?.url) return null
              return (
                <motion.div
                  key={item.id ?? index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-full relative">
                    <Image
                      src={imgMedia.url}
                      alt={item.caption ?? imgMedia.alt ?? `Screenshot ${index + 1}`}
                      width={imgMedia.width ?? 1920}
                      height={imgMedia.height ?? 1080}
                      className="w-full h-auto object-contain"
                      unoptimized
                    />
                  </div>
                  {item.caption && (
                    <p className="mt-4 text-neutral-500 text-sm text-center max-w-2xl leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </Container>
    </main>
  )
}
