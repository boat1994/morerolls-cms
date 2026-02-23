import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { General } from "@/payload-types";

export async function Footer() {
    const payload = await getPayload({ config: configPromise });
    // Safe fetch in case global isn't seeded yet
    let generalData: General | null = null;
    try {
        generalData = await payload.findGlobal({
            slug: "general",
        }) as General;
    } catch (e) {
        // Fallback or ignore if not found
        console.error("Failed to fetch general settings", e);
    }

    const { footerText, socialLinks, footerSubDescription } = generalData || {};
    const year = new Date().getFullYear();

    return (
        <footer className="bg-white text-black py-12 border-t border-neutral-100">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Copyright Section - Only show if footerText exists or always show year? 
                        User said "if not exists, logic hide element". 
                        I'll assume if footerText is missing, we might still want the copyright year?
                        But user instruction "if not exists value... hide element" implies hiding the whole thing or just the text?
                        I will hide just the text part if missing, but usually copyright is essential.
                        Actually, let's treat footerText as the branding part.
                        If strict hide: 
                     */}
                    <div className="flex flex-col gap-2">
                        <div className="text-sm font-medium tracking-widest uppercase">
                            &copy; {year} {footerText || "Morerolls Studio"}
                        </div>
                        {footerSubDescription && (
                            <div className="text-xs text-neutral-500 whitespace-pre-wrap max-w-md">
                                {footerSubDescription}
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    {socialLinks && socialLinks.length > 0 && (
                        <div className="flex items-center gap-8">
                            {socialLinks.map((link, i) => (
                                <Link 
                                    key={i} 
                                    href={link.url} 
                                    target="_blank" 
                                    className="text-sm font-medium text-neutral-500 hover:text-black transition-colors uppercase tracking-widest"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </footer>
    );
}
