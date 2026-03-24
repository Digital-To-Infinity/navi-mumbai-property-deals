'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { listingProperties, titleToSlug } from '@/components/Listing/listingData';

// Mapping for SEO-optimized labels based on URL slugs
const breadcrumbLabels: Record<string, string> = {
    "buy": "Buy Property",
    "rent": "Rent Property",
    "sell": "Sell Property",
    "blogs": "Blogs",
    "about": "About",
    "contact": "Contact",
    "login": "Login",
    "signup": "Sign Up",
    "add-property": "List Property",
    "flats-for-sale-in-navi-mumbai": "Flats for Sale",
    "apartments-for-sale-in-navi-mumbai": "Apartments for Sale",
    "studio-apartments-for-sale-in-navi-mumbai": "Studio Apartments",
    "independent-houses-for-sale-in-navi-mumbai": "Independent Houses",
    "residential-plots-for-sale-in-navi-mumbai": "Residential Plots",
    "villas-for-sale-in-navi-mumbai": "Luxury Villas",
    "flats-for-rent-in-navi-mumbai": "Rental Flats",
    "apartments-for-rent-in-navi-mumbai": "Apartments for Rent",
    "studio-apartments-for-rent-in-navi-mumbai": "Studio Apartments",
    "independent-house-for-rent-in-navi-mumbai": "Independent Houses",
    "villas-for-rent-in-navi-mumbai": "Private Villas",
    "properties-for-sale-in-vashi-navi-mumbai": "Properties for Sale in Vashi Navi Mumbai",
    "properties-for-sale-in-nerul-navi-mumbai": "Properties for Sale in Nerul Navi Mumbai",
    "properties-for-sale-in-belapur-navi-mumbai": "Properties for Sale in Belapur Navi Mumbai",
    "properties-for-sale-in-kharghar-navi-mumbai": "Properties for Sale in Kharghar Navi Mumbai",
    "properties-for-sale-in-panvel-navi-mumbai": "Properties for Sale in Panvel Navi Mumbai",
    "paying-guest-accommodations-navi-mumbai": "PG & Co-Living",
    "commercial-office-space-for-sale-in-navi-mumbai": "Office Spaces",
    "real-estate-blogs-navi-mumbai": "Expert Blogs",
};

interface BreadcrumbItem {
    label: string;
    href: string;
    active?: boolean;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
    variant?: 'default' | 'minimal';
}

const Breadcrumb = ({ items: customItems, variant = 'default' }: BreadcrumbProps) => {
    const pathname = usePathname();
    const siteUrl = "https://navimumbaipropertydeals.com";

    // Use custom items if provided, otherwise generate from pathname
    let items: BreadcrumbItem[] = [];

    if (customItems) {
        items = customItems;
    } else {
        // Prevent rendering on the home page if no custom items
        if (pathname === '/') return null;

        // Generate dynamic breadcrumbs
        const pathSegments = pathname.split('/').filter(item => item !== '');
        items = [
            { label: "Home", href: "/" },
            ...pathSegments.flatMap((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                const isLast = index === pathSegments.length - 1;

                // SPECIAL LOGIC: Handle root property slugs (e.g., /property-name-category-in-navi-mumbai)
                if (isLast && segment.includes('-in-navi-mumbai')) {
                    const propertyMatch = listingProperties.find(p => segment.startsWith(titleToSlug(p.title) + '-'));
                    if (propertyMatch) {
                        const suffix = segment.replace(titleToSlug(propertyMatch.title) + '-', '');
                        const isRent = suffix.includes('rent');
                        const mode = isRent ? 'rent' : 'buy';
                        const modeLabel = isRent ? 'Rent Property' : 'Buy Property';

                        const categoryLabel = breadcrumbLabels[suffix] ||
                            suffix.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                        // Split into: Mode -> Category -> Property
                        return [
                            { label: modeLabel, href: `/${mode}` },
                            { label: categoryLabel, href: `/${mode}/${suffix}` },
                            { label: propertyMatch.title, href: href, active: true }
                        ];
                    }
                }

                // Default logic
                let label = breadcrumbLabels[segment];
                if (!label) {
                    label = segment
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, l => l.toUpperCase());
                }

                return [{ label, href, active: isLast }];
            })
        ];
    }

    // Schema.org Data for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `${siteUrl}${item.href}`
        }))
    };

    const container = {
        hidden: { opacity: 0, y: -5 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.08 }
        }
    };

    const itemAnim = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    };

    if (variant === 'minimal') {
        return (
            <nav aria-label="Breadcrumb" className="flex items-center text-[11px]">
                <motion.ol
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex items-center space-x-1"
                >
                    {items.map((item, index) => (
                        <motion.li
                            key={item.href + index}
                            variants={itemAnim}
                            className="flex items-center"
                        >
                            {index > 0 && (
                                <ChevronRight className="w-2.5 h-2.5 text-zinc-400 shrink-0" strokeWidth={2.5} />
                            )}

                            <div className="flex items-center">
                                {item.href === '/' ? (
                                    <Link
                                        href="/"
                                        className="flex items-center gap-1 text-zinc-500 hover:text-brand-primary transition-all duration-200"
                                    >
                                        <span className="font-bold text-zinc-500 hover:text-brand-primary uppercase tracking-wider text-[11px]">Home</span>
                                    </Link>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`
                                            text-[11px] font-bold uppercase tracking-wider transition-all duration-300
                                            ${index > 0 ? 'ml-1' : ''}
                                            ${item.active
                                                ? 'text-brand-primary cursor-default pointer-events-none'
                                                : 'text-zinc-500 hover:text-brand-primary'
                                            }
                                        `}
                                        aria-current={item.active ? 'page' : undefined}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        </motion.li>
                    ))}
                </motion.ol>
            </nav>
        );
    }

    return (
        <div className="w-full bg-brand-dark bg-[radial-gradient(circle_at_30%_50%,rgba(186,163,96,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,rgba(186,163,96,0.05)_0%,transparent_50%)] backdrop-blur-md border-b border-white/5 py-3 max-[426px]:py-0 relative z-40 group/breadcrumb overflow-hidden">
            {/* Interactive Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/breadcrumb:translate-x-full transition-transform duration-[2500ms] ease-in-out pointer-events-none" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 max-[426px]:px-2 max-[769px]:py-1 max-[426px]:py-4 flex items-center justify-between">
                <nav aria-label="Breadcrumb" className="flex items-center text-sm">
                    <motion.ol
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex items-center space-x-1 md:space-x-2"
                    >
                        {items.map((item, index) => (
                            <motion.li
                                key={item.href + index}
                                variants={itemAnim}
                                className="flex items-center"
                            >
                                {index > 0 && (
                                    <ChevronRight className="w-4 max-[426px]:w-3.5 h-4 max-[426px]:h-3.5 text-brand-white shrink-0" strokeWidth={3} />
                                )}

                                <div className="flex items-center">
                                    {item.href === '/' ? (
                                        <Link
                                            href="/"
                                            className="flex items-center gap-1.5 text-zinc-500 hover:text-brand-primary-hover transition-all duration-200 group"
                                        >
                                            <Home className="w-3.5 h-3.5 text-brand-white group-hover:text-brand-primary transition-colors duration-200" />
                                            <span className="font-bold hidden text-brand-white sm:inline uppercase tracking-wider text-[12px] group-hover:text-brand-primary transition-colors duration-200">Home</span>
                                        </Link>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`
                                                text-[12px] max-[426px]:text-[11px] max-[376px]:text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 ml-2 max-[426px]:ml-1
                                                ${item.active
                                                    ? 'text-brand-primary cursor-default pointer-events-none'
                                                    : 'text-brand-white hover:text-brand-primary'
                                                }
                                            `}
                                            aria-current={item.active ? 'page' : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            </motion.li>
                        ))}
                    </motion.ol>
                </nav>

                {/* EEAT Signal */}
                <div className="hidden lg:flex items-center gap-3 pr-2 border-l-2 border-brand-white pl-6 ml-6">
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black text-white leading-none">EXPERT VERIFIED</span>
                            <ShieldCheck size={12} className="text-brand-primary" fill="currentColor" fillOpacity={0.1} />
                        </div>
                        <span className="text-[8px] text-zinc-400 font-bold tracking-[0.2em] leading-none mt-1 uppercase">Navi Mumbai Real Estate</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;