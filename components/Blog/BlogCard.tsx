"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, User } from "lucide-react";
import { BlogPost } from "./Blogdata";

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white rounded-[2rem] overflow-hidden border border-neutral-100/80 hover:border-brand-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(var(--brand-primary-rgb),0.1)]"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/11] overflow-hidden group">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-brand-primary text-[10px] font-black uppercase tracking-widest shadow-sm border border-neutral-100">
                        {post.category}
                    </span>
                </div>

                {/* Floating Arrow on Image Hover */}
                <div className="absolute center inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                        <ArrowUpRight className="w-8 h-8" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                <div className="flex items-center gap-4 mb-5 text-[11px] font-black text-brand-paragraph/40 uppercase tracking-wider">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 rounded-full">
                        <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-50 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-brand-primary" />
                        {post.readTime}
                    </div>
                </div>

                <Link href={`/blogs/${post.id}`} className="block">
                    <h2 className="text-2xl font-black text-brand-heading mb-4 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                        {post.title}
                    </h2>
                </Link>

                <p className="text-brand-paragraph text-sm mb-8 line-clamp-3 font-medium leading-relaxed opacity-70">
                    {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-neutral-50">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-primary/10">
                            <div className="w-full h-full bg-brand-primary/5 flex items-center justify-center text-brand-primary">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-black text-brand-heading leading-none mb-1">{post.author}</p>
                            <p className="text-[10px] font-bold text-brand-paragraph/50 uppercase tracking-tighter">{post.authorRole}</p>
                        </div>
                    </div>

                    <Link
                        href={`/blogs/${post.id}`}
                        className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-brand-heading hover:bg-brand-primary hover:text-white transition-all duration-300 group/btn"
                    >
                        <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
};

export default BlogCard;
