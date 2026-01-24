import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "VelvetBrew Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || !isAdmin(session.user.email)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#0f0e0e] text-white flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
          {children}
      </main>
    </div>
  );
}
