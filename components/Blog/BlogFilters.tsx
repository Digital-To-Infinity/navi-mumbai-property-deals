"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, BookOpen, MapPin, BarChart3, Wallet, Filter, Hash, ArrowRight } from "lucide-react";
import { blogPosts } from "./Blogdata";

interface BlogFiltersProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const categories = [
    { name: "All", icon: <TrendingUp size={18} />, color: "from-blue-500 to-indigo-500" },
    { name: "Market Insights", icon: <BarChart3 size={18} />, color: "from-amber-500 to-orange-500" },
    { name: "Buying Guide", icon: <BookOpen size={18} />, color: "from-emerald-500 to-teal-500" },
    { name: "Investment", icon: <Wallet size={18} />, color: "from-rose-500 to-pink-500" },
    { name: "Lifestyle", icon: <MapPin size={18} />, color: "from-violet-500 to-purple-500" },
];

export default function BlogFilters({ activeCategory, setActiveCategory }: BlogFiltersProps) {
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    const getCount = (cat: string) => {
        if (cat === "All") return blogPosts.length;
        return blogPosts.filter(post => post.category === cat).length;
    };

    return (
        <section className="relative py-16 overflow-hidden" aria-label="Blog Filters">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center gap-12">

                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 mb-12 rounded-full bg-zinc-900 text-white border border-white/10 shadow-2xl"
                        >
                            <Hash size={14} className="text-brand-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Navi Mumbai Intelligence</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black text-brand-heading tracking-tight mb-6">
                            Explore by <span className="text-brand-primary italic">Expertise</span>
                        </h2>
                    </div>

                    {/* Desktop Filter Rail */}
                    <div className="relative p-2 bg-zinc-100/50 backdrop-blur-md rounded-[3rem] border border-zinc-200/50 flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.name;
                            const count = getCount(cat.name);

                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => setActiveCategory(cat.name)}
                                    onMouseEnter={() => setHoveredTab(cat.name)}
                                    onMouseLeave={() => setHoveredTab(null)}
                                    className={`relative px-8 py-4 rounded-full transition-all duration-500 group flex items-center gap-3 outline-none cursor-pointer ${isActive ? "text-white" : "text-brand-paragraph hover:text-zinc-900"
                                        }`}
                                >
                                    {/* Active Liquid Pill */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-brand-primary rounded-full shadow-[0_10px_20px_rgba(var(--brand-primary-rgb),0.3)] z-0"
                                            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                                        />
                                    )}

                                    {/* Hover Indicator */}
                                    {hoveredTab === cat.name && !isActive && (
                                        <motion.div
                                            layoutId="hoverPill"
                                            className="absolute inset-0 bg-white shadow-sm rounded-full z-0"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}

                                    <span className="relative z-10 flex items-center gap-3">
                                        <div className={`p-1.5 rounded-lg transition-transform group-hover:rotate-12 ${isActive ? "bg-white/20" : "bg-zinc-200/50"}`}>
                                            {cat.icon}
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-sm font-bold uppercase tracking-wide leading-none">{cat.name}</span>
                                            <span className={`text-[9px] font-black mt-1 uppercase opacity-100 ${isActive ? "text-white" : "text-brand-primary-hover"}`}>
                                                {count} Blogs
                                            </span>
                                        </div>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Interactive Result Count / Reset Button */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-8"
                        >
                            <div className="flex items-center gap-3 text-brand-paragraph font-bold text-xs uppercase tracking-widest">
                                <Filter size={16} className="text-brand-primary" />
                                Showing {getCount(activeCategory)} articles for {activeCategory}
                            </div>

                            {activeCategory !== "All" && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveCategory("All")}
                                    className="flex items-center gap-2 text-[12px] font-black uppercase text-brand-primary border-b-2 border-brand-primary pb-1 cursor-pointer group"
                                >
                                    Clear Selection
                                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}