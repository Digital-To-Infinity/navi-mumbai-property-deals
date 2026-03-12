
export default function ContactSchema() {
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Navi Mumbai Property Deals",
        "image": "https://navimumbaipropertydeals.com/assets/images/logo.png", // Verified absolute URL
        "@id": "https://navimumbaipropertydeals.com",
        "url": "https://navimumbaipropertydeals.com",
        "telephone": ["+91 98765 43210", "+91 22 2345 6789"],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Shop 12, Sector 20, Kharghar",
            "addressLocality": "Navi Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "410210",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 19.027,
            "longitude": 73.056
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "10:00",
                "closes": "20:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "11:00",
                "closes": "17:00"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/navimumbaipropertydeals",
            "https://www.instagram.com/navimumbaipropertydeals",
            "https://twitter.com/nmpdeals"
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How long does it take to find a property through your agency?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Typically, our clients find their ideal home within 7-14 days. We leverage our deep local network and 'off-market' listings in Kharghar and Panvel which aren't available on public portals."
                }
            },
            {
                "@type": "Question",
                "name": "Do you charge any brokerage fees for new projects?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For most RERA-registered new construction projects, where we represent the developer, there is ZERO brokerage fee collected from the buyer. For resale properties, standard professional fees apply."
                }
            },
            {
                "@type": "Question",
                "name": "Can you help with home loan processing?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We have strategic partnerships with top banks like HDFC, ICICI, and SBI. We assist with documentation and secure the fastest possible approvals for our clients."
                }
            },
            {
                "@type": "Question",
                "name": "What legal checks do you perform on properties?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our team performs a rigorous 22-point verification process including Title Deed check, CIDCO Transfer history, Occupation Certificate (OC) status, and RERA compliance."
                }
            },
            {
                "@type": "Question",
                "name": "What areas of Navi Mumbai do you specialize in?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We have hyper-local expertise in Kharghar, Panvel, Ulwe, Taloja, and Seawoods. These are the fastest-growing hubs with the highest potential for both living and investment appreciation, especially with the impact of Atal Setu."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
