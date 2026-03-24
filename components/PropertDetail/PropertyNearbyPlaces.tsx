"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Hospital, ShoppingBag, Trees, MapPin } from 'lucide-react';
import type { ListingProperty } from '../../listingData';
import { fadeUp } from './variants';

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'education': return <GraduationCap className="w-5 h-5 text-indigo-500" />;
        case 'healthcare': return <Hospital className="w-5 h-5 text-red-500" />;
        case 'shopping': return <ShoppingBag className="w-5 h-5 text-amber-500" />;
        case 'recreation': return <Trees className="w-5 h-5 text-emerald-500" />;
        default: return <MapPin className="w-5 h-5 text-zinc-400" />;
    }
};

interface Props {
    property: ListingProperty;
}

const PropertyNearbyPlaces = ({ property }: Props) => {
    return (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-3xl font-extrabold text-brand-heading tracking-tight">Places Nearby</h2>
                <div className="h-1.5 w-20 bg-brand-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(property.nearbyPlaces || [
                    { name: "Local School", distance: "0.8 km", category: "Education" },
                    { name: "General Hospital", distance: "1.2 km", category: "Healthcare" },
                    { name: "Central Park", distance: "0.5 km", category: "Recreation" },
                    { name: "Shopping Mall", distance: "1.5 km", category: "Shopping" }
                ]).map((place, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center shrink-0">
                            {getCategoryIcon(place.category)}
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-800 line-clamp-1">{place.name}</h4>
                            <p className="text-sm font-semibold text-zinc-500 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {place.distance} away
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default PropertyNearbyPlaces;
