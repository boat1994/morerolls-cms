import { Container } from "@/components/ui/Container";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ContactPage as ContactPageType } from "@/payload-types";

export default async function ContactPage() {
    const payload = await getPayload({ config: configPromise });
    let contactData: ContactPageType | null = null;
    
    try {
        contactData = await payload.findGlobal({
            slug: "contact-page",
        }) as ContactPageType;
    } catch (e) {
        console.error("Failed to fetch contact page data", e);
    }

    const { headline, email, phone, visitUs } = contactData || {};

    return (
        <main className="bg-white min-h-screen pt-24 pb-20 text-black flex flex-col justify-center">
            <Container>
                <div className="max-w-4xl">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-12 uppercase tracking-tighter"
                        dangerouslySetInnerHTML={{ 
                            __html: (headline || "Let's Create<br />Something<br />Extraordinary.").replace(/\n/g, '<br />') 
                        }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-neutral-500">General Inquiries</h3>
                            <a href={`mailto:${email || "hello@morerolls.com"}`} className="text-2xl md:text-3xl font-medium hover:text-neutral-600 transition-colors block mb-2">
                                {email || "hello@morerolls.com"}
                            </a>
                            <a href={`tel:${phone || "+66123456789"}`} className="text-xl md:text-2xl font-medium hover:text-neutral-600 transition-colors block">
                                {phone || "+66 12 345 6789"}
                            </a>
                        </div>

                        {visitUs?.showSection && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-neutral-500">Visit Us</h3>
                                <address className="text-xl md:text-2xl font-medium not-italic leading-relaxed whitespace-pre-line">
                                    {visitUs.address || "123 Creative District,\nSukhumvit Road, Bangkok,\nThailand 10110"}
                                </address>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </main>
    );
}
