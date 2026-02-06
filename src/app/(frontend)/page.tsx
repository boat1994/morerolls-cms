
import { HeroVideo } from "@/components/home/HeroVideo";
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { ClientLogos } from "@/components/home/ClientLogos";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { VideoSource } from "@/components/home/HeroVideo";
import { Project } from "@/payload-types";
import { unstable_cache } from "next/cache";
import { Container } from '@/components/ui/Container'

export const revalidate = 60; // ISR - revalidate every 60 seconds

const getRootMedia = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    return await payload.findGlobal({
      slug: "root-page-medias",
      depth: 5,
    });
  },
  ['root-media'],
  { revalidate: 60, tags: ['root-media'] }
);

const getHomeProjects = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    return await payload.find({
      collection: "projects",
      limit: 12,
      sort: 'order',
    });
  },
  ['home-projects'],
  { revalidate: 60, tags: ['projects'] }
);

export default async function Page() {
  const rootMedia = await getRootMedia();
  const projects = await getHomeProjects();

  const heroVideo = rootMedia?.heroVideo;
  const clientLogos = rootMedia?.clientLogos || [];

  return (
    <main className=" min-h-screen">
      <HeroVideo 
        desktop={heroVideo?.desktop as VideoSource | undefined}
        mobile={heroVideo?.mobile as VideoSource | undefined}
      />
      <ClientLogos logos={clientLogos} />
    <Container className="pt-4">
      <div className="mb-12 mt-4 ml-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black uppercase tracking-tighter">
         Films
        </h1>
         <p className="text-lg text-black">Cinematic works by More Rolls</p>
        </div>
      <ProjectGrid projects={projects.docs as Project[]} />
      
      {/* View All Button */}
      <div className="flex justify-center mt-12 mb-20">
        <a 
          href="/projects" 
          className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white uppercase tracking-widest bg-black hover:bg-neutral-800 transition-colors duration-300"
        >
          View All Projects
        </a>
      </div>
      </Container>
    </main>
  );
}

