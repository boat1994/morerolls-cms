import { Container } from "@/components/ui/Container";
import { ProjectGridSkeleton } from "@/components/work/ProjectSkeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="relative h-screen w-full overflow-hidden bg-neutral-100">
        <div className="absolute inset-0 flex items-center justify-center">
           <Skeleton className="h-20 w-3/4 max-w-lg bg-neutral-200" />
        </div>
      </section>

      {/* Logos Skeleton */}
      <div className="h-24 w-full bg-white border-b border-neutral-100" />

      <Container>
        <div className="py-10">
          <div className="mb-12 mt-4 ml-4">
            <Skeleton className="h-12 w-48 mb-4 bg-neutral-200" />
            <Skeleton className="h-6 w-64 bg-neutral-200" />
          </div>
          <ProjectGridSkeleton count={6} />
        </div>
      </Container>
    </main>
  );
}
