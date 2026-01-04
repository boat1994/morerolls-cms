import { cn } from "@/lib/utils";

interface DesignCropProps {
    src?: string;
    top: number; // Percentage from top
    height: number; // Percentage height of the crop relative to original image
    aspectRatio?: string; // CSS aspect-ratio
    className?: string;
    backgroundSize?: string; // Default '100% auto' (width 100%, height auto)
}

export function DesignCrop({
    src = "/design-ref.png",
    top,
    height,
    aspectRatio = "16/9",
    className,
    backgroundSize = "100% auto",
}: DesignCropProps) {
    return (
        <div
            className={cn("w-full overflow-hidden rounded-lg bg-neutral-200", className)}
            style={{ aspectRatio }}
        >
            <div
                className="h-full w-full"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundPosition: `center ${top}%`,
                    backgroundSize: backgroundSize,
                    backgroundRepeat: "no-repeat",
                }}
            />
        </div>
    );
}
