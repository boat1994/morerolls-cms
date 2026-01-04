"use client";

import { Container } from "@/components/ui/Container";

const SERVICES = [
    {
        title: "Pre-Production",
        items: ["Creative Development", "Scriptwriting", "Storyboarding", "Location Scouting", "Casting"],
    },
    {
        title: "Production",
        items: ["Director of Photography", "Camera Crew", "Lighting & Grip", "Sound Recording", "On-Set Supervision"],
    },
    {
        title: "Post-Production",
        items: ["Video Editing", "Color Grading", "Sound Design", "Visual Effects (VFX)", "Motion Graphics"],
    },
];

export default function ServicesPage() {
    return (
        <main className="bg-white min-h-screen pt-24 pb-20 text-black">
            <Container>
                <h1 className="text-4xl md:text-6xl font-bold mb-16 uppercase tracking-tighter">Services</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {SERVICES.map((service, index) => (
                        <div key={index} className="space-y-6">
                            <h2 className="text-2xl font-bold uppercase tracking-wide border-b border-neutral-200 pb-4">{service.title}</h2>
                            <ul className="space-y-3">
                                {service.items.map((item, i) => (
                                    <li key={i} className="text-lg text-neutral-700 hover:text-black transition-colors cursor-default">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </Container>
        </main>
    );
}
