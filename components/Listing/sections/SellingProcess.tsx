"use client";
import { motion } from 'framer-motion';
import { ClipboardCheck, Camera, Megaphone, Handshake, ShieldCheck, Banknote, ArrowRight } from 'lucide-react';

const steps = [
    {
        title: "Free Property Valuation",
        description: "Get a data-backed valuation for your property based on recent sales in your node.",
        icon: ClipboardCheck,
        color: "bg-blue-500/10",
        iconColor: "text-blue-600"
    },
    {
        title: "Professional Media",
        description: "We help you capture high-quality photos and videos to make your listing stand out.",
        icon: Camera,
        color: "bg-purple-500/10",
        iconColor: "text-purple-600"
    },
    {
        title: "Verified Listing",
        description: "Your property gets a 'Verified' badge after a quick document check, boosting trust.",
        icon: ShieldCheck,
        color: "bg-green-500/10",
        iconColor: "text-green-600"
    },
    {
        title: "Strategic Marketing",
        description: "We push your listing to our network of 50,000+ active buyers and HNI investors.",
        icon: Megaphone,
        color: "bg-orange-500/10",
        iconColor: "text-orange-600"
    },
    {
        title: "Buyer Negotiations",
        description: "Receive and manage offers through our transparent portal. No hidden brokerage.",
        icon: Handshake,
        color: "bg-[#baa360]/10",
        iconColor: "text-[#baa360]"
    },
    {
        title: "Smooth Closing",
        description: "End-to-end support for documentation, legalities, and secure payment transfer.",
        icon: Banknote,
        color: "bg-teal-500/10",
        iconColor: "text-teal-600"
    }
];

export default function SellingProcess() {
    return (
        <section className="py-16 bg-white relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#baa360]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-48 -mb-48" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-brand-primary/5 border border-brand-primary/20 shadow-sm backdrop-blur-sm">
                            <div className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-100"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                            </div>
                            <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">6-Step Success Framework</span>
                        </div>
                    </motion.div>

                    <div className="max-w-4xl relative">
                        {/* Decorative Gradient Glow */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-4xl sm:text-6xl font-black text-brand-heading tracking-tighter leading-[1.05] mb-8"
                        >
                            Selling Your Property <br />
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-[#8f7b44] to-brand-primary bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                                    Faster & Better
                                </span>
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8, duration: 1.2 }}
                                    className="absolute -bottom-2 left-0 h-[8px] bg-brand-primary/20 -z-0 rounded-full"
                                ></motion.span>
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="text-brand-paragraph text-xl font-medium max-w-3xl mx-auto leading-relaxed"
                        >
                            Our technology-driven approach ensures your asset is positioned to attract the right buyers at the best possible price in Navi Mumbai.
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-[32px] bg-white border border-brand-muted/20 shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl font-black text-brand-muted/20 group-hover:text-[#baa360]/10 transition-colors">0{index + 1}</span>
                                <h3 className="text-xl font-bold text-brand-heading">{step.title}</h3>
                            </div>
                            <p className="text-brand-paragraph font-medium leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 flex flex-col items-center"
                >
                    <button
                        className="relative group px-10 py-4 rounded-full overflow-hidden text-white text-[14px] 
                                   font-black uppercase tracking-widest transition-all duration-500 hover:scale-[1.05] 
                                   active:scale-[0.98] shadow-[0_8px_24px_rgba(186,163,96,0.35)] 
                                   hover:shadow-[0_12px_48px_rgba(186,163,96,0.5)] cursor-pointer"
                        style={{
                            background: "linear-gradient(135deg, #baa360 0%, #8f7b44 100%)",
                        }}
                    >
                        {/* Shimmer sweep */}
                        <span
                            className="absolute inset-0 -translate-x-full
                                       bg-gradient-to-r from-transparent via-white/30 to-transparent
                                       group-hover:translate-x-full transition-transform duration-[1200ms] ease-in-out
                                       pointer-events-none"
                            aria-hidden="true"
                        />
                        <span className="relative z-10 flex items-center gap-3">
                            List Your Property for Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" aria-hidden="true" />
                        </span>
                    </button>
                    <p className="mt-4 text-brand-paragraph font-extrabold text-sm uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        Trusted by 2,500+ Owners in Navi Mumbai
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
