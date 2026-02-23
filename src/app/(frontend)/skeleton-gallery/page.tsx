import { HeroSkeleton } from "@/components/home/HeroSkeleton";
import { ClientLogosSkeleton } from "@/components/home/ClientLogosSkeleton";
import { ProjectGridSkeleton } from "@/components/work/ProjectSkeleton";
import { ProjectDetailsSkeleton } from "@/components/work/ProjectDetailsSkeleton";

export default function SkeletonGalleryPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-black text-white p-4 sticky top-0 z-50">
        <h1 className="text-xl font-bold">Skeleton Gallery Verification</h1>
      </div>

      <div className="border-b-4 border-red-500 my-10 relative">
        <span className="absolute -top-3 left-4 bg-red-500 text-white px-2 text-sm font-bold">Hero Skeleton</span>
      </div>
      <div className="relative border border-dashed border-neutral-300 m-4">
        <HeroSkeleton />
      </div>

      <div className="border-b-4 border-red-500 my-10 relative">
        <span className="absolute -top-3 left-4 bg-red-500 text-white px-2 text-sm font-bold">Client Logos Skeleton</span>
      </div>
      <div className="relative border border-dashed border-neutral-300 m-4">
        <ClientLogosSkeleton />
      </div>

      <div className="border-b-4 border-red-500 my-10 relative">
        <span className="absolute -top-3 left-4 bg-red-500 text-white px-2 text-sm font-bold">Project Grid Skeleton</span>
      </div>
      <div className="relative border border-dashed border-neutral-300 m-4 p-10">
        <ProjectGridSkeleton count={3} />
      </div>

      <div className="border-b-4 border-red-500 my-10 relative">
        <span className="absolute -top-3 left-4 bg-red-500 text-white px-2 text-sm font-bold">Project Details Skeleton</span>
      </div>
      <div className="relative border border-dashed border-neutral-300 m-4">
        <ProjectDetailsSkeleton />
      </div>
    </div>
  );
}
