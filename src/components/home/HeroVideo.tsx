"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

export type VideoType = "upload" | "youtube";

export interface VideoSource {
  type: VideoType;
  url?: string | null;
  file?: Media | number | null;
  poster?: Media | number | null;
}

export interface HeroVideoProps {
  mobile?: VideoSource;
  desktop?: VideoSource;
}

import { Media } from "@/payload-types";
import { useMediaQuery } from "@/hooks/use-media-query";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const DEFAULT_VIDEO: VideoSource = {
  type: "upload",
  file: {
    id: 0,
    alt: "Background Video",
    updatedAt: "",
    createdAt: "",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  } as Media,
  poster: null,
};

export function HeroVideo({ mobile, desktop }: HeroVideoProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Logic to determine which video to show
  // Default to desktop if no specific mobile video is provided
  // If we are on mobile, and a mobile video exists, use it.
  const activeSource = (isMobile && mobile ? mobile : desktop) || DEFAULT_VIDEO;

  // Helper to get URL from source
  const getUrl = (source?: VideoSource) => {
    if (!source) return null;
    if (source.type === "youtube") return source.url;
    if (source.type === "upload" && source.file && typeof source.file !== "number") {
      return source.file.url;
    }
    return null;
  };

  const getPosterUrl = (source?: VideoSource) => {
    if (source?.poster && typeof source.poster !== "number") {
        return source.poster.url;
    }
    return null;
  };

  const url = getUrl(activeSource);
  const posterUrl = getPosterUrl(activeSource);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 select-none bg-black">
        {/* Poster Image (LCP Element) */}
        {posterUrl && (
            <Image
                src={posterUrl}
                alt="Hero Video Poster"
                fill
                priority={true}
                placeholder="empty"
                quality={85}
                className="object-cover z-0"
                unoptimized={true}
            />
        )}

        <div className="absolute inset-0 bg-black/20 z-10" />
        
        {isMounted && activeSource && url ? (
          activeSource.type === "youtube" ? (
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full fade-in-0 duration-1000">
               <ReactPlayer
                url={url}
                playing={true}
                loop={true}
                muted={true}
                controls={false}
                width="100%"
                height="100%"
                playsinline={true}
                config={{
                    youtube: {
                        playerVars: { showinfo: 0, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3, modestbranding: 1, rel: 0 }
                    }
                }}
                className="[&>div]:!w-full [&>div]:!h-full [&>iframe]:!w-full [&>iframe]:!h-full [&>iframe]:object-cover"
              />
               {/* Overlay to prevent interaction with iframe if pointer-events-none fails on some browsers */}
               <div className="absolute inset-0 z-[1] bg-transparent" />
            </div>
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              webkit-playsinline="true"
              disablePictureInPicture
              disableRemotePlayback
              className="w-full h-full object-cover pointer-events-none fade-in-0 duration-1000"
            >
              <source src={url} type="video/mp4" />
            </video>
          )
        ) : null}
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center">
        <Container>
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter mb-4 drop-shadow-lg">
              MOREROLLS STUDIO
            </h1>
            <p className="text-lg md:text-xl text-white/90 tracking-widest uppercase max-w-2xl mx-auto drop-shadow-md">
              Cinematic Visual Storytelling
            </p>
          </motion.div>
        </Container>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}