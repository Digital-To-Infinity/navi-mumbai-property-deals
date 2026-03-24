"use client";
import { motion } from 'framer-motion';
import { PhoneCall, Mail, User, Shield, Map as MapIcon, ExternalLink } from 'lucide-react';
import type { ListingProperty } from '../../components/Listing/listingData';
import { fadeUp } from './variants';

interface Props {
    property: ListingProperty;
}

const PropertySidebar = ({ property }: Props) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.title} ${property.address} ${property.location}`)}`;

    return (
        <div className="lg:col-span-4 relative">
            <motion.div variants={fadeUp} className="sticky top-28 flex flex-col gap-6">
                {/* Price Card */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-[24px] p-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative element background */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-600/30 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col gap-6">
                        <div>
                            <p className="text-zinc-400 font-bold uppercase tracking-wider text-xs mb-1">Buy Price</p>
                            <div className="text-4xl font-black text-white">{property.price}</div>
                            <div className="text-sm text-zinc-400 font-semibold mt-1">@ {property.pricePerSqft}</div>
                        </div>

                        {property.rentPrice && (
                            <div className="border-t border-zinc-700/50 pt-4">
                                <p className="text-zinc-400 font-bold uppercase tracking-wider text-xs mb-1">Expected Rent</p>
                                <div className="text-2xl font-bold text-white">{property.rentPrice}</div>
                            </div>
                        )}

                        <button className="w-full mt-4 bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
                            <PhoneCall className="w-5 h-5" />
                            Contact Seller
                        </button>

                        <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-xl transition-all active:scale-95 border border-zinc-600 flex items-center justify-center gap-2 cursor-pointer">
                            <Mail className="w-5 h-5" />
                            Enquire Now
                        </button>
                    </div>
                </div>

                {/* Listed By Info box */}
                <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <User className="w-8 h-8 text-brand-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-500 uppercase">Marketed By</span>
                        <span className="text-lg font-extrabold text-brand-heading">{property.listerName}</span>
                        <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                            <Shield className="w-3.5 h-3.5" /> Trusted Profile
                        </span>
                    </div>
                </div>

                {/* Map Preview Card */}
                <div className="bg-white rounded-[24px] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 overflow-hidden hover:border-brand-primary/30 transition-all duration-300">
                    <div className="relative h-44 rounded-[18px] bg-zinc-100 overflow-hidden group">
                        {/* Real Google Map Embed */}
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 contrast-[1.1] scale-[1.02]"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.address} ${property.location}`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        ></iframe>

                        {/* Interactive overlay to allow clicking to full map */}
                        <a 
                            href={googleMapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-10 bg-transparent flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10"
                        >
                            <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-brand-primary/40 transform scale-0 group-hover:scale-110 transition-transform duration-500">
                                <ExternalLink className="w-5 h-5" />
                            </div>
                            <span className="mt-2 bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-black uppercase px-2 py-1 rounded shadow-sm">
                                View Full Map
                            </span>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PropertySidebar;
