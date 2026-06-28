"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/adminpanel") || pathname?.startsWith("/studentlogin");

    return (
        <>
            {!isAdmin && <Navbar />}
            {children}
            {!isAdmin && <Footer />}
            {!isAdmin && <ScrollToTop />}
        </>
    );
}
