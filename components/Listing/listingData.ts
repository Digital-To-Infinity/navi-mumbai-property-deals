
//  Listing Hub — Shared Data Types & Mock Data

export type ListingMode = "buy" | "rent" | "sell";

export const titleToSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const generatePropertySlug = (property: ListingProperty, mode: ListingMode) => {
    const slug = titleToSlug(property.title);
    if (mode === 'rent') {
        return `${slug}-studio-apartments-for-rent-in-navi-mumbai`;
    }
    return `${slug}-flats-for-sale-in-navi-mumbai`;
};

export interface ListingProperty {
    id: string;
    title: string;
    location: string;
    address: string;
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
    listerName: string;
    propertyType: "residential" | "commercial" | "plot" | "industrial";
    furnishing: "furnished" | "semi-furnished" | "unfurnished";
    facing: "east" | "west" | "north" | "south" | "north-east" | "north-west" | "south-east" | "south-west";
    amenities: string[];
    age: "0-1" | "1-5" | "5-10" | "10+";
    floor?: string;
    totalFloors?: number;
    parking?: string;
    suitableFor?: string[]; // New field for rent suitability (e.g., ["Family", "Bachelor"])
    availableFrom?: string; // New field for rent availability (e.g., "Immediately", "1st April")
    nearbyPlaces?: { name: string; distance: string; category: string }[];
    features?: string[];
    listerDetails?: {
        image?: string;
        experience?: string;
        rating?: number;
        totalProperties?: number;
        about?: string;
        verified?: boolean;
    };
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

// Mock Property Listings

export const listingProperties: ListingProperty[] = [
    {
        id: "lp-001",
        title: "Luxury 3 BHK Sky Residence",
        location: "Kharghar, Navi Mumbai",
        address: "Sector 35, Next to Central Park, Kharghar, Navi Mumbai, Maharashtra 410210",
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
        listerName: "Rustomjee Group Sales",
        propertyType: "residential",
        furnishing: "furnished",
        facing: "east",
        amenities: ["Gym", "Pool", "Parking", "Security"],
        age: "1-5",
        floor: "18th",
        totalFloors: 42,
        parking: "2 Covered",
        suitableFor: ["Family", "Bachelor", "Company Lease"],
        availableFrom: "Immediately",
        nearbyPlaces: [
            { name: "Ryan International School", distance: "0.8 km", category: "Education" },
            { name: "MGM Hospital", distance: "1.2 km", category: "Healthcare" },
            { name: "Central Park", distance: "0.5 km", category: "Recreation" },
            { name: "Glomax Mall", distance: "1.5 km", category: "Shopping" }
        ],
        features: [
            "Vastu Compliant Design",
            "Italian Marble Flooring",
            "High-speed Elevators",
            "24/7 Power Backup",
            "CCTV Surveillance"
        ],
        listerDetails: {
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            experience: "15+ Years",
            rating: 4.8,
            totalProperties: 124,
            about: "Leading real estate developers in Navi Mumbai, dedicated to building luxurious landmarks for over a decade. We pride ourselves on timely delivery and exceptional quality standards.",
            verified: true
        }
    },
    {
        id: "lp-002",
        title: "Premium Sea-View Apartment",
        location: "Vashi, Navi Mumbai",
        address: "Palm Beach Road, Sector 14, Vashi, Navi Mumbai, Maharashtra 400703",
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
        listerName: "Elite Properties By Rahul",
        propertyType: "residential",
        furnishing: "semi-furnished",
        facing: "west",
        amenities: ["Pool", "Parking", "Security", "Clubhouse"],
        age: "5-10",
        floor: "12th",
        totalFloors: 25,
        parking: "1 Covered",
    },
    {
        id: "lp-003",
        title: "Modern 2 BHK Smart Flat",
        location: "Kharghar, Navi Mumbai",
        address: "Sector 11, Utsav Chowk Area, Kharghar, Navi Mumbai, Maharashtra 410210",
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
        listerName: "Lodha direct Sales",
        propertyType: "residential",
        furnishing: "unfurnished",
        facing: "north-east",
        amenities: ["Gym", "Security", "Park"],
        age: "0-1",
        floor: "5th",
        totalFloors: 15,
        parking: "None",
    },
    {
        id: "lp-004",
        title: "Spacious Duplex Penthouse",
        location: "Nerul, Navi Mumbai",
        address: "Sector 24, Seawoods West, Nerul, Navi Mumbai, Maharashtra 400706",
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
        listerName: "Mr. Rajeev Sharma",
        propertyType: "residential",
        furnishing: "furnished",
        facing: "east",
        amenities: ["Gym", "Pool", "Parking", "Private Terrace"],
        age: "10+",
        floor: "Top",
        totalFloors: 4,
        parking: "3 Covered",
    },
    {
        id: "lp-005",
        title: "Smart Home 3 BHK Residence",
        location: "CBD Belapur, Navi Mumbai",
        address: "Sector 15, Artist Village Road, CBD Belapur, Navi Mumbai, Maharashtra 400614",
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
        listerName: "L&T Realty Central",
        propertyType: "residential",
        furnishing: "semi-furnished",
        facing: "south",
        amenities: ["Gym", "Pool", "Parking", "Smart Home Tech"],
        age: "0-1",
        floor: "22nd",
        totalFloors: 35,
        parking: "2 Covered",
    },
    {
        id: "lp-006",
        title: "Ultra-Luxury Open Plan Flat",
        location: "Panvel, Navi Mumbai",
        address: "Palaspe Phata, Mumbai-Pune Expressway Junction, Panvel, Navi Mumbai, Maharashtra 410206",
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
        listerName: "Nexus Real Estate",
        propertyType: "residential",
        furnishing: "furnished",
        facing: "north",
        amenities: ["Gym", "Pool", "Parking", "Clubhouse"],
        age: "1-5",
        floor: "8th",
        totalFloors: 20,
        parking: "1 Covered",
    },
    {
        id: "lp-007",
        title: "1 BHK Studio with Golf View",
        location: "Kharghar, Navi Mumbai",
        address: "Sector 34, Opposite Golf Course, Kharghar, Navi Mumbai, Maharashtra 410210",
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
        listerName: "Smita Deshmukh",
        propertyType: "residential",
        furnishing: "unfurnished",
        facing: "east",
        amenities: ["Parking", "Security", "Park"],
        age: "5-10",
        floor: "2nd",
        totalFloors: 7,
        parking: "1 Open",
    },
    {
        id: "lp-008",
        title: "2 BHK Designer Apartment",
        location: "Seawoods, Navi Mumbai",
        address: "Sector 40, Near Grand Central Mall, Seawoods, Navi Mumbai, Maharashtra 400706",
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
        listerName: "Prime Space Agency",
        propertyType: "residential",
        furnishing: "semi-furnished",
        facing: "south-east",
        amenities: ["Gym", "Pool", "Parking"],
        age: "1-5",
        floor: "15th",
        totalFloors: 18,
        parking: "1 Covered",
    },
    {
        id: "lp-009",
        title: "4 BHK Penthouse with Terrace",
        location: "Airoli, Navi Mumbai",
        address: "Sector 8, Knowledge Park Link Road, Airoli, Navi Mumbai, Maharashtra 400708",
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
        listerName: "Tata Housing Office",
        propertyType: "residential",
        furnishing: "unfurnished",
        facing: "east",
        amenities: ["Gym", "Pool", "Parking", "Security", "Garden"],
        age: "0-1",
        floor: "30th",
        totalFloors: 40,
        parking: "2 Covered",
    },
];

// Locality Metrics by Mode

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

export interface LocalityInsight {
    location: string;
    whyInvest: string;
    connectivity: string;
    infrastructure: string;
    highlights?: string[];
    connectivityHighlights?: string[];
    infraHighlights?: string[];
}

// Locality Insights

export const localityInsight: LocalityInsight = {
    location: "Navi Mumbai",
    whyInvest:
        "Navi Mumbai has emerged as one of India's most lucrative real estate markets. Planned by CIDCO across 163 nodes, it offers superior infrastructure, lower pollution levels, and better quality of life at 25–40% lower costs compared to Mumbai. With growing IT parks in Airoli, Belapur, and Vashi, and a rapidly expanding metro network, demand continues to outstrip supply.",
    connectivity:
        "Navi Mumbai's connectivity is anchored by the Mumbai Trans-Harbour Link (MTHL), which has reduced travel time to South Mumbai to just 20 minutes. This is complemented by a robust Suburban Rail network (Harbour & Trans-Harbour lines) and the newly operational Navi Mumbai Metro. The 10-lane Sion-Panvel Highway and the upcoming Pune-Mumbai Expressway extension further strengthen its position as a primary transit-oriented development hub, connecting seamlessly to JNPT and the industrial belts of Taloja.",
    infrastructure:
        "The region is witnessing a 'Infrastructure Renaissance' led by the Navi Mumbai International Airport (NMIA), set to be the secondary hub for MMR. Beyond transit, the International Corporate Park in Kharghar (BKC 2) and the sprawling 80-hectare Central Park define its urban landscape. Upcoming projects like the Navi Mumbai Marina, specialized Data Center parks in Airoli, and the NAINA smart city initiative ensure a futuristic urban ecosystem with world-class amenities and 40% planned open spaces.",
    highlights: [
        "MTHL (Atal Setu): 20 min drive to South Mumbai",
        "Upcoming International Airport (NMIA) - 2025 Opening",
        "Superior CIDCO Planning: Wide Roads & 40% Green Cover",
        "Highest Appreciation Potential in MMR (12-15% annually)",
        "India's Top Data Center Hub (Digital Capital)"
    ],
    connectivityHighlights: [
        "Navi Mumbai Metro Lines 1, 2 & 3",
        "Sion-Panvel 10-Lane Expressway",
        "Harbour & Trans-Harbour Rail Network",
        "JNPT Port & Coastal Road Connectivity",
        "Proposed Kharghar-Turbhe Tunnel Link"
    ],
    infraHighlights: [
        "International Airport (NMIA) 2025 Opening",
        "NAINA: India's Largest Planned Urban Hub",
        "Kharghar Corporate Park (BKC 2.0)",
        "Specialized IT/SEZ zones & Data Centers",
        "World-class Central Park & Golf Courses"
    ],
};
