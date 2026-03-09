export interface Property {
    id: string | number;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    tag: string;
    image: string;
    type?: string;
}

export const buyProperties: Property[] = [
    {
        id: "prop1",
        title: "Luxury 4 BHK Villa",
        location: "Seawoods, Navi Mumbai",
        price: "₹ 5.5 Cr",
        beds: 4,
        baths: 4,
        sqft: "3,200",
        tag: "Ready to Move",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "prop2",
        title: "Premium Sea-facing Apartment",
        location: "Vashi, Navi Mumbai",
        price: "₹ 3.2 Cr",
        beds: 3,
        baths: 3,
        sqft: "2,100",
        tag: "Premium",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "prop3",
        title: "Modern 2 BHK Flat",
        location: "Kharghar, Navi Mumbai",
        price: "₹ 1.1 Cr",
        beds: 2,
        baths: 2,
        sqft: "1,150",
        tag: "New Launch",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "prop4",
        title: "Spacious Duplex Penthouse",
        location: "Nerul, Navi Mumbai",
        price: "₹ 4.8 Cr",
        beds: 5,
        baths: 5,
        sqft: "4,500",
        tag: "Exclusive",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "prop5",
        title: "Smart Home 3 BHK",
        location: "Belapur, Navi Mumbai",
        price: "₹ 2.5 Cr",
        beds: 3,
        baths: 3,
        sqft: "1,850",
        tag: "Under Construction",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: "prop6",
        title: "Ultra-Luxury Open Space Apartment",
        location: "Panvel, Navi Mumbai",
        price: "₹ 1.8 Cr",
        beds: 3,
        baths: 3,
        sqft: "1,950",
        tag: "Upgraded",
        image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];
