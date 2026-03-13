"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Phone, Clock, MessageCircle, ArrowRight, UserCheck } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import ContactSchema from "./ContactSchema";

export default function ContactHero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scaleVal = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();

            // Mon-Sat: 10AM - 8PM (1-6)
            if (day >= 1 && day <= 6) {
                setIsOpen(hour >= 10 && hour < 20);
            }
            // Sun: 11AM - 5PM (0)
            else if (day === 0) {
                setIsOpen(hour >= 11 && hour < 17);
            }
        };
        checkStatus();
        const interval = setInterval(checkStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    const contactStats = [
        { icon: <Clock className="w-5 h-5" aria-hidden="true" />, label: "Office Status", value: isOpen ? "Open Now" : "Closed" },
        { icon: <UserCheck className="w-5 h-5" aria-hidden="true" />, label: "Expert Advisors", value: "15+" },
        { icon: <MessageCircle className="w-5 h-5" aria-hidden="true" />, label: "Live Support", value: isOpen ? "Active" : "On Call" },
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950 pt-20 max-[426px]:pt-10 pb-16"
        >
            <ContactSchema />
            {/* Background Image with Parallax Scale */}
            <motion.div
                style={{ scale: scaleVal }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/contact_hero_bg.png"
                    alt="Premium Real Estate Office Environment in Navi Mumbai"
                    fill
                    className="object-cover opacity-100"
                    priority
                    fetchPriority="high"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950" aria-hidden="true" /> */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950/20" aria-hidden="true" />
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
                    aria-hidden="true"
                />
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[20%] left-[5%] w-80 h-80 bg-brand-primary/5 rounded-full blur-[120px]"
                    aria-hidden="true"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                            <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
                            <span className="text-xs font-black text-brand-primary tracking-[0.3em] max-[321px]:tracking-[0.2em] uppercase">Connect With Excellence</span>
                        </div>

                        <h1 className="font-black !text-white leading-[1.1] tracking-tighter">
                            <motion.span
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="block text-5xl md:text-[72px] max-[426px]:text-[46px] max-[376px]:text-[40px] max-[321px]:text-[34px]"
                            >
                                Get in Touch with
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
                                <span className="text-5xl md:text-[78px] max-[376px]:text-[44px] max-[321px]:text-[36px] italic text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#fff4d6] to-brand-primary bg-[length:200%_auto] block pb-2 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(186,163,96,0.3)]">
                                    Our Consultants
                                </span>

                                {/* Animated Premium Underline */}
                                <motion.div
                                    className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-brand-primary via-[#FFE5A3] to-transparent rounded-full"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "100%", opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
                                    aria-hidden="true"
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
                                    aria-hidden="true"
                                />
                            </motion.div>
                        </h1>

                        <p className="text-xl max-[376px]:text-lg text-brand-white max-w-xl leading-relaxed font-light">
                            Your dream home in Navi Mumbai is just a conversation away. Our team of seasoned real estate professionals combines deep local market intelligence with a client-first approach to ensure your property journey in Kharghar, Panvel, or Ulwe is seamless and rewarding.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-brand-white bg-brand-button hover:bg-brand-button-hover rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border-none max-[426px]:w-full"
                            >
                                <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out skew-x-12" />
                                <span className="relative flex items-center gap-3">
                                    Book a Consultation
                                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                                </span>
                            </motion.button>

                            {!isOpen && (
                                <Link href="tel:+919876543210" className="max-[426px]:w-full">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        <span className="flex items-center gap-3 justify-center">
                                            <Phone className="w-5 h-5" aria-hidden="true" />
                                            Call Now
                                        </span>
                                    </motion.button>
                                </Link>
                            )}
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
                            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10">
                                <Image
                                    src="/luxury_about_interior.png"
                                    alt="Modern Real Estate Consultation Office"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating Stat Cards */}
                            {contactStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 + (index * 0.2), duration: 0.8 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className={`absolute z-20 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center gap-4 ${index === 0 ? 'top-[10%] -left-[10%]' :
                                        index === 1 ? 'bottom-[10%] -right-[5%]' :
                                            'top-[60%] -left-[5%]'
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <div className="text-xl font-black text-white">{stat.value}</div>
                                        <div className="text-xs text-brand-muted font-medium uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Decorative Orbit */}
                            <div className="absolute -inset-10 border border-brand-primary/10 rounded-full animate-spin-slow pointer-events-none" aria-hidden="true" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
