"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BadgeCheck, Shield, Star, Award, Briefcase, Layout, PhoneCall, MessageSquare } from 'lucide-react';
import type { ListingProperty } from '../Listing/listingData';
import { fadeUp } from './variants';

interface Props {
    property: ListingProperty;
}

const PropertyListerProfile = ({ property }: Props) => {
    return (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-0">
            <div className="flex flex-col gap-2 mb-10">
                <h2 className="text-3xl font-extrabold text-brand-heading tracking-tight capitalize">Meet the <span className='text-brand-primary italic'>{property.postedBy}</span></h2>
                <div className="h-1.5 w-20 bg-brand-primary rounded-full"></div>
            </div>

            <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] border border-zinc-100 flex flex-col lg:flex-row gap-12 relative overflow-hidden group">
                {/* Interactive Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-brand-primary/10 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-zinc-50 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl"></div>

                {/* Left Column: Avatar and Quick Stats */}
                <div className="lg:w-1/3 flex flex-col gap-8 relative z-10">
                    <div className="relative w-40 h-40 mx-auto lg:mx-0">
                        <div className="absolute inset-0 bg-brand-primary rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
                        <div className="absolute inset-0 bg-brand-primary rounded-3xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500 opacity-20"></div>
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                            <Image
                                src={property.listerDetails?.image || property.image} 
                                alt={property.listerName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        {property.listerDetails?.verified && (
                            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-4 border-white">
                                <BadgeCheck className="w-5 h-5" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1 text-center lg:text-left">
                        <h3 className="text-2xl font-black text-brand-heading">{property.listerName}</h3>
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-zinc-500 font-bold uppercase text-xs tracking-widest">
                            <Shield className="w-4 h-4 text-brand-primary" />
                            <span>Verified {property.postedBy}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-50 p-4 rounded-2xl flex flex-col gap-1 hover:bg-zinc-100 transition-colors cursor-default">
                            <Star className="w-5 h-5 text-amber-400" />
                            <span className="text-xl font-black text-brand-heading">{property.listerDetails?.rating || "4.5"}</span>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Avg Rating</span>
                        </div>
                        <div className="bg-zinc-50 p-4 rounded-2xl flex flex-col gap-1 hover:bg-zinc-100 transition-colors cursor-default">
                            <Award className="w-5 h-5 text-indigo-500" />
                            <span className="text-xl font-black text-brand-heading">{property.listerDetails?.experience || "10+ Yrs"}</span>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Experience</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Bio and CTA */}
                <div className="lg:w-2/3 flex flex-col gap-8 relative z-10">
                    <div>
                        <h4 className="text-sm font-black text-brand-primary uppercase tracking-widest mb-4">About our Partner</h4>
                        <p className="text-zinc-600 text-lg leading-relaxed font-medium">
                            {property.listerDetails?.about || `A dedicated ${property.postedBy} with extensive knowledge of the Navi Mumbai real estate market. Committed to providing transparent, efficient, and professional services to help clients find their perfect home or investment opportunity.`}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8 border-b border-zinc-100">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 shrink-0">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Role</p>
                                <p className="font-extrabold text-brand-heading capitalize">{property.postedBy}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 shrink-0">
                                <Layout className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Listings</p>
                                <p className="font-extrabold text-brand-heading">{property.listerDetails?.totalProperties || "15+"} Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button className="flex-1 min-w-[200px] bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer">
                            <PhoneCall className="w-5 h-5" />
                            Connect with Agent
                        </button>
                        <button className="flex-1 min-w-[200px] bg-white border-2 border-zinc-100 hover:border-brand-primary/30 text-brand-heading font-extrabold py-4 px-8 rounded-2xl hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 cursor-pointer">
                            <MessageSquare className="w-5 h-5 text-brand-primary" />
                            Send WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default PropertyListerProfile;
