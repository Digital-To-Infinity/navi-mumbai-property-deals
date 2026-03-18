// ─────────────────────────────────────────────
//  Listing Hub — Shared Data Types & Mock Data
// ─────────────────────────────────────────────

export type ListingMode = "buy" | "rent" | "sell";

export interface ListingProperty {
    id: string;
    title: string;
    location: string;
    price: string;
    rentPrice: string;
    pricePerSqft: string;
    bhk: string;
    area: string;
    tag: string;
    constructionStatus: "ready-to-move" | "under-construction" | "new-launch";
    configuration: "1bhk" | "2bhk" | "3bhk" | "4bhk+" | "studio" | "commercial" | "plot";
    isReraVerified: boolean;
    isFeatured?: boolean;
    image: string;
    builder: string;
    postedBy: "owner" | "agent" | "builder";
    propertyType: "residential" | "commercial" | "plot" | "industrial";
    furnishing: "furnished" | "semi-furnished" | "unfurnished";
    facing: "east" | "west" | "north" | "south" | "north-east" | "north-west" | "south-east" | "south-west";
    amenities: string[];
    age: "0-1" | "1-5" | "5-10" | "10+";
}

export interface LocalityMetrics {
    avgPricePsf: string;
    yearlyGrowth: string;
    demandIndex: string;
    demandLabel: "Very High" | "High" | "Moderate" | "Low";
}

export interface LocalityInsight {
    location: string;
    whyInvest: string;
    connectivity: string;
    infrastructure: string;
}

// ─── Mock Property Listings ───────────────────

export const listingProperties: ListingProperty[] = [
    {
        id: "lp-001",
        title: "Luxury 3 BHK Sky Residence",
        location: "Kharghar, Navi Mumbai",
        price: "₹ 2.85 Cr",
        rentPrice: "₹ 32,000 / mo",
        pricePerSqft: "₹ 12,400 psf",
        bhk: "3 BHK",
        area: "2,300 sq.ft",
        tag: "Ready to Move",
        constructionStatus: "ready-to-move",
        configuration: "3bhk",
        isReraVerified: true,
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        builder: "Rustomjee Group",
        postedBy: "builder",
        propertyType: "residential",
        furnishing: "furnished",
        facing: "east",
        amenities: ["Gym", "Pool", "Parking", "Security"],
        age: "1-5",
    },
    {
        id: "lp-002",
        title: "Premium Sea-View Apartment",
        location: "Vashi, Navi Mumbai",
        price: "₹ 3.20 Cr",
        rentPrice: "₹ 48,000 / mo",
        pricePerSqft: "₹ 15,200 psf",
        bhk: "3 BHK",
        area: "2,100 sq.ft",
        tag: "Premium",
        constructionStatus: "ready-to-move",
        configuration: "3bhk",
        isReraVerified: true,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        builder: "Hiranandani Group",
        postedBy: "agent",
        propertyType: "residential",
        furnishing: "semi-furnished",
        facing: "west",
        amenities: ["Pool", "Parking", "Security", "Clubhouse"],
        age: "5-10",
    },
    {
        id: "lp-003",
        title: "Modern 2 BHK Smart Flat",
        location: "Kharghar, Navi Mumbai",
        price: "₹ 1.10 Cr",
        rentPrice: "₹ 18,500 / mo",
        pricePerSqft: "₹ 9,560 psf",
        bhk: "2 BHK",
        area: "1,150 sq.ft",
        tag: "New Launch",
        constructionStatus: "new-launch",
        configuration: "2bhk",
        isReraVerified: true,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        builder: "Lodha Group",
        postedBy: "builder",
        propertyType: "residential",
        furnishing: "unfurnished",
        facing: "north-east",
        amenities: ["Gym", "Security", "Park"],
        age: "0-1",
    },
    {
        id: "lp-004",
        title: "Spacious Duplex Penthouse",
        location: "Nerul, Navi Mumbai",
        price: "₹ 4.80 Cr",
        rentPrice: "₹ 70,000 / mo",
        pricePerSqft: "₹ 10,666 psf",
        bhk: "5 BHK",
        area: "4,500 sq.ft",
        tag: "Exclusive",
        constructionStatus: "ready-to-move",
        configuration: "4bhk+",
        isReraVerified: false,
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        builder: "Shapoorji Pallonji",
        postedBy: "owner",
        propertyType: "residential",
        furnishing: "furnished",
        facing: "east",
        amenities: ["Gym", "Pool", "Parking", "Private Terrace"],
        age: "10+",
    },
    {
        id: "lp-005",
        title: "Smart Home 3 BHK Residence",
        location: "CBD Belapur, Navi Mumbai",
        price: "₹ 2.50 Cr",
        rentPrice: "₹ 28,000 / mo",
        pricePerSqft: "₹ 13,513 psf",
        bhk: "3 BHK",
        area: "1,850 sq.ft",
        tag: "Under Construction",
        constructionStatus: "under-construction",
        configuration: "3bhk",
        isReraVerified: true,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        builder: "L&T Realty",
        postedBy: "builder",
        propertyType: "residential",
        furnishing: "semi-furnished",
        facing: "south",
        amenities: ["Gym", "Pool", "Parking", "Smart Home Tech"],
        age: "0-1",
    },
    {
        id: "lp-006",
        title: "Ultra-Luxury Open Plan Flat",
        location: "Panvel, Navi Mumbai",
        price: "₹ 1.80 Cr",
        rentPrice: "₹ 22,000 / mo",
        pricePerSqft: "₹ 9,230 psf",
        bhk: "3 BHK",
        area: "1,950 sq.ft",
        tag: "Upgraded",
        constructionStatus: "ready-to-move",
        configuration: "3bhk",
        isReraVerified: true,
        image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        builder: "Godrej Properties",
        postedBy: "agent",
        propertyType: "residential",
        furnishing: "furnished",
        facing: "north",
        amenities: ["Gym", "Pool", "Parking", "Clubhouse"],
        age: "1-5",
    },
    {
        id: "lp-007",
        title: "1 BHK Studio with Golf View",
        location: "Kharghar, Navi Mumbai",
        price: "₹ 58 L",
        rentPrice: "₹ 9,500 / mo",
        pricePerSqft: "₹ 8,285 psf",
        bhk: "1 BHK",
        area: "700 sq.ft",
        tag: "Value Pick",
        constructionStatus: "ready-to-move",
        configuration: "1bhk",
        isReraVerified: true,
        image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        builder: "CIDCO",
        postedBy: "owner",
        propertyType: "residential",
        furnishing: "unfurnished",
        facing: "east",
        amenities: ["Parking", "Security", "Park"],
        age: "5-10",
    },
    {
        id: "lp-008",
        title: "2 BHK Designer Apartment",
        location: "Seawoods, Navi Mumbai",
        price: "₹ 1.65 Cr",
        rentPrice: "₹ 21,000 / mo",
        pricePerSqft: "₹ 11,000 psf",
        bhk: "2 BHK",
        area: "1,500 sq.ft",
        tag: "Trending",
        constructionStatus: "ready-to-move",
        configuration: "2bhk",
        isReraVerified: false,
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        builder: "Dosti Realty",
        postedBy: "agent",
        propertyType: "residential",
        furnishing: "semi-furnished",
        facing: "south-east",
        amenities: ["Gym", "Pool", "Parking"],
        age: "1-5",
    },
    {
        id: "lp-009",
        title: "4 BHK Penthouse with Terrace",
        location: "Airoli, Navi Mumbai",
        price: "₹ 3.80 Cr",
        rentPrice: "₹ 55,000 / mo",
        pricePerSqft: "₹ 14,700 psf",
        bhk: "4 BHK",
        area: "2,585 sq.ft",
        tag: "New Launch",
        constructionStatus: "new-launch",
        configuration: "4bhk+",
        isReraVerified: true,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        builder: "Tata Housing",
        postedBy: "builder",
        propertyType: "residential",
        furnishing: "unfurnished",
        facing: "east",
        amenities: ["Gym", "Pool", "Parking", "Security", "Garden"],
        age: "0-1",
    },
];

// ─── Locality Metrics by Mode ─────────────────

export const localityMetrics: Record<ListingMode, LocalityMetrics> = {
    buy: {
        avgPricePsf: "₹ 11,240",
        yearlyGrowth: "+14.3%",
        demandIndex: "87 / 100",
        demandLabel: "Very High",
    },
    rent: {
        avgPricePsf: "₹ 48 / sq.ft / mo",
        yearlyGrowth: "+9.8%",
        demandIndex: "79 / 100",
        demandLabel: "High",
    },
    sell: {
        avgPricePsf: "₹ 11,910",
        yearlyGrowth: "+16.1%",
        demandIndex: "83 / 100",
        demandLabel: "Very High",
    },
};

// ─── Locality Insights ────────────────────────

export const localityInsight: LocalityInsight = {
    location: "Navi Mumbai",
    whyInvest:
        "Navi Mumbai has emerged as one of India's most lucrative real estate markets. Planned by CIDCO across 163 nodes, it offers superior infrastructure, lower pollution levels, and better quality of life at 25–40% lower costs compared to Mumbai. With growing IT parks in Airoli, Belapur, and Vashi, and a rapidly expanding metro network, demand continues to outstrip supply.",
    connectivity:
        "The Navi Mumbai Metro (Lines 1 & 8) now connects Belapur–Kharghar–Pendhar corridors, while the Sion–Panvel Highway and Mumbai Trans-Harbour Link (MTHL — inaugurated 2024) have slashed commute times to South Mumbai to under 25 minutes. The upcoming Navi Mumbai International Airport at Ulwe is set to go live in 2025, making localities like Panvel, Dronagiri, and Ulwe the next micro-market hotspots.",
    infrastructure:
        "Key upcoming infrastructure includes: NMIA (Navi Mumbai International Airport) by 2025, Navi Mumbai Metro Line 2 & 3 by 2026, the Sewri–Nhava Sheva Trans Harbour Link operational, and proposed MTHL Phase 2 extension to Alibaug, unlocking coastal corridor value.",
};
