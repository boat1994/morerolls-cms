import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

export function HeroSkeleton() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-100 flex flex-col justify-center items-center">
      <Container>
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Title Placeholder: Matches text-4xl md:text-6xl lg:text-8xl */}
          <Skeleton className="h-12 md:h-20 lg:h-24 w-3/4 max-w-4xl bg-neutral-200/60 rounded-lg" />
          
          {/* Subtitle Placeholder: Matches text-lg md:text-xl */}
          <Skeleton className="h-6 md:h-8 w-1/2 max-w-md bg-neutral-200/60 rounded-md" />
        </div>
      </Container>
    </section>
  );
}
