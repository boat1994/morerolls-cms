"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const DEMO_IMAGES = [
    "/demo/454aca_13659d4f8a2b4d83a2b0d71fa3468257~mv2.avif",
    "/demo/454aca_5853207a423f416c8ee0f28f8c2c78d6~mv2.avif",
    "/demo/454aca_8996e52ffaf64ff9aa79ddec5e169357~mv2.avif",
    "/demo/454aca_8aeacd61040c485481d23136e958e393~mv2.avif",
    "/demo/454aca_93334ce80c224cfdb80d38b406a9b693~mv2.avif",
    "/demo/454aca_c5a53aedb1c14ec1bda90194df08ab23~mv2.avif",
];

const TEAM = [
    {
        name: "Sarah Jenkins",
        role: "Executive Producer",
        image: DEMO_IMAGES[0],
    },
    {
        name: "David Chen",
        role: "Creative Director",
        image: DEMO_IMAGES[1],
    },
    {
        name: "Marcus Thorne",
        role: "Director of Photography",
        image: DEMO_IMAGES[2],
    },
    {
        name: "Elena Rodriguez",
        role: "Head of Production",
        image: DEMO_IMAGES[3],
    },
    {
        name: "James Wilson",
        role: "Senior Editor",
        image: DEMO_IMAGES[4],
    },
    {
        name: "Yuki Tanaka",
        role: "Art Director",
        image: DEMO_IMAGES[5],
    },
];

export default function AboutPage() {
    return (
        <main className="bg-white min-h-screen text-black pt-32 pb-20">
            <Container>
                <div className="max-w-4xl mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tight"
                    >
                        The Team
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-neutral-600 leading-relaxed"
                    >
                        We are a collective of filmmakers, storytellers, and creatives dedicated to crafting visual experiences that resonate.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {TEAM.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <h3 className="text-lg font-bold uppercase tracking-wider mb-1">{member.name}</h3>
                            <p className="text-sm text-neutral-500 uppercase tracking-widest">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </main>
    );
}
