"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, Mail, MessageSquare, Award, Star, UserCheck, Quote } from "lucide-react";

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
        <section className="py-24 px-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <UserCheck size={14} /> Our Dedicated Team
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-brand-heading mb-6 tracking-tight">
                        Dedicated Advisors for <br />
                        <span className="text-brand-primary italic">Every Stage of Your Deal</span>
                    </h2>
                    <p className="text-brand-paragraph max-w-2xl mx-auto text-lg leading-relaxed">
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
                            className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 bg-white border border-neutral-border hover:shadow-brand-primary/20"
                        >
                            <Image
                                src={agent.image}
                                alt={agent.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Overlay Gradient for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                            {/* Floating Quote Icon */}
                            <div className="absolute top-8 left-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white/50 border border-white/10 group-hover:text-brand-primary group-hover:border-brand-primary/50 transition-all duration-500">
                                <Quote size={20} fill="currentColor" className="opacity-50" />
                            </div>

                            {/* Expert Info Card Float */}
                            <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="p-6 rounded-[2rem] bg-white/95 backdrop-blur-xl border border-white shadow-2xl group-hover:bg-white transition-colors duration-500">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-brand-heading mb-1">{agent.name}</h3>
                                            <p className="text-brand-primary text-sm font-bold flex items-center gap-2">
                                                <Award size={14} />
                                                {agent.role}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">
                                            <Star size={12} className="text-brand-primary fill-brand-primary" />
                                            <span className="text-brand-heading text-xs font-bold">{agent.rating}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-2 group-hover:translate-y-0">
                                        <p className="text-brand-paragraph text-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                            Specialist: {agent.specialty}
                                        </p>
                                        <p className="text-brand-paragraph text-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                            {agent.experience} Combined Experience
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="flex-1 py-4 bg-brand-primary text-black font-black rounded-2xl hover:bg-brand-primary-hover transition-all active:scale-95 shadow-lg shadow-brand-primary/20">
                                            Schedule Call
                                        </button>
                                        <button className="w-14 h-14 flex items-center justify-center bg-zinc-50 border border-neutral-border rounded-2xl text-brand-heading hover:bg-white hover:text-brand-primary hover:border-brand-primary/50 transition-all group/msg shadow-sm">
                                            <MessageSquare size={20} className="group-hover:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 text-center"
                >
                    <p className="text-brand-paragraph/60 italic font-medium">
                        "Your trust is our most valuable asset. We work for you, not the developer."
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
