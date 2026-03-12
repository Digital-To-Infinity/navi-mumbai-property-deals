"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Share2, Check, ChevronRight } from "lucide-react";
import { BlogPost } from "./Blogdata";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.21, 1.11, 0.81, 0.99] as const
        }
    }
};

const BlogCard = ({ post, index }: BlogCardProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = `${window.location.origin}/blogs/${post.id}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.article
            variants={cardVariants}
            whileHover={{ y: -10 }}
            itemScope
            itemType="http://schema.org/BlogPosting"
            className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100/80 hover:border-brand-primary/30 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(186,163,96,0.15)]"
        >
            {/* Publisher Schema (Hidden for SEO) */}
            <div itemProp="publisher" itemScope itemType="https://schema.org/Organization" className="hidden">
                <meta itemProp="name" content="Navi Mumbai Property Deals" />
            </div>

            {/* Image Section */}
            <div className="relative aspect-[16/12] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Glass Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-xl shadow-black/5">
                        <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Share Utility */}
                <button
                    onClick={handleCopyLink}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/40 shadow-xl shadow-black/5 text-brand-heading/60 hover:text-brand-primary transition-all duration-300 group/share overflow-hidden"
                    title="Copy Article Link"
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                            >
                                <Check size={16} className="text-emerald-500" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="share"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="flex items-center gap-2"
                            >
                                <Share2 size={16} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Content Section */}
            <div className="p-4 md:p-6 relative">
                {/* Breadcrumb Micro-component */}
                <div className="flex items-center gap-1.5 mb-3 text-[10px] font-bold text-brand-paragraph/40 uppercase tracking-widest">
                    <span>Hub</span>
                    <ChevronRight size={10} />
                    <span className="text-brand-primary/60">{post.category}</span>
                </div>

                <Link
                    href={`/blogs/${post.id}`}
                    className="block group/title"
                    title={`Read more about ${post.title} | Navi Mumbai Property Market Insights`}
                >
                    <h2 itemProp="headline" className="text-2xl font-black text-brand-heading mb-4 leading-[1.3] group-hover/title:text-brand-primary transition-colors duration-500 line-clamp-2">
                        {post.title}
                    </h2>
                </Link>

                <p itemProp="description" className="text-brand-paragraph/70 text-[15px] mb-6 line-clamp-4 font-medium leading-relaxed">
                    {post.excerpt}
                </p>

                {/* Author Schema */}
                <span itemProp="author" itemScope itemType="https://schema.org/Person" className="hidden">
                    <meta itemProp="name" content={post.author} />
                </span>

                {/* Bottom Section */}
                <div className="pt-6 border-t border-neutral-50/80 space-y-6">
                    {/* Meta info */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center group/meta">
                            <div className="w-8 h-8 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover/meta:bg-brand-primary group-hover/meta:text-white transition-colors duration-500 mr-3">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <span className="text-[12px] font-bold text-brand-paragraph uppercase tracking-wider">
                                <time itemProp="datePublished" dateTime={post.date}>{post.date}</time>
                            </span>
                        </div>
                        <div className="flex items-center group/meta">
                            <div className="w-8 h-8 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover/meta:bg-brand-primary group-hover/meta:text-white transition-colors duration-500 mr-3">
                                <Clock className="w-4 h-4" />
                            </div>
                            <span className="text-[12px] font-bold text-brand-paragraph uppercase tracking-wider">{post.readTime}</span>
                        </div>
                    </div>

                    {/* Full Width Button */}
                    <Link
                        href={`/blogs/${post.id}`}
                        title={`Read Article: ${post.title} - Expert Navi Mumbai Property Market Analysis`}
                        className="group/btn relative w-full flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-primary-hover text-brand-white py-4 px-6 rounded-2xl font-black transition-all duration-500 overflow-hidden"
                    >
                        <span className="relative z-10 text-sm uppercase tracking-widest">Read Article</span>
                        <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-x-0.5 transition-transform" />
                        <div className="absolute inset-0 bg-brand-primary/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
};

export default BlogCard;
