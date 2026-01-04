import { ProjectDetails } from "@/components/work/ProjectDetails";

const DEMO_IMAGES = [
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

// Mock data (should match ProjectGrid data)
const PROJECTS = {
    "fashion-week-2024": {
        title: "Fashion Week 2024",
        client: "Vogue",
        year: "2024",
        services: "Event Coverage, Editing",
        description: "A cinematic look at the highlights of Fashion Week 2024, capturing the energy and elegance of the runway.",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        poster: DEMO_IMAGES[0],
    },
    "urban-exploration": {
        title: "Urban Exploration",
        client: "Discovery",
        year: "2023",
        services: "Documentary, Color Grading",
        description: "Exploring the forgotten corners of the city, revealing beauty in decay.",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
        poster: DEMO_IMAGES[1],
    },
    "product-launch": {
        title: "Product Launch",
        client: "Tech Corp",
        year: "2024",
        services: "Commercial, VFX",
        description: "High-energy product reveal for the latest tech gadget.",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster: DEMO_IMAGES[2],
    },
    "music-video": {
        title: "Music Video",
        client: "Sony Music",
        year: "2024",
        services: "Music Video, Direction",
        description: "A visual journey accompanying the latest hit single.",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        poster: DEMO_IMAGES[3],
    },
    "corporate-film": {
        title: "Corporate Film",
        client: "Global Inc",
        year: "2023",
        services: "Corporate, Interview",
        description: "Showcasing the values and vision of a global enterprise.",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        poster: DEMO_IMAGES[4],
    },
    "travel-diary": {
        title: "Travel Diary",
        client: "Personal Project",
        year: "2023",
        services: "Travel, Vlog",
        description: "Capturing the essence of travel and exploration.",
        videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        poster: DEMO_IMAGES[5],
    },
};

export async function generateStaticParams() {
    return Object.keys(PROJECTS).map((slug) => ({
        slug: slug,
    }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = PROJECTS[slug as keyof typeof PROJECTS] || {
        title: "Project Not Found",
        client: "-",
        year: "-",
        services: "-",
        description: "The requested project could not be found.",
        videoSrc: "",
        poster: "",
    };

    return <ProjectDetails project={project} />;
}
