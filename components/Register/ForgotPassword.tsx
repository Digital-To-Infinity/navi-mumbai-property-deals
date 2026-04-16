"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

const forgotSchema = z.object({
    email: z.string().email("Enter a valid email address"),
});

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        
        try {
            forgotSchema.parse({ email: value });
            setError("");
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.issues[0].message);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            forgotSchema.parse({ email });
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError(err.issues[0].message);
                return;
            }
        }

        setLoading(true);
        try {
            const response = await api.post("/auth/forgot-password", { email });
            toast.success(response.data.message || "Password reset link sent.");
            setSuccess(true);
        } catch (error) {
            const message = (error as any).response?.data?.message || (error as Error).message || "Failed to send reset link";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-brand-heading mb-4">Check your email</h2>
                <p className="text-brand-paragraph/80 mb-8">
                    We've sent a password reset link to <br/>
                    <span className="font-semibold text-brand-heading">{email}</span>
                </p>
                <button 
                    onClick={() => router.push("/login")}
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primary-hover transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to log in
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-heading mb-2">Forgot Password</h2>
                <p className="text-brand-paragraph/70 font-medium tracking-tight">Enter your email and we'll send you a reset link</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                    <label htmlFor="email-forgot" className="text-sm font-semibold text-brand-heading ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${error ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary"}`} />
                        <input
                            id="email-forgot"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            autoComplete="email"
                            aria-describedby={error ? "email-error" : undefined}
                            aria-invalid={!!error}
                            className={`w-full pl-12 pr-4 py-3.5 max-[426px]:py-3 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted ${error ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"}`}
                        />
                    </div>
                    {error && <p id="email-error" role="alert" aria-live="polite" className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{error}</p>}
                </div>

                <div className="space-y-4">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading || error !== "" || email === ""}
                        className="w-full bg-brand-primary text-white py-4 max-[426px]:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:y-0"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
                    </motion.button>
                </div>
            </form>

            <div className="mt-8 text-center">
                <button 
                    type="button"
                    onClick={() => router.push("/login")}
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-paragraph hover:text-brand-primary transition-colors cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    Back to log in
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
