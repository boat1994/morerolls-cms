import { cn } from "@/lib/utils";

interface VideoPlayerProps {
    videoId: string;
    className?: string;
    autoPlay?: boolean;
}

export function VideoPlayer({ videoId, className, autoPlay = false }: VideoPlayerProps) {
    const src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1`;

    return (
        <div className={cn("relative w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900", className)} style={{ aspectRatio: "16/9" }}>
            <iframe
                src={src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
            />
        </div>
    );
}
