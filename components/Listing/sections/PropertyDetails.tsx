"use client";
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { MapPin, Maximize2, Building2, Calendar, Sofa, Compass, BadgeCheck, CheckCircle2, PhoneCall, Mail, User, ArrowLeft, Shield, Car, Share2, Dumbbell, Waves, Wind, Lock, Trees, Bookmark } from 'lucide-react';
import type { ListingProperty } from '../listingData';
import Link from 'next/link';

interface Props {
    property: ListingProperty;
}

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.1 } }
};

const getAmenityIcon = (amenity: string) => {
    const term = amenity.toLowerCase();
    if (term.includes('gym')) return <Dumbbell className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('pool')) return <Waves className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('park') && !term.includes('parking')) return <Trees className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('parking')) return <Car className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('secur')) return <Shield className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('smart')) return <Lock className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('club')) return <Building2 className="w-5 h-5 text-brand-primary shrink-0" />;
    if (term.includes('terrace')) return <Wind className="w-5 h-5 text-brand-primary shrink-0" />;
    return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
};

export default function PropertyDetails({ property }: Props) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 font-sans">
            {/* Top Navigation */}
            <div className="flex justify-between items-center mb-6">
                <Link href="/buy" className="inline-flex items-center text-sm font-semibold text-brand-paragraph hover:text-brand-primary transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Properties
                </Link>
                <div className="flex items-center gap-3">
                    <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:text-brand-primary transition-all duration-300">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:text-brand-primary transition-all duration-300">
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Content Area (8 Columns) */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Header Info */}
                    <motion.div variants={fadeUp} className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-wider rounded-md border border-brand-primary/20">
                                {property.tag}
                            </span>
                            {property.isReraVerified && (
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-wider rounded-md border border-emerald-200 flex items-center gap-1.5">
                                    <BadgeCheck className="w-3.5 h-3.5" />
                                    RERA Verified
                                </span>
                            )}
                            <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-wider rounded-md border border-zinc-200">
                                {property.propertyType}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-heading leading-[1.15] tracking-tight">
                            {property.title}
                        </h1>
                        <p className="flex items-center gap-2 text-lg text-brand-paragraph font-medium mb-2">
                            <MapPin className="w-5 h-5 text-brand-primary" />
                            {property.location}
                        </p>
                    </motion.div>

                    {/* Image Gallery */}
                    <motion.div variants={fadeUp} className="w-full h-[400px] sm:h-[500px] relative rounded-3xl overflow-hidden shadow-xl border border-white group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
                        <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                            priority
                        />
                    </motion.div>

                    {/* Quick Stats Banner */}
                    <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white border border-zinc-100 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div className="flex flex-col gap-1 p-3">
                            <Building2 className="w-6 h-6 text-brand-primary mb-1" />
                            <span className="text-zinc-500 text-xs font-bold uppercase">Configuration</span>
                            <span className="text-brand-heading font-extrabold text-lg">{property.bhk}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 border-l border-zinc-100">
                            <Maximize2 className="w-6 h-6 text-brand-primary mb-1" />
                            <span className="text-zinc-500 text-xs font-bold uppercase">Super Area</span>
                            <span className="text-brand-heading font-extrabold text-lg">{property.area}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 md:border-l border-zinc-100">
                            <Compass className="w-6 h-6 text-brand-primary mb-1" />
                            <span className="text-zinc-500 text-xs font-bold uppercase">Facing</span>
                            <span className="text-brand-heading font-extrabold text-lg capitalize">{property.facing}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 border-l border-zinc-100">
                            <Calendar className="w-6 h-6 text-brand-primary mb-1" />
                            <span className="text-zinc-500 text-xs font-bold uppercase">Property Age</span>
                            <span className="text-brand-heading font-extrabold text-lg">{property.age} Years</span>
                        </div>
                    </motion.div>

                    {/* Property Details Grid */}
                    <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
                        <h2 className="text-2xl font-extrabold text-brand-heading mb-6 border-b border-zinc-100 pb-4">Key Details</h2>
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
                            <div className="col-span-2 sm:col-span-3 flex flex-col gap-1 pt-4 border-t border-zinc-50">
                                <span className="text-sm font-semibold text-zinc-500 uppercase">Address</span>
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                                    <span className="font-bold text-zinc-800">{property.address}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
                        <h2 className="text-2xl font-extrabold text-brand-heading mb-6 border-b border-zinc-100 pb-4">Description</h2>
                        <h3 className="text-xl font-bold text-zinc-900 mb-1">{property.title}</h3>
                        <p className="text-sm font-semibold text-zinc-500 mb-6 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {property.address}</p>
                        <div className="prose prose-zinc max-w-none text-brand-paragraph font-medium leading-relaxed">
                            <p>
                                Welcome to this exquisitely designed {property.bhk} residence located in the prime neighborhood of {property.location}.
                                With an expansive super built-up area of {property.area}, this {property.furnishing} property offers a perfect blend of luxury, comfort, and state-of-the-art aesthetics.
                            </p>
                            <p className="mt-4">
                                Developed by the renowned <strong>{property.builder}</strong>, the architecture embraces modern living with spacious interiors, excellent cross-ventilation, and abundant natural light. {property.isReraVerified ? "Being a RERA-registered property, it guarantees absolute transparency and trust." : ""}
                            </p>
                            <p className="mt-4">
                                Ideal for discerning buyers seeking an upgraded lifestyle in one of Navi Mumbai's most sought-after localities. Enjoy close proximity to premium schools, top-tier healthcare facilities, commercial hubs, and seamless transit networks.
                            </p>
                        </div>
                    </motion.div>

                    {/* Amenities */}
                    <motion.div variants={fadeUp} className="bg-white p-6 sm:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 mb-8 lg:mb-0">
                        <h2 className="text-2xl font-extrabold text-brand-heading mb-6 border-b border-zinc-100 pb-4">Premium Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {property.amenities.map((amenity, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                    {getAmenityIcon(amenity)}
                                    <span className="font-bold text-zinc-800 text-sm">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Sticky Sidebar (4 Columns) */}
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

                                <button className="w-full mt-4 bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold py-4 rounded-xl shadow-[0_0_20px_rgba(186,163,96,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2">
                                    <PhoneCall className="w-5 h-5" />
                                    Contact Seller
                                </button>

                                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 rounded-xl transition-all active:scale-95 border border-zinc-600 flex items-center justify-center gap-2">
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

                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
