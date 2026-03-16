import { Tag } from "lucide-react";
import { useMemo } from "react";

interface BlogMainContentProps {
    content: string;
    tags: string[];
}

const BlogMainContent = ({ content, tags }: BlogMainContentProps) => {
    // Inject IDs into headers for TOC functionality - memoized for performance
    const contentWithIds = useMemo(() => {
        let processedContent = content;

        // 1. Wrap first paragraph in AI summary / Key Takeaways box
        // This helps Generative Engines (SGE) summarize the article
        let paragraphCount = 0;
        processedContent = processedContent.replace(/<p\b[^>]*>(.*?)<\/p>/i, (match, text) => {
            paragraphCount++;
            if (paragraphCount === 1) {
                return `<section id="quick-summary" class="mb-12">
                    <blockquote class="ai-summary">
                        <span class="block text-brand-primary font-black uppercase tracking-[0.2em] text-[10px] mb-4">Key Takeaways</span>
                        ${text}
                    </blockquote>
                </section>`;
            }
            return match;
        });

        // 2. Inject IDs into headers for TOC functionality - ensure uniqueness
        const seenIds = new Set<string>();
        return processedContent.replace(
            /<h([23456])\b[^>]*>(.*?)<\/h\1>/gi,
            (match, level, text) => {
                const plainText = text.replace(/<\/?[^>]+(>|$)/g, "").toLowerCase().trim();
                let id = plainText.replace(/\s+/g, "-").replace(/[^\w-]/g, "");

                // Handle cases where ID might be empty after sanitization
                if (!id) id = `section-${level}`;

                // Ensure uniqueness
                let uniqueId = id;
                let counter = 1;
                while (seenIds.has(uniqueId)) {
                    uniqueId = `${id}-${counter}`;
                    counter++;
                }
                seenIds.add(uniqueId);

                return `<h${level} id="${uniqueId}">${text}</h${level}>`;
            }
        );
    }, [content]);

    return (
        <div className="flex-1 max-w-3xl">
            <div
                className="max-w-none 
                    [&_h2]:text-brand-heading [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-[24px] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-tight [&_h2]:uppercase [&_h2]:scroll-mt-[82px]
                    [&_h3]:text-brand-heading [&_h3]:font-black [&_h3]:tracking-tight [&_h3]:text-[20px] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:leading-tight [&_h3]:uppercase [&_h3]:scroll-mt-[82px]
                    [&_h4]:text-brand-heading [&_h4]:font-black [&_h4]:tracking-tight [&_h4]:text-[16px] [&_h4]:mt-8 [&_h4]:mb-2 [&_h4]:leading-tight [&_h4]:uppercase [&_h4]:scroll-mt-[82px] [&_h4]:text-brand-primary
                    [&_h5]:text-brand-heading [&_h5]:font-black [&_h5]:tracking-tight [&_h5]:text-[14px] [&_h5]:mt-6 [&_h5]:mb-2 [&_h5]:leading-tight [&_h5]:uppercase [&_h5]:scroll-mt-[82px] [&_h5]:text-brand-primary-hover
                    [&_h6]:text-brand-heading [&_h6]:font-bold [&_h6]:tracking-tight [&_h6]:text-[12px] [&_h6]:mt-4 [&_h6]:mb-1 [&_h6]:leading-tight [&_h6]:uppercase [&_h6]:scroll-mt-[82px] [&_h6]:text-neutral-500
                    [&_p]:text-brand-paragraph [&_p]:leading-[1.8] [&_p]:mb-6 [&_p]:mt-0 [&_p]:text-[18px]
                    [&_strong]:text-brand-heading [&_strong]:font-bold
                    [&_blockquote]:border-l-[6px] [&_blockquote]:border-brand-primary [&_blockquote]:bg-brand-primary/5 [&_blockquote]:py-8 [&_blockquote]:px-10 [&_blockquote]:rounded-r-[2rem] [&_blockquote]:not-italic [&_blockquote]:my-16 [&_blockquote]:text-xl [&_blockquote]:font-medium [&_blockquote]:text-brand-heading/80
                    [&_li]:text-brand-paragraph [&_li]:mb-4 [&_li]:text-[17px] [&_li]:leading-relaxed
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-10 [&_ul]:mt-0 [&_ul]:marker:text-brand-primary
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-10 [&_ol]:mt-0 [&_ol]:marker:text-brand-primary
                    [&_img]:rounded-[2.5rem] [&_img]:my-12 [&_img]:w-full [&_img]:h-[400px] hover:[&_img]:scale-[1.02] [&_img]:transition-transform [&_img]:duration-500
                    [&_a]:text-brand-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:font-bold"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* Tags Section */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-50 text-brand-paragraph text-[14px] font-bold hover:bg-brand-primary/10 hover:text-brand-primary transition-all cursor-default border border-transparent hover:border-brand-primary/20"
                        >
                            <Tag size={12} className="text-brand-primary" />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogMainContent;
