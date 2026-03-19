import { ListingMode } from "../listingData";

export type { ListingMode };

export type BudgetFilter = "all" | "under60L" | "60L-1Cr" | "1Cr-2Cr" | "2Cr-5Cr" | "above5Cr";
export type ConfigFilter =
    | "all"
    | "1bhk"
    | "2bhk"
    | "3bhk"
    | "4bhk+"
    | "studio"
    | "commercial"
    | "plot";
export type StatusFilter = "all" | "ready-to-move" | "under-construction" | "new-launch";
export type PostedByFilter = "all" | "owner" | "agent" | "builder";
export type PropertyTypeFilter = "all" | "residential" | "commercial" | "plot" | "industrial";
export type FurnishingFilter = "all" | "furnished" | "semi-furnished" | "unfurnished";
export type FacingFilter = "all" | "east" | "west" | "north" | "south" | "north-east" | "north-west" | "south-east" | "south-west";
export type AgeFilter = "all" | "0-1" | "1-5" | "5-10" | "10+";
export type SortFilter = "relevance" | "price-low" | "price-high" | "newest" | "area-high" | "area-low";

export interface AreaFilter {
    min: string;
    max: string;
}

export interface FilterState {
    budget: BudgetFilter;
    config: ConfigFilter;
    status: StatusFilter;
    reraOnly: boolean;
    postedBy: PostedByFilter;
    propertyType: PropertyTypeFilter;
    furnishing: FurnishingFilter;
    facing: FacingFilter;
    age: AgeFilter;
    amenities: string[];
    area: AreaFilter;
    sortBy: SortFilter;
}

export const modeAccent: Record<
    ListingMode,
    { gradient: string; border: string; bg: string; text: string }
> = {
    buy: {
        gradient: "from-[#baa360] to-[#8f7b44]",
        border: "border-[#baa360]/30",
        bg: "bg-[#baa360]/10",
        text: "text-[#baa360]",
    },
    rent: {
        gradient: "from-[#4c8ef7] to-[#3666c9]",
        border: "border-[#4c8ef7]/30",
        bg: "bg-[#4c8ef7]/10",
        text: "text-[#4c8ef7]",
    },
    sell: {
        gradient: "from-[#22c55e] to-[#15803d]",
        border: "border-[#22c55e]/30",
        bg: "bg-[#22c55e]/10",
        text: "text-[#22c55e]",
    },
};

export const modeLabel: Record<ListingMode, string> = {
    buy: "Buy",
    rent: "Rent",
    sell: "Sell",
};

export const BRAND = {
    cardBg: "bg-gradient-to-br from-[#fffbf0] via-white to-[#fdf6e3]",
    iconBg: "bg-gradient-to-br from-[#baa360] to-[#8f7b44]",
    iconRing: "ring-2 ring-[#baa360]/25",
    valueCls: "bg-gradient-to-r from-[#7a5d1e] to-[#baa360] bg-clip-text text-transparent",
    labelCls: "text-[#8f7b44]",
    subCls: "text-[#a89060]/90",
    borderCls: "border-[#baa360]/25",
    hoverGlow:
        "hover:shadow-[0_8px_32px_rgba(186,163,96,0.24)] hover:border-[#baa360]/55",
};
