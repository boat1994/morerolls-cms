"use client";

import { useState, useMemo } from "react";
import { Service } from "@/payload-types"; // Type will exist after generation
import { Container } from "@/components/ui/Container";
import { CategoryFilter } from "./CategoryFilter";
import { ServiceCard } from "./ServiceCard";
import { ServiceDetailModal } from "./ServiceDetailModal";
import { AnimatePresence, motion } from "framer-motion";

type ServicesPageProps = {
    services: Service[];
};

export function ServicesPage({ services }: ServicesPageProps) {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    // Derive unique categories from services, plus 'all'
    const categories = useMemo(() => {
        const uniqueCats = new Set(services.map(s => s.category));
        // Manual mapping for pretty labels if needed, or just use value
        // The Payload config has specific options: short-video, presentation, ads
        // We can map these to labels.
        const labelMap: Record<string, string> = {
            'short-video': 'Short Video',
            'presentation': 'Presentation',
            'ads': 'Advertisement',
        };

        const cats = Array.from(uniqueCats).map(c => ({
            value: c,
            label: labelMap[c] || c
        }));

        // Sort or prioritize specific order if needed
        return [{ value: "all", label: "All Services" }, ...cats];
    }, [services]);

    const filteredServices = useMemo(() => {
        if (activeCategory === "all") return services;
        return services.filter(s => s.category === activeCategory);
    }, [services, activeCategory]);

    return (
        <main className="bg-white min-h-screen pt-24 pb-20 text-black">
            <Container>
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter">Services</h1>
                    <p className="text-neutral-500 max-w-xl text-lg font-light">
                        Professional production solutions tailored to your business needs, transparently priced.
                    </p>
                </div>

                <CategoryFilter 
                    categories={categories}
                    activeCategory={activeCategory}
                    onSelect={setActiveCategory}
                />

                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredServices.map((service) => (
                            <motion.div
                                layout
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ServiceCard 
                                    service={service} 
                                    onViewDetails={setSelectedService}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredServices.length === 0 && (
                     <div className="text-center py-20 border border-dashed border-neutral-200 bg-neutral-50 rounded-lg">
                        <p className="text-neutral-500 uppercase tracking-widest text-sm">
                            Contact us for custom requests
                        </p>
                    </div>
                )}
            </Container>

            <ServiceDetailModal 
                service={selectedService}
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
            />
        </main>
    );
}
