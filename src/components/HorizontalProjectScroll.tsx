import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "../lib/utils";

interface Project {
    title: string;
    category: string;
    description: string;
    image: string;
    mobileImage?: string;
    year: string;
    link: string;
}

interface HorizontalProjectScrollProps {
    projects: Project[];
    className?: string;
}

export function HorizontalProjectScroll({ projects, className }: HorizontalProjectScrollProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = React.useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    React.useEffect(() => {
        const updateScrollRange = () => {
            if (containerRef.current) {
                const totalWidth = containerRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;
                setScrollRange(totalWidth - viewportWidth);
            }
        };

        // Initial measurement
        updateScrollRange();

        // Measurement after a short delay to ensure fonts/images behave (optional but helpful)
        const timeoutId = setTimeout(updateScrollRange, 100);

        window.addEventListener("resize", updateScrollRange);
        return () => {
            window.removeEventListener("resize", updateScrollRange);
            clearTimeout(timeoutId);
        };
    }, [projects]);

    const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${scrollRange}px`]);

    return (
        <section ref={targetRef} className={cn("relative h-[300vh] bg-canvas", className)}>
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div
                    ref={containerRef}
                    style={{ x }}
                    className="flex gap-12 md:gap-24 pl-4 md:pl-24"
                >
                    <div className="flex flex-col justify-center min-w-[30vw] md:min-w-[20vw] pr-8 md:pr-16">
                        <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                            Ons <span className="text-electric">Portfolio</span>
                        </h2>
                        <p className="text-lg md:text-xl text-ink/60 font-medium max-w-sm">
                            Een selectie van ons beste werk.
                        </p>
                        <p className="text-lg md:text-xl text-ink/60 font-medium mt-2">
                            Scroll om te ontdekken.
                        </p>
                        <div className="mt-8 flex items-center gap-2 text-ink/60 font-mono text-sm uppercase tracking-widest">
                            <span className="w-12 h-[1px] bg-ink/60"></span>
                            Scroll
                        </div>
                    </div>

                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} />
                    ))}

                    {/* End spacer for padding */}
                    <div className="min-w-[10vw]"></div>
                </motion.div>
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const displayImage = (isMobile && project.mobileImage) ? project.mobileImage : project.image;

    return (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-[60vh] md:h-[70vh] w-[85vw] md:w-[60vw] flex-shrink-0 bg-ink overflow-hidden border border-ink/10 transition-transform duration-500 hover:scale-[1.02]"
        >
            {/* Blurred Background Layer for "Atmosphere" and filling gaps */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-110 pointer-events-none transition-transform duration-700 group-hover:scale-125"
                style={{ backgroundImage: `url(${displayImage})` }}
            />

            {/* Main Image Layer (Fit Width, Align Top) */}
            <div
                className="absolute inset-0 h-full w-full bg-no-repeat bg-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    backgroundImage: `url(${displayImage})`,
                    backgroundSize: "100% auto"
                }}
            />
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 pointer-events-none z-10" />

            <div className="relative h-full flex flex-col justify-end p-8 md:p-12 z-20">
                <div className="flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="inline-block px-3 py-1 bg-acid/90 text-black font-mono text-xs font-bold uppercase tracking-widest">
                                {project.category}
                            </span>
                            <span className="text-white/60 font-mono text-xs uppercase tracking-widest">
                                {project.year}
                            </span>
                        </div>

                        <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                            {project.title}
                        </h3>

                    </div>

                    <div className="hidden md:flex w-24 h-24 rounded-full bg-acid text-ink items-center justify-center opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        <span className="text-4xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">&rarr;</span>
                    </div>
                </div>
            </div>
        </a>
    );
}
