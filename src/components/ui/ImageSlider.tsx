"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
    images: React.ReactNode[]; // We pass nodes (images) directly for flexibility
    className?: string;
}

export function ImageSlider({ images, className }: ImageSliderProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className={cn("relative w-full overflow-hidden", className)} ref={scrollRef}>
            <motion.div
                className="flex gap-4 overflow-x-auto px-4 pb-8 pt-4 sm:px-6 lg:px-8 snap-x snap-mandatory"
                whileTap={{ cursor: "grabbing" }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative flex-none w-[80vw] md:w-[60vw] lg:w-[40vw] snap-center"
                    >
                        <div className="overflow-hidden rounded-lg shadow-md">
                            {image}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
