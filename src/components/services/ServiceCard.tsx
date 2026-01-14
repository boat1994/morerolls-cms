"use client";

import { Service } from "@/payload-types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ServiceCardProps = {
    service: Service;
    onViewDetails: (service: Service) => void;
};

export function ServiceCard({ service, onViewDetails }: ServiceCardProps) {
    const formattedPrice = service.price?.amount
        ? new Intl.NumberFormat("th-TH").format(service.price.amount)
        : null;

    return (
        <div 
            onClick={() => onViewDetails(service)}
            className="group relative bg-white border border-neutral-200 p-8 flex flex-col justify-between h-full hover:border-black transition-colors duration-300 cursor-pointer"
        >
            {/* Header */}
            <div className="mb-8">
                <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-black transition-colors">
                    {service.title}
                </h3>
                {service.highlight && (
                    <p className="text-sm text-neutral-500 leading-relaxed font-sans">
                        {service.highlight}
                    </p>
                )}
            </div>

            {/* Bottom Section */}
            <div>
                {/* Price */}
                <div className="mb-8 font-sans">
                    {service.price?.isStartingAt && (
                        <span className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                            Starts at
                        </span>
                    )}
                    <div className="flex items-baseline gap-1">
                        {formattedPrice ? (
                            <>
                                <span className="text-lg font-medium">฿{formattedPrice}</span>
                                {service.price.unit && (
                                    <span className="text-sm text-neutral-400">/ {service.price.unit}</span>
                                )}
                            </>
                        ) : (
                            <span className="text-sm text-neutral-500">Contact for pricing</span>
                        )}
                    </div>
                </div>

                {/* Ghost Button */}
                <button
                    className="w-full flex items-center justify-between px-0 text-sm font-bold uppercase tracking-widest text-neutral-800 group-hover:text-black transition-colors py-3 border-t border-neutral-100 group-hover:border-black/10"
                >
                    <span>Details</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
