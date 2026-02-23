"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Project, Media } from "@/payload-types";

type ProjectGridProps = React.HTMLAttributes<HTMLElement> & {
    projects: Project[];
};

export function ProjectGrid({ className, projects = [], ...props }: ProjectGridProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Derive categories from projects
    const categories = useMemo(() => {
        const cats = new Set<string>();
        projects.forEach((p) => {
            if (p.services) {
                // Split services by comma if multiple services are listed, or just add the whole string
                // Assuming services might be comma separated string based on typical CMS usage, 
                // but if it's just a text field, we'll strip whitespace.
                p.services.split(',').forEach(s => cats.add(s.trim()));
            }
        });
        return Array.from(cats).sort();
    }, [projects]);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const filteredProjects = selectedCategories.length === 0
        ? projects
        : projects.filter((project) => {
             if (!project.services) return false;
             const projectServices = project.services.split(',').map(s => s.trim());
             return selectedCategories.some(c => projectServices.includes(c));
        });

    return (
        <section className={cn("bg-white text-black", className)} {...props}>
            <Container>
                {/* Filter Bar */}
   

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const posterUrl = project.poster && typeof project.poster !== 'number' ? project.poster.url : null;
                            const posterAlt =  project.poster && typeof project.poster !== 'number' ? project.poster.alt : project.title;

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
                                                    alt={posterAlt}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                 <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs uppercase tracking-widest">
                                                    No Image
                                                 </div>
                                            )}
                                            {posterUrl && (
                                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col items-start">
                                            <h3 className="text-lg font-bold uppercase tracking-wider mb-1 group-hover:text-neutral-600 transition-colors">{project.title}</h3>
                                            <p className="text-xs text-neutral-500 uppercase tracking-widest">{project.services || project.year}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
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
    );
}

