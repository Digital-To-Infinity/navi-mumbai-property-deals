"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, BedDouble, Bath, Maximize, ArrowRight, Heart, Sparkles } from "lucide-react";
import { buyProperties as properties } from "./BuyPropertiesdata";

export default function BuySection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            setScrollProgress(progress);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, []);

    // SEO: CollectionPage Schema for Property Listings
    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Verified Residential Properties for Sale in Navi Mumbai",
        "description": "Browse our curated list of RERA verified residential properties for sale across Navi Mumbai's prime locations including Kharghar, Vashi, and Seawoods.",
        "url": "https://navimumbaipropertydeals.com/buy",
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": properties.length,
            "itemListElement": properties.map((prop, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://navimumbaipropertydeals.com/property/${prop.title.toLowerCase().replace(/ /g, '-')}`,
                "name": prop.title
            }))
        }
    };

    return (
        <section className="py-16 bg-[#fdfdfd] overflow-x-clip relative" aria-labelledby="buy-section-heading">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#b5a36a]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 opacity-30 pointer-events-none"></div>

            {/* Distant background patterns */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

            <div className="container mx-auto px-4 mb-14">
                <div className="flex flex-col items-center justify-center gap-8 relative z-10 w-full mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="max-w-4xl text-center mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6 mx-auto"
                        >
                            <Sparkles className="w-4 h-4 text-brand-primary animate-pulse" aria-hidden="true" />
                            <span className="text-brand-primary font-bold tracking-wider uppercase text-[13px] max-[426px]:text-[12px]">Buy Properties</span>
                        </motion.div>

                        <h2 id="buy-section-heading" className="text-6xl max-[769px]:text-5xl max-[426px]:text-4xl max-[321px]:text-3xl font-extrabold text-brand-heading leading-[1.15] tracking-tight mb-6 flex flex-col items-center">
                            <span>Verified Residential Properties</span>
                            <span className="relative inline-block mt-2">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover drop-shadow-sm">Direct From Owners & Builders</span>
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                    className="absolute -bottom-1 left-0 w-full h-3 md:h-4 bg-brand-primary/30 -rotate-1 skew-x-12 z-0 rounded-sm origin-center"
                                ></motion.div>
                            </span>
                        </h2>

                        <p className="text-brand-paragraph text-[17px] md:text-lg font-medium leading-relaxed max-w-4xl mx-auto">
                            Browse Handpicked premium residential real estate listings available for purchase in Kharghar, Vashi, and prime Navi Mumbai nodes. Effortlessly scroll to find spaces that perfectly match your lifestyle and budget.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="relative group">
                    {/* Native Horizontal Scroll Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto no-scrollbar gap-4 md:gap-5 snap-x snap-mandatory px-4 md:px-4 pb-12 pt-4 scroll-smooth"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                        role="list"
                        aria-label="Horizontal list of residential properties for sale"
                    >
                        {properties.map((property, index) => {
                            const propertyTitleId = `buy-title-${property.id}`;
                            return (
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="min-w-[85vw] sm:min-w-[340px] md:min-w-[42%] lg:min-w-[27.5%] flex-shrink-0 snap-center sm:snap-start relative"
                                    role="listitem"
                                >
                                    <article
                                        className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-700 border border-neutral-100/80 hover:border-brand-primary/10 h-full flex flex-col group/card relative"
                                        aria-labelledby={propertyTitleId}
                                    >
                                        {/* Image & Tag */}
                                        <div className="relative h-[240px] overflow-hidden m-2 rounded-[20px] group/image">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-70 group-hover/card:opacity-90 transition-opacity duration-700"></div>
                                            <Image
                                                src={property.image}
                                                alt={`Exterior view of ${property.title} in ${property.location}`}
                                                fill
                                                className="object-cover transform group-hover/image:scale-110 transition-transform duration-1000 ease-in-out"
                                                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 42vw, 28vw"
                                            />
                                            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                                {index === 0 && (
                                                    <span className="bg-brand-primary text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg uppercase tracking-wider flex items-center gap-1.5 w-fit">
                                                        <Sparkles className="w-3 h-3 fill-current" />
                                                        Featured
                                                    </span>
                                                )}
                                                <span className="bg-white/95 backdrop-blur-sm text-brand-heading text-[11px] font-black px-3 py-1.5 rounded-full shadow-sm border border-white/20 uppercase tracking-tighter w-fit">
                                                    {property.tag}
                                                </span>
                                            </div>
                                            <div className="absolute top-3 right-3 z-20">
                                                <button
                                                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-neutral-50 transition-all duration-300 shadow-sm active:scale-95"
                                                    aria-label={`Save ${property.title} to favorites`}
                                                    title={`Save ${property.title} for later`}
                                                >
                                                    <Heart className="w-[18px] h-[18px]" strokeWidth={2} />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-4 left-5 z-20">
                                                <div className="flex flex-col">
                                                    <span className="text-white text-[24px] sm:text-[28px] font-black drop-shadow-lg tracking-tight leading-none" aria-label={`Price: ${property.price}`}>
                                                        {property.price}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-5 pb-5 pt-3 flex-1 flex flex-col justify-between bg-white z-20 relative">
                                            <div>
                                                <h3 id={propertyTitleId} className="text-[19px] sm:text-[20px] font-extrabold text-brand-heading mb-1 group-hover/card:text-brand-primary transition-colors line-clamp-1">
                                                    {property.title}
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-[#888888] text-[13px] font-semibold mb-3">
                                                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#b5a36a]" aria-hidden="true" />
                                                    <span className="truncate">{property.location}</span>
                                                </div>

                                                {/* Property Specs */}
                                                <div className="flex items-center justify-between py-4 border-t border-neutral-50 mb-4 mt-2" role="group" aria-label="Property specifications">
                                                    <div className="flex flex-col items-center justify-center gap-1 w-1/3" title={`${property.beds} Bedrooms`}>
                                                        <div className="h-8 flex items-center justify-center text-brand-primary/70 mb-0.5 group-hover/card:scale-110 transition-transform duration-500">
                                                            <BedDouble className="w-[20px] h-[20px]" strokeWidth={1.5} aria-hidden="true" />
                                                        </div>
                                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">Beds</span>
                                                        <span className="text-[14px] font-extrabold text-brand-heading">{property.beds}</span>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center gap-1 w-1/3 border-x border-neutral-50" title={`${property.baths} Bathrooms`}>
                                                        <div className="h-8 flex items-center justify-center text-brand-primary/70 mb-0.5 group-hover/card:scale-110 transition-transform duration-500">
                                                            <Bath className="w-[20px] h-[20px]" strokeWidth={1.5} aria-hidden="true" />
                                                        </div>
                                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">Baths</span>
                                                        <span className="text-[14px] font-extrabold text-brand-heading">{property.baths}</span>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center gap-1 w-1/3" title={`${property.sqft} Square Feet`}>
                                                        <div className="h-8 flex items-center justify-center text-brand-primary/70 mb-0.5 group-hover/card:scale-110 transition-transform duration-500">
                                                            <Maximize className="w-[18px] h-[18px]" strokeWidth={1.5} aria-hidden="true" />
                                                        </div>
                                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">Sqft</span>
                                                        <span className="text-[14px] font-extrabold text-brand-heading">{property.sqft}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                className="w-full py-4 rounded-[16px] bg-brand-primary text-white text-[15px] font-bold hover:bg-brand-primary-hover transition-all duration-500 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-brand-primary/20 overflow-hidden relative active:scale-[0.98]"
                                                aria-label={`View detailed investment analysis for ${property.title}`}
                                                title={`View detailed investment analysis for ${property.title}`}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                                                <span className="relative flex items-center gap-2">
                                                    Details
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-500" aria-hidden="true" />
                                                </span>
                                            </button>
                                        </div>
                                    </article>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Premium Scroll Progress Indicator - Only visible on screen size <= 426px */}
            <div className="container mx-auto px-4 mb-4 max-w-md max-[426px]:block hidden">
                <div className="relative h-[2px] w-full bg-neutral-200/50 rounded-full overflow-hidden" role="progressbar" aria-valuenow={scrollProgress} aria-valuemin={0} aria-valuemax={100}>
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-brand-primary"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Scroll to explore</span>
                    <span className="text-[11px] font-bold text-brand-primary uppercase tracking-widest">{Math.round(scrollProgress)}%</span>
                </div>
            </div>
        </section>
    );
}


