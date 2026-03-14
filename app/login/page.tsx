import RegisterWrapper from "@/components/Register/RegisterWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login | Navi Mumbai Property Deals",
    description: "Welcome back to Navi Mumbai Property Deals. Sign in to your account to manage your listings and saved properties.",
    robots: "noindex, nofollow",
};

export default function LoginPage() {
    return (
        <main className="bg-neutral-bg min-h-screen">
            <RegisterWrapper initialMode="login" />
        </main>
    );
}
