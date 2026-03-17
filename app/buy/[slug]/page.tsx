import { notFound } from 'next/navigation';
import { buyMegaMenuData } from '@/components/common/Navbar/navData';
import BuySection from '@/components/Home/BuySection';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BuyPropertyPage({ params }: PageProps) {
    const { slug } = await params;
    const allLinks = Object.values(buyMegaMenuData).flat();
    const linkData = allLinks.find(link => link.href === `/buy/${slug}`);

    if (!linkData) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-brand-heading mb-3">
                        {linkData.title}
                    </h1>
                    <p className="text-zinc-600 max-w-3xl text-lg">
                        {linkData.seoTitle}
                    </p>
                </div>

                <BuySection />
            </div>
        </div>
    );
}
