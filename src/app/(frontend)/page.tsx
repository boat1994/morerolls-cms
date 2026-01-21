
import { HeroVideo } from "@/components/home/HeroVideo";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { ClientLogos } from "@/components/home/ClientLogos";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { VideoSource } from "@/components/home/HeroVideo";
import { Project } from "@/payload-types";

export default async function Page() {
  const payload = await getPayload({ config: configPromise });
  const rootMedia = await payload.findGlobal({
    slug: "root-page-medias",
    depth: 5,
  });

  // Artificial delay removed
  
  const projects = await payload.find({
    collection: "projects",
    limit: 12, // Limit to 12 projects for performance
    sort: 'order',
  });

  const heroVideo = rootMedia?.heroVideo;
  const clientLogos = rootMedia?.clientLogos || [];

  return (
    <main className=" min-h-screen">
      <HeroVideo 
        desktop={heroVideo?.desktop as VideoSource | undefined}
        mobile={heroVideo?.mobile as VideoSource | undefined}
      />
      <ClientLogos logos={clientLogos} />
      <div className="py-10">
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
      </div>
    </main>
  );
}

