import RegisterWrapper from "@/components/Register/RegisterWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password | Navi Mumbai Property Deals",
    description: "Reset your password for your Navi Mumbai Property Deals account.",
    robots: "noindex, nofollow",
};

export default function ForgotPasswordPage() {
    return (
        <main className="bg-neutral-bg min-h-screen">
            <RegisterWrapper initialMode="forgot-password" />
        </main>
    );
}
