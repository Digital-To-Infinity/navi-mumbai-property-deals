"use client";
import React from "react";
import BlogCard from "./BlogCard";
import { blogPosts } from "./Blogdata";
import { SearchX, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogGridProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const BlogGrid = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }: BlogGridProps) => {
    const [activeTab, setActiveTab] = React.useState("Latest");

    // Filtering logic
    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <section id="blog-posts" className="py-24 bg-neutral-50/30 min-h-[600px] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                        >
                            Curated Knowledge
                        </motion.span>
                        <h2 className="text-3xl md:text-5xl font-black text-brand-heading mb-6 tracking-tight leading-tight">
                            Latest <span className="text-brand-primary">Insights</span>
                        </h2>
                        <p className="text-brand-paragraph font-medium text-lg opacity-70">
                            Stay updated with the latest trends, area spotlights, and property investment guides in Navi Mumbai.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                        {["Latest", "Popular", "Trending"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-xl text-sm font-black transition-all duration-300 ${activeTab === tab
                                    ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20"
                                    : "text-brand-paragraph/40 hover:text-brand-primary hover:bg-brand-primary/5"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {filteredPosts.length > 0 ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {filteredPosts.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-32 text-center"
                        >
                            <div className="w-24 h-24 bg-neutral-100 rounded-[2.5rem] flex items-center justify-center mb-8">
                                <SearchX className="w-10 h-10 text-brand-paragraph/20" />
                            </div>
                            <h3 className="text-2xl font-black text-brand-heading mb-3">No articles found</h3>
                            <p className="text-brand-paragraph font-medium max-w-sm mb-10 opacity-60">
                                We couldn't find any results matching "{searchQuery || activeCategory}". Try adjusting your filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveCategory("All");
                                }}
                                className="flex items-center gap-2 text-brand-primary font-black group px-6 py-3 rounded-xl hover:bg-brand-primary/5 transition-colors"
                            >
                                Clear all filters
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Load More - Only show if enough posts and not searching/filtering? */}
                {filteredPosts.length > 0 && (
                    <div className="mt-24 text-center">
                        <button className="group relative px-14 py-6 bg-white border border-neutral-200 text-brand-heading font-black rounded-[2rem] hover:border-brand-primary hover:text-brand-primary transition-all duration-500 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
                            <span className="relative z-10 flex items-center gap-3">
                                Discover More Stories
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogGrid;
