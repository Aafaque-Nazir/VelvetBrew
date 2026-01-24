"use client";
import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { User, Package, Settings, LogOut, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccountPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');

  if (!session) {
      return (
          <div className="min-h-screen pt-32 text-center text-white">
              <h1 className="text-2xl font-bold mb-4">Please log in to view your account.</h1>
              <Button onClick={() => window.location.href = '/'}>Return Home</Button>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-[#0f0e0e] pt-32 pb-24">
       <div className="container mx-auto px-6 max-w-6xl">
           <div className="flex flex-col md:flex-row gap-8">
               
               {/* Sidebar */}
               <aside className="w-full md:w-64 shrink-0 space-y-2">
                    <UserCard session={session} />
                    
                    <nav className="bg-[#151515] border border-white/5 rounded-2xl p-2 md:p-4 space-y-1">
                        <NavButton 
                            active={activeTab === 'profile'} 
                            onClick={() => setActiveTab('profile')}
                            icon={<User size={18} />}
                        >
                            Profile
                        </NavButton>
                        <NavButton 
                            active={activeTab === 'orders'} 
                            onClick={() => setActiveTab('orders')}
                            icon={<Package size={18} />}
                        >
                            Orders
                        </NavButton>
                         <NavButton 
                            active={activeTab === 'settings'} 
                            onClick={() => setActiveTab('settings')}
                            icon={<Settings size={18} />}
                        >
                            Settings
                        </NavButton>
                    </nav>

                    <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10 border-red-500/20"
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        <LogOut size={18} className="mr-2" /> Sign Out
                    </Button>
               </aside>

               {/* Content Area */}
               <main className="flex-1 bg-[#151515] border border-white/5 rounded-3xl p-8 min-h-[500px]">
                   <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'profile' && <ProfileTab session={session} />}
                            {activeTab === 'orders' && <OrdersTab />}
                            {activeTab === 'settings' && <SettingsTab />}
                        </motion.div>
                   </AnimatePresence>
               </main>
           </div>
       </div>
    </div>
  );
}

function UserCard({ session }) {
    return (
        <div className="bg-[#151515] border border-white/5 rounded-2xl p-6 text-center mb-6">
            <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-bronze-500/30">
                 {session.user.image ? (
                     <Image src={session.user.image} alt={session.user.name} fill className="object-cover" referrerPolicy="no-referrer"/>
                 ) : (
                     <div className="w-full h-full bg-white/10 flex items-center justify-center">
                         <User size={32} className="text-white/50" />
                     </div>
                 )}
            </div>
            <h2 className="text-white font-bold text-lg">{session.user.name}</h2>
            <p className="text-white/40 text-sm truncate">{session.user.email}</p>
        </div>
    )
}

function NavButton({ active, onClick, icon, children }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${active ? 'bg-bronze-500 text-black shadow-lg shadow-bronze-500/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
        >
            {icon}
            {children}
        </button>
    )
}

function ProfileTab({ session }) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-1">My Profile</h2>
                <p className="text-white/40 text-sm">Manage your personal information.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                    <input disabled value={session.user.name} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white opacity-70 cursor-not-allowed"/>
                </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                    <input disabled value={session.user.email} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white opacity-70 cursor-not-allowed"/>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5">
                <Button disabled variant="outline">Edit Profile (Managed by Google)</Button>
            </div>
        </div>
    )
}

function OrdersTab() {
    // Mock orders
    const orders = [
        { id: '#VB9281', date: 'Jan 24, 2026', status: 'Processing', total: 101799, items: 'The Obsidian Project, Beans (x2)' },
        { id: '#VB8110', date: 'Dec 12, 2025', status: 'Delivered', total: 4499, items: 'Pro Knock Box' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-1">Order History</h2>
                <p className="text-white/40 text-sm">Track and manage your recent purchases.</p>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-black/20 rounded-xl p-6 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-bronze-500/30 transition-colors">
                        <div>
                             <div className="flex items-center gap-3 mb-1">
                                <span className="text-white font-bold">{order.id}</span>
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                    {order.status}
                                </span>
                             </div>
                             <p className="text-sm text-white/40">{order.items}</p>
                             <p className="text-xs text-white/30 mt-1">{order.date}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-bronze-500 font-bold mb-2">₹{order.total.toLocaleString('en-IN')}</p>
                             <Button size="sm" variant="outline" className="h-8 text-xs">View Invoice</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function SettingsTab() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
                <p className="text-white/40 text-sm">Control your preferences.</p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                    <div>
                        <h3 className="text-white font-bold">Email Notifications</h3>
                        <p className="text-sm text-white/40">Receive updates about your order status.</p>
                    </div>
                    <div className="h-6 w-11 bg-bronze-500 rounded-full cursor-pointer relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full shadow-sm" />
                    </div>
                </div>

                 <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                    <div>
                        <h3 className="text-white font-bold">Marketing Emails</h3>
                        <p className="text-sm text-white/40">Receive news about new products and sales.</p>
                    </div>
                     <div className="h-6 w-11 bg-white/10 rounded-full cursor-pointer relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full shadow-sm" />
                    </div>
                </div>
            </div>
        </div>
    )
}
