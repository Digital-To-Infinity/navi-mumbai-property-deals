"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, TrendingUp, Sparkles, ShieldCheck, Check, Bell, ArrowRight } from "lucide-react";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
            setTimeout(() => setIsSubscribed(false), 5000);
        }
    };

    const benefits = [
        { icon: <TrendingUp className="w-5 h-5" />, text: "Market Trends" },
        { icon: <Sparkles className="w-5 h-5" />, text: "Early Access" },
        { icon: <ShieldCheck className="w-5 h-5" />, text: "Legal Tips" },
    ];

    return (
        <section className="py-12 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden bg-zinc-950 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/5"
                >
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
                        <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-brand-primary/30 rounded-full blur-[100px]" />
                        <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-brand-primary/20 rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
                        {/* Header Area */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
                        >
                            <Bell className="w-4 h-4 text-brand-primary animate-pulse" />
                            <span className="text-[11px] font-black text-brand-primary tracking-[0.2em] uppercase">Investor Hub</span>
                        </motion.div>

                        <h2 className="text-3xl md:text-5xl font-black !text-white mb-4 tracking-tight">
                            Navi Mumbai <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-[#fff4d6]">Weekly Intel</span>
                        </h2>

                        <p className="text-brand-muted text-base md:text-lg font-medium max-w-xl mb-10 leading-relaxed">
                            Join 5,200+ property specialists receiving curated market analytics <br className="hidden md:block" />
                            and early project alerts every Tuesday.
                        </p>

                        {/* Subscription Form */}
                        <div className="w-full max-w-2xl relative group">
                            <AnimatePresence>
                                {isSubscribed ? (
                                    <motion.div
                                        initial={{ opacity: 0, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, filter: "blur(10px)" }}
                                        className="py-4 text-emerald-400 font-bold flex items-center justify-center gap-2"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        You&apos;re subscribed! Check your inbox.
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col sm:flex-row gap-3 p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 group-focus-within:border-brand-primary/30 transition-all"
                                    >
                                        <div className="flex-1 flex items-center px-4 gap-3">
                                            <Mail className="w-6 h-6 text-brand-muted group-focus-within:text-brand-primary transition-colors" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className="w-full py-4 bg-transparent text-white outline-none placeholder:text-brand-muted font-medium text-base md:text-lg"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden shadow-lg shadow-brand-primary/20 whitespace-nowrap cursor-pointer"
                                        >
                                            <span className="relative z-10">Subscribe Now</span>
                                            <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Informational Benefits Bar */}
                        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12 pt-8 border-t border-white/5 w-full">
                            {benefits.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    className="flex items-center gap-2 text-brand-muted hover:text-brand-white transition-colors cursor-default"
                                >
                                    <span className="text-brand-primary">{item.icon}</span>
                                    <span className="text-sm font-bold uppercase tracking-widest">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
