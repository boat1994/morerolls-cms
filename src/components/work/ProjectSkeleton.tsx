import { Skeleton } from "@/components/ui/Skeleton";

export function ProjectSkeleton() {
  return (
    <div className="flex flex-col gap-1 w-full">
      {/* Image Skeleton */}
      <div className="relative aspect-video w-full overflow-hidden mb-6">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Title Skeleton */}
      <div className="flex flex-col items-start gap-2 w-full">
        <Skeleton className="h-8 w-3/4" />
        
        {/* Meta Skeleton */}
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-4 w-12" />
          <div className="w-1 h-1 bg-neutral-200 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-y-16 max-w-4xl mx-auto">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </div>
  );
}
