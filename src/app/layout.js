import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { getSystemSettings } from "@/lib/settings";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { isAdmin } from "@/lib/admin";
import MaintenanceScreen from "@/components/MaintenanceScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VelvetBrew | Premium Coffee Machines",
  description: "Experience the art of coffee with our precision-engineered espresso machines.",
};

export default async function RootLayout({ children }) {
  let settings = { maintenanceMode: false };
  let session = null;

  try {
    settings = await getSystemSettings();
  } catch (e) {
    console.error("[Layout] Failed to fetch settings:", e.message);
  }

  try {
    session = await getServerSession(authOptions);
  } catch (e) {
    console.error("[Layout] Failed to fetch session:", e.message);
  }

  const isMaintenanceOn = settings.maintenanceMode;
  const isUserAdmin = session && isAdmin(session.user?.email);

  // If maintenance is ON and user is NOT admin, show maintenance screen
  // EXCEPT for login page? No, usually admin login is separate or we allow /api/auth to work.
  // Using ClientLayout logic might hide Navbar, but here we replace the whole body content.
  // Note: We need to allow Google Auth callback to work so Admin can actually log in even during maintenance!
  // So we pass a prop effectively or handle partial rendering.

  // Better logic: passing 'maintenanceMode' to ClientLayout? 
  // If we return MaintenanceScreen here, standard routes won't work. 
  // BUT we must allow the Admin to login. 

  if (isMaintenanceOn && !isUserAdmin) {
    // We return ClientLayout but forcing maintenance? 
    // Or we just return MaintenanceScreen. 
    // Issue: How does Admin login if they see Maintenance Screen?
    // Solution: Allow /api routes to pass through (this is layout, applied to pages).
    // We need to render Children ONLY if it's admin or maintenance off.

    // Wait, if I replace children with MaintenanceScreen, user valid session check happens first. 
    // If user is NOT logged in, they see maintenance.
    // How do they login? They need a "Admin Login" button on maintenance page likely?
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-bronze-500 selection:text-black overflow-x-hidden`}>
        {isMaintenanceOn && !isUserAdmin ? (
          <ClientLayout>
            {/* We render maintenance screen inside the providers so Auth still works if we add a Login button later */}
            <MaintenanceScreen />
            {/* Invisible login trigger for admin could be implemented, or just manual /api/auth/signin call if needed, 
                     but for now, let's assume Admin is ALREADY logged in or we add a hidden/small link on Maintenance page */}
          </ClientLayout>
        ) : (
          <ClientLayout isAdmin={isUserAdmin}>{children}</ClientLayout>
        )}
      </body>
    </html>
  );
}
