"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageSquare, Phone, MapPin, Mail } from "lucide-react";

export default function ContactHero() {
    return (
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-zinc-950">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/contact_hero_bg.png"
                    alt="Premium Real Estate Office"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
                        <span className="text-xs font-bold text-brand-primary tracking-[0.3em] uppercase">Let's Connect</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
                        We're Here to <span className="text-brand-primary italic">Guide Your Move</span>
                    </h1>

                    <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                        Navi Mumbai's most trusted real estate consultancy is just a message away. Reach out for expert advice on properties in Kharghar, Panvel, Ulwe, and beyond.
                    </p>
                </motion.div>
            </div>

            {/* Floating Contact Pills */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex gap-8 z-20">
                {[
                    { icon: <Phone className="w-5 h-5 text-brand-primary" />, label: "+91 98765 43210" },
                    { icon: <Mail className="w-5 h-5 text-brand-primary" />, label: "contact@nmpdeals.com" },
                    { icon: <MessageSquare className="w-5 h-5 text-brand-primary" />, label: "Live Support" }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl"
                    >
                        {item.icon}
                        <span className="text-white font-medium">{item.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
