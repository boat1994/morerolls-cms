import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ServicesPage } from "@/components/services/ServicesPage";
import { Service } from "@/payload-types";

export const revalidate = 60; // ISR

export default async function Page() {
    const payload = await getPayload({ config: configPromise });
    const { docs: services } = await payload.find({
        collection: "services",
        sort: "order", 
        limit: 100,
    });

    return <ServicesPage services={services as Service[]} />;
}
