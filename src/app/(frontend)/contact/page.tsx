"use client";

import { Container } from "@/components/ui/Container";

export default function ContactPage() {
    return (
        <main className="bg-white min-h-screen pt-24 pb-20 text-black flex flex-col justify-center">
            <Container>
                <div className="max-w-4xl">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-12 uppercase tracking-tighter">
                        Let&apos;s Create<br />Something<br />Extraordinary.
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-neutral-500">General Inquiries</h3>
                            <a href="mailto:hello@morerolls.com" className="text-2xl md:text-3xl font-medium hover:text-neutral-600 transition-colors block mb-2">
                                hello@morerolls.com
                            </a>
                            <a href="tel:+66123456789" className="text-xl md:text-2xl font-medium hover:text-neutral-600 transition-colors block">
                                +66 12 345 6789
                            </a>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-neutral-500">Visit Us</h3>
                            <address className="text-xl md:text-2xl font-medium not-italic leading-relaxed">
                                123 Creative District,<br />
                                Sukhumvit Road, Bangkok,<br />
                                Thailand 10110
                            </address>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
