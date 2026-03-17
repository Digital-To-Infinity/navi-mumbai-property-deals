import { notFound } from 'next/navigation';
import { rentMegaMenuData } from '@/components/common/Navbar/navData';
import RentSection from '@/components/Home/RentSection';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function RentPropertyPage({ params }: PageProps) {
    const { slug } = await params;
    const allLinks = Object.values(rentMegaMenuData).flat();
    const linkData = allLinks.find(link => link.href === `/rent/${slug}`);

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

                <RentSection />
            </div>
        </div>
    );
}
