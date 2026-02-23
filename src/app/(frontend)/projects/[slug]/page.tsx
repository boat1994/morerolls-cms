import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { notFound } from "next/navigation";
import { Project } from "@/payload-types";
import { getLocale } from "@/lib/locale";

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
        console.warn('Failed to fetch projects for static generation, falling back to dynamic:', error);
        return [];
    }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = await getLocale();
    const payload = await getPayload({ config: configPromise });
    
    const result = await payload.find({
        collection: 'projects',
        where: {
            slug: {
                equals: slug,
            },
        },
        locale,
        fallbackLocale: 'en',
    });

    const project = result.docs[0] as Project | undefined;

    if (!project) {
        notFound();
    }

    return <ProjectDetails project={project} />;
}
