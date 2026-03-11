"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, BookOpen, MapPin, BarChart3, Wallet, X } from "lucide-react";
import { blogPosts } from "./Blogdata";

interface BlogFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const BlogFilters = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }: BlogFiltersProps) => {
    // Generate categories dynamically from data
    const categories = [
        { name: "All", icon: <TrendingUp className="w-4 h-4" /> },
        { name: "Market Insights", icon: <BarChart3 className="w-4 h-4" /> },
        { name: "Buying Guide", icon: <BookOpen className="w-4 h-4" /> },
        { name: "Investment", icon: <Wallet className="w-4 h-4" /> },
        { name: "Lifestyle", icon: <MapPin className="w-4 h-4" /> },
    ];

    const getCount = (cat: string) => {
        if (cat === "All") return blogPosts.length;
        return blogPosts.filter(post => post.category === cat).length;
    };

    return (
        <div className="space-y-12">
            {/* Search Bar Section */}
            <div className="relative max-w-3xl mx-auto group">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                >
                    <div className="absolute inset-0 bg-brand-primary/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center bg-white p-2 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-neutral-100 group-focus-within:border-brand-primary/30 transition-all duration-300">
                        <div className="flex-1 relative flex items-center">
                            <Search className="absolute left-6 w-6 h-6 text-brand-paragraph/30 group-focus-within:text-brand-primary transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search market insights, area guides, or investment tips..."
                                className="w-full pl-16 pr-4 py-5 rounded-2xl text-brand-heading font-medium focus:outline-none placeholder:text-brand-paragraph/25 bg-transparent text-lg"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="p-2 mr-2 hover:bg-neutral-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-brand-paragraph/40" />
                                </button>
                            )}
                        </div>
                        <button className="hidden md:flex px-10 py-5 bg-brand-primary text-white font-black rounded-2xl hover:bg-brand-primary-hover transition-all duration-300 shadow-xl shadow-brand-primary/25 items-center gap-2 group/btn">
                            Search
                            <Search className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>
                </motion.div>

                {/* Trending Tags/Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 flex flex-wrap justify-center gap-6 items-center"
                >
                    <span className="text-[11px] font-black text-brand-paragraph/30 uppercase tracking-widest leading-none">Popular Topics:</span>
                    {["Kharghar", "ROI 2026", "Green Homes", "Ulwe News"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="text-xs font-bold text-brand-paragraph/50 hover:text-brand-primary transition-colors flex items-center gap-1.5"
                        >
                            <span className="w-1 h-1 rounded-full bg-brand-primary/40" />
                            {tag}
                        </button>
                    ))}
                </motion.div>
            </div>

            {/* Premium Categories Grid */}
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-5 gap-4"
                >
                    {categories.map((cat, idx) => {
                        const isActive = activeCategory === cat.name;
                        const count = getCount(cat.name);

                        return (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`group relative p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 overflow-hidden ${isActive
                                    ? "bg-brand-primary border-brand-primary shadow-xl shadow-brand-primary/20 -translate-y-1"
                                    : "bg-white border-neutral-100 hover:border-brand-primary/20 hover:shadow-lg hover:-translate-y-1"
                                    }`}
                            >
                                {/* Background Ornament */}
                                <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full blur-3xl transition-opacity duration-500 ${isActive ? "bg-white/10 opacity-100" : "bg-brand-primary/5 opacity-0 group-hover:opacity-100"
                                    }`} />

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? "bg-white text-brand-primary" : "bg-neutral-50 text-brand-paragraph/40 group-hover:text-brand-primary group-hover:bg-brand-primary/5"
                                    }`}>
                                    {cat.icon}
                                </div>
                                <div className="text-center">
                                    <p className={`text-sm font-black transition-colors ${isActive ? "text-white" : "text-brand-heading group-hover:text-brand-primary"
                                        }`}>
                                        {cat.name}
                                    </p>
                                    <p className={`text-[10px] font-bold uppercase tracking-tighter mt-0.5 transition-colors ${isActive ? "text-white/60" : "text-brand-paragraph/40"
                                        }`}>
                                        {count} {count === 1 ? "Article" : "Articles"}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </motion.div>
            </div>

            {/* Results Indicator */}
            {(searchQuery || activeCategory !== "All") && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center items-center gap-4 text-sm font-bold text-brand-paragraph/60 bg-neutral-50 py-3 px-6 rounded-full w-fit mx-auto"
                >
                    <span>Showing results for</span>
                    <div className="flex gap-2">
                        {activeCategory !== "All" && (
                            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-md text-xs">{activeCategory}</span>
                        )}
                        {searchQuery && (
                            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-md text-xs">"{searchQuery}"</span>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default BlogFilters;
