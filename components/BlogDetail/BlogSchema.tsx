import { BlogPost } from "./Blogdata";

interface BlogSchemaProps {
    post: BlogPost;
}

const BlogSchema = ({ post }: BlogSchemaProps) => {
    const blogPostSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
            "@type": "Person",
            "name": post.author,
            "jobTitle": post.authorRole || "Author",
            "url": `https://navimumbaipropertydeals.com/author/${post.author.toLowerCase().replace(/\s+/g, "-")}`,
            "sameAs": [
                "https://www.linkedin.com/company/navimumbaipropertydeals",
                "https://twitter.com/navimumbaiproperty"
            ],
            "knowsAbout": ["Real Estate", "Navi Mumbai", "Property Investment"]
        },
        "publisher": {
            "@type": "Organization",
            "name": "Navi Mumbai Property Deals",
            "logo": {
                "@type": "ImageObject",
                "url": "https://navimumbaipropertydeals.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://navimumbaipropertydeals.com/blogs/${post.slug}`
        },
        "description": post.excerpt || post.title
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://navimumbaipropertydeals.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blogs",
                "item": "https://navimumbaipropertydeals.com/blogs"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://navimumbaipropertydeals.com/blogs/${post.slug}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
        </>
    );
};

export default BlogSchema;
