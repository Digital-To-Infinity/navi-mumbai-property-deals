"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Handshake, Users } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Secure Transactions",
        description: "Every property listed goes through a rigorous legal verification process ensuring complete peace of mind.",
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        icon: TrendingUp,
        title: "Best ROI Guaranteed",
        description: "Our expert analysts identify high-growth corridors in Navi Mumbai to maximize your investment returns.",
        color: "bg-blue-100 text-blue-600",
    },
    {
        icon: Handshake,
        title: "Transparent Dealings",
        description: "No hidden charges or surprise fees. What you see is exactly what you get with 100% transparency.",
        color: "bg-purple-100 text-purple-600",
    },
    {
        icon: Users,
        title: "End-to-End Support",
        description: "From property selection to loan processing and registration, we handle everything for you.",
        color: "bg-amber-100 text-amber-600",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-brand-neutral-bg relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-brand-primary/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm mb-4">
                            Our Value Proposition
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-heading mb-6">
                            Why Trust Us With Your Future?
                        </h2>
                        <p className="text-lg text-brand-paragraph">
                            We don't just sell properties; we build lifelong relationships. Here is why thousands of families have chosen us as their real estate partner in Navi Mumbai.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] transition-all duration-300 border border-brand-neutral-border/50 group hover:-translate-y-2 relative"
                            >
                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-brand-primary/5 to-transparent rounded-tr-3xl" />

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${feature.color}`}>
                                    <Icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl font-bold text-brand-heading mb-3 transition-colors group-hover:text-brand-primary">
                                    {feature.title}
                                </h3>

                                <p className="text-brand-paragraph leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
