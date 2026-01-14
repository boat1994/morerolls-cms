"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Search } from "./Search";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const isHeroContentPage = pathname === "/" || pathname === "/about" ;

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleNavigation = (href: string) => {
        if (pathname === href) {
            setIsOpen(false);
            return;
        }
        // Don't close immediately. Wait for pathname change (effect below)
        // setIsOpen(false); 
        startTransition(() => {
            router.push(href);
        });
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    // Close mobile menu (and search) when pathname changes (navigation completes)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

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
    const effectiveScrolled = !isHeroContentPage || isScrolled;

    const textColorClass = effectiveScrolled || isOpen ? "text-black" : "text-white";
    const logoBrightnessClass = effectiveScrolled || isOpen ? "brightness-0" : "brightness-0 invert";
    const navBackgroundClass = effectiveScrolled ? "bg-white shadow-sm" : "bg-transparent";

    return (
        <>
            {isPending && (
                <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[100]">
                    <motion.div
                        className="h-full bg-black"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </div>
            )}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackgroundClass} h-20 flex items-center`}
            >
                <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between relative">
                    
                    {/* --- MOBILE LAYOUT --- */}
                    
                    {/* Mobile: Hamburger Button (Left) */}
                     <div className="flex items-center justify-start md:hidden z-50">
                        <button
                            className={`p-2 -ml-2 transition-colors duration-300 ${textColorClass}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>

                    {/* Mobile: Logo (Center Absolute) */}
                     <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                        <Link href="/" className="block" onClick={(e) => { e.preventDefault(); handleNavigation("/"); }}>
                            <div className="relative h-8 w-auto aspect-[3/1]">
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

                    {/* Mobile: Search (Right) */}
                    <div className="flex items-center justify-end md:hidden z-50">
                         <div className={`${textColorClass}`}>
                            <Search />
                        </div>
                    </div>

                     {/* --- DESKTOP LAYOUT --- */}

                     {/* Desktop: Logo (Left) */}
                    <div className="hidden md:block relative z-50 flex-none">
                        <Link href="/" onClick={(e) => { e.preventDefault(); handleNavigation("/"); }}>
                            <div className="relative h-10 w-auto aspect-[3/1]">
                                <Image
                                    src="/logo.avif"
                                    alt="Morerolls Studio"
                                    fill
                                    className={`object-contain object-left transition-all duration-300 ${logoBrightnessClass}`}
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop: Navigation (Center) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:gap-12">
                        <NavLink href="/projects" isScrolled={effectiveScrolled} onClick={handleNavigation}>Projects</NavLink>
                        <NavLink href="/services" isScrolled={effectiveScrolled} onClick={handleNavigation}>Services</NavLink>
                        <NavLink href="/about" isScrolled={effectiveScrolled} onClick={handleNavigation}>About</NavLink>
                        <NavLink href="/contact" isScrolled={effectiveScrolled} onClick={handleNavigation}>Contact</NavLink>
                    </div>

                    {/* Desktop: Search (Right) */}
                     <div className="hidden md:flex items-center justify-end gap-8 lg:gap-12 flex-none">
                         <div className={`${effectiveScrolled ? "text-black" : "text-white"}`}>
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
                            <MobileNavLink href="/projects" onClick={() => handleNavigation("/projects")}>Projects</MobileNavLink>
                            <MobileNavLink href="/services" onClick={() => handleNavigation("/services")}>Services</MobileNavLink>
                            <MobileNavLink href="/about" onClick={() => handleNavigation("/about")}>About</MobileNavLink>
                            <MobileNavLink href="/contact" onClick={() => handleNavigation("/contact")}>Contact</MobileNavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function NavLink({ href, children, isScrolled, onClick }: { href: string; children: React.ReactNode; isScrolled: boolean; onClick: (href: string) => void }) {
    return (
        <Link
            href={href}
            onClick={(e) => { e.preventDefault(); onClick(href); }}
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
