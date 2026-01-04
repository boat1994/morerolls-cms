import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { motion } from "framer-motion";

export interface HighlightItem {
    id: string;
    title: string;
    description: string;
    type: "single" | "slider";
    content: React.ReactNode; // The image or slider content
}

interface HighlightSectionProps {
    items: HighlightItem[];
}

export function HighlightSection({ items }: HighlightSectionProps) {
    return (
        <div className="flex flex-col gap-0">
            {items.map((item, index) => (
                <Section key={item.id} className="border-t border-neutral-200 dark:border-neutral-800">
                    <Container>
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                            <div className="lg:col-span-4">
                                <div className="sticky top-24">
                                    <motion.h3
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white"
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 }}
                                        className="text-lg text-neutral-600 dark:text-neutral-400"
                                    >
                                        {item.description}
                                    </motion.p>
                                </div>
                            </div>
                            <div className="lg:col-span-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {item.type === "slider" ? (
                                        // If content is an array of nodes, we wrap it in ImageSlider?
                                        // Actually, let's assume 'content' IS the slider or image component
                                        item.content
                                    ) : (
                                        <div className="overflow-hidden rounded-xl shadow-lg">
                                            {item.content}
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    </Container>
                </Section>
            ))}
        </div>
    );
}
