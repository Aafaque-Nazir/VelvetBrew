"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { AuthProvider } from "@/components/AuthProvider";
import { CartProvider } from "@/lib/cartContext";

export default function ClientLayout({ children, isAdmin }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isMaintenance = pathname === "/maintenance"; // Special case if we route there, but we might render inline

  return (
    <AuthProvider>
      <CartProvider>
        {!isAdminPage && !isMaintenance && <Navbar isAdmin={isAdmin} />}
        {!isAdminPage && !isMaintenance && <CartDrawer />}
        <main
          className={
            !isAdminPage && !isMaintenance
              ? "min-h-screen pt-20"
              : "min-h-screen"
          }
        >
          {children}
        </main>
        {!isAdminPage && !isMaintenance && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}
