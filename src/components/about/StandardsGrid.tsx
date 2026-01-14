"use client";

import { Media } from "@/payload-types";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

type StandardItem = {
    icon?: Media | number | null;
    title?: string | null;
    description?: string | null;
    id?: string | null;
};

type StandardsGridProps = {
    standards?: StandardItem[] | null;
};

export function StandardsGrid({ standards = [] }: StandardsGridProps) {
    if (!standards || standards.length === 0) return null;

    return (
        <section className="py-20 md:py-32 bg-white">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
                    {standards.map((item, index) => {
                        const iconUrl = item.icon && typeof item.icon !== 'number' ? item.icon.url : null;
                        
                        return (
                            <div key={item.id || index} className="py-12 first:pt-0 last:pb-0 md:py-0 md:px-8 first:pl-0 last:pr-0 text-center flex flex-col items-center">
                                {iconUrl && (
                                    <div className="mb-6 flex items-start justify-center">
                                        <div className="w-12 h-12 relative flex-shrink-0">
                                            <Image 
                                                src={iconUrl} 
                                                alt={item.title || "Icon"} 
                                                fill 
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                                
                                <h4 className="text-xl font-bold mb-3 text-black">{item.title}</h4>
                                <p className="text-neutral-600 leading-relaxed text-base">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
