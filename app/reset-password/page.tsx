import RegisterWrapper from "@/components/Register/RegisterWrapper";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Reset Password | Navi Mumbai Property Deals",
    description: "Create a new password for your Navi Mumbai Property Deals account.",
    robots: "noindex, nofollow",
};

export default function ResetPasswordPage() {
    return (
        <main className="bg-neutral-bg min-h-screen">
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            }>
                <RegisterWrapper initialMode="reset-password" />
            </Suspense>
        </main>
    );
}
