"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/lib/cartContext";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isMaintenance = pathname === "/maintenance"; // Special case if we route there, but we might render inline

  return (
    <AuthProvider>
      <CartProvider>
        {!isAdmin && !isMaintenance && <Navbar />}
        {!isAdmin && !isMaintenance && <CartDrawer />}
        <main
          className={
            !isAdmin && !isMaintenance ? "min-h-screen pt-20" : "min-h-screen"
          }
        >
          {children}
        </main>
        {!isAdmin && !isMaintenance && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}
