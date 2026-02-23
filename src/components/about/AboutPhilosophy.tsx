"use client";

import { Container } from "@/components/ui/Container";
import { RichText } from "@payloadcms/richtext-lexical/react";

type AboutPhilosophyProps = {
    title?: string | null;
    content?: any; // RichText Structure
};

export function AboutPhilosophy({ title, content }: AboutPhilosophyProps) {
    return (
        <section className="py-20 md:py-32 bg-white">
            <Container className="max-w-3xl text-center">
                {title && (
                   <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8 md:mb-12">
                       {title}
                   </h2>
                )}
                
                {content && (
                    <div className="prose prose-lg md:prose-xl mx-auto text-neutral-800 leading-relaxed font-serif">
                         <RichText data={content} />
                    </div>
                )}
            </Container>
        </section>
    );
}
