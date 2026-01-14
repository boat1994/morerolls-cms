"use client";

import { useState } from "react";
import { Service } from "@/payload-types";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "./ServiceCard";
import { ServiceDetailModal } from "./ServiceDetailModal";

type ServicesPageProps = {
    services: Service[];
};

export function ServicesPage({ services }: ServicesPageProps) {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    return (
        <main className="bg-white min-h-screen pt-24 pb-20 text-black">
            <Container>
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tighter">Services</h1>
                    <p className="text-neutral-500 max-w-xl text-lg font-light">
                        Professional production solutions tailored to your business needs, transparently priced.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <ServiceCard 
                            key={service.id}
                            service={service} 
                            onViewDetails={setSelectedService}
                        />
                    ))}
                </div>

                {services.length === 0 && (
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
