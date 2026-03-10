"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="py-16 bg-brand-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-brand-primary-hover rounded-[3rem] overflow-hidden relative shadow-[0_20px_50px_-20px_rgba(186,163,96,0.5)]"
                >
                    {/* Decorative Pattern Background */}
                    <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px]" />

                    <div className="px-6 py-8 md:py-12 md:px-20 max-[376px]:p-4 flex flex-col items-center text-center relative z-10">

                        <h2 className="text-4xl md:text-5xl lg:text-6xl max-[321px]:text-2xl font-black text-white mb-6 leading-tight">
                            Ready to Find Your <br className="hidden md:block" />
                            Dream Property?
                        </h2>

                        <p className="text-white/90 text-lg md:text-xl max-[321px]:text-lg max-w-3xl mx-auto mb-10 font-medium">
                            Join thousands of satisfied homeowners. Our expert team is ready to guide you through a seamless real estate journey in Navi Mumbai.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-8 py-4 bg-white text-brand-primary font-bold text-lg max-[321px]:text-base rounded-full hover:bg-brand-neutral-bg transition-all flex items-center justify-center group cursor-pointer">
                                Browse Properties
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/50 text-white font-bold text-lg max-[321px]:text-base rounded-full hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm cursor-pointer">
                                Contact an Expert
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
