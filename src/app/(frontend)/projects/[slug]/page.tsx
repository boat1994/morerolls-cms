import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    try {
        const payload = await getPayload({ config: configPromise });
        const projects = await payload.find({
            collection: 'projects',
            limit: 1000,
        });

        return projects.docs.map((project) => ({
            slug: project.slug,
        }));
    } catch (error) {
        // During build time inside standard Next.js build (not opencanary), 
        // D1 bindings might not be available. We return empty params to skip static gen for now.
        console.warn('Failed to fetch projects for static generation, falling back to dynamic:', error);
        return [];
    }
}

import { Project } from "@/payload-types";

// ... imports

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const payload = await getPayload({ config: configPromise });
    
    const result = await payload.find({
        collection: 'projects',
        where: {
            slug: {
                equals: slug,
            },
        },
    });

    const project = result.docs[0] as Project | undefined;

    if (!project) {
        notFound();
    }

    return <ProjectDetails project={project} />;
}
