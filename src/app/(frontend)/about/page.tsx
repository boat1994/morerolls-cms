import { getPayload } from "payload";
import configPromise from "@payload-config";
import { AboutPage as AboutPageComponent } from "@/components/about/AboutPage";
import { AboutPage as AboutDataType } from "@/payload-types";

export const revalidate = 60; // ISR - revalidate every 60 seconds

export default async function Page() {
    const payload = await getPayload({ config: configPromise });
    const aboutData = await payload.findGlobal({
        slug: "about-page",
        depth: 2, // Ensure nested relations like images are fetched
    });

    return <AboutPageComponent data={aboutData as AboutDataType} />;
}
