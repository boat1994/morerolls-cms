import Image from "next/image";
import Link from "next/link";

export default function UnderConstructionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden bg-white selection:bg-black/10">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] animate-pulse" />
      
      <div className="z-10 flex flex-col items-center gap-8 p-4 text-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 animate-fade-in-down">
          <Image
            src="/logo.avif"
            alt="Morerolls Studio Logo"
            fill
            className="object-contain drop-shadow-sm"
            priority
          />
        </div>
        
        <div className="space-y-4 max-w-lg animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-black to-black/60 bg-clip-text text-transparent">
            Under Construction
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 font-light tracking-wide">
             We are crafting a new digital experience. <br className="hidden md:block" />
             Stay tuned for something cinematic.
          </p>
        </div>


      </div>
      
      <footer className="absolute bottom-8 text-neutral-600 text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} Morerolls Studio
      </footer>
    </main>
  );
}
