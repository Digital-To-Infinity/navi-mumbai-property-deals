import type { Metadata } from "next";
import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar/Navbar";
import BottomNavbar from "@/components/common/BottomNavbar";
import Footer from "@/components/common/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Navi Mumbai Property Deals",
  description: "Explore the most exclusive properties in the most desirable locations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${montserrat.variable}`}>
      <body className="">
        <AuthProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <Toaster position="top-center" />
            <Navbar />
            <main className="mt-24 max-[426px]:mt-16">
              <Breadcrumb />
              {children}
            </main>
            <Footer />
            <BottomNavbar />
          </GoogleOAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
