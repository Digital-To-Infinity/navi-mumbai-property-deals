import RegisterWrapper from "@/components/Register/RegisterWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up | Navi Mumbai Property Deals",
    description: "Join Navi Mumbai's premier property portal. Create an account to access exclusive real estate listings and market insights.",
    robots: "noindex, nofollow",
};

export default function SignupPage() {
    return (
        <main className="bg-neutral-bg min-h-screen">
            <RegisterWrapper initialMode="signup" />
        </main>
    );
}
