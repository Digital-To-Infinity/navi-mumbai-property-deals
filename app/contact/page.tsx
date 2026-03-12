import ContactHero from "@/components/Contact/ContactHero";
import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";
import ContactMap from "@/components/Contact/ContactMap";
import ExpertAdvisors from "@/components/Contact/ExpertAdvisors";
import ContactFAQ from "@/components/Contact/ContactFAQ";

export const metadata = {
    title: "Contact Us | Navi Mumbai Property Deals",
    description: "Get in touch with Navi Mumbai's premier real estate consultancy. Whether you're buying, selling, or renting, our experts are here to help.",
};

export default function Contact() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <ContactHero />

            <div className="relative z-10 bg-zinc-950">
                <section className="py-24 px-4">
                    <div className="container mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <ContactInfo />
                            <ContactForm />
                        </div>
                    </div>
                </section>

                <ExpertAdvisors />
                <ContactMap />
                <ContactFAQ />
            </div>
        </main>
    );
}
