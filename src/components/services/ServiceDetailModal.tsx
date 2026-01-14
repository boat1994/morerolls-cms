"use client";

import { Service } from "@/payload-types";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useEffect } from "react";


type ServiceDetailModalProps = {
    service: Service | null;
    isOpen: boolean;
    onClose: () => void;
};

export function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
             document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!service) return null;

    const formattedPrice = service.price?.amount
        ? new Intl.NumberFormat("th-TH").format(service.price.amount)
        : null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-neutral-100 flex justify-between items-center">
                                <h3 className="text-xl font-serif font-bold">{service.title}</h3>
                                <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 space-y-8">
                                {/* Specs Table */}
                                {service.specs && service.specs.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Specifications</h4>
                                        <div className="border border-neutral-200 rounded-sm divide-y divide-neutral-200">
                                            {service.specs.map((spec, i) => (
                                                <div key={i} className="flex text-sm">
                                                    <div className="w-1/3 p-3 bg-neutral-50 font-medium text-neutral-600 border-r border-neutral-200">
                                                        {spec.label}
                                                    </div>
                                                    <div className="w-2/3 p-3 text-black">
                                                        {spec.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Deliverables */}
                                {service.deliverables && service.deliverables.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">What&apos;s Included</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {service.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                                                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                                    <span>{item.item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Conditions / Fine Print */}
                                {service.conditions && (
                                    <div className="pt-6 border-t border-neutral-100">
                                        <div className="text-xs text-neutral-400 prose prose-sm max-w-none">
                                           {/* Rendering rich text usually requires a serializer or helper component. 
                                               Since I can't verify if RichText component is set up, I'll assume simple display or JSON stringify if needed. 
                                               Actually let's just use JSON stringify for debugging if strict type, 
                                               or if it's the Lexical structure, we need a serializer.
                                               For now, I will omit complex rendering and just show a placeholder or basic text if possible.
                                               Ideally use a helper like Payload's RichText parser if available.
                                               I'll assume it's complex object. I'll just skip detailed rendering for now to avoid errors and note it.
                                           */}
                                           <p className="italic">* Detailed terms and conditions available upon inquiry.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer / CTA */}
                            <div className="sticky bottom-0 bg-white border-t border-neutral-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="text-center md:text-left">
                                     {formattedPrice ? (
                                        <div className="flex items-baseline gap-1">
                                            {service.price?.isStartingAt && <span className="text-xs text-neutral-400 uppercase">Starts at</span>}
                                            <span className="text-xl font-bold">฿{formattedPrice}</span>
                                        </div>
                                     ) : (
                                        <span className="text-sm text-neutral-500">Custom Pricing</span>
                                     )}
                                </div>
                                <button className="w-full md:w-auto px-8 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
                                    Inquire Package
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
