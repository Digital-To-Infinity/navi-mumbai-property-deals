import { notFound } from 'next/navigation';
import { buyMegaMenuData, rentMegaMenuData } from '@/components/common/Navbar/navData';
import BuySection from '@/components/Home/BuySection';
import RentSection from '@/components/Home/RentSection';
import PropertyDetails from '@/components/PropertyDetail/PropertyDetails';
import { listingProperties, titleToSlug } from '@/components/Listing/listingData';
import { Metadata } from 'next';
import PropertySchema from '@/components/PropertyDetail/PropertySchema';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const allLinks = [...Object.values(buyMegaMenuData).flat(), ...Object.values(rentMegaMenuData).flat()];
    const dynamicSuffixes = allLinks
        .map(link => link.href.split('/').pop() || '')
        .filter(segment => segment.includes('-in-navi-mumbai'));

    const propertySlugs = listingProperties.flatMap(p => {
        const base = titleToSlug(p.title);
        const slugs = [
            base + '-flats-for-sale-in-navi-mumbai',
            base + '-studio-apartments-for-rent-in-navi-mumbai',
            base + '-properties-for-sale-in-navi-mumbai',
            base + '-properties-for-rent-in-navi-mumbai'
        ];

        dynamicSuffixes.forEach(suffix => {
            slugs.push(`${base}-${suffix}`);
        });

        return slugs;
    });

    const staticSlugs = ['buy', 'rent', 'sale'];
    const uniqueSlugs = Array.from(new Set([...propertySlugs, ...staticSlugs]));

    return uniqueSlugs.map(slug => ({
        slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const baseUrl = 'https://navimumbaipropertydeals.com';
    const url = `${baseUrl}/${slug}`;

    const property = listingProperties.find(p => {
        const prefix = titleToSlug(p.title) + '-';
        return slug.startsWith(prefix) && slug.includes('-in-navi-mumbai');
    });

    if (property) {
        const title = `${property.bhk} ${property.propertyType} for Sale in ${property.location} | Verified Listing`;
        const description = `Buy this RERA verified ${property.bhk} ${property.propertyType} at ${property.location}, Navi Mumbai. Area: ${property.area}, Price: ${property.price}. Features ${property.amenities.length}+ amenities and premium connectivity.`;

        return {
            title,
            description,
            alternates: { canonical: url },
            openGraph: {
                title,
                description,
                url,
                siteName: 'Navi Mumbai Property Deals',
                images: [{ url: property.image, width: 1200, height: 630, alt: `${property.title} - ${property.location}` }],
                locale: 'en_IN',
                type: 'article',
                section: 'Real Estate',
                tags: ['Real Estate', property.location, property.bhk, 'Navi Mumbai'],
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [property.image],
                creator: '@NaviMumbaiDeals',
            },
            keywords: [
                `${property.bhk} in ${property.location}`,
                `${property.propertyType} for sale in Navi Mumbai`,
                `2 BHK flats in Navi Mumbai`,
                `verified property listings ${property.location}`,
                `${property.builder} projects in Navi Mumbai`,
                `ready to move flats in ${property.location}`
            ],
            other: {
                'format-detection': 'telephone=no',
                'geo.region': 'IN-MH',
                'geo.placename': property.location,
            }
        };
    }

    const titleText = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const title = `${titleText} in Navi Mumbai | Exclusive Real Estate Deals`;
    return {
        title,
        description: `Browse verified ${titleText.toLowerCase()} across Navi Mumbai. Get direct builder prices, transparent deals, and expert assistance.`,
        alternates: { canonical: url },
        openGraph: { title, url, type: 'website' }
    };
}


export default async function DynamicPropertyPage({ params }: PageProps) {
    const { slug } = await params;
    const decodedSlug = `/${slug}`;

    const matchingProperty = listingProperties.find(p => {
        const prefix = titleToSlug(p.title) + '-';
        return slug.startsWith(prefix) && slug.includes('-in-navi-mumbai');
    });

    if (matchingProperty) {
        return (
            <article className="overflow-x-hidden">
                <PropertySchema property={matchingProperty} slug={slug} />
                <PropertyDetails property={matchingProperty} slug={slug} />
            </article>
        );
    }


    const allLinks = [...Object.values(buyMegaMenuData).flat(), ...Object.values(rentMegaMenuData).flat()];
    const linkData = allLinks.find(link => link.href === decodedSlug);
    if (!linkData && !['buy', 'rent', 'sale'].includes(slug)) notFound();

    const title = linkData?.title || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <section className="min-h-screen pt-24">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-brand-heading mb-4 leading-tight">
                        {title} in Navi Mumbai
                    </h1>
                    <p className="text-zinc-600 max-w-2xl text-lg">
                        Explore verified {title.toLowerCase()} listings. Updated daily with market-exclusive deals and builder-direct offers.
                    </p>
                </header>
                <div className="mt-12">
                    {decodedSlug.includes('sale') || decodedSlug.includes('buy') ? (
                        <BuySection />
                    ) : decodedSlug.includes('rent') ? (
                        <RentSection />
                    ) : (
                        <BuySection />
                    )}
                </div>
            </div>
        </section>
    );
}


