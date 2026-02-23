import { Container } from "@/components/ui/Container";
import { ProjectGridSkeleton } from "@/components/work/ProjectSkeleton";
import { HeroSkeleton } from "@/components/home/HeroSkeleton";
import { ClientLogosSkeleton } from "@/components/home/ClientLogosSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <HeroSkeleton />
      <ClientLogosSkeleton />

      <Container>
        <div className="py-10">
          <div className="mb-12 mt-4 ml-4">
             {/* Header Skeleton */}
             <div className="h-10 md:h-16 w-32 md:w-48 bg-neutral-200/50 animate-pulse rounded-md mb-6" />
             <div className="h-6 w-64 bg-neutral-100 animate-pulse rounded-md" />
          </div>
          <ProjectGridSkeleton count={6} />
        </div>
      </Container>
    </main>
  );
}
