"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useEffect, useRef } from "react";

export function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Force mute เพื่อความชัวร์ เพราะบาง Browser ถ้า Autoplay แล้วหลุด Mute จะหยุดเล่นทันที
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.muted = true;
        }
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-white">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 select-none"> {/* เพิ่ม select-none */}
                <div className="absolute inset-0 bg-black/20 z-10" />
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    // Attributes สำคัญสำหรับ WebView / TikTok
                    webkit-playsinline="true" 
                    disablePictureInPicture
                    disableRemotePlayback
                    // เพิ่ม pointer-events-none เพื่อป้องกัน browser มองว่าเป็น interactive media
                    className="w-full h-full object-cover pointer-events-none"
                >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    <div className="w-full h-full bg-neutral-100" />
                </video>
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
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