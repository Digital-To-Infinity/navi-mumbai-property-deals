"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const highlights = [
    "Verified & Legal Properties Only",
    "Zero Brokerage on New Projects",
    "End-to-End Home Loan Assistance",
    "Transparent & Honest Dealings"
];

export default function OurStory() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section
            ref={sectionRef}
            className="py-16 bg-white relative overflow-x-clip"
            aria-labelledby="our-story-heading"
        >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 -mt-20 -ml-20 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col space-y-10 lg:pr-8 max-[769px]:items-center"
                    >
                        {/* Heading Section */}
                        <div className="relative max-[769px]:text-center max-[769px]:flex max-[769px]:flex-col max-[769px]:items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                                className="inline-flex mb-8 relative group"
                            >
                                {/* Animated ambient background glow */}
                                <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full group-hover:bg-brand-primary/30 group-hover:blur-2xl transition-all duration-500 z-0"></div>

                                {/* Glassmorphism badge container */}
                                <div
                                    className="relative z-10 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-brand-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group-hover:border-brand-primary/40 group-hover:bg-white/80 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
                                    title="Experience Navi Mumbai Property Deals Expertise"
                                >
                                    {/* Pulsing indicator with nested animation */}
                                    <div className="relative flex items-center justify-center w-3 h-3">
                                        <span className="absolute inline-flex w-full h-full rounded-full bg-brand-primary opacity-30 animate-ping duration-1000"></span>
                                        <span className="relative inline-flex w-2 h-2 rounded-full bg-gradient-to-tr from-brand-primary to-brand-primary-hover shadow-[0_0_8px_rgba(186,163,96,0.8)]"></span>
                                    </div>

                                    <span className="font-bold text-sm max-[376px]:text-xs tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-brand-heading to-brand-paragraph group-hover:from-brand-primary group-hover:to-brand-primary-hover transition-all duration-300 uppercase">
                                        Our Story
                                    </span>
                                </div>
                            </motion.div>

                            <h2 id="our-story-heading" className="text-6xl max-[426px]:text-4xl max-[321px]:text-3xl font-extrabold text-brand-heading leading-[1.2] tracking-tight mb-6">
                                Your Trusted Real Estate Partner in <br className="hidden" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover relative inline-block">
                                    Navi Mumbai
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-primary/70" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
                                        <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4" />
                                    </svg>
                                </span>
                            </h2>

                            <p className="text-lg md:text-xl max-[426px]:text-base text-brand-paragraph leading-relaxed font-light border-l-4 border-brand-primary pl-6 max-[769px]:border-l-0 max-[769px]:pl-0">
                                More than just <strong>Navi Mumbai Real Estate Consultants</strong>, we are your dedicated navigators in the complex world of property acquisition. With deep roots in the <strong>CIDCO Planned City</strong>, we leverage <strong>RERA Compliance</strong> and local insights to help you find your <span className="font-semibold text-brand-primary">forever home</span>.
                            </p>
                        </div>

                        {/* Interactive Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-[426px]:w-full" role="list" aria-label="Our core value highlights">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="group flex items-center space-x-4 p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 max-[426px]:w-full"
                                    role="listitem"
                                >
                                    <div className="flex-shrink-0 mt-0.5">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-white transition-colors duration-300">
                                            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <span className="text-brand-heading font-semibold text-base max-[376px]:text-sm leading-snug tracking-tight">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Section */}
                        <div className="pt-4 flex flex-wrap items-center gap-6 max-[769px]:justify-center max-[426px]:flex-col max-[426px]:w-full">
                            <Link href="/about" className="max-[426px]:w-full">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-brand-white bg-brand-button hover:bg-brand-button-hover rounded-full shadow-lg hover:shadow-brand-primary/30 overflow-hidden transition-all duration-300 cursor-pointer border-none max-[426px]:w-full"
                                    aria-label="Discover our journey and history in Navi Mumbai real estate"
                                    title="Read about our core values and team"
                                >
                                    <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out skew-x-12" aria-hidden="true" />
                                    <span className="relative flex items-center gap-3">
                                        Discover Our Journey
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                                            <ArrowRight className="w-4 h-4 text-brand-white" aria-hidden="true" />
                                        </div>
                                    </span>
                                </motion.button>
                            </Link>

                            <div className="sm:flex flex-col border-l-2 border-brand-primary/20 pl-6 max-[426px]:border-l-0 max-[426px]:pl-0 max-[426px]:items-center">
                                <span className="text-sm font-bold text-brand-heading uppercase tracking-wider mb-1">Need Expert Advice?</span>
                                <Link
                                    href="/contact"
                                    className="text-sm text-brand-paragraph font-medium transition-all duration-300 hover:text-brand-primary hover:underline underline-offset-4 decoration-brand-primary/50 hover:decoration-brand-primary"
                                    title="Connect with our real estate experts for personalized guidance"
                                >
                                    Talk to our experts
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative lg:ml-10 mt-10 lg:mt-0"
                    >
                        {/* Background decorative blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/10 rounded-full blur-3xl -z-10" aria-hidden="true" />

                        <div className="relative w-full h-[600px] max-[426px]:h-[450px] max-[321px]:h-[400px] rounded-3xl overflow-hidden shadow-2xl group border-[8px] border-white">
                            <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" aria-hidden="true" />
                            {/* Standard img tag bypasses Next.js remote domains config requirement */}
                            <img
                                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Modern architectural property in Navi Mumbai showcasing luxury residential lifestyle"
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Decorative floating card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4 border border-gray-100 z-20"
                        >
                            <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center">
                                <span className="font-extrabold text-2xl">15+</span>
                            </div>
                            <div>
                                <p className="text-sm text-brand-paragraph font-medium uppercase tracking-wider">Years of</p>
                                <p className="font-bold text-brand-heading text-lg">Excellence</p>
                            </div>
                        </motion.div>

                        {/* Decorative dots pattern */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:10px_10px] -z-10 opacity-70" aria-hidden="true" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

