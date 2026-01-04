"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
    return (
        <footer className="bg-white text-black py-12 border-t border-neutral-100">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm font-medium tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} Morerolls Studio
                    </div>

                    <div className="flex items-center gap-8">
                        <Link href="https://instagram.com" target="_blank" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors uppercase tracking-widest">
                            Instagram
                        </Link>
                        <Link href="https://vimeo.com" target="_blank" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors uppercase tracking-widest">
                            Vimeo
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="text-sm font-medium text-neutral-500 hover:text-black transition-colors uppercase tracking-widest">
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
