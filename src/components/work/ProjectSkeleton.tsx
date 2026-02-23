import { Skeleton } from "@/components/ui/Skeleton";

export function ProjectSkeleton() {
  return (
    <div className="group block">
        {/* Image Skeleton */}
        <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 mb-6 shadow-sm">
            <Skeleton className="h-full w-full rounded-none" />
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-col items-start gap-1">
            {/* Title: Matches h3 text-2xl md:text-3xl */}
            <Skeleton className="h-8 md:h-9 w-3/4 mb-1 bg-neutral-200" />
            
            {/* Meta: Matches text-sm md:text-base */}
            <div className="flex items-center gap-3 w-full">
            <Skeleton className="h-5 w-12 bg-neutral-100" />
            <div className="w-1 h-1 bg-neutral-300 rounded-full" />
            <Skeleton className="h-5 w-24 bg-neutral-100" />
            </div>
        </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

export function ProjectGridSkeleton({ count = 6, className }: { count?: number, className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-y-16 max-w-4xl mx-auto", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </div>
  );
}
