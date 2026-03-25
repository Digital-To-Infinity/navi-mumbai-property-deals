"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, X, Info } from "lucide-react";
import BasicInfo from "./BasicInfo";
import PropertyDescription from "./PropertyDescription";
import Pricing from "./Pricing";
import LocationInfo from "./LocationInfo";
import PropertyDetails from "./PropertyDetails";
import AmenitiesFeatures from "./AmenitiesFeatures";
import NearbyPlaces from "./NearbyPlaces";
import RentalSuitability from "./RentalSuitability";
import ImageUpload from "./ImageUpload";
import SuccessModal from "./SuccessModal";

const AddProperty = () => {
    // Main Form State
    const [formData, setFormData] = useState({
        title: "",
        purpose: "sell", // sell or rent
        propertyType: "residential",
        configuration: "2bhk",
        postedBy: "owner",
        listerName: "",
        price: "",
        priceType: "fixed", // fixed or negotiable
        rentPrice: "",
        pricePerSqft: "",
        securityDeposit: "",
        maintenance: "",
        isReraVerified: false,
        location: "",
        address: "",
        area: "",
        furnishing: "unfurnished",
        facing: "east",
        floor: "",
        totalFloors: "",
        parking: "None",
        constructionStatus: "ready-to-move",
        age: "0-1",
        amenities: [],
        features: [],
        nearbyPlaces: [],
        suitableFor: [],
        availableFrom: "",
        description: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const updateFormData = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);
        console.log("Form Data Submitted:", formData);

        // Optional: Reset form after success
        setFormData({
            title: "",
            purpose: "sell",
            propertyType: "residential",
            configuration: "2bhk",
            postedBy: "owner",
            listerName: "",
            price: "",
            priceType: "fixed",
            rentPrice: "",
            pricePerSqft: "",
            securityDeposit: "",
            maintenance: "",
            isReraVerified: false,
            location: "",
            address: "",
            area: "",
            furnishing: "unfurnished",
            facing: "east",
            floor: "",
            totalFloors: "",
            parking: "None",
            constructionStatus: "ready-to-move",
            age: "0-1",
            amenities: [],
            features: [],
            nearbyPlaces: [],
            suitableFor: [],
            availableFrom: "",
            description: "",
        });
    };

    const handleCloseSuccess = () => {
        setIsSuccess(false);
    };

    return (
        <div className="relative min-h-screen bg-[#fafaf9] py-12">
            {/* Ambient background decorative elements */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[160px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px]" />
            </div>

            {/* Mesh pattern overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.012]"
                aria-hidden="true"
                style={{
                    backgroundImage: "radial-gradient(#000 0.8px, transparent 0.8px)",
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-[12px] font-black uppercase tracking-widest border border-brand-primary/20 shadow-sm backdrop-blur-md">
                        <Sparkles className="w-4 h-4" /> Property Listing Hub
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-brand-dark tracking-tighter leading-none">
                            List Your Property <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-primary-hover to-brand-primary animate-shimmer whitespace-nowrap">in Navi Mumbai</span>
                        </h1>
                    </div>
                    <p className="text-xl text-brand-paragraph font-medium max-w-5xl mx-auto leading-relaxed opacity-80">
                        Join the most exclusive real estate network. Reach thousands of verified buyers and tenants with our premium listing experience.
                    </p>
                </motion.header>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <BasicInfo formData={formData} updateFormData={updateFormData} />
                    <PropertyDescription formData={formData} updateFormData={updateFormData} />
                    <Pricing formData={formData} updateFormData={updateFormData} />
                    <LocationInfo formData={formData} updateFormData={updateFormData} />
                    <PropertyDetails formData={formData} updateFormData={updateFormData} />
                    <AmenitiesFeatures formData={formData} updateFormData={updateFormData} />
                    <ImageUpload formData={formData} updateFormData={updateFormData} />
                    <RentalSuitability formData={formData} updateFormData={updateFormData} />
                    <NearbyPlaces formData={formData} updateFormData={updateFormData} />

                    {/* Bottom Actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row items-center gap-6 pt-12"
                    >
                        <div className="flex-1 bg-white/60 backdrop-blur-xl border border-zinc-100 p-8 rounded-[40px] flex items-center gap-6 shadow-sm group">
                            <div className="w-16 h-16 rounded-3xl bg-zinc-900 flex items-center justify-center text-white relative group-hover:scale-110 transition-transform shadow-xl shadow-zinc-900/10">
                                <Info className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-black text-zinc-900 text-lg group-hover:text-brand-primary transition-colors">Safety First</h4>
                                <p className="text-zinc-500 text-sm font-medium">Verify your property documents or RERA ID for faster conversions.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 h-full">
                            <button
                                type="button"
                                className="px-10 py-5 bg-white border border-zinc-100 rounded-[32px] text-zinc-500 text-lg font-black hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 shadow-sm"
                            >
                                <X className="w-5 h-5" /> Cancel Listing
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-10 py-5 ${isSubmitting ? 'bg-zinc-400' : 'bg-brand-primary'} text-white rounded-[32px] text-lg font-black shadow-2xl shadow-brand-primary/20 hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-3 relative overflow-hidden group`}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Listing Now...
                                    </div>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Complete Listing
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </form>
            </div>

            <SuccessModal
                isOpen={isSuccess}
                onClose={handleCloseSuccess}
                propertyTitle={formData.title}
            />
        </div>
    );
};

export default AddProperty;
