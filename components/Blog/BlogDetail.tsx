"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin, ChevronRight, Tag } from "lucide-react";
import { BlogPost, blogPosts } from "./Blogdata";

interface BlogDetailProps {
    post: BlogPost;
}

const BlogDetail = ({ post }: BlogDetailProps) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Related posts
    const relatedPosts = blogPosts
        .filter(p => p.slug !== post.slug && p.category === post.category)
        .slice(0, 3);

    return (
        <article className="relative min-h-screen bg-white">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-brand-primary z-50 origin-[0%]"
                style={{ scaleX }}
            />

            {/* Sticky Navigation / Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-100 px-4 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        href="/blogs"
                        className="flex items-center gap-2 text-sm font-bold text-brand-paragraph hover:text-brand-primary transition-colors group"
                    >
                        <div className="p-2 rounded-xl bg-neutral-50 group-hover:bg-brand-primary/10 transition-colors">
                            <ArrowLeft size={16} />
                        </div>
                        <span className="hidden sm:inline">Back to Hub</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button className="p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-brand-paragraph transition-all">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-brand-paragraph transition-all">
                            <Bookmark size={18} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-12 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Category & Breadcrumbs */}
                    <div className="flex items-center gap-2 mb-8 text-[12px] font-black uppercase tracking-[0.2em] text-brand-primary">
                        <Link href="/blogs" className="hover:underline">Blog</Link>
                        <ChevronRight size={14} className="text-brand-paragraph" />
                        <span>{post.category}</span>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-heading mb-8 leading-[1.1]"
                    >
                        {post.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-wrap items-center gap-6 mb-12 pb-12 border-b border-neutral-100"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-primary/20">
                                <Image
                                    src={post.authorImage}
                                    alt={post.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-black text-brand-heading">{post.author}</p>
                                <p className="text-[11px] font-bold text-brand-paragraph/60 uppercase tracking-wider">{post.authorRole}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-brand-paragraph/60">
                            <Calendar size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">{post.date}</span>
                        </div>

                        <div className="flex items-center gap-2 text-brand-paragraph/60">
                            <Clock size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">{post.readTime}</span>
                        </div>
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative aspect-[21/10] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-primary/10 mb-20"
                    >
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Content Section */}
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar/Share */}
                        <aside className="lg:w-12 flex lg:flex-col gap-4 order-2 lg:order-1 h-fit sticky top-32">
                            <p className="hidden lg:block text-[10px] font-black text-neutral-300 uppercase vertical-text mb-4">Share Article</p>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-brand-paragraph hover:bg-brand-primary hover:text-white transition-all duration-300 group">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-brand-paragraph hover:bg-[#1DA1F2] hover:text-white transition-all duration-300">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-brand-paragraph hover:bg-[#0077B5] hover:text-white transition-all duration-300">
                                <Linkedin size={18} />
                            </a>
                        </aside>

                        {/* Main Text Content */}
                        <div className="flex-1 order-1 lg:order-2">
                            <div
                                className="prose prose-lg max-w-none prose-headings:text-brand-heading prose-headings:font-black prose-p:text-brand-paragraph prose-p:leading-relaxed prose-strong:text-brand-heading prose-blockquote:border-l-brand-primary prose-blockquote:bg-brand-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-li:text-brand-paragraph"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tags */}
                            <div className="mt-12 pt-12 border-t border-neutral-100 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-50 text-brand-paragraph text-[12px] font-bold hover:bg-brand-primary/10 hover:text-brand-primary transition-colors cursor-default"
                                    >
                                        <Tag size={12} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-24 bg-neutral-50/50 border-t border-neutral-100 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-brand-heading mb-2">Continue Reading</h2>
                                <p className="text-brand-paragraph/60 font-bold uppercase text-[11px] tracking-widest">More from {post.category}</p>
                            </div>
                            <Link href="/blogs" className="text-sm font-black text-brand-primary hover:underline">View All Articles</Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost, idx) => (
                                <motion.div
                                    key={relatedPost.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group bg-white rounded-[2rem] overflow-hidden border border-neutral-100 hover:border-brand-primary/30 transition-all duration-500"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-3">{relatedPost.category}</div>
                                        <h3 className="text-xl font-black text-brand-heading mb-4 line-clamp-2 leading-[1.3] group-hover:text-brand-primary transition-colors">
                                            <Link href={`/blogs/${relatedPost.slug}`}>{relatedPost.title}</Link>
                                        </h3>
                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-50">
                                            <span className="text-[11px] font-bold text-brand-paragraph/40 uppercase tracking-widest">{relatedPost.date}</span>
                                            <Link href={`/blogs/${relatedPost.slug}`} className="text-brand-primary hover:translate-x-1 transition-transform">
                                                <ArrowLeft className="rotate-180 w-5 h-5" />
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
