"use client";
import { motion } from "framer-motion";
import { Laugh, Lightbulb, Home, Quote, Sparkles } from "lucide-react";

const items = [
    {
        icon: <Laugh className="w-8 h-8 text-brand-primary" />,
        title: "The Real Estate Paradox",
        tag: "Funny Logic",
        text: "Why do we park on driveways and drive on parkways? At Navi Mumbai Property Deals, we just make sure your driveway is actually long enough for your car (and your dreams).",
        color: "from-blue-500/20 to-indigo-500/20",
        iconBg: "bg-blue-500/10"
    },
    {
        icon: <Lightbulb className="w-8 h-8 text-brand-primary" />,
        title: "The Golden Rule",
        tag: "Pro Tip",
        text: "The best time to buy a house was 20 years ago. The second best time is today. Don't wait to buy real estate, buy real estate and then wait!",
        color: "from-amber-500/20 to-orange-500/20",
        iconBg: "bg-amber-500/10"
    },
    {
        icon: <Home className="w-8 h-8 text-brand-primary" />,
        title: "House Hunting vs Dating",
        tag: "Metaphor",
        text: "House hunting is like dating. You see many 'potential' matches until you find 'The One'. Think of us as your expert matchmakers with better floor plans!",
        color: "from-emerald-500/20 to-teal-500/20",
        iconBg: "bg-emerald-500/10"
    }
];

function Card({ item, index }: { item: typeof items[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: "circOut" }}
            className="relative h-full"
        >
            <div
                className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-neutral-100 shadow-[0_10px_50px_-20px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_-30px_rgba(186,163,96,0.3)] hover:-translate-y-3 transition-all duration-500 group h-full relative overflow-hidden"
            >
                {/* Background Gradient Blob */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${item.color}`} />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                            {item.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary/40 group-hover:text-brand-primary transition-colors">
                            0{index + 1}
                        </span>
                    </div>

                    <div className="inline-block px-3 py-1 rounded-full bg-neutral-50 border border-neutral-100 mb-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                            {item.tag}
                        </span>
                    </div>

                    <h3 className="text-2xl font-black text-brand-heading mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                        {item.title}
                    </h3>

                    <p className="text-brand-paragraph text-base font-medium leading-relaxed mb-6 group-hover:text-brand-heading/80 transition-colors">
                        {item.text}
                    </p>
                </div>

                {/* Decorative Quote Mark */}
                <Quote className="absolute -bottom-4 -right-4 w-24 h-24 text-brand-primary/30 -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700" />
            </div>
        </motion.div>
    );
}

export default function ShortBreak() {
    return (
        <section className="py-16 bg-[#fafafa] relative overflow-hidden">
            {/* Ultra-premium background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4" />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #b5a36a 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-white shadow-sm border border-neutral-100 mb-8"
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-white bg-brand-primary/20 flex items-center justify-center overflow-hidden">
                                    <Sparkles className="w-3 h-3 text-brand-primary" />
                                </div>
                            ))}
                        </div>
                        <span className="text-brand-primary font-bold uppercase tracking-[0.15em] text-[10px]">Short & Sweet</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-black text-brand-heading mb-8 tracking-tight leading-[1.1]">
                        Pause for a <span className="relative">
                            <span className="relative z-10 italic text-brand-primary">Lighter</span>
                            <motion.svg
                                viewBox="0 0 200 20"
                                className="absolute -bottom-2 left-0 w-full h-4 text-brand-primary/20 fill-current"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            >
                                <path d="M0,10 Q50,0 100,10 T200,10" stroke="#b5a36a" strokeWidth="4" fill="none" />
                            </motion.svg>
                        </span> Moment
                    </h2>

                    <p className="text-brand-paragraph text-lg md:text-xl font-medium max-w-3xl mx-auto opacity-70">
                        Because finding your dream home shouldn't be stressful. Here's a quick break before you dive back into your search.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {items.map((item, index) => (
                        <Card key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
