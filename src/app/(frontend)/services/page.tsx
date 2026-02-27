import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ServicesPage } from "@/components/services/ServicesPage";
import { Service } from "@/payload-types";
import { getLocale } from "@/lib/locale";
import { getDictionary } from "@/lib/i18n";

export const revalidate = 60; // ISR

export default async function Page() {
    const locale = await getLocale();
    const dict = await getDictionary(locale);
    const payload = await getPayload({ config: configPromise });
    const { docs: services } = await payload.find({
        collection: "services",
        sort: "order", 
        limit: 100,
        locale,
        fallbackLocale: 'en',
    });

    return <ServicesPage services={services as Service[]} dict={dict.services} />;
}
