"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutHero = () => {
    return (
        <section className="relative w-full h-[65vh] min-h-[550px] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/about-hero-bg.png"
                    alt="About Navi Mumbai Property Deals"
                    fill
                    className="object-cover scale-110 animate-[zoom-in_20s_ease-out_infinite_alternate]"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-brand-white" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 backdrop-blur-xl"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                        </span>
                        <span className="text-brand-primary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                            Establishing Trust Since 2012
                        </span>
                    </motion.div>

                    <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        Crafting Legacies <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover">
                            In Navi Mumbai
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-base md:text-xl text-zinc-300 mb-10 leading-relaxed font-light">
                        We are more than just a real estate agency. We are your dedicated partners in finding not just a property, but a place where your future begins.
                    </p>
                </motion.div>
            </div>

            <style jsx>{`
        @keyframes zoom-in {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
        </section>
    );
};

export default AboutHero;
