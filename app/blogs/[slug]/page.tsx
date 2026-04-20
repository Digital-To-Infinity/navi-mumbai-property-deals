import { BlogPost } from "@/components/BlogDetail/Blogdata";
import BlogDetail from "@/components/BlogDetail/BlogDetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import api from "@/lib/api";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    let post: BlogPost | null = null;
    
    try {
        const response = await api.get(`/blogs/slug/${slug}`);
        if (response.data) {
            const b = response.data.data;
            post = {
                id: b.id,
                slug: b.slug,
                title: b.title,
                excerpt: b.excerpt || '',
                content: b.content,
                date: b.date || new Date(b.created_at).toLocaleDateString(),
                author: b.author,
                authorRole: b.author_role,
                authorImage: b.author_image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
                category: b.category,
                image: b.cover_image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
                readTime: b.read_time || '5 min read',
                tags: b.tags || []
            };
        }
    } catch (error) {
        console.error("Metadata fetch error:", error);
    }

    if (!post) {
        return {
            title: "Article Not Found | Navi Mumbai Property Deals",
        };
    }

    return {
        title: `${post.title} | Navi Mumbai Property Deals`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            type: "article",
            authors: [post.author],
            publishedTime: post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export async function generateStaticParams() {
    try {
        const response = await api.get('/blogs?limit=100');
        if (response.data?.blogs) {
            return response.data.blogs.map((post: any) => ({
                slug: post.slug,
            }));
        }
    } catch (error) {
        console.error("Static params fetch error:", error);
    }
    return [];
}

export default async function BlogPage({ params }: Props) {
    const { slug } = await params;
    let post: BlogPost | null = null;

    try {
        const response = await api.get(`/blogs/slug/${slug}`);
        if (response.data) {
            const b = response.data.data;
            post = {
                id: b.id,
                slug: b.slug,
                title: b.title,
                excerpt: b.excerpt || '',
                content: b.content,
                date: b.date || new Date(b.created_at).toLocaleDateString(),
                author: b.author,
                authorRole: b.author_role,
                authorImage: b.author_image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
                category: b.category,
                image: b.cover_image_url || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
                readTime: b.read_time || '5 min read',
                tags: b.tags || []
            };
        }
    } catch (error) {
        console.error("Blog page fetch error:", error);
    }

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <BlogDetail post={post} />
        </main>
    );
}
