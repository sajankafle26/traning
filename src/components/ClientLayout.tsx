"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BackToTop from "@/components/BackToTop";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/adminpanel") || pathname?.startsWith("/studentlogin");

    return (
        <>
            {!isAdmin && <Navbar />}
            <main id="main-content" role="main">
                {children}
            </main>
            {!isAdmin && <Footer />}
            {!isAdmin && <ScrollToTop />}
            {!isAdmin && <BackToTop />}
        </>
    );
}
