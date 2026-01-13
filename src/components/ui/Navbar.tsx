"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Search } from "./Search";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    // Conditional Styling Logic
    // If NOT home page, always behave as if scrolled (White bg, Black text)
    // If Home page, use isScrolled state
    const effectiveScrolled = !isHomePage || isScrolled;

    const textColorClass = effectiveScrolled || isOpen ? "text-black" : "text-white";
    const logoBrightnessClass = effectiveScrolled || isOpen ? "brightness-0" : "brightness-0 invert";
    const navBackgroundClass = effectiveScrolled ? "bg-white shadow-sm" : "bg-transparent";

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackgroundClass} h-20 flex items-center`}
            >
                <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between relative">
                    
                    {/* Mobile Menu Button - Left */}
                     <div className="flex items-center justify-start flex-1 md:hidden">
                        <button
                            className={`relative z-50 p-2 -ml-2 transition-colors duration-300 ${textColorClass}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>

                    {/* Desktop Navigation - Left (Hidden on Mobile) */}
                    <div className="hidden md:flex flex-1 items-center gap-8 lg:gap-12">
                        <NavLink href="/projects" isScrolled={effectiveScrolled}>Projects</NavLink>
                        <NavLink href="/services" isScrolled={effectiveScrolled}>Services</NavLink>
                    </div>

                    {/* Logo - Center */}
                     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:flex-none">
                        <Link href="/" className="relative z-50 block" onClick={() => setIsOpen(false)}>
                            <div className="relative h-8 md:h-10 w-auto aspect-[3/1]">
                                <Image
                                    src="/logo.avif"
                                    alt="Morerolls Studio"
                                    fill
                                    className={`object-contain object-center transition-all duration-300 ${logoBrightnessClass}`}
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Right (Hidden on Mobile) */}
                     <div className="hidden md:flex flex-1 items-center justify-end gap-8 lg:gap-12">
                        <NavLink href="/about" isScrolled={effectiveScrolled}>About</NavLink>
                        <NavLink href="/contact" isScrolled={effectiveScrolled}>Contact</NavLink>
                         <div className={`${effectiveScrolled ? "text-black" : "text-white"}`}>
                            <Search />
                        </div>
                    </div>

                    {/* Mobile Search - Right */}
                    <div className="flex items-center justify-end flex-1 md:hidden">
                         <div className={`${textColorClass}`}>
                            <Search />
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8 text-center">
                            <MobileNavLink href="/projects" onClick={() => setIsOpen(false)}>Projects</MobileNavLink>
                            <MobileNavLink href="/services" onClick={() => setIsOpen(false)}>Services</MobileNavLink>
                            <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
                            <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({ href, children, isScrolled }: { href: string; children: React.ReactNode; isScrolled: boolean }) {
    return (
        <Link
            href={href}
            className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${isScrolled ? "text-black hover:text-neutral-600" : "text-white hover:text-white/80"
                }`}
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-3xl font-bold uppercase tracking-widest text-black hover:text-neutral-600 transition-colors"
        >
            {children}
        </Link>
    );
}
