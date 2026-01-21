import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

export function ProjectDetailsSkeleton() {
  return (
    <main className="bg-white min-h-screen text-black pt-24 pb-20">
      <Container>
        {/* Back Link Placeholder */}
        <div className="mb-8">
            <Skeleton className="h-4 w-32 bg-neutral-100" />
        </div>

        {/* Video Player Placeholder */}
        <div className="aspect-video w-full bg-neutral-100 mb-12 relative overflow-hidden">
             <Skeleton className="h-full w-full rounded-none" />
        </div>

        {/* Project Info Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Main Content (Title & Description) */}
          <div className="md:col-span-2">
            {/* Title: Matches text-4xl md:text-6xl */}
            <Skeleton className="h-10 md:h-16 w-3/4 mb-6 bg-neutral-200" />
            
            {/* Description: Matches text-lg max-w-2xl */}
            <div className="space-y-3 max-w-2xl">
              <Skeleton className="h-5 w-full bg-neutral-100" />
              <Skeleton className="h-5 w-full bg-neutral-100" />
              <Skeleton className="h-5 w-5/6 bg-neutral-100" />
              <Skeleton className="h-5 w-4/6 bg-neutral-100" />
            </div>
          </div>

          {/* Sidebar (Meta) */}
          <div className="space-y-8">
            {/* Client */}
            <div className="border-t border-neutral-200 pt-4">
              <Skeleton className="h-4 w-16 mb-2 bg-neutral-100" />
              <Skeleton className="h-6 w-32 bg-neutral-100" />
            </div>

            {/* Year */}
            <div className="border-t border-neutral-200 pt-4">
               <Skeleton className="h-4 w-16 mb-2 bg-neutral-100" />
               <Skeleton className="h-6 w-24 bg-neutral-100" />
            </div>

            {/* Services */}
            <div className="border-t border-neutral-200 pt-4">
               <Skeleton className="h-4 w-20 mb-2 bg-neutral-100" />
               <Skeleton className="h-6 w-40 bg-neutral-100" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
