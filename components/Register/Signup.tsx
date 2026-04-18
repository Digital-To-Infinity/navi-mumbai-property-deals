"use client";
import React, { useState } from "react";
import { Mail, Lock, User, Phone, ShieldCheck, Eye, EyeOff, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const signupBaseSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(/^\+91[6-9]\d{9}$/, "Enter a valid Indian mobile number starting with +91"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, "Min. 8 chars, 1 Uppercase, 1 Number & 1 Special Char"),
    confirmPassword: z.string(),
});

const signupSchema = signupBaseSchema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

interface SignupProps {
    onSwitch: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSwitch }) => {
    console.log("Google Client ID:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "+91 ",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // State for Checkbox
    const [agreed, setAgreed] = useState(false);

    // Password Strength Logic
    const getPasswordStrength = (pass: string) => {
        if (!pass) return 0;
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[@$!%*?&#]/.test(pass)) score++;
        return score; // 0-4
    };

    const strength = getPasswordStrength(formData.password);
    const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
    const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-500"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        // Dynamic validation
        try {
            if (name === "confirmPassword") {
                if (value !== formData.password) {
                    setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
                } else {
                    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }
            } else {
                // Use base schema for picking fields
                const fieldSchema = (signupBaseSchema as any).pick({ [name]: true });
                fieldSchema.parse({ [name]: value });
                setErrors((prev) => ({ ...prev, [name]: "" }));

                // If password changed, re-check confirmPassword match
                if (name === "password" && formData.confirmPassword) {
                    if (value !== formData.confirmPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
                    } else {
                        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                    }
                }
            }
        } catch (err) {
            if (err instanceof z.ZodError) {
                setErrors((prev) => ({ ...prev, [name]: err.issues[0].message }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!agreed) {
            toast.error("Please agree to the Terms and Privacy Policy");
            return;
        }

        try {
            signupSchema.parse(formData);
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors = { fullName: "", phone: "", email: "", password: "", confirmPassword: "" };
                err.issues.forEach((issue) => {
                    const path = issue.path[0] as keyof typeof newErrors;
                    newErrors[path] = issue.message;
                });
                setErrors(newErrors);
                toast.error("Please fix the errors in the form");
                return;
            }
        }

        setLoading(true);
        try {
            const response = await api.post("/auth/register", {
                fullName: formData.fullName,
                phone: formData.phone,
                email: formData.email,
                password: formData.password
            });
            
            toast.success("Account created successfully! Please login.");
            onSwitch(); // Redirect to Login
        } catch (error: any) {
            const message = error.message || "Failed to register";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async (credential: string) => {
        setLoading(true);
        try {
            const response = await api.post("/auth/google", { idToken: credential });

            const { token, user } = response.data.data;
            const userData = {
                id: user.id || user._id,
                name: user.name || user.full_name || user.fullName,
                email: user.email,
                role: user.role
            };
            login(userData, token);
            toast.success("Account created and logged in with Google!");
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || "Google Signup failed";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-heading mb-2">Create Account</h2>
                <p className="text-brand-paragraph/70 font-medium tracking-tight">Join Navi Mumbai's premier property portal</p>
            </div>

            <div className="space-y-4">
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        if (credentialResponse.credential) {
                            handleGoogleSignup(credentialResponse.credential);
                        }
                    }}
                    onError={() => {
                        toast.error("Google Signup Failed");
                    }}
                    useOneTap
                    theme="outline"
                    shape="pill"
                    width="100%"
                    text="signup_with"
                />

                <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-brand-muted/30"></div>
                    </div>
                    <span className="relative px-4 bg-white text-[10px] font-bold text-brand-muted uppercase tracking-widest">Or create account</span>
                </div>
            </div>

            <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-sm font-semibold text-brand-heading ml-1">Full Name</label>
                    <div className="relative group">
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.fullName ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary"}`} />
                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="e.g. Alex Johnson"
                            autoComplete="name"
                            aria-describedby={errors.fullName ? "name-error" : undefined}
                            aria-invalid={!!errors.fullName}
                            className={`w-full pl-12 pr-4 py-3.5 max-[426px]:py-3 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted ${errors.fullName ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"
                                }`}
                        />
                    </div>
                    {errors.fullName && <p id="name-error" role="alert" aria-live="polite" className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{errors.fullName}</p>}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-brand-heading ml-1">Phone Number</label>
                    <div className="relative group">
                        <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.phone ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary"}`} />
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+919876543210"
                            autoComplete="tel"
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                            aria-invalid={!!errors.phone}
                            className={`w-full pl-12 pr-4 py-3.5 max-[426px]:py-3 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted ${errors.phone ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"
                                }`}
                        />
                    </div>
                    {errors.phone && <p id="phone-error" role="alert" aria-live="polite" className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{errors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="email-signup" className="text-sm font-semibold text-brand-heading ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary"}`} />
                        <input
                            id="email-signup"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="alex@example.com"
                            autoComplete="email"
                            aria-describedby={errors.email ? "email-error-signup" : undefined}
                            aria-invalid={!!errors.email}
                            className={`w-full pl-12 pr-4 py-3.5 max-[426px]:py-3 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted ${errors.email ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"
                                }`}
                        />
                    </div>
                    {errors.email && <p id="email-error-signup" role="alert" aria-live="polite" className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="password-signup" className="text-sm font-semibold text-brand-heading ml-1">Password</label>
                    <div className="relative group">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.password ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary"}`} />
                        <input
                            id="password-signup"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Min. 8 characters"
                            autoComplete="new-password"
                            aria-describedby={errors.password ? "password-error-signup" : undefined}
                            aria-invalid={!!errors.password}
                            className={`w-full pl-12 pr-12 py-3.5 max-[426px]:py-3 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted tracking-wide ${errors.password ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Password Strength Meter */}
                    {formData.password && (
                        <div className="mt-1.5 space-y-1.5 px-1">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wide text-brand-muted">
                                <span>Technical Strength:</span>
                                <span className={strength === 0 ? "text-red-500" : strength < 3 ? "text-orange-500" : "text-emerald-500"}>
                                    {strengthLabels[strength - 1] || "Very Weak"}
                                </span>
                            </div>
                            <div className="flex gap-1 h-1">
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        className={`flex-1 rounded-full transition-all duration-500 ${step <= strength ? strengthColors[strength - 1] : "bg-brand-muted/10"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {errors.password && <p id="password-error-signup" role="alert" aria-live="polite" className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{errors.password}</p>}
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-brand-heading ml-1">Confirm Password</label>
                    <div className="relative group">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.confirmPassword ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary"}`} />
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            autoComplete="new-password"
                            aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                            aria-invalid={!!errors.confirmPassword}
                            className={`w-full pl-12 pr-12 py-3.5 max-[426px]:py-3 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted tracking-wide ${errors.confirmPassword ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-primary transition-colors cursor-pointer"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <p id="confirm-error" role="alert" aria-live="polite" className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-start gap-3 py-2 cursor-pointer group">
                    <div className="mt-1">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            required
                            aria-required="true"
                            className="w-4 h-4 rounded border-brand-muted/50 text-brand-primary focus:ring-brand-primary accent-brand-primary transition-all cursor-pointer"
                        />
                    </div>
                    <label htmlFor="terms" className="text-xs text-brand-paragraph/60 leading-relaxed cursor-pointer font-medium group-hover:text-brand-heading transition-colors">
                        I agree to the <span className="text-brand-primary font-bold hover:underline">Terms of Service</span> and <span className="text-brand-primary font-bold hover:underline">Privacy Policy</span>. I also consent to receive updates via WhatsApp.
                    </label>
                </div>

                <div className="space-y-4 pt-2">
                    <div className="space-y-3">
                        <div className="flex flex-col items-center gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-primary text-white py-4 max-[426px]:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/10 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Free Account"}
                            </button>
                            <span className="text-[11px] text-brand-paragraph/60 font-semibold italic">
                                Join 5,000+ Navi Mumbai residents.
                            </span>
                        </div>
                        <p className="text-[10px] text-center text-brand-muted font-bold uppercase tracking-[0.15em]">
                            🛡️ SSL Secure & RERA Verified Portal
                        </p>
                    </div>
                </div>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] max-[321px]:text-[10px] text-emerald-600 font-bold bg-emerald-50 px-4 max-[321px]:px-2 py-2.5 rounded-lg border border-emerald-100 uppercase tracking-widest max-[321px]:tracking-wide">
                <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                Your data is encrypted and secure
            </div>

            <p className="mt-10 text-center text-brand-paragraph/70 font-medium">
                Already a member?{" "}
                <button
                    onClick={onSwitch}
                    className="text-brand-primary font-semibold hover:underline decoration-brand-primary decoration-2 underline-offset-2 cursor-pointer"
                >
                    Log In
                </button>
            </p>
        </div>
    );
};

export default Signup;
