"use client";

import { ProjectGrid } from "@/components/work/ProjectGrid";
import { Container } from "@/components/ui/Container";

export default function WorkPage() {
    return (
        <main className="bg-white min-h-screen pt-24 pb-20">
            <Container>
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-black uppercase tracking-tighter">Selected Work</h1>
            </Container>
            <ProjectGrid />
        </main>
    );
}
