"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export interface ProjectData {
  title: string;
  client: string;
  year: string;
  services: string;
  description: string;
  videoSrc: string;
  poster: string;
}

interface ProjectDetailsProps {
  project: ProjectData;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <main className="bg-white min-h-screen text-black pt-24 pb-20">
      <Container>
        {/* Back Link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-black transition-colors mb-8 uppercase tracking-widest text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Work
        </Link>

        {/* Video Player */}
        <div className="aspect-video w-full bg-neutral-100 mb-12 relative overflow-hidden">
          {project.videoSrc ? (
            <video
              controls
              className="w-full h-full object-cover"
              poster={project.poster}
            >
              <source src={project.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              Video not available
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
                    className="text-lg text-neutral-700 leading-relaxed max-w-2xl"
                >
                    {project.description}
                </motion.p>
            </div>

            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="border-t border-neutral-200 pt-4"
                >
                    <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-1">Client</h3>
                    <p className="text-xl font-medium text-black">{project.client}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border-t border-neutral-200 pt-4"
                >
                    <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-1">Year</h3>
                    <p className="text-xl font-medium text-black">{project.year}</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-neutral-200 pt-4"
                >
                    <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-1">Services</h3>
                    <p className="text-xl font-medium text-black">{project.services}</p>
                </motion.div>
            </div>
        </div>
      </Container>
    </main>
  );
}
