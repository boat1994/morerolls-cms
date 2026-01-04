"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import {
    Triangle,
    Circle,
    Square,
    Hexagon,
    Diamond,
    Star,
    Zap,
    Globe,
    Command,
    Layers,
    Layout,
    Box,
    Target,
    Award,
    Crown,
    Shield,
    LucideIcon,
} from "lucide-react";

const CLIENTS = [
    "Bunim Murray",
    "CNN",
    "Fox Sports",
    "Food Network",
    "Facebook",
    "Endemol Shine",
    "Dori Media",
    "Discovery",
    "Google",
    "Gillette",
    "Grey",
    "HGTV",
    "Hulegu Pictures",
    "IKEA",
    "Nordisk Film TV",
    "Nat Geo",
    "NBC",
    "MTV",
    "Moskito TV",
    "Mitsubishi",
    "Oppo",
    "Red Bull",
    "Rosewood",
    "Spike",
    "Travel Channel",
    "UOB",
    "Zero Point Zero",
    "Warner Bros.",
];

const ICONS = [
    Triangle,
    Circle,
    Square,
    Hexagon,
    Diamond,
    Star,
    Zap,
    Globe,
    Command,
    Layers,
    Layout,
    Box,
    Target,
    Award,
    Crown,
    Shield,
];

const getClientIcon = (name: string): LucideIcon => {
    // Deterministic hash to assign an icon based on the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % ICONS.length;
    return ICONS[index];
};

export function ClientLogos() {
    return (
        <section className="bg-white text-black py-12 md:py-20 border-b border-neutral-100">
            <Container>
                <div className="mb-8 md:mb-12">
                    <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-neutral-400">
                        Trusted By
                    </h2>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-8 gap-y-12">
                    {CLIENTS.map((client) => {
                        const Icon = getClientIcon(client);
                        return (
                            <div
                                key={client}
                                className="flex flex-col items-center justify-center gap-3 grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-300 group"
                            >
                                <Icon className="w-8 h-8 stroke-1 text-neutral-800 group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-sm font-bold text-center">{client}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Marquee */}
                <div className="md:hidden overflow-hidden relative w-full">
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
                            {[...CLIENTS, ...CLIENTS].map((client, index) => {
                                const Icon = getClientIcon(client);
                                return (
                                    <div
                                        key={`${client}-${index}`}
                                        className="flex items-center gap-3 h-12 whitespace-nowrap"
                                    >
                                        <Icon className="w-6 h-6 stroke-1 text-neutral-800" />
                                        <span className="text-lg font-bold text-neutral-800">{client}</span>
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
