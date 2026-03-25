"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, X, Info, RotateCcw } from "lucide-react";
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

    const handleReset = () => {
        // Simple confirmation before resetting
        if (typeof window !== 'undefined' && window.confirm("Are you sure you want to clear all the information you've entered? This cannot be undone.")) {
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
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
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
                    <RentalSuitability formData={formData} updateFormData={updateFormData} />
                    <Pricing formData={formData} updateFormData={updateFormData} />
                    <LocationInfo formData={formData} updateFormData={updateFormData} />
                    <PropertyDetails formData={formData} updateFormData={updateFormData} />
                    <AmenitiesFeatures formData={formData} updateFormData={updateFormData} />
                    <ImageUpload formData={formData} updateFormData={updateFormData} />
                    <NearbyPlaces formData={formData} updateFormData={updateFormData} />

                    {/* Bottom Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-16 border-t border-zinc-100"
                    >
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-black text-brand-dark tracking-tight">Ready to publish?</h3>
                            <p className="text-brand-paragraph font-medium">Please review all information before listing your property.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <motion.button
                                type="button"
                                onClick={handleReset}
                                whileHover={{ scale: 0.98 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-10 py-4 bg-white border-2 border-zinc-100 rounded-[32px] text-zinc-500 text-lg font-black hover:bg-zinc-50 hover:border-red-100 hover:text-red-500 transition-all flex items-center justify-center gap-3 cursor-pointer group"
                            >
                                <RotateCcw className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform" />
                                Reset Form
                            </motion.button>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full sm:w-auto px-12 py-4 relative overflow-hidden rounded-[32px] text-lg font-black shadow-2xl transition-all flex items-center justify-center gap-3 group cursor-pointer
                                    ${isSubmitting
                                        ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                                        : 'bg-brand-primary text-white shadow-brand-primary/30 hover:shadow-brand-primary/40'
                                    }`}
                            >
                                {/* Animated Background Glow */}
                                {!isSubmitting && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary-hover to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                )}

                                {isSubmitting ? (
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-6 h-6 border-3 border-zinc-400/30 border-t-zinc-400 rounded-full animate-spin" />
                                        <span>Listing Property...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 relative z-10">
                                        <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                                        <span>List Property</span>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                )}
                            </motion.button>
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
