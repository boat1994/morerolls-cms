
import { HeroVideo } from "@/components/home/HeroVideo";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { ClientLogos } from "@/components/home/ClientLogos";

export default function Home() {
  return (
    <main className=" min-h-screen">
      <HeroVideo />
      <ClientLogos />
      <div className="py-20">
        <ProjectGrid />
      </div>
    </main>
  );
}

