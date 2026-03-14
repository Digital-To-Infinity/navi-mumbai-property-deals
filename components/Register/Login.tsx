"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginProps {
    onSwitch: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitch }) => {
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    // Regex Patterns
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (name: string, value: string) => {
        let error = "";
        switch (name) {
            case "email":
                if (!EMAIL_REGEX.test(value)) error = "Enter a valid email address";
                break;
            case "password":
                if (value.length < 1) error = "Password is required";
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-brand-heading mb-2">Welcome Back</h2>
                <p className="text-brand-paragraph/70 font-medium tracking-tight">Sign in with your email or social accounts</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                    <label htmlFor="email-login" className="text-sm font-semibold text-brand-heading ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary"}`} />
                        <input
                            id="email-login"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            autoComplete="email"
                            aria-describedby={errors.email ? "email-error" : undefined}
                            aria-invalid={!!errors.email}
                            className={`w-full pl-12 pr-4 py-3.5 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted ${errors.email ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"
                                }`}
                        />
                    </div>
                    {errors.email && <p id="email-error" role="alert" aria-live="polite" className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                        <label htmlFor="password-login" className="text-sm font-semibold text-brand-heading">Password</label>
                        <button type="button" className="text-xs font-bold text-brand-primary hover:text-brand-primary-hover hover:underline transition-colors cursor-pointer">
                            Forgot Password?
                        </button>
                    </div>
                    <div className="relative group">
                        <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.password ? "text-red-400" : "text-brand-muted group-focus-within:text-brand-primary transition-colors"}`} />
                        <input
                            id="password-login"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            aria-describedby={errors.password ? "password-error" : undefined}
                            aria-invalid={!!errors.password}
                            className={`w-full pl-12 pr-12 py-3.5 bg-brand-muted/5 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-brand-heading placeholder:text-brand-muted tracking-widest ${errors.password ? "border-red-500 focus:ring-red-500/5 focus:border-red-500" : "border-brand-muted/30 focus:ring-brand-primary/5 focus:border-brand-primary"
                                }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-mutedbrand-muted hover:text-brand-primary transition-colors cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p id="password-error" role="alert" aria-live="polite" className="text-[11px] text-red-500 font-bold ml-1 uppercase tracking-wide">{errors.password}</p>}
                </div>

                <div className="space-y-3">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={Object.values(errors).some((err) => err !== "") || formData.email === "" || formData.password === ""}
                        className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/10 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:y-0"
                    >
                        Log In
                    </motion.button>
                    <p className="text-[11px] text-center text-brand-paragraph font-bolder uppercase tracking-[0.10em]">
                        🛡️ SSL Secure & RERA Verified Portal
                    </p>
                </div>
            </form>

            <div className="relative my-10 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-brand-muted/30"></div>
                </div>
                <span className="relative px-4 bg-white text-xs font-bold text-brand-muted uppercase tracking-widest">Or login with</span>
            </div>

            <button
                type="button"
                aria-label="Log in with Google"
                className="w-full bg-white text-brand-heading py-4 rounded-xl font-bold flex items-center justify-center gap-3 border border-brand-muted/20 hover:bg-brand-muted/10 transition-all shadow-sm hover:border-brand-muted/20 cursor-pointer"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Log In with Google
            </button>

            <p className="mt-10 text-center text-brand-paragraph/70 font-medium">
                Don't have an account?{" "}
                <button
                    onClick={onSwitch}
                    className="text-brand-primary font-semibold hover:underline decoration-brand-primary decoration-2 underline-offset-2 cursor-pointer"
                >
                    Join free today
                </button>
            </p>
        </div>
    );
};

export default Login;
