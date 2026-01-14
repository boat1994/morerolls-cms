import { ProjectGrid } from "@/components/work/ProjectGrid";
import { Container } from "@/components/ui/Container";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Project } from "@/payload-types";

export default async function WorkPage() {
    const payload = await getPayload({ config: configPromise });
    const { docs: projects } = await payload.find({
        collection: "projects",
        limit: 100,
        sort: "-createdAt",
    });

    return (
        <main className="bg-white min-h-screen pt-24 pb-20">
            <Container>
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-black uppercase tracking-tighter">Selected Work</h1>
            </Container>
            <ProjectGrid projects={projects as Project[]} />
        </main>
    );
}
