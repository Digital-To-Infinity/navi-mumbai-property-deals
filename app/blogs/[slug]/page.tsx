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
        const b = response.data.data || response.data;
        if (b && (b.id || b.slug)) {
            post = {
                id: b.id,
                slug: b.slug,
                title: b.title,
                excerpt: b.excerpt || (b.content ? b.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''),
                content: b.content,
                date: b.date || new Date(b.created_at || b.createdAt).toLocaleDateString(),
                author: b.author || 'NM Admin',
                authorRole: b.author_role || b.authorRole || 'Editor',
                authorImage: b.author_image || b.authorImage || '',
                category: b.category,
                image: b.cover_image_url || b.coverImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
                readTime: b.read_time || b.readTime || '5 min read',
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
        const blogsData = response.data.data?.blogs || response.data.blogs || response.data.data || [];
        if (Array.isArray(blogsData)) {
            return blogsData.map((post: any) => ({
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
        const b = response.data.data || response.data;
        if (b && (b.id || b.slug)) {
            post = {
                id: b.id,
                slug: b.slug,
                title: b.title,
                excerpt: b.excerpt || (b.content ? b.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : ''),
                content: b.content,
                date: b.date || new Date(b.created_at || b.createdAt).toLocaleDateString(),
                author: b.author || 'NM Admin',
                authorRole: b.author_role || b.authorRole || 'Editor',
                authorImage: b.author_image || b.authorImage || '',
                category: b.category,
                image: b.cover_image_url || b.coverImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
                readTime: b.read_time || b.readTime || '5 min read',
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
