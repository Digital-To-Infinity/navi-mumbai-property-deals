"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

interface RegisterWrapperProps {
    initialMode?: "login" | "signup" | "forgot-password" | "reset-password";
}

const RegisterWrapper = ({ initialMode = "login" }: RegisterWrapperProps) => {
    const router = useRouter();
    const isLogin = initialMode === "login";
    const isSignup = initialMode === "signup";
    const isForgotPassword = initialMode === "forgot-password";
    const isResetPassword = initialMode === "reset-password";

    const toggleAuth = () => {
        if (isLogin) {
            router.push("/signup");
        } else {
            router.push("/login");
        }
    };

    // SEO: Breadcrumb Schema for structural path
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://navimumbaipropertydeals.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Account",
                "item": `https://navimumbaipropertydeals.com${isLogin ? "/login" : isSignup ? "/signup" : isForgotPassword ? "/forgot-password" : "/reset-password"}`
            }
        ]
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 md:p-12 max-[426px]:p-4 max-[426px]:py-10 relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {/* Professional subtle background pattern */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#baa360_1px,transparent_1px)] [background-size:20px_20px]"
                style={{ willChange: 'transform' }}
            ></div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[520px] relative z-10"
            >
                {/* Real Brand Logo */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="mb-2"
                    >
                        <Image
                            src="/images/nm-property-logo.png"
                            alt="Navi Mumbai Property Deals Secure Login"
                            width={200}
                            height={70}
                            className="h-auto w-[200px] max-[426px]:w-[180px] object-contain"
                            priority
                            fetchPriority="high"
                        />
                    </motion.div>
                    <div className="h-1 w-1/3 bg-brand-primary/50 rounded-full mt-2"></div>
                </div>

                {/* Clean Professional Card */}
                <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-neutral-200/60 overflow-hidden">
                    <div className="p-8 md:p-10 max-[426px]:p-4 max-[426px]:py-8">
                        <AnimatePresence mode="wait" initial={false}>
                            {isLogin && (
                                <motion.div
                                    key="login-view"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <Login onSwitch={toggleAuth} />
                                </motion.div>
                            )}
                            {isSignup && (
                                <motion.div
                                    key="signup-view"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <Signup onSwitch={toggleAuth} />
                                </motion.div>
                            )}
                            {isForgotPassword && (
                                <motion.div
                                    key="forgot-password-view"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <ForgotPassword />
                                </motion.div>
                            )}
                            {isResetPassword && (
                                <motion.div
                                    key="reset-password-view"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <ResetPassword />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterWrapper;
