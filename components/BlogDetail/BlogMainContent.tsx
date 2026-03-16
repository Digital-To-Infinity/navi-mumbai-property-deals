import { Tag } from "lucide-react";

interface BlogMainContentProps {
    content: string;
    tags: string[];
}

const BlogMainContent = ({ content, tags }: BlogMainContentProps) => {
    // Inject IDs into headers for TOC functionality
    const contentWithIds = content.replace(
        /<h([23])>(.*?)<\/h\1>/g,
        (match, level, text) => {
            const id = text.replace(/<\/?[^>]+(>|$)/g, "").toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            return `<h${level} id="${id}">${text}</h${level}>`;
        }
    );

    return (
        <div className="flex-1 max-w-3xl">
            <div
                className="max-w-none 
                    [&_h2]:text-brand-heading [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-[24px] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-tight [&_h2]:uppercase
                    [&_h3]:text-brand-heading [&_h3]:font-black [&_h3]:tracking-tight [&_h3]:text-[20px] [&_h3]:mt-14 [&_h3]:mb-4 [&_h3]:leading-tight [&_h3]:uppercase
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
            <div className="mt-12 pt-8 border-t border-neutral-100">
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
