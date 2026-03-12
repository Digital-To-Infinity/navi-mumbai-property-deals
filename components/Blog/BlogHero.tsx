"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Zap } from "lucide-react";
import { useRef } from "react";
import SearchBar from "./SearchBar";

interface BlogHeroProps {
    isSearching?: boolean;
    onSearchFocusChange?: (isFocused: boolean) => void;
}

const BlogHero = ({ isSearching = false, onSearchFocusChange }: BlogHeroProps) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scaleVal = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section
            ref={containerRef}
            className={`relative flex items-center justify-center overflow-hidden bg-zinc-950 transition-all duration-700 ease-in-out ${isSearching ? "min-h-[40vh] py-12" : "min-h-[85vh] py-16"
                }`}
        >
            {/* Background Image with Parallax Scale */}
            <motion.div
                style={{ scale: scaleVal }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/mthl_atal_setu_night_1773210593397.png"
                    alt="Navi Mumbai skyline and infrastructure night view | Premium Property Market Insights"
                    fill
                    className="object-cover opacity-100"
                    priority
                    {...({ fetchPriority: "high" } as any)}
                />
                {/* Overlays for readability and depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/50 to-zinc-950" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950/30" aria-hidden="true" />
            </motion.div>

            {/* Floating Decorative Elements */}
            <AnimatePresence>
                {!isSearching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 overflow-hidden pointer-events-none"
                    >
                        <motion.div
                            animate={{
                                y: [0, -30, 0],
                                rotate: [0, 10, 0]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[15%] right-[15%] w-72 h-72 bg-brand-primary/10 rounded-full blur-[120px]"
                            aria-hidden="true"
                        />
                        <motion.div
                            animate={{
                                y: [0, 40, 0],
                                rotate: [0, -15, 0]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[25%] left-[10%] w-96 h-96 bg-brand-primary/5 rounded-full blur-[150px]"
                            aria-hidden="true"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 relative z-10">
                <div className={`grid ${isSearching ? "lg:grid-cols-1" : "lg:grid-cols-2"} gap-10 items-center`}>

                    {/* Left Side: Content */}
                    <div className={`flex flex-col ${isSearching ? "items-center text-center space-y-6" : "space-y-8"}`}>
                        <AnimatePresence mode="wait">
                            {!isSearching && (
                                <motion.div
                                    key="hero-text"
                                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="overflow-hidden flex flex-col space-y-8"
                                >
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                                        <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
                                        <span className="text-xs font-black text-brand-primary tracking-[0.3em] uppercase">Intelligence & Insights Hub</span>
                                    </div>

                                    <h1 className="font-black !text-white leading-[1.05] tracking-tighter">
                                        <motion.span
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                            className="block text-5xl md:text-[90px]"
                                        >
                                            Navi Mumbai
                                        </motion.span>

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                            }}
                                            transition={{
                                                opacity: { duration: 1, delay: 0.4 },
                                                scale: { duration: 1, delay: 0.4 },
                                                backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" }
                                            }}
                                            className="relative inline-block mt-2 group cursor-default"
                                        >
                                            <span className="text-5xl md:text-[80px] italic text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#fff4d6] to-brand-primary bg-[length:200%_auto] block pb-4 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(186,163,96,0.3)]">
                                                Knowledge Hub
                                            </span>

                                            {/* Animated Underline */}
                                            <motion.div
                                                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-brand-primary via-[#FFE5A3] to-transparent rounded-full"
                                                initial={{ width: 0, opacity: 0 }}
                                                animate={{ width: "100%", opacity: 1 }}
                                                transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
                                                aria-hidden="true"
                                            />

                                            {/* Light Sweep Effect */}
                                            <motion.div
                                                animate={{
                                                    left: ["-100%", "200%"],
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    repeatDelay: 1,
                                                    ease: "easeInOut"
                                                }}
                                                className="absolute inset-0 z-10 w-32 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[35deg] pointer-events-none"
                                                aria-hidden="true"
                                            />
                                        </motion.div>
                                    </h1>

                                    <p className="text-xl text-zinc-400 max-w-xl leading-relaxed font-light">
                                        Navigate the future of real estate with expert analysis, local intelligence, and the latest infrastructure breakthroughs in India&apos;s most planned metropolis.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={`w-full ${isSearching ? "max-w-3xl" : ""}`}>
                            <SearchBar onFocusChange={onSearchFocusChange} />
                        </div>
                    </div>

                    {/* Right Side: Featured Spotlight / Magazine Card */}
                    <AnimatePresence>
                        {!isSearching && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9, x: 50 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative hidden lg:block"
                            >
                                <div className="relative group max-w-[450px] ml-auto">
                                    {/* Decorative Background Glow */}
                                    <div className="absolute inset-0 bg-brand-primary/20 blur-[60px] rounded-full -z-10 animate-pulse" />

                                    {/* Main Magazine Card */}
                                    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-brand-primary/30 group-hover:shadow-brand-primary/10">
                                        <div className="relative aspect-[4/5]">
                                            <Image
                                                src="/kharghar_spotlight_1773210561744.png"
                                                alt="Featured Navi Mumbai Real Estate Article - Kharghar Growth Decoded"
                                                fill
                                                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                                priority
                                                {...({ fetchPriority: "high" } as any)}
                                            />

                                            {/* Glassmorphism Overlays */}
                                            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-10 flex flex-col justify-end gap-5">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg shadow-brand-primary/20">
                                                        Editor's Choice
                                                    </span>
                                                    <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest bg-white/5 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                                                        March 2026
                                                    </span>
                                                </div>

                                                <div className="space-y-3">
                                                    <h3 className="text-3xl font-black !text-white leading-[1.1] tracking-tight">
                                                        Navi Mumbai's <br />
                                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#fff4d6] to-brand-primary">Growth Decoded</span>
                                                    </h3>
                                                    <p className="text-zinc-400 text-sm font-medium leading-relaxed line-clamp-2">
                                                        An exclusive deep dive into how the new International Airport and MTHL are reshaping property valuations in record time.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Author Badge */}
                                            <div className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center gap-3 shadow-2xl">
                                                <div className="w-10 h-10 rounded-xl overflow-hidden border border-brand-primary/30 relative">
                                                    <Image src="/expert-avatar.png" alt="Author" fill className="object-cover" loading="lazy" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest leading-none mb-1">Expert Analyst</div>
                                                    <Link
                                                        href="#"
                                                        rel="author"
                                                        title="View insights by Danish Khan - Senior Real Estate Analyst Navi Mumbai"
                                                        className="text-white text-xs font-bold hover:text-brand-primary transition-colors"
                                                    >
                                                        Danish Khan
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Interactive Elements */}
                                    <motion.div
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -top-10 -left-10 p-5 rounded-[2rem] bg-zinc-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl z-20 hidden xl:block"
                                    >
                                        <blockquote className="flex items-center gap-4 m-0 p-0 border-none italic-none">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shadow-inner">
                                                <TrendingUp className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">Market Pulse</div>
                                                <div className="text-emerald-400 text-sm font-black font-mono">+8.4% Rise In Ulwe</div>
                                            </div>
                                        </blockquote>
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, 15, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className="absolute -bottom-8 -right-8 p-5 rounded-[2rem] bg-zinc-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl z-20 hidden xl:block"
                                    >
                                        <blockquote className="flex items-center gap-4 m-0 p-0 border-none italic-none">
                                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 text-brand-primary flex items-center justify-center shadow-inner">
                                                <Zap className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">Expert Verdict</div>
                                                <div className="text-white text-sm font-black italic">Airport T1 Ready</div>
                                            </div>
                                        </blockquote>
                                    </motion.div>

                                    {/* Decorative Orbit */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-16 border border-brand-primary/5 rounded-full pointer-events-none -z-20"
                                        aria-hidden="true"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </section>
    );
};

export default BlogHero;
