"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";
import { BlogPost, blogPosts } from "./Blogdata";
import BlogSidebar from "./BlogSidebar";
import BlogMainContent from "./BlogMainContent";
import CompanyPromo from "./CompanyPromo";
import { useEffect, useRef, useState } from "react";

interface BlogDetailProps {
    post: BlogPost;
}

const BlogDetail = ({ post }: BlogDetailProps) => {


    const [isPinned, setIsPinned] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const mainContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (mainContentRef.current) {
                const rect = mainContentRef.current.getBoundingClientRect();
                const navbarHeight = 80; // Approximate top-20
                const headerHeight = 60; // Approximate blog header height
                const threshold = navbarHeight + headerHeight;

                // Check if we started the content area
                if (rect.top <= threshold) {
                    setIsPinned(true);
                } else {
                    setIsPinned(false);
                }

                // Check if we hit the bottom of content area
                // We trigger 'isAtBottom' when the bottom of the section is about to leave the "fixed" view area
                const sidebarVisibleHeight = 600; // Estimated height of sidebars
                if (rect.bottom <= threshold + sidebarVisibleHeight) {
                    setIsAtBottom(true);
                } else {
                    setIsAtBottom(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    // Related posts
    const relatedPosts = blogPosts
        .filter(p => p.slug !== post.slug && p.category === post.category)
        .slice(0, 3);

    return (
        <article className="relative min-h-screen bg-white">


            {/* Sticky Navigation / Header */}
            <header className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        href="/blogs"
                        className="flex items-center gap-2 text-sm font-bold text-brand-paragraph hover:text-brand-primary transition-colors group"
                    >
                        <div className="p-2 rounded-xl bg-neutral-50 group-hover:bg-brand-primary/10 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="hidden sm:inline font-black uppercase tracking-wider text-[11px]">Back to Blogs</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-brand-paragraph hover:text-brand-primary transition-all cursor-pointer shadow-sm">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-brand-paragraph hover:text-brand-primary transition-all cursor-pointer shadow-sm">
                            <Bookmark size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative w-full bg-neutral-50/30 py-16 border-b border-neutral-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block text-[11px] font-black uppercase tracking-[0.3em] text-brand-primary mb-6 px-3 py-1 rounded-full bg-brand-primary/10">
                                    {post.category}
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-heading mb-8 leading-[1.1] tracking-tight uppercase"
                            >
                                {post.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-wrap items-center gap-6 py-4"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-black shadow-lg shadow-brand-primary/20">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-brand-heading uppercase tracking-wide">{post.author}</span>
                                        <span className="text-[10px] font-bold text-brand-paragraph/60 uppercase tracking-widest">{post.authorRole || 'Author'}</span>
                                    </div>
                                </div>
                                <div className="h-4 w-px bg-neutral-200 hidden sm:block" />
                                <span className="text-xs font-bold text-brand-paragraph/60 uppercase tracking-widest">{post.date}</span>
                                <div className="h-4 w-px bg-neutral-200 hidden sm:block" />
                                <span className="text-xs font-bold text-brand-paragraph/60 uppercase tracking-widest">{post.readTime}</span>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10"
                            >
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <main className="w-full mx-auto px-12 py-16">
                <div ref={mainContentRef} className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left: Table of Contents */}
                    <div className="hidden lg:block w-60 shrink-0 self-stretch">
                        <BlogSidebar content={post.content} isPinned={isPinned && !isAtBottom} isAtBottom={isAtBottom} />
                    </div>

                    {/* Middle: Main Content */}
                    <div className="flex-1 min-w-0">
                        <BlogMainContent content={post.content} tags={post.tags} />
                    </div>

                    {/* Right: Company Promotion */}
                    <div className="hidden xl:block w-72 shrink-0 self-stretch">
                        <CompanyPromo isPinned={isPinned && !isAtBottom} isAtBottom={isAtBottom} />
                    </div>
                </div>
            </main>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16 bg-neutral-50/50 border-t border-neutral-100 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-16">
                            <div>
                                <h2 className="text-3xl font-black text-brand-heading mb-2 uppercase tracking-tight">Related Blogs</h2>
                                <p className="text-brand-muted font-bold uppercase text-[12px] tracking-[0.2em]">Curated articles from {post.category}</p>
                            </div>
                            <Link href="/blogs" className="text-xs font-black text-brand-primary uppercase tracking-widest hover:underline px-6 py-3 rounded-full bg-brand-primary/5">
                                View All Articles
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {relatedPosts.map((relatedPost, idx) => (
                                <motion.div
                                    key={relatedPost.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100 hover:border-brand-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[9px] font-black text-brand-primary uppercase tracking-widest">
                                                {relatedPost.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-xl font-black text-brand-heading mb-6 line-clamp-2 leading-[1.3] group-hover:text-brand-primary transition-colors uppercase tracking-tight">
                                            <Link href={`/blogs/${relatedPost.slug}`}>{relatedPost.title}</Link>
                                        </h3>
                                        <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
                                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">{relatedPost.date}</span>
                                            <Link href={`/blogs/${relatedPost.slug}`} className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                                                <ArrowLeft className="rotate-180 w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
};


export default BlogDetail;
