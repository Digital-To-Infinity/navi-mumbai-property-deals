"use client";
import { motion } from 'framer-motion';
import { Sofa, Car, Shield, User, MapPin, Users, Layout, CalendarRange } from 'lucide-react';
import type { ListingProperty } from "../../components/Listing/listingData";
import { fadeUp } from './variants';
import { usePathname } from 'next/navigation';

interface Props {
    property: ListingProperty;
}

const getRoomDetails = (configuration: string) => {
    switch (configuration) {
        case '1bhk': return "1 Bedroom, 1 Hall, 1 Kitchen, 1 Bathroom";
        case '2bhk': return "2 Bedrooms, 1 Hall, 1 Kitchen, 2 Bathrooms";
        case '3bhk': return "3 Bedrooms, 1 Hall, 1 Kitchen, 3 Bathrooms";
        case '4bhk+': return "4+ Bedrooms, 1 Hall, 1 Kitchen, 4 Bathrooms";
        case 'studio': return "1 Studio Room, 1 Kitchenette, 1 Bathroom";
        default: return configuration.toUpperCase();
    }
};

const PropertyKeyDetails = ({ property }: Props) => {
    const pathname = usePathname();
    const isRent = pathname.includes('rent');

    return (
        <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
            <h2 className="text-2xl font-extrabold text-brand-heading mb-6 border-b border-zinc-100 pb-4">Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4">
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-500 uppercase">Furnishing</span>
                    <div className="flex items-center gap-2">
                        <Sofa className="w-4 h-4 text-brand-primary" />
                        <span className="font-bold text-zinc-800 capitalize">{property.furnishing}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-500 uppercase">Status</span>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-800 capitalize">{property.constructionStatus.replace(/-/g, ' ')}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-500 uppercase">Floor</span>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-800">{property.floor || 'N/A'}{property.totalFloors ? ` of ${property.totalFloors}` : ''}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-500 uppercase">Parking</span>
                    <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-brand-primary" />
                        <span className="font-bold text-zinc-800">{property.parking || 'N/A'}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-500 uppercase">Builder</span>
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-brand-primary" />
                        <span className="font-bold text-zinc-800">{property.builder}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-500 uppercase">{property.postedBy}</span>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-primary" />
                        <span className="font-bold text-zinc-800 capitalize">{property.listerName}</span>
                    </div>
                </div>

                {/* Conditional Rental-only Section: Suitable For */}
                {isRent && (
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-zinc-500 uppercase">Suitable For</span>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-brand-primary" />
                            <span className="font-bold text-zinc-800">
                                {property.suitableFor && property.suitableFor.length > 0 
                                    ? property.suitableFor.join(', ') 
                                    : 'Family, Bachelor'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Conditional Rental-only Section: Available From */}
                {isRent && (
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-zinc-500 uppercase">Available From</span>
                        <div className="flex items-center gap-2">
                            <CalendarRange className="w-4 h-4 text-brand-primary" />
                            <span className="font-bold text-zinc-800">{property.availableFrom || 'Immediately'}</span>
                        </div>
                    </div>
                )}

                {/* New BHK Details Section (always visible) */}
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-zinc-500 uppercase">{property.bhk} Details</span>
                    <div className="flex items-center gap-2">
                        <Layout className="w-4 h-4 text-brand-primary" />
                        <span className="font-bold text-zinc-800">{getRoomDetails(property.configuration)}</span>
                    </div>
                </div>

                <div className="col-span-2 sm:col-span-3 flex flex-col gap-1 pt-4 border-t border-zinc-50">
                    <span className="text-sm font-semibold text-zinc-500 uppercase">Address</span>
                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                        <span className="font-bold text-zinc-800">{property.address}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyKeyDetails;
