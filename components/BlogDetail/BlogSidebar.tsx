"use client";
import { useEffect, useState } from "react";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface BlogSidebarProps {
    content: string;
}

const BlogSidebar = ({ content }: BlogSidebarProps) => {

    const [items, setItems] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Extract headers using regex
        const headerRegex = /<h([23])>(.*?)<\/h\1>/g;
        const matches = Array.from(content.matchAll(headerRegex));

        const tocItems = matches.map((match) => {
            const level = parseInt(match[1]);
            const text = match[2].replace(/<\/?[^>]+(>|$)/g, ""); // Strip any nested HTML
            const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
            return { id, text, level };
        });

        setItems(tocItems);

        // Intersection Observer to highlight active item
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        tocItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [content]);

    if (items.length === 0) return null;

    return (
        <aside className="hidden lg:block w-60 shrink-0 h-fit sticky top-32">
            <div className="space-y-6">
                <div>
                    <h3 className="text-[14px] font-black uppercase tracking-[0.2em] !text-brand-primary-hover mb-4">
                        Table of Contents
                    </h3>
                    <nav className="flex flex-col gap-1">
                        {items.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(item.id)?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    });
                                }}
                                className={`
                                    group flex items-start gap-3 py-2 text-base transition-all duration-300
                                    ${item.level === 3 ? "ml-4" : ""}
                                    ${activeId === item.id
                                        ? "text-brand-heading font-bold"
                                        : "text-brand-paragraph font-medium hover:text-brand-heading"
                                    }
                                `}
                            >
                                <span
                                    className={`
                                    mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300
                                    ${activeId === item.id ? "bg-brand-primary scale-125" : "bg-brand-paragraph group-hover:bg-brand-heading"}
                                `}
                                />
                                <span className="leading-tight">{item.text}</span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default BlogSidebar;
