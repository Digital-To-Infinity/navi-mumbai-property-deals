"use client";
import { motion } from 'framer-motion';
import type { ListingProperty } from './listingData';
import PropertyNavigation from '../PropertDetail/PropertyNavigation';
import PropertyHeroInfo from '../PropertDetail/PropertyHeroInfo';
import PropertyKeyDetails from '../PropertDetail/PropertyKeyDetails';
import PropertyDescription from '../PropertDetail/PropertyDescription';
import PropertyAmenities from '../PropertDetail/PropertyAmenities';
import PropertySidebar from '../PropertDetail/PropertySidebar';
import PropertyNearbyPlaces from '../PropertDetail/PropertyNearbyPlaces';
import PropertyFeatures from '../PropertDetail/PropertyFeatures';
import PropertyListerProfile from '../PropertDetail/PropertyListerProfile';
import PropertyRelated from '../PropertDetail/PropertyRelated';
import PropertyImageGallery from '../PropertDetail/PropertyImageGallery';
import { stagger } from '../PropertDetail/variants';

interface Props {
    property: ListingProperty;
}

export default function PropertyDetails({ property }: Props) {
    return (
        <div className="w-full mx-auto px-10 max-[426px]:px-4 py-4 font-sans leading-relaxed">
            {/* Top Navigation */}
            <PropertyNavigation />

            {/* Hero Section */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Content Area */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <PropertyHeroInfo property={property} />
                    <PropertyKeyDetails property={property} />
                    <PropertyDescription property={property} />
                    <PropertyAmenities property={property} />
                </div>

                {/* Right Sticky Sidebar */}
                <PropertySidebar property={property} />
            </motion.div>

            {/* Full Width Sections */}
            <div className="mt-16 border-t border-zinc-100 pt-16 flex flex-col gap-16">
                <PropertyNearbyPlaces property={property} />
                <PropertyFeatures property={property} />
                <PropertyImageGallery property={property} />
                <PropertyListerProfile property={property} />
                <PropertyRelated property={property} />
            </div>
        </div>
    );
}
