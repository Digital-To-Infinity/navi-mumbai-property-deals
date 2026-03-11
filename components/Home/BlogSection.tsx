"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import { blogPosts as posts } from "../Blog/Blogdata";

export default function BlogSection() {
    return (
        <section className="py-16 bg-brand-white relative overflow-x-clip" aria-labelledby="blog-section-heading">
            {/* Unique Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-20 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#b5a36a]/5 rounded-full blur-[80px]"></div>
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                ></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6"
                    >
                        <BookOpen className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                        <span className="text-brand-primary font-bold uppercase tracking-widest text-xs">Knowledge Hub</span>
                    </motion.div>

                    <motion.h2
                        id="blog-section-heading"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-6xl max-[769px]:text-5xl max-[426px]:text-3xl max-[321px]:text-2xl font-black text-brand-heading leading-tight mb-6"
                    >
                        Insights & <span className="text-brand-primary">Lately News</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-brand-paragraph text-lg max-[321px]:text-base font-medium max-w-4xl mx-auto"
                    >
                        Deep dive into the Navi Mumbai property market with our latest articles, guides, and investment insights verified by regional experts.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => {
                        const blogTitleId = `blog-title-${post.id}`;
                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group h-full"
                            >
                                <article
                                    className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-neutral-100 hover:border-brand-primary/20 h-full flex flex-col transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] relative"
                                    aria-labelledby={blogTitleId}
                                >
                                    {/* Image Wrapper */}
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Category Tag */}
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-brand-primary text-[10px] font-black uppercase tracking-widest shadow-lg border border-white/20">
                                                {post.category}
                                            </span>
                                        </div>
                                        {/* Read Time Overlay */}
                                        <div className="absolute bottom-4 right-4 z-20">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                                                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 max-[426px]:p-6 max-[321px]:p-4 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 mb-5">
                                            <time dateTime={post.date} className="flex items-center gap-1.5 text-brand-paragraph text-xs font-bold bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
                                                <Calendar className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                                                {post.date}
                                            </time>
                                        </div>

                                        <h3 id={blogTitleId} className="text-xl font-extrabold text-brand-heading mb-4 line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors duration-300">
                                            {post.title}
                                        </h3>

                                        <p className="text-brand-paragraph text-[15px] font-medium leading-relaxed mb-8 line-clamp-3 text-gray-500">
                                            {post.excerpt}
                                        </p>

                                        {/* Author & CTA */}
                                        <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3" rel="author">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary/20 to-brand-primary-hover/20 flex items-center justify-center text-brand-primary font-black text-sm border border-brand-primary/10">
                                                    {post.author[0]}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-brand-heading leading-tight">{post.author}</span>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{post.authorRole}</span>
                                                </div>
                                            </div>

                                            <button
                                                className="w-10 h-10 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white group-hover:scale-110 shadow-sm cursor-pointer"
                                                aria-label={`Read full article: ${post.title}`}
                                                title={`Read full article: ${post.title}`}
                                            >
                                                <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Blog CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20"
                >
                    <div className="bg-brand-dark rounded-[40px] p-10 max-[426px]:p-6 max-[376px]:p-4 overflow-hidden relative group border border-white/5">
                        {/* Interactive Background Patterns */}
                        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-brand-primary/10 to-transparent -skew-x-12 translate-x-1/4 pointer-events-none"></div>
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            <div className="lg:col-span-8 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-ping" aria-hidden="true"></div>
                                    <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.2em]">Market Pulse 2026</span>
                                </div>

                                <h3 className="text-3xl md:text-4xl lg:text-5xl !text-brand-white mb-6 leading-[1.15]">
                                    Master Your <span className="text-brand-primary italic">Real Estate</span> Journey
                                </h3>

                                <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-8">
                                    Join thousands of savvy investors and homeowners who receive our data-driven market insights and exclusive Navi Mumbai property guides.
                                </p>

                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/60">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true"></div>
                                        <span className="text-xs font-bold uppercase tracking-widest">Price Trends</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true"></div>
                                        <span className="text-xs font-bold uppercase tracking-widest">Legal Guides</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true"></div>
                                        <span className="text-xs font-bold uppercase tracking-widest">Infra Updates</span>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-4 flex justify-center lg:justify-end">
                                <Link
                                    href="/blogs"
                                    className="w-full group/main-cta relative bg-brand-primary hover:bg-brand-primary-hover p-1 rounded-[24px] transition-all duration-500 overflow-hidden cursor-pointer"
                                    aria-label="Visit full Blog Hub for more insights"
                                    title="Explore our comprehensive Real Estate Blog Hub"
                                >
                                    <div className="bg-brand-dark rounded-[22px] px-6 max-[376px]:px-4 py-4 flex items-center justify-between transition-colors group-hover/main-cta:bg-transparent text-left">
                                        <div className="flex flex-col items-start">
                                            <span className="text-white text-xl max-[376px]:text-lg max-[321px]:text-sm font-black">Explore Full Blog Hub</span>
                                            <span className="text-brand-primary/80 text-xs font-bold uppercase tracking-widest max-[321px]:tracking-wide mt-1 group-hover:text-brand-white">Direct Access to Blogs</span>
                                        </div>
                                        <div className="w-14 max-[321px]:w-10 h-14 max-[321px]:h-10 rounded-2xl bg-brand-primary flex items-center justify-center text-white transition-transform duration-500 group-hover/main-cta:scale-110 group-hover/main-cta:rotate-12">
                                            <ArrowRight className="w-7 max-[321px]:w-5 h-7 max-[321px]:h-5" />
                                        </div>
                                    </div>
                                    {/* Shimmer sweep */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/main-cta:animate-[shimmer_2s_infinite] pointer-events-none"></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

