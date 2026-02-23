"use client";

import { AboutPage as AboutPageType } from "@/payload-types";
import { AboutHero } from "./AboutHero";
import { AboutPhilosophy } from "./AboutPhilosophy";
import { FounderSpotlight } from "./FounderSpotlight";
import { StandardsGrid } from "./StandardsGrid";

type AboutPageProps = {
    data: AboutPageType;
};

export function AboutPage({ data }: AboutPageProps) {
    const { heroSection, philosophy, founder, standards } = data;

    return (
        <main className="bg-white min-h-screen text-black">
            <AboutHero 
                headline={heroSection?.headline}
                coverImage={heroSection?.coverImage}
                textColor={heroSection?.textColor as 'black' | 'white' | null}
                showHeadline={heroSection?.showHeadline}
                subtext={heroSection?.subtext}
                showSubtext={heroSection?.showSubtext}
            />
            
            <AboutPhilosophy 
                title={philosophy?.title}
                content={philosophy?.content}
            />

            <FounderSpotlight 
                name={founder?.name}
                role={founder?.role}
                bio={founder?.bio}
                portrait={founder?.portrait}
                yearsActive={founder?.yearsActive}
            />

            <StandardsGrid standards={standards} />
        </main>
    );
}
