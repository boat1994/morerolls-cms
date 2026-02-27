"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Search } from "./Search";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/lib/locale";

import type { Dictionary } from "@/lib/i18n";

interface NavbarClientProps {
    currentLocale: Locale
    dict: Dictionary['nav']
    searchDict: Dictionary['search']
}

export function NavbarClient({ currentLocale, dict, searchDict }: NavbarClientProps) {
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
                    
                    {/* Mobile: Hamburger Button (Left) */}
                     <div className="flex items-center justify-start z-50">
                        <button
                            className={`p-2 -ml-2 transition-colors duration-300 ${textColorClass}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={dict.toggle_menu}
                        >
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>

                    {/* Mobile: Logo (Center Absolute) */}
                     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
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

                    {/* Mobile: Search + Language Switcher (Right) */}
                    <div className="flex items-center gap-3 justify-end z-50">
                        <LanguageSwitcher
                            currentLocale={currentLocale}
                            colorClass={textColorClass}
                            dict={dict}
                        />
                        <div className={`${textColorClass}`}>
                            <Search dict={searchDict} />
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
                        className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center"
                    >
                        <div className="flex flex-col items-center gap-8 text-center">
                            <MobileNavLink href="/projects" onClick={() => handleNavigation("/projects")}>{dict.projects}</MobileNavLink>
                            <MobileNavLink href="/blog" onClick={() => handleNavigation("/blog")}>{dict.blog}</MobileNavLink>
                            <MobileNavLink href="/services" onClick={() => handleNavigation("/services")}>{dict.services}</MobileNavLink>
                            <MobileNavLink href="/about" onClick={() => handleNavigation("/about")}>{dict.about}</MobileNavLink>
                            <MobileNavLink href="/contact" onClick={() => handleNavigation("/contact")}>{dict.contact}</MobileNavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
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
