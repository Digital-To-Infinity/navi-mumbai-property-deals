export const buyMegaMenuData = {
    "Buy a Home": [
        { title: "Flats", href: "/buy/flats" },
        { title: "Apartments", href: "/buy/apartments" },
        { title: "Studio Apartment", href: "/buy/studio-apartment" },
        { title: "Independent House", href: "/buy/independent-house" },
        { title: "Plots in Navi Mumbai", href: "/buy/plots-in-navi-mumbai" },
        { title: "Villa", href: "/buy/villa" }
    ],
    "Land/Plot": [
        { title: "Plots in Navi Mumbai", href: "/buy/land/plots-in-navi-mumbai" },
        { title: "Freehold Plots", href: "/buy/land/freehold-plots" },
        { title: "Authority Plots", href: "/buy/land/authority-plots" },
        { title: "MCGM Authority Plots", href: "/buy/land/mcgm-authority-plots" },
        { title: "MMRDA Authority Plots", href: "/buy/land/mmrda-authority-plots" }
    ],
    "Commercial": [
        { title: "Ready to move office", href: "/buy/commercial/ready-to-move-office" },
        { title: "Bare shell office spaces", href: "/buy/commercial/bare-shell-office-spaces" },
        { title: "Shops", href: "/buy/commercial/shops" },
        { title: "Factory", href: "/buy/commercial/factory" },
        { title: "Warehouses", href: "/buy/commercial/warehouses" },
        { title: "Showrooms", href: "/buy/commercial/showrooms" },
        { title: "Industrial Lands/Plots", href: "/buy/commercial/industrial-lands-plots" }
    ],
    "Popular Areas": [
        { title: "Vashi", href: "/buy/areas/vashi" },
        { title: "Nerul", href: "/buy/areas/nerul" },
        { title: "Belapur", href: "/buy/areas/belapur" },
        { title: "Kharghar", href: "/buy/areas/kharghar" },
        { title: "Panvel", href: "/buy/areas/panvel" }
    ],
    "Blogs and Articles": [
        { title: "Blogs for Buyers", href: "/blogs/buyers" },
        { title: "Articles for Buyers", href: "/articles/buyers" },
        { title: "Articles for Real Estate", href: "/articles/real-estate" },
        { title: "Blogs for Real Estate", href: "/blogs/real-estate" }
    ]
};

export type Category = keyof typeof buyMegaMenuData;

export const rentMegaMenuData = {
    "Rent A Home": [
        { title: "Flats", href: "/rent/flats" },
        { title: "Apartments", href: "/rent/apartments" },
        { title: "Studio Apartment", href: "/rent/studio-apartment" },
        { title: "Independent House", href: "/rent/independent-house" },
        { title: "Plots in Navi Mumbai", href: "/rent/plots-in-navi-mumbai" },
        { title: "Villa", href: "/rent/villa" }
    ],
    "PG/Co-Living": [
        { title: "Plots in Navi Mumbai", href: "/rent/pg/plots-in-navi-mumbai" },
        { title: "Freehold Plots", href: "/rent/pg/freehold-plots" },
        { title: "Authority Plots", href: "/rent/pg/authority-plots" },
        { title: "MCGM Authority Plots", href: "/rent/pg/mcgm-authority-plots" },
        { title: "MMRDA Authority Plots", href: "/rent/pg/mmrda-authority-plots" }
    ],
    "Commercial": [
        { title: "Ready to move office", href: "/rent/commercial/ready-to-move-office" },
        { title: "Bare shell office spaces", href: "/rent/commercial/bare-shell-office-spaces" },
        { title: "Shops", href: "/rent/commercial/shops" },
        { title: "Factory", href: "/rent/commercial/factory" },
        { title: "Warehouses", href: "/rent/commercial/warehouses" },
        { title: "Showrooms", href: "/rent/commercial/showrooms" },
        { title: "Industrial Lands/Plots", href: "/rent/commercial/industrial-lands-plots" }
    ],
    "Popular Areas": [
        { title: "Vashi", href: "/rent/areas/vashi" },
        { title: "Nerul", href: "/rent/areas/nerul" },
        { title: "Belapur", href: "/rent/areas/belapur" },
        { title: "Kharghar", href: "/rent/areas/kharghar" },
        { title: "Panvel", href: "/rent/areas/panvel" }
    ],
    "Blogs and Articles": [
        { title: "Blogs for Buyers", href: "/blogs/buyers" },
        { title: "Articles for Buyers", href: "/articles/buyers" },
        { title: "Articles for Real Estate", href: "/articles/real-estate" },
        { title: "Blogs for Real Estate", href: "/blogs/real-estate" }
    ]
};

export type RentCategory = keyof typeof rentMegaMenuData;

export const sellPropertyCategories = {
    "Residential": [
        { title: "Flats", href: "/sell/residential/flats" },
        { title: "Apartments", href: "/sell/residential/apartments" },
        { title: "Studio Apartment", href: "/sell/residential/studio-apartment" },
        { title: "Independent House", href: "/sell/residential/independent-house" },
        { title: "Villa", href: "/sell/residential/villa" }
    ],
    "Commercial": [
        { title: "Office Spaces", href: "/sell/commercial/office-spaces" },
        { title: "Shops", href: "/sell/commercial/shops" },
        { title: "Factories", href: "/sell/commercial/factories" },
        { title: "Warehouses", href: "/sell/commercial/warehouses" }
    ],
    "Land/Plots": [
        { title: "Residential Plots", href: "/sell/land-plots/residential-plots" },
        { title: "Industrial Land", href: "/sell/land-plots/industrial-land" },
        { title: "Agricultural Land", href: "/sell/land-plots/agricultural-land" }
    ],
    "Blogs and Articles": [
        { title: "Blogs for Sellers", href: "/blogs/sellers" },
        { title: "Articles for Sellers", href: "/articles/sellers" },
        { title: "Articles for Real Estate", href: "/articles/real-estate" },
        { title: "Blogs for Real Estate", href: "/blogs/real-estate" }
    ]
};
