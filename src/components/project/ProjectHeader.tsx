import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProjectHeaderProps {
    clientName: string;
    title: string;
    category?: string;
    year?: string;
    services?: string[];
}

export function ProjectHeader({ clientName, title, category, year = "2024", services = [] }: ProjectHeaderProps) {
    return (
        <Section className="pt-8 pb-12 md:pt-12 md:pb-16">
            <Container>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>
                </motion.div>

                <div className="flex flex-col gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold tracking-tighter text-neutral-900 md:text-6xl lg:text-7xl dark:text-white mb-4">
                            {title}
                        </h1>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400">
                            {category}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full mt-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            <div className="p-0">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Client</h3>
                                <p className="text-black font-medium text-lg md:text-xl">{clientName}</p>
                            </div>
                            <div className="p-0">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Year</h3>
                                <p className="text-black font-medium text-lg md:text-xl">{year}</p>
                            </div>
                            <div className="p-0">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">Services</h3>
                                <p className="text-black font-medium text-lg md:text-xl">{services.join(", ")}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
