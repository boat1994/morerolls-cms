"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const DEMO_IMAGES = [
    "/demo/454aca_13659d4f8a2b4d83a2b0d71fa3468257~mv2.avif",
    "/demo/454aca_5853207a423f416c8ee0f28f8c2c78d6~mv2.avif",
    "/demo/454aca_8996e52ffaf64ff9aa79ddec5e169357~mv2.avif",
    "/demo/454aca_8aeacd61040c485481d23136e958e393~mv2.avif",
    "/demo/454aca_93334ce80c224cfdb80d38b406a9b693~mv2.avif",
    "/demo/454aca_c5a53aedb1c14ec1bda90194df08ab23~mv2.avif",
    "/demo/454aca_d802e289e9224cc3b8338b49200743a4~mv2.avif",
    "/demo/454aca_e8557d2c42b144d0aaed308016943fba~mv2.avif",
    "/demo/454aca_fa497e9e932a46d7ad964a0b906c871f~mv2.avif",
];

const CATEGORIES = [
    "Advertising",
    "Presentation Video",
    "Short Clip",
    "Custom",
];

// Mock data with new categories
const PROJECTS = [
    {
        id: "1",
        title: "Fashion Week 2024",
        category: "Advertising",
        slug: "fashion-week-2024",
    },
    {
        id: "2",
        title: "Urban Exploration",
        category: "Short Clip",
        slug: "urban-exploration",
    },
    {
        id: "3",
        title: "Product Launch",
        category: "Presentation Video",
        slug: "product-launch",
    },
    {
        id: "4",
        title: "Music Video",
        category: "Custom",
        slug: "music-video",
    },
    {
        id: "5",
        title: "Corporate Film",
        category: "Presentation Video",
        slug: "corporate-film",
    },
    {
        id: "6",
        title: "Travel Diary",
        category: "Short Clip",
        slug: "travel-diary",
    },
    {
        id: "7",
        title: "Brand Campaign",
        category: "Advertising",
        slug: "brand-campaign",
    },
    {
        id: "8",
        title: "Social Media Series",
        category: "Short Clip",
        slug: "social-media-series",
    },
];

type ProjectGridProps = React.HTMLAttributes<HTMLElement>;

export function ProjectGrid({ className, ...props }: ProjectGridProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const filteredProjects = selectedCategories.length === 0
        ? PROJECTS
        : PROJECTS.filter((project) => selectedCategories.includes(project.category));

    return (
        <section className={cn("bg-white text-black min-h-screen", className)} {...props}>
            <Container>
                {/* Filter Bar */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-10 md:mb-16 justify-start">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={cn(
                                "px-5 py-2 md:px-6 md:py-2 rounded-full border border-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300",
                                selectedCategories.includes(category)
                                    ? "bg-black text-white"
                                    : "bg-white text-black hover:bg-neutral-100"
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

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link href={`/work/${project.slug}`} className="group block">
                                    {/* Image / Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden bg-neutral-100 mb-4">
                                        <Image
                                            src={DEMO_IMAGES[parseInt(project.id) % DEMO_IMAGES.length]}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col items-start">
                                        <h3 className="text-lg font-bold uppercase tracking-wider mb-1 group-hover:text-neutral-600 transition-colors">{project.title}</h3>
                                        <p className="text-xs text-neutral-500 uppercase tracking-widest">{project.category}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
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
