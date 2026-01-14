"use client";

import { Media } from "@/payload-types";
import Image from "next/image";

type AboutHeroProps = {
    headline?: string | null;
    coverImage?: Media | number | null;
    textColor?: 'black' | 'white' | null;
    showHeadline?: boolean | null;
    subtext?: string | null;
    showSubtext?: boolean | null;
};

export function AboutHero({ 
    headline, 
    coverImage, 
    textColor = 'black', 
    showHeadline = true,
    subtext,
    showSubtext = false 
}: AboutHeroProps) {
    const imageUrl = typeof coverImage !== 'number' && coverImage ? coverImage.url : null;
    const imageAlt = typeof coverImage !== 'number' && coverImage ? coverImage.alt : "Cover Image";

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
             {imageUrl && (
                <div className="absolute inset-0 z-0 select-none">
                     <Image
                        src={imageUrl}
                        alt={imageAlt || "About Hero"}
                        fill
                        className="object-cover"
                        priority
                    />
                    
                </div>
            )}
            
            {showHeadline && (
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className={`text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-4 drop-shadow-lg ${
                        textColor === 'white' ? 'text-white' : 'text-black'
                    }`}>
                        {headline || "Devoted to the Frame"}
                    </h1>
                    {showSubtext && subtext && (
                        <p className={`text-lg md:text-xl tracking-widest uppercase max-w-2xl mx-auto drop-shadow-md ${
                            textColor === 'white' ? 'text-white/90' : 'text-black/90'
                        }`}>
                            {subtext}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}
