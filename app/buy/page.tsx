import BuySection from '@/components/Home/BuySection';


export default function BuyPage() {
    return (
        <div className="min-h-screen pt-24">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-brand-heading mb-3">
                        Buy Properties in Navi Mumbai
                    </h1>
                    <p className="text-zinc-600 max-w-3xl text-lg">
                        Explore verified residential and commercial properties for sale. From luxury villas to affordable flats, find your dream home in Navi Mumbai's prime locations.
                    </p>
                </div>
                <BuySection />
            </div>
        </div>
    );
}
