import type { Metadata } from "next";
import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar/Navbar";
import BottomNavbar from "@/components/common/BottomNavbar";
import Footer from "@/components/common/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";

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
        <Navbar />
        <main className="mt-24">
          <Breadcrumb />
          {children}
        </main>
        <Footer />
        <BottomNavbar />
      </body>
    </html>
  );
}
