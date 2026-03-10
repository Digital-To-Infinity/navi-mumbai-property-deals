"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Award, Shield, Users, ArrowRight, Plus } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

export default function AboutHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yVal = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityVal = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scaleVal = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const stats = [
        { icon: <Users className="w-5 h-5" />, label: "Happy Clients", value: "5000+" },
        { icon: <Award className="w-5 h-5" />, label: "Awards Won", value: "25+" },
        { icon: <Shield className="w-5 h-5" />, label: "Trusted Partners", value: "150+" },
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-10 pb-30"
        >
            {/* Background Image with Parallax Scale */}
            <motion.div
                style={{ scale: scaleVal }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/modern_about_hero.png"
                    alt="Luxury Real Estate Navi Mumbai"
                    fill
                    className="object-cover opacity-100"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950/20" />
            </motion.div>

            {/* Floating Decorative Elements (Abstract Shapes) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[10%] w-64 h-64 bg-brand-primary/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[20%] left-[5%] w-80 h-80 bg-brand-primary/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                            <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
                            <span className="text-xs font-bold text-brand-primary tracking-[0.3em] uppercase">Redefining Excellence</span>
                        </div>

                        <h1 className="font-black !text-white leading-[1.1] tracking-tighter">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="block text-5xl md:text-8xl"
                            >
                                Elevating the
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
                                <span className="text-5xl md:text-8xl italic text-transparent text-italic bg-clip-text bg-gradient-to-r from-brand-primary via-[#fff4d6] to-brand-primary bg-[length:200%_auto] block pb-2 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(186,163,96,0.3)]">
                                    Standard of Living
                                </span>

                                {/* Animated Premium Underline */}
                                <motion.div
                                    className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-brand-primary via-[#FFE5A3] to-transparent rounded-full"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "100%", opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
                                />

                                {/* Subtle Light Sweep Effect */}
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
                                />
                            </motion.div>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-xl leading-relaxed font-light">
                            Navi Mumbai Property Deals is not just a portal. We are architects of dreams, connecting you to the most prestigious addresses in the heart of Maharashtra.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <Link href="/blogs">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-brand-white bg-brand-button hover:bg-brand-button-hover rounded-xl shadow-lg hover:shadow-brand-primary/30 overflow-hidden transition-all duration-300 cursor-pointer border-none max-[426px]:w-full"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out skew-x-12" />
                                    <span className="relative flex items-center gap-3">
                                        Explore Our Blogs
                                        <ArrowRight className="w-4 h-4 text-brand-white font-bold transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </motion.button>
                            </Link>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                <span className="flex items-center gap-3">
                                    <Plus />
                                    Add Property
                                </span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right: Glassmorphism Floating Cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-square max-w-[500px] ml-auto">
                            {/* Main Featured Image in Glass Frame */}
                            <motion.div
                                style={{ y: yVal }}
                                className="absolute inset-0 rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10"
                            >
                                <Image
                                    src="/modern_about_hero.png"
                                    alt="About Us Feature"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute" />
                            </motion.div>

                            {/* Floating Stat Cards */}
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + (index * 0.2), duration: 0.8 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className={`absolute z-20 p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-4 ${index === 0 ? 'top-[10%] -left-[10%]' :
                                        index === 1 ? 'bottom-[10%] -right-[5%]' :
                                            'top-[60%] -left-[5%]'
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-white">{stat.value}</div>
                                        <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Decorative Grid Lines */}
                            <div className="absolute -inset-10 border border-brand-primary/10 rounded-full animate-spin-slow pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div >
        </section >
    );
}
