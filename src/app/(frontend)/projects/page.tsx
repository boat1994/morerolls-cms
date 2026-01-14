import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Container } from "@/components/ui/Container";

import { Project } from "@/payload-types";


export default async function ProjectsPage() {
    const payload = await getPayload({ config: configPromise });
    const projects = await payload.find({
        collection: 'projects',
        sort: '-createdAt',
    });

    return (
        <main className="bg-white min-h-screen pt-24 pb-20">
            <Container>
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-black uppercase tracking-tighter">Selected Projects</h1>
            </Container>
            <ProjectGrid projects={projects.docs as Project[]} />
        </main>
    );
}
