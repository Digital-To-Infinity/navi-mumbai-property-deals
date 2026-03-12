"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, MessageSquare, Award, Star } from "lucide-react";

const experts = [
    {
        name: "Vikram Malhotra",
        role: "Senior Property Strategist",
        specialty: "Luxury Residential & Pent-Houses",
        experience: "12+ Years",
        image: "/expert_male.png",
        rating: 4.9,
    },
    {
        name: "Priya Sharma",
        role: "Investment Consultant",
        specialty: "CIDCO Plots & Commercial Assets",
        experience: "8+ Years",
        image: "/expert_female.png",
        rating: 4.8,
    }
];

export default function ExpertAdvisors() {
    return (
        <section className="py-24 bg-zinc-950 px-4 relative overflow-hidden">
            {/* Background Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 border border-brand-primary rounded-full animate-pulse-slow m-[-10%]" />
                <div className="absolute inset-0 border border-brand-primary rounded-full animate-pulse-slow m-[-20%] delay-500" />
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <Award size={14} /> Meet Our Experts
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Dedicated Advisors for <br />
                        <span className="text-brand-primary italic">Every Stage of Your Deal</span>
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
                        Skip the chatbots. Talk to human experts who have helped thousands of families find their perfect address in Navi Mumbai.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {experts.map((agent, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative h-[450px] rounded-[40px] overflow-hidden border border-white/5 hover:border-brand-primary/30 transition-all duration-700 bg-zinc-900/40"
                        >
                            <Image
                                src={agent.image}
                                alt={agent.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                            {/* Expert Info Card Float */}
                            <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="p-6 rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-1">{agent.name}</h3>
                                            <p className="text-brand-primary text-sm font-bold">{agent.role}</p>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                            <Star size={12} className="text-brand-primary fill-brand-primary" />
                                            <span className="text-white text-xs font-bold">{agent.rating}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                        <p className="text-zinc-400 text-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                            {agent.specialty}
                                        </p>
                                        <p className="text-zinc-400 text-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                            {agent.experience} Expertise
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 py-3 bg-brand-primary text-black font-black rounded-xl hover:shadow-[0_0_20px_rgba(186,163,96,0.35)] transition-all active:scale-95">
                                            Talk Now
                                        </button>
                                        <button className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors">
                                            <MessageSquare size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
