"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import Antigravity from "./Antigravity";

export default function HeroSection() {

    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        // Normalize mouse coordinates to range [-1, 1]
        const x = (clientX - left - width / 2) / (width / 2);
        const y = (clientY - top - height / 2) / (height / 2);

        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    // Smooth physics values - reduced slightly for a more professional, stable feel
    const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [-1, 1], [4, -4]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-4, 4]), springConfig);

    // Parallax background layers mappings
    const bgX = useSpring(useTransform(mouseX, [-1, 1], [-20, 20]), springConfig);
    const bgY = useSpring(useTransform(mouseY, [-1, 1], [-20, 20]), springConfig);

    return (
        <section
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-dark text-white [perspective:2000px] py-24"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
        >
            {/* Animated Abstract Background with Parallax */}
            <motion.div
                style={{ x: bgX, y: bgY }}
                className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
            >
                {/* Antigravity Particle Effect */}
                <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0 opacity-70 mix-blend-screen scale-[1.5] sm:scale-100">
                    <div style={{ width: '100%', height: '100%', position: 'relative' }} className="max-w-[1080px] max-h-[1080px]">
                        <Antigravity
                            count={490}
                            magnetRadius={11}
                            ringRadius={10}
                            waveSpeed={0.8}
                            waveAmplitude={1}
                            particleSize={2}
                            lerpSpeed={0.1}
                            color="#8f7b44"
                            autoAnimate
                            particleVariance={1}
                            rotationSpeed={1}
                            depthFactor={0.5}
                            pulseSpeed={4}
                            particleShape="capsule"
                            fieldStrength={20}
                        />
                    </div>
                </div>

                {/* Decorative Gold Elements matching Footer */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50 z-0"></div>
                <div className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-brand-primary blur-[150px] opacity-[0.12]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand-primary blur-[150px] opacity-[0.08]" />
            </motion.div>

            <div className="container mx-auto px-4 relative z-20 flex flex-col items-center">

                {/* Main Content container with 3D perspective */}
                <motion.div
                    className="flex flex-col items-center w-full [transform-style:preserve-3d]"
                    style={{
                        rotateX: isHovered ? rotateX : 0,
                        rotateY: isHovered ? rotateY : 0,
                        z: 50
                    }}
                >
                    {/* SEO Optimized H1 & Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center max-w-5xl mx-auto mb-12 w-full flex flex-col items-center"
                    >
                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-zinc-900/80 border border-zinc-800 shadow-[0_0_15px_rgba(186,163,96,0.1)] mb-8 hover:shadow-[0_0_20px_rgba(186,163,96,0.2)] hover:border-brand-primary/30 transition-all backdrop-blur-md cursor-pointer">
                            <Star className="w-4 h-4 text-brand-primary fill-brand-primary" />
                            <h2 className="text-xs sm:text-sm font-semibold !text-zinc-200 tracking-wide uppercase m-0">#1 Real Estate Portal in Navi Mumbai</h2>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-extrabold !text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
                            Find Your Perfect <br className="hidden md:block" />
                            <span className="relative inline-block text-brand-primary mt-2">
                                Space in Navi Mumbai
                                <svg className="absolute w-full h-3 -bottom-2 left-0 text-brand-primary/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-300 max-w-4xl mx-auto font-medium leading-relaxed mb-10">
                            Discover premium residential and commercial properties. Seamlessly buy, sell, or rent with Navi Mumbai&apos;s most trusted and experienced real estate experts.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
