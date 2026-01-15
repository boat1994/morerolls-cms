
import { HeroVideo } from "@/components/home/HeroVideo";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { ClientLogos } from "@/components/home/ClientLogos";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { VideoSource } from "@/components/home/HeroVideo";
import { Project } from "@/payload-types";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  const rootMedia = await payload.findGlobal({
    slug: "root-page-medias",
    depth: 5,
  });

  const projects = await payload.find({
    collection: "projects",
    limit: 100, // Reasonable limit for home page
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
      <div className="py-20">
      <ProjectGrid projects={projects.docs as Project[]} />
      </div>
    </main>
  );
}

