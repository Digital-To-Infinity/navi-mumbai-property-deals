"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListingMode } from "../listingData";
import {
    ChevronDown,
    Sparkles,
    ArrowRight,
    Search,
    HelpCircle,
    Info,
    BadgeCheck
} from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: FAQItem[];
    mode?: ListingMode;
}

const FAQ: React.FC<FAQProps> = ({ faqs, mode = "buy" }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const modeStyles = {
        buy: {
            accent: "var(--color-primary)",
            accentHover: "var(--color-primary-hover)",
            bg: "rgba(186, 163, 96, 0.05)",
            border: "rgba(186, 163, 96, 0.2)",
            glow: "rgba(186, 163, 96, 0.15)",
            label: "Buyer's Guide"
        },
        rent: {
            accent: "var(--color-primary)",
            accentHover: "var(--color-primary-hover)",
            bg: "rgba(186, 163, 96, 0.05)",
            border: "rgba(186, 163, 96, 0.2)",
            glow: "rgba(186, 163, 96, 0.15)",
            label: "Tenant Resources"
        },
        sell: {
            accent: "var(--color-primary)",
            accentHover: "var(--color-primary-hover)",
            bg: "rgba(186, 163, 96, 0.05)",
            border: "rgba(186, 163, 96, 0.2)",
            glow: "rgba(186, 163, 96, 0.15)",
            label: "Seller Support"
        }
    };

    const style = modeStyles[mode];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <section className="py-16 relative overflow-hidden bg-white">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

            <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full blur-[140px] opacity-20 pointer-events-none transition-colors duration-1000"
                style={{ backgroundColor: style.accent }} />
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 rounded-full blur-[140px] opacity-20 pointer-events-none transition-colors duration-1000"
                style={{ backgroundColor: style.accent }} />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Centered Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-20 max-[426px]:mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 transition-colors duration-300 mx-auto"
                        style={{
                            backgroundColor: style.bg,
                            borderColor: style.border,
                            color: style.accent
                        }}
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                            {style.label}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-[#1a1a1a] mb-8 leading-[1.1] tracking-tight"
                    >
                        Answers to your {" "}
                        <span className="relative inline-block pb-2">
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-[#7a5d1e] via-[#baa360] to-[#d4aa5e]"
                                style={{ WebkitBackgroundClip: 'text' }}
                            >
                                Real Estate
                            </span>
                            <div className="absolute -bottom-1 left-0 w-full h-[6px] overflow-hidden">
                                <svg className="w-full h-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                                        d="M2 6C40 2 160 2 198 6"
                                        stroke="#baa360"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                        </span> queries.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-brand-paragraph text-lg mb-10 leading-relaxed max-w-6xl mx-auto"
                    >
                        Navigating the Navi Mumbai property market can be complex.
                        We&apos;ve compiled the most essential information to help you make informed decisions.
                    </motion.p>
                </div>

                {/* FAQ Items */}
                <div className="max-w-4xl mx-auto mb-16">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6 min-h-[400px]"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, index) => (
                                    <motion.div
                                        key={faq.question}
                                        variants={itemVariants}
                                        layout
                                        className={`group relative overflow-hidden rounded-[32px] border transition-all duration-500 ${openIndex === index
                                            ? "bg-white border-transparent"
                                            : "bg-[#fcfdfd] border-brand-muted/20 hover:border-brand-primary"
                                            }`}
                                    >
                                        {/* Accent Background Glow */}
                                        {openIndex === index && (
                                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                                style={{ backgroundColor: style.accent }} />
                                        )}

                                        {/* Glow for open item */}
                                        <AnimatePresence>
                                            {openIndex === index && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 shadow-[0_32px_64px_-16px_rgba(24,24,27,0.06)] pointer-events-none"
                                                />
                                            )}
                                        </AnimatePresence>

                                        <button
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                            className="w-full px-8 max-[426px]:px-4 py-5 max-[426px]:py-4 flex items-center justify-between gap-6 max-[426px]:gap-0 text-left group-focus:outline-none relative z-10 cursor-pointer"
                                        >
                                            <div className="flex items-center gap-6 max-[426px]:gap-2">
                                                <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 max-[426px]:hidden ${openIndex === index ? "text-white" : "bg-white text-brand-paragraph border border-brand-paragraph/20 group-hover:border-brand-primary group-hover:text-brand-primary"
                                                    }`}
                                                    style={{ backgroundColor: openIndex === index ? style.accent : undefined }}>
                                                    <HelpCircle className="w-6 h-6" />
                                                </div>
                                                <span className="text-lg max-[426px]:text-base max-[426px]:ml-2 font-semibold tracking-tight transition-colors duration-300 text-brand-heading group-hover:text-brand-primary">
                                                    {faq.question}
                                                </span>
                                            </div>
                                            <div className={`p-2 rounded-xl transition-all duration-500 ${openIndex === index ? "rotate-180 scale-110" : "text-brand-paragraph group-hover:text-brand-primary"
                                                }`}
                                                style={{ color: openIndex === index ? style.accent : undefined }}>
                                                <ChevronDown className="w-6 h-6" />
                                            </div>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {openIndex === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                                >
                                                    <div className="px-10 pb-10 pl-[88px] max-[426px]:pl-6 relative z-10">
                                                        <div className="text-brand-paragraph text-[18px] max-[426px]:text-base leading-relaxed max-w-3xl">
                                                            {faq.answer}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="py-20 text-center border-2 border-dashed border-zinc-100 rounded-[32px]">
                                    <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-6 h-6 text-zinc-300" />
                                    </div>
                                    <h3 className="text-zinc-500 font-medium">No questions found matching your search.</h3>
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="mt-4 text-[#baa360] font-bold text-sm underline underline-offset-4"
                                    >
                                        Clear search
                                    </button>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* CTA Footer */}
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        {/* Background Container with Gradient Border Effect */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-brand-primary/0 via-brand-primary/40 to-brand-primary/0 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative bg-[#09090b] rounded-[40px] p-8 md:p-12 overflow-hidden shadow-2xl">
                            {/* Decorative Ambient Orbs */}
                            <div className="absolute top-0 right-0 w-[400px] h-full bg-brand-primary/5 blur-[100px] pointer-events-none" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center text-center gap-12">
                                {/* Top: Title & Feature Grids */}
                                <div className="space-y-8 flex flex-col items-center">
                                    <div className="space-y-4 flex flex-col items-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full whitespace-nowrap">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                                            <span className="text-brand-primary text-[10px] font-black uppercase tracking-widest">Expert Help Available</span>
                                        </div>
                                        <h3 className="!text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
                                            Still Have <span className="text-brand-primary">Questions?</span>
                                        </h3>
                                        <p className="text-brand-muted text-lg leading-relaxed max-w-4xl mx-auto">
                                            Get personalized advice from our top-rated Navi Mumbai real estate consultants.
                                            We&apos;re here to guide you through every step of your property journey.
                                        </p>
                                    </div>

                                    {/* Info Pills Section */}
                                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                                        {[
                                            { label: "Free Consult", icon: <Info className="w-4 h-4" /> },
                                            { label: "Verified Experts", icon: <BadgeCheck className="w-4 h-4" />, href: "/verified-experts" },
                                            { label: "Instant Support", icon: <Sparkles className="w-4 h-4" /> }
                                        ].map((item, idx) => (
                                            item.href ? (
                                                <a href={item.href} key={idx} className="flex items-center gap-3 group/pill cursor-pointer" title="Verify our expert consultants">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-primary border border-white/10 group-hover/pill:bg-brand-primary group-hover/pill:text-white transition-all duration-300">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-brand-white text-sm font-bold tracking-wide group-hover/pill:text-brand-primary transition-colors">{item.label}</span>
                                                </a>
                                            ) : (
                                                <div key={idx} className="flex items-center gap-3 group/pill">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-primary border border-white/10 group-hover/pill:bg-brand-primary group-hover/pill:text-white transition-all duration-300">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-brand-white text-sm font-bold tracking-wide">{item.label}</span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom: Action Button & Trust Chip */}
                                <div className="flex flex-col items-center gap-6 w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        title="Connect with a Real Estate Professional"
                                        className="w-full sm:w-auto relative px-16 py-4 bg-brand-primary text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group/btn overflow-hidden cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                                        <span className="relative z-10 text-lg">Talk to an Expert</span>
                                        <ArrowRight className="w-6 h-6 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                                    </motion.button>

                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#09090b] bg-zinc-800 flex items-center justify-center text-[10px] font-black text-brand-primary">
                                                    {String.fromCharCode(64 + i)}
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-brand-muted text-[12px] font-bold uppercase tracking-widest whitespace-nowrap">
                                            Trusted by <span className="text-white">5K+</span> Happy Clients
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
