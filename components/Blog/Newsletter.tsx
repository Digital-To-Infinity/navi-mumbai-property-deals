"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const Newsletter = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden bg-brand-heading rounded-[3rem] p-10 md:p-20 text-center"
                >
                    {/* Decorative Orbs */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-brand-primary/10 text-brand-primary mb-8 border border-brand-primary/20">
                            <Mail className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                            Never Miss a <span className="text-brand-primary">Market Update</span>
                        </h2>
                        <p className="text-brand-white/60 text-lg mb-12 font-medium">
                            Join 5,000+ investors and homeowners receiving weekly insights on Navi Mumbai's real estate market.
                        </p>

                        <form className="flex flex-col md:flex-row gap-4 p-2 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-8 py-5 rounded-[1.5rem] bg-white/5 text-white border border-white/10 focus:outline-none focus:border-brand-primary transition-colors placeholder:text-white/20 font-medium"
                                required
                            />
                            <button className="px-10 py-5 bg-brand-primary text-white font-black rounded-[1.5rem] hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-3 group">
                                Subscribe Now
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                        <p className="mt-8 text-white/30 text-sm font-bold uppercase tracking-widest">
                            No Spam. Only High-Value Content.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
