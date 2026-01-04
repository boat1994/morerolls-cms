import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

interface MainIdeaProps {
    description: string;
    highlightText?: string;
}

export function MainIdea({ description, highlightText }: MainIdeaProps) {
    return (
        <Section className="bg-neutral-50 dark:bg-neutral-900">
            <Container>
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-2xl font-semibold text-neutral-900 dark:text-white"
                        >
                            Main Idea
                        </motion.h2>
                    </div>
                    <div className="md:col-span-8">
                        {highlightText && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-8 text-3xl font-medium leading-tight text-neutral-900 md:text-4xl dark:text-white"
                            >
                                {highlightText}
                            </motion.p>
                        )}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="prose prose-lg text-neutral-600 dark:text-neutral-400"
                        >
                            <p>{description}</p>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
