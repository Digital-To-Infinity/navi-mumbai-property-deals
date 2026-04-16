"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (!token) {
            toast.error("Invalid or missing reset token.");
        }
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        try {
            // Partial schema parse for dynamic validation
            const tempFormData = { ...formData, [name]: value };
            resetPasswordSchema.parse(tempFormData);
            setErrors({ newPassword: "", confirmPassword: "" });
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors = { newPassword: "", confirmPassword: "" };
                err.issues.forEach((issue) => {
                    const path = issue.path[0] as keyof typeof newErrors;
                    if (path) newErrors[path] = issue.message;
                });
                setErrors(prev => ({ ...prev, [name]: newErrors[name as keyof typeof newErrors] || "" }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token) {
            toast.error("Missing reset token.");
            return;
        }

        try {
            resetPasswordSchema.parse(formData);
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors = { newPassword: "", confirmPassword: "" };
                err.issues.forEach((issue) => {
                    const path = issue.path[0] as keyof typeof newErrors;
                    if (path) newErrors[path] = issue.message;
                });
                setErrors(newErrors);
                return;
            }
        }

        setLoading(true);
        try {
            const response = await api.post("/auth/reset-password", { 
                token, 
                newPassword: formData.newPassword 
            });
            toast.success(response.data.message || "Password changed successfully.");
            setSuccess(true);
        } catch (error) {
            const message = (error as any).response?.data?.message || (error as Error).message || "Failed to reset password";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-brand-heading mb-4">Password Reset</h2>
                <p className="text-brand-paragraph/80 mb-8">
                    Your password has been successfully reset. You can now use your new password to log in.
                </p>
                <button 
                    onClick={() => router.push("/login")}
                    className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold inline-flex items-center justify-center gap-2 hover:bg-brand-primary-hover shadow-lg transition-all cursor-pointer"
                >
                    Continue to Login
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-heading mb-2">Set New Password</h2>
                <p className="text-brand-paragraph/70 font-medium tracking-tight">Your new password must be different to previously used passwords.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                    <label htmlFor="newPassword" className="text-sm font-semibold text-brand-heading ml-1">New Password</label>
                    <div className="relative group">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.newPassword ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary"}`} />
                        <input
                            id="newPassword"
                            type={showPassword1 ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Min. 6 characters"
                            className={`w-full pl-12 pr-12 py-3.5 max-[426px]:py-3 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted ${errors.newPassword ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword1(!showPassword1)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
                        >
                            {showPassword1 ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.newPassword && <p className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{errors.newPassword}</p>}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-brand-heading ml-1">Confirm Password</label>
                    <div className="relative group">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.confirmPassword ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary"}`} />
                        <input
                            id="confirmPassword"
                            type={showPassword2 ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className={`w-full pl-12 pr-12 py-3.5 max-[426px]:py-3 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted ${errors.confirmPassword ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword2(!showPassword2)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
                        >
                            {showPassword2 ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{errors.confirmPassword}</p>}
                </div>

                <div className="space-y-4">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading || Object.values(errors).some(e => e !== "") || !formData.newPassword || !formData.confirmPassword || !token}
                        className="w-full bg-brand-primary text-white py-4 max-[426px]:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:y-0"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
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

export default ResetPassword;
