import { getPayload } from "payload";
import configPromise from "@payload-config";
import { AboutPage as AboutPageComponent } from "@/components/about/AboutPage";
import { AboutPage as AboutDataType } from "@/payload-types";
import { getLocale } from "@/lib/locale";

export const revalidate = 60; // ISR - revalidate every 60 seconds

export default async function Page() {
    const locale = await getLocale();
    const payload = await getPayload({ config: configPromise });
    const aboutData = await payload.findGlobal({
        slug: "about-page",
        depth: 2,
        locale,
        fallbackLocale: 'en',
    });

    return <AboutPageComponent data={aboutData as AboutDataType} />;
}
