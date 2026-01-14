"use client";

import { Media } from "@/payload-types";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RichText } from "@payloadcms/richtext-lexical/react";

type FounderSpotlightProps = {
    name?: string | null;
    role?: string | null;
    bio?: any;
    portrait?: Media | number | null;
    yearsActive?: number | null;
};

export function FounderSpotlight({ name, role, bio, portrait, yearsActive }: FounderSpotlightProps) {
    const portraitUrl = typeof portrait !== 'number' && portrait ? portrait.url : null;
    const portraitAlt = typeof portrait !== 'number' && portrait ? portrait.alt : "Founder Portrait";

    return (
        <section className="py-20 md:py-32 bg-neutral-50">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                    {/* Image Side (Left on Desktop) */}
                    <div className="relative aspect-[3/4] md:aspect-square w-full shadow-2xl overflow-hidden">
                        {portraitUrl ? (
                            <Image
                                src={portraitUrl}
                                alt={portraitAlt || "Founder"}
                                fill
                                className="object-cover transition-all duration-700"
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400">
                                No Portrait
                            </div>
                        )}
                        
                        {yearsActive && (
                            <div className="absolute bottom-0 left-0 bg-black text-white p-6 md:p-8">
                                <span className="block text-4xl md:text-6xl font-bold leading-none">{yearsActive}</span>
                                <span className="block text-xs uppercase tracking-widest mt-2 opacity-80">Years Active</span>
                            </div>
                        )}
                    </div>

                    {/* Text Side (Right on Desktop) */}
                    <div>
                        <div className="mb-8 md:mb-10">
                             <h3 className="text-3xl md:text-5xl font-bold text-black mb-3">{name}</h3>
                             <p className="text-xl text-neutral-500 font-medium tracking-tight">{role}</p>
                        </div>

                        {bio && (
                            <div className="prose prose-lg prose-neutral text-neutral-600 leading-relaxed">
                                <RichText data={bio} />
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
}
