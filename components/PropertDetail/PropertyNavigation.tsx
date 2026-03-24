"use client";
import Link from 'next/link';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';

const PropertyNavigation = () => {
    return (
        <div className="flex justify-between items-center mb-16 max-[426px]:mb-8">
            <Link href="/buy" className="inline-flex items-center text-base font-semibold text-brand-heading hover:text-brand-primary-hover transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Properties
            </Link>
            <div className="flex items-center gap-3">
                <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:text-brand-primary transition-all duration-300 cursor-pointer">
                    <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:text-brand-primary transition-all duration-300 cursor-pointer">
                    <Bookmark className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default PropertyNavigation;
