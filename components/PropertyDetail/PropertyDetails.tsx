"use client";
import { motion } from 'framer-motion';
import type { ListingProperty } from '../Listing/listingData';
import PropertyNavigation from './PropertyNavigation';
import PropertyHeroInfo from './PropertyHeroInfo';
import PropertyKeyDetails from './PropertyKeyDetails';
import PropertyDescription from './PropertyDescription';
import PropertyAmenities from './PropertyAmenities';
import PropertyLocalityReviews from './PropertyLocalityReviews';
import PropertySidebar from './PropertySidebar';
import PropertyNearbyPlaces from './PropertyNearbyPlaces';
import PropertyFeatures from './PropertyFeatures';
import PropertyListerProfile from './PropertyListerProfile';
import PropertyRelated from './PropertyRelated';
import PropertyImageGallery from './PropertyImageGallery';
import PropertySchema from './PropertySchema';
import { usePathname } from 'next/navigation';
import { stagger } from './variants';

interface Props {
    property: ListingProperty;
    slug?: string;
}

export default function PropertyDetails({ property, slug }: Props) {
    const pathname = usePathname();
    const currentSlug = slug || pathname.replace(/^\//, '');

    return (
        <div className="w-full mx-auto px-10 max-[426px]:px-4 py-4 font-sans leading-relaxed">
            <PropertySchema property={property} slug={currentSlug} />
            {/* Top Navigation */}
            <PropertyNavigation />

            {/* Hero Section */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Content Area */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <PropertyHeroInfo property={property} />
                </div>

                {/* Right Sticky Sidebar */}
                <PropertySidebar property={property} />
            </motion.div>

            {/* Content Sections */}
            <div className="mt-12 flex flex-col gap-16">
                <PropertyKeyDetails property={property} />
                <PropertyDescription property={property} />
                <PropertyAmenities property={property} />
                <PropertyLocalityReviews property={property} />
                <div className="border-t border-zinc-100 pt-16 flex flex-col gap-16">
                    <PropertyNearbyPlaces property={property} />
                    <PropertyFeatures property={property} />
                    <PropertyImageGallery property={property} />
                    <PropertyListerProfile property={property} />
                    <PropertyRelated property={property} />
                </div>
            </div>
        </div>
    );
}
