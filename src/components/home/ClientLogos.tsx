"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Media } from "@/payload-types";
import Image from "next/image";

type ClientLogosProps = {
    logos?: {
        logo: Media | number;
        id?: string | null;
    }[] | null;
};

export function ClientLogos({ logos = [] }: ClientLogosProps) {
    if (!logos || logos.length === 0) return null;

    return (
        <section className="bg-white text-black py-12 md:py-20 border-b border-neutral-100">
            <Container>
                <div className="mb-8 md:mb-12">
                    <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-400">
                        Trusted By
                    </h2>
                </div>

                {/* Mobile Marquee */}
                <div className="overflow-hidden relative w-full">
                    <div className="flex w-max">
                        <motion.div
                            className="flex gap-12 pr-12"
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 40,
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...logos, ...logos].map((item, index) => {
                                const logoUrl = (item.logo && typeof item.logo === 'object') ? item.logo.url : null;
                                const logoAlt = (item.logo && typeof item.logo === 'object') ? item.logo.alt : 'Client Logo';

                                if (!logoUrl) return null;

                                return (
                                    <div
                                        key={`${item.id}-${index}`}
                                        className="flex items-center justify-center h-16 whitespace-nowrap relative w-16"
                                    >
                                        <div className="relative w-16 h-16">
                                            <Image 
                                                src={logoUrl}  
                                                alt={logoAlt} 
                                                fill 
                                                className="object-contain brightness-8"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Fade edges for mobile */}
                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                </div>
            </Container>
        </section>
    );
}
