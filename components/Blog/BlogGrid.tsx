"use client";
import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { blogPosts } from "../BlogDetail/Blogdata";
import { SearchX, ArrowRight, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import { BlogPost } from "../BlogDetail/Blogdata";

interface BlogGridProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const BlogGrid = ({ searchQuery, setSearchQuery, activeCategory, setActiveCategory }: BlogGridProps) => {

    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [popularBlogs, setPopularBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularBlogs = async () => {
            try {
                const response = await api.get('/blogs', {
                    params: { featured: true, limit: 3 }
                });
                const data = response.data.data?.blogs || response.data.blogs || response.data.data || [];
                if (Array.isArray(data)) {
                    const normalized = data.map((b: any) => ({
                        id: b.id,
                        slug: b.slug,
                        title: b.title,
                        excerpt: b.excerpt || (b.content ? b.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''),
                        content: b.content,
                        date: b.date || new Date(b.created_at || b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        author: b.author || 'NM Admin',
                        authorRole: b.author_role || b.authorRole || 'Editor',
                        authorImage: b.author_image || b.authorImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
                        category: b.category,
                        image: b.cover_image_url || b.coverImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
                        readTime: b.read_time || b.readTime || '5 min read',
                        tags: b.tags || []
                    }));
                    setPopularBlogs(normalized);
                }
            } catch (error) {
                console.error("Failed to fetch popular blogs:", error);
            }
        };
        fetchPopularBlogs();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await api.get('/blogs', {
                    params: {
                        category: activeCategory === 'All' ? undefined : activeCategory,
                        search: searchQuery || undefined
                    }
                });
                
                const data = response.data.data?.blogs || response.data.blogs || response.data.data || [];
                
                if (Array.isArray(data)) {
                    const normalized = data.map((b: any) => ({
                        id: b.id,
                        slug: b.slug,
                        title: b.title,
                        excerpt: b.excerpt || (b.content ? b.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''),
                        content: b.content,
                        date: b.date || new Date(b.created_at || b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                        author: b.author || 'NM Admin',
                        authorRole: b.author_role || b.authorRole || 'Editor',
                        authorImage: b.author_image || b.authorImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
                        category: b.category,
                        image: b.cover_image_url || b.coverImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
                        readTime: b.read_time || b.readTime || '5 min read',
                        tags: b.tags || []
                    }));
                    setBlogs(normalized);
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchBlogs, 300);
        return () => clearTimeout(debounce);
    }, [activeCategory, searchQuery]);

    const filteredPosts = blogs;

    return (
        <section id="blog-posts" className="bg-white py-16 relative overflow-hidden">
            {/* Animated Background Accents */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, -90, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"
            />

            <div className="container mx-auto px-4 relative z-10">
                <AnimatePresence mode="wait">
                    {filteredPosts.length > 0 ? (
                        <motion.div
                            key={activeCategory + searchQuery}
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0, y: 20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                        >
                            {filteredPosts.map((post, index) => (
                                <BlogCard key={post.id} post={post} index={index} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center py-16 text-center"
                        >
                            <div className="relative mb-10">
                                <div className="absolute inset-0 bg-brand-primary/10 rounded-full blur-2xl animate-pulse" />
                                <div className="relative w-28 h-28 bg-white border border-neutral-100 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-black/5">
                                    <SearchX className="w-12 h-12 text-brand-primary/40" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-brand-heading mb-4">No results found</h3>
                            <p className="text-brand-paragraph font-medium max-w-sm mb-12 opacity-60 leading-relaxed">
                                We couldn't find any articles matching "{searchQuery || activeCategory}". Try broadening your search or choosing another category.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveCategory("All");
                                }}
                                className="group relative flex items-center gap-3 bg-brand-heading text-white px-8 py-4 rounded-2xl font-black hover:bg-brand-primary transition-all duration-500 shadow-xl shadow-black/10 hover:shadow-brand-primary/20 mb-20"
                            >
                                Reset All Filters
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="w-full pt-20 border-t border-neutral-100/50">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <Flame size={20} className="animate-pulse" />
                                    </div>
                                    <h4 className="text-2xl font-black text-brand-heading">
                                        Most Popular <span className="text-brand-primary italic">Insights</span>
                                    </h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                                     {popularBlogs.map((post, index) => (
                                         <BlogCard key={`popular-${post.id}`} post={post} index={index} />
                                     ))}
                                 </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Load More Button */}
                {filteredPosts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-px h-20 bg-gradient-to-b from-brand-primary/0 via-brand-primary/20 to-brand-primary/0" />

                        <button className="group relative cursor-pointer">
                            <div className="absolute inset-0 bg-brand-primary/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative px-16 py-4 bg-white border-2 border-neutral-100 text-brand-heading font-bold rounded-[2rem] group-hover:border-brand-primary group-hover:text-brand-primary transition-all duration-500 shadow-sm overflow-hidden flex items-center gap-4">
                                <span className="relative z-10 text-[15px] uppercase tracking-widest">
                                    More Blogs
                                </span>
                                <div className="relative w-7 h-7 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                                <div className="absolute inset-0 bg-brand-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                            </div>
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};


export default BlogGrid;
