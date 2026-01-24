"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  Coffee,
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <aside className="w-64 bg-[#151515] border-r border-white/5 h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="p-6 border-b border-white/5 flex items-center gap-2">
        <Coffee className="text-bronze-500" />
        <span className="font-bold text-white tracking-widest text-lg">
          VB<span className="text-bronze-500">ADMIN</span>
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-bold text-white/30 uppercase tracking-widest px-4 mb-2 mt-4">
          Overview
        </p>
        <NavItem
          href="/admin"
          icon={<LayoutDashboard size={18} />}
          active={isActive("/admin")}
        >
          Dashboard
        </NavItem>

        <p className="text-xs font-bold text-white/30 uppercase tracking-widest px-4 mb-2 mt-6">
          Management
        </p>
        <NavItem
          href="/admin/products"
          icon={<Coffee size={18} />}
          active={
            isActive("/admin/products") ||
            pathname.startsWith("/admin/products")
          }
        >
          Products
        </NavItem>
        <NavItem
          href="/admin/orders"
          icon={<Package size={18} />}
          active={
            isActive("/admin/orders") || pathname.startsWith("/admin/orders")
          }
        >
          Orders
        </NavItem>
        <NavItem
          href="/admin/customers"
          icon={<Users size={18} />}
          active={isActive("/admin/customers")}
        >
          Customers
        </NavItem>

        <p className="text-xs font-bold text-white/30 uppercase tracking-widest px-4 mb-2 mt-6">
          System
        </p>
        <NavItem
          href="/admin/settings"
          icon={<Settings size={18} />}
          active={isActive("/admin/settings")}
        >
          Settings
        </NavItem>
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
        >
          <LogOut size={18} />
          Exit Admin
        </button>
      </div>
    </aside>
  );
}

function NavItem({ href, icon, children, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
        active
          ? "bg-bronze-500 text-black shadow-lg shadow-bronze-500/20"
          : "text-white/60 hover:text-white hover:bg-white/5"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
