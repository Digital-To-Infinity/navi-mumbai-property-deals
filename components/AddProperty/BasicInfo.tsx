"use client";
import React from "react";
import { motion } from "framer-motion";
import { Info, User, CheckCircle2, Building2, LayoutGrid } from "lucide-react";
import CustomDropdown from "./CustomDropdown";

interface BasicInfoProps {
    formData: any;
    updateFormData: (field: string, value: any) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, updateFormData }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-zinc-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-all duration-500"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Info className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-zinc-900">Basic Information</h2>
                    <p className="text-sm text-zinc-500 font-medium">Start with the essentials of your property</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Title */}
                <div className="space-y-2 group">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1 group-focus-within:text-brand-primary transition-colors">Property Title</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. Luxury 3 BHK Sky Residence"
                            value={formData.title}
                            onChange={(e) => updateFormData("title", e.target.value)}
                            className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-5 py-4 text-[14px] font-bold focus:outline-none focus:border-brand-primary focus:bg-white transition-all shadow-sm"
                        />
                        {formData.title?.length > 10 && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Purpose Toggle */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">I want to</label>
                    <div className="flex p-1.5 bg-zinc-100/50 rounded-2xl gap-1">
                        {["sell", "rent"].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => updateFormData("purpose", mode)}
                                className={`flex-1 py-3 rounded-xl text-[13px] font-black transition-all capitalize
                                    ${formData.purpose === mode 
                                        ? "bg-white text-zinc-900 shadow-sm border border-zinc-100" 
                                        : "text-zinc-400 hover:text-zinc-600"}`}
                            >
                                {mode === "sell" ? "List for Sale" : "List for Rent"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Property Type */}
                <CustomDropdown
                    label="Property Type"
                    options={[
                        { value: "residential", label: "Residential" },
                        { value: "commercial", label: "Commercial" },
                        { value: "plot", label: "Plot" },
                        { value: "industrial", label: "Industrial" },
                    ]}
                    value={formData.propertyType}
                    onChange={(val) => updateFormData("propertyType", val)}
                    icon={<Building2 className="w-5 h-5" />}
                />

                {/* Configuration */}
                <CustomDropdown
                    label="Configuration (BHK)"
                    options={[
                        { value: "1bhk", label: "1 BHK" },
                        { value: "2bhk", label: "2 BHK" },
                        { value: "3bhk", label: "3 BHK" },
                        { value: "4bhk+", label: "4 BHK+" },
                        { value: "studio", label: "Studio" },
                        { value: "commercial", label: "Commercial" },
                        { value: "plot", label: "Plot" },
                    ]}
                    value={formData.configuration}
                    onChange={(val) => updateFormData("configuration", val)}
                    icon={<LayoutGrid className="w-5 h-5" />}
                />

                {/* Posted By */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">Listed By</label>
                    <div className="flex p-1.5 bg-zinc-100/50 rounded-2xl gap-1">
                        {["owner", "agent", "builder"].map((type) => (
                            <button
                                key={type}
                                onClick={() => updateFormData("postedBy", type)}
                                className={`flex-1 py-3 rounded-xl text-[12px] font-black transition-all capitalize
                                    ${formData.postedBy === type 
                                        ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                                        : "text-zinc-400 hover:text-zinc-600"}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lister Name */}
                <div className="space-y-2 group">
                    <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1 group-focus-within:text-brand-primary transition-colors">Your Name</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.listerName}
                            onChange={(e) => updateFormData("listerName", e.target.value)}
                            className="w-full bg-zinc-50/50 border border-zinc-100 rounded-2xl px-5 py-4 text-[14px] font-bold focus:outline-none focus:border-brand-primary focus:bg-white transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300">
                           <User className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BasicInfo;
