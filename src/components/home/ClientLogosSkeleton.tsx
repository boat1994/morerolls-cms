import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

export function ClientLogosSkeleton() {
  return (
    <section className="bg-white py-12 md:py-20 border-b border-neutral-100">
      <Container>
        {/* Header Placeholder: Matches "Trusted By" */}
        <div className="mb-8 md:mb-12">
          <Skeleton className="h-4 w-24 bg-neutral-100 rounded-sm" />
        </div>

        {/* Desktop Grid Placeholder */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-8 gap-y-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center aspect-square w-full"
            >
              <Skeleton className="w-20 h-20 rounded-full bg-neutral-50" />
            </div>
          ))}
        </div>

        {/* Mobile Marquee Placeholder */}
        <div className="md:hidden flex gap-8 overflow-hidden">
             {Array.from({ length: 4 }).map((_, i) => (
               <Skeleton key={i} className="flex-shrink-0 w-16 h-16 rounded-full bg-neutral-50" />
             ))}
        </div>
      </Container>
    </section>
  );
}
