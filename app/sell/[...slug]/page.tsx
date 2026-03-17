import { notFound } from 'next/navigation';
import { sellPropertyCategories } from '@/components/common/Navbar/navData';
import SaleSection from '@/components/Home/SaleSection';

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function SellPropertyPage({ params }: PageProps) {
    const { slug } = await params;
    const allLinks = Object.values(sellPropertyCategories).flat();

    // The user's requested URL structure is /sell/[userType]/[category]/[slug]
    // which results in slug array: [userType, category, actualSlug]
    // Or for blogs: [actualSlug]

    const linkData = allLinks.find(link => {
        // For blogs and articles, link.href is currently the full path like '/sell/real-estate-blogs-...'
        if (link.href.startsWith('/sell/')) {
            return link.href === `/sell/${slug.join('/')}`;
        }
        // For property categories, link.href is just the final slug part
        return link.href === slug[slug.length - 1];
    });

    if (!linkData) {
        notFound();
    }

    // Determine type and category if present
    const userType = slug.length >= 3 ? slug[0] : null;
    const category = slug.length >= 3 ? slug[1] : null;

    return (
        <div className="min-h-screen pt-24">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    {userType && (
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                {userType}
                            </span>
                            <span className="text-zinc-400">/</span>
                            <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                {category}
                            </span>
                        </div>
                    )}
                    <h1 className="text-4xl font-extrabold text-brand-heading mb-3">
                        {linkData.title}
                    </h1>
                    <p className="text-zinc-600 max-w-3xl text-lg">
                        {linkData.seoTitle}
                    </p>
                </div>

                <SaleSection />
            </div>
        </div>
    );
}
