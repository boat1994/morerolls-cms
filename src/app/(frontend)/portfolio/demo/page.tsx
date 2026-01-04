"use client";

import Image from "next/image";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { MainIdea } from "@/components/project/MainIdea";
import { HighlightSection, HighlightItem } from "@/components/project/HighlightSection";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

// Helper for consistent image styling
function DemoImage({ src, aspectRatio = "4/3", className }: { src: string; aspectRatio?: string; className?: string }) {
    return (
        <div className={`relative w-full overflow-hidden rounded-lg bg-neutral-100 ${className}`} style={{ aspectRatio }}>
            <Image
                src={src}
                alt="Project demo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        </div>
    );
}

export default function PortfolioDemoPage() {
    // Hardcoded data based on the requirements
    const clientName = "Morerolls Studio";
    const projectTitle = "Urban Rhythm";
    const category = "Commercial / Lifestyle";

    const mainIdeaText = "Capturing the pulse of the city through a cinematic lens.";
    const mainIdeaDescription = "In this project, we aimed to explore the unseen connections between urban architecture and human movement. By utilizing high-speed cameras and dynamic lighting, we brought the static city to life, creating a visual symphony that resonates with the viewer's own experiences of the metropolis.";

    const demoImages = [
        "/demo/454aca_13659d4f8a2b4d83a2b0d71fa3468257~mv2.avif",
        "/demo/454aca_5853207a423f416c8ee0f28f8c2c78d6~mv2.avif",
        "/demo/454aca_8996e52ffaf64ff9aa79ddec5e169357~mv2.avif",
        "/demo/454aca_8aeacd61040c485481d23136e958e393~mv2.avif",
        "/demo/454aca_93334ce80c224cfdb80d38b406a9b693~mv2.avif",
        "/demo/454aca_c5a53aedb1c14ec1bda90194df08ab23~mv2.avif",
        "/demo/454aca_d802e289e9224cc3b8338b49200743a4~mv2.avif",
        "/demo/454aca_e8557d2c42b144d0aaed308016943fba~mv2.avif",
        "/demo/454aca_fa497e9e932a46d7ad964a0b906c871f~mv2.avif",
    ];

    const sliderImages = [
        <DemoImage key="1" src={demoImages[0]} aspectRatio="4/3" />,
        <DemoImage key="2" src={demoImages[1]} aspectRatio="4/3" />,
        <DemoImage key="3" src={demoImages[2]} aspectRatio="4/3" />,
        <DemoImage key="4" src={demoImages[3]} aspectRatio="4/3" />,
        <DemoImage key="5" src={demoImages[4]} aspectRatio="4/3" />,
    ];

    const highlights: HighlightItem[] = [
        {
            id: "h1",
            title: "Concept & Mood",
            description: "Exploring the initial visual direction and color palette.",
            type: "slider",
            content: <ImageSlider images={sliderImages} />,
        },
        {
            id: "h2",
            title: "Cinematography",
            description: "Focusing on symmetry and leading lines to guide the viewer's eye.",
            type: "single",
            content: <DemoImage src={demoImages[5]} aspectRatio="16/9" />,
        },
        {
            id: "h3",
            title: "Post-Production",
            description: "Grading the footage to achieve a nostalgic yet modern aesthetic.",
            type: "single",
            content: <DemoImage src={demoImages[6]} aspectRatio="21/9" />,
        },
        {
            id: "h4",
            title: "Behind the Scenes",
            description: "A look at the team in action.",
            type: "single",
            content: <DemoImage src={demoImages[7]} aspectRatio="3/2" />,
        },
    ];

    return (
        <main className="min-h-screen bg-white text-black pt-20">
            {/* Video Hero Section */}
            <div className="w-full">
                <VideoPlayer videoId="eO0sJw2CgGA" autoPlay className="rounded-none aspect-video" />
            </div>

            <ProjectHeader
                clientName={clientName}
                title={projectTitle}
                category={category}
                year="2024"
                services={["Art Direction", "Cinematography", "Post-Production"]}
            />

            <MainIdea
                highlightText={mainIdeaText}
                description={mainIdeaDescription}
            />

            <HighlightSection items={highlights} />

            {/* Footer or Next Project could go here */}
            <div className="h-24" />
        </main>
    );
}
