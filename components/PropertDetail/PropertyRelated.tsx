"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { listingProperties, type ListingProperty } from '../Listing/listingData';
import PropertyCard from '../Listing/sections/PropertyCard';
import { usePathname } from 'next/navigation';

interface Props {
    property: ListingProperty;
}

export default function PropertyRelated({ property }: Props) {
    const pathname = usePathname();
    const mode = pathname.includes('rent') ? 'rent' : 'buy';

    // Advanced filtering for related properties:
    const related = React.useMemo(() => {
        return listingProperties
            .filter(p => p.id !== property.id) // Exclude current property
            .filter(p => {
                // Same property type is a strong match
                const sameType = p.propertyType === property.propertyType;
                // Same location or same BHK configuration
                const sameLocation = p.location === property.location;
                const sameBhk = p.configuration === property.configuration;
                
                return sameType && (sameLocation || sameBhk);
            })
            // Sort by featured first, then by location match
            .sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                if (a.location === property.location && b.location !== property.location) return -1;
                return 0;
            })
            .slice(0, 3);
    }, [property]);

    if (related.length === 0) return null;

    return (
        <section className="w-full pb-16">
            {/* Header section with glassmorphism and animations */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                <div className="space-y-4 max-w-3xl">                  
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-brand-heading tracking-tight leading-[1.1]">
                            Similar <span className="text-brand-primary relative inline-block">
                                Properties
                                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#baa360]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                                </svg>
                            </span> 
                        </h2>
                    </motion.div>
                </div>
            
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {related.map((prop, idx) => (
                    <div key={prop.id} className="relative">
                        <PropertyCard 
                            property={prop} 
                            index={idx} 
                            mode={mode} 
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
